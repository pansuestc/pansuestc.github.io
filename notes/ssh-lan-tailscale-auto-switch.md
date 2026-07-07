# Windows 11 客户端通过 SSH 自动选择网线 IP / Tailscale IP 登录 Ubuntu 服务器

## 1. 问题背景

服务器有两个访问方式：

* **网线 / 局域网 IP**：`YOUR_LAN_IP` (例如 `10.66.66.2`)
* **Tailscale IP**：`YOUR_TAILSCALE_IP` (例如 `100.119.5.38`)

使用场景：

* 大部分时间服务器通过网线连接，网线速度更快。
* 有时拔掉网线或带走电脑，此时需要通过 Tailscale 连接。
* 不希望每次手动切换 IP。
* 客户端是 **Windows 11**。
* 服务端是 **Ubuntu**。
* SSH 登录用户名是：`YOUR_SSH_USERNAME` (例如 `pans`)。
* 希望统一使用别名：

```powershell
ssh Linux-2204
```

目标：

```text
网线可达    -> 自动连接 YOUR_LAN_IP
网线不可达  -> 自动连接 YOUR_TAILSCALE_IP
```

---

## 2. 核心方案

使用 Windows OpenSSH 的配置文件：

```text
C:\Users\YOUR_WINDOWS_USERNAME\.ssh\config
```

结合：

```sshconfig
Match host Linux-2204 exec "..."
```

实现自动判断。

基本逻辑是：

1. SSH 连接 `Linux-2204` 时，先执行一个 PowerShell 脚本检测 `YOUR_LAN_IP:22` 是否可达。
2. 如果可达，则使用 `HostName YOUR_LAN_IP`。
3. 如果不可达，则退回到后面的默认配置，使用 `HostName YOUR_TAILSCALE_IP`。

---

## 3. 创建网线 IP 检测脚本

创建文件：

```text
C:\Users\YOUR_WINDOWS_USERNAME\.ssh\check-ssh-lan.ps1
```

内容如下：

```powershell
param(
    [Parameter(Mandatory=$true)][string]$TargetHost,
    [int]$Port = 22,
    [int]$TimeoutMs = 700
)

$client = [System.Net.Sockets.TcpClient]::new()

try {
    $result = $client.BeginConnect($TargetHost, $Port, $null, $null)

    if (-not $result.AsyncWaitHandle.WaitOne($TimeoutMs, $false)) {
        exit 1
    }

    $client.EndConnect($result)
    exit 0
}
catch {
    exit 1
}
finally {
    $client.Close()
}
```

说明：

* 脚本会测试目标 IP 的 `22` 端口是否可连接。
* 如果能连接，返回 `0`。
* 如果不能连接，返回 `1`。
* SSH 的 `Match exec` 会根据返回值判断是否启用对应配置。
* `TimeoutMs = 700` 表示最多等待 700 ms，避免网线不可达时等待太久。

---

## 4. SSH 配置文件

编辑：

```text
C:\Users\YOUR_WINDOWS_USERNAME\.ssh\config
```

推荐配置如下：

```sshconfig
Host Linux-2204
    User YOUR_SSH_USERNAME
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    HostKeyAlias Linux-2204
    ConnectTimeout 5
    ServerAliveInterval 30
    ServerAliveCountMax 3

Match host Linux-2204 exec "C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:/Users/YOUR_WINDOWS_USERNAME/.ssh/check-ssh-lan.ps1 YOUR_LAN_IP"
    HostName YOUR_LAN_IP

Host Linux-2204
    HostName YOUR_TAILSCALE_IP
```

注意：

* `Match` 后必须写成：

```sshconfig
Match host Linux-2204 exec "..."
```

不能写成：

```sshconfig
Match Linux-2204 exec "..."
```

否则会报错：

```text
Unsupported Match attribute Linux-2204
Bad Match condition
```

原因是 `Match` 后面需要的是匹配条件，例如 `host`、`user`、`exec` 等。`Linux-2204` 不能直接作为 `Match` 属性。

---

## 5. 配置项解释

### 5.1 通用 Host 配置

```sshconfig
Host Linux-2204
    User YOUR_SSH_USERNAME
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    HostKeyAlias Linux-2204
    ConnectTimeout 5
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

含义：

* `Host Linux-2204`：定义 SSH 别名。
* `User YOUR_SSH_USERNAME`：默认登录用户名。
* `Port 22`：SSH 端口。
* `IdentityFile ~/.ssh/id_ed25519`：指定私钥。
* `IdentitiesOnly yes`：只使用指定私钥，避免尝试太多密钥。
* `HostKeyAlias Linux-2204`：两个 IP 使用同一个 host key 别名，避免 known_hosts 混乱。
* `ConnectTimeout 5`：连接超时时间。
* `ServerAliveInterval 30`：每 30 秒发送一次保活包。
* `ServerAliveCountMax 3`：连续 3 次无响应则断开。

### 5.2 网线 IP 优先匹配

```sshconfig
Match host Linux-2204 exec "C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:/Users/YOUR_WINDOWS_USERNAME/.ssh/check-ssh-lan.ps1 YOUR_LAN_IP"
    HostName YOUR_LAN_IP
```

含义：

* 当目标主机是 `Linux-2204` 时，执行检测脚本。
* 如果脚本检测到 `YOUR_LAN_IP:22` 可达，则启用：

```sshconfig
HostName YOUR_LAN_IP
```

即通过网线 IP 连接。

### 5.3 Tailscale fallback

```sshconfig
Host Linux-2204
    HostName YOUR_TAILSCALE_IP
```

含义：

* 如果前面的 `Match exec` 没有生效，则使用 Tailscale IP。
* 因为 OpenSSH 配置中前面已经生效 of 选项不会被后面的同名选项覆盖，所以当网线可达时，`HostName YOUR_LAN_IP` 会优先生效。
* 当网线不可达时，前面的 `HostName YOUR_LAN_IP` 不会设置，于是使用后面的 `HostName YOUR_TAILSCALE_IP`。

---

## 6. 测试命令

### 6.1 查看 SSH 最终解析结果

在 PowerShell 中运行：

```powershell
ssh -G Linux-2204 | Select-String "hostname|user|hostkeyalias"
```

### 6.2 网线连接时的结果

网线可达时，输出类似：

```text
user YOUR_SSH_USERNAME
hostname YOUR_LAN_IP
canonicalizehostname false
hostkeyalias linux-2204
userknownhostsfile C:\Users\YOUR_WINDOWS_USERNAME/.ssh/known_hosts C:\Users\YOUR_WINDOWS_USERNAME/.ssh/known_hosts2
syslogfacility USER
```

这说明：

```powershell
ssh Linux-2204
```

会连接：

```text
YOUR_SSH_USERNAME@YOUR_LAN_IP
```

即走网线。

### 6.3 拔掉网线后的结果

拔掉网线后，再运行：

```powershell
ssh -G Linux-2204 | Select-String "hostname|user|hostkeyalias"
```

输出类似：

```text
user YOUR_SSH_USERNAME
hostname YOUR_TAILSCALE_IP
canonicalizehostname false
hostkeyalias linux-2204
userknownhostsfile C:\Users\YOUR_WINDOWS_USERNAME/.ssh/known_hosts C:\Users\YOUR_WINDOWS_USERNAME/.ssh/known_hosts2
syslogfacility USER
```

这说明：

```powershell
ssh Linux-2204
```

会连接：

```text
YOUR_SSH_USERNAME@YOUR_TAILSCALE_IP
```

即走 Tailscale。

---

## 7. 最终使用方式

以后无论当前在局域网内还是通过 Tailscale，都只需要使用：

```powershell
ssh Linux-2204
```

不再手动切换 IP。

自动选择规则：

```text
YOUR_LAN_IP 可达       -> 使用 YOUR_LAN_IP
YOUR_LAN_IP 不可达     -> 使用 YOUR_TAILSCALE_IP
```

---

## 8. known_hosts 与 HostKeyAlias

由于同一台服务器有两个 IP：

```text
YOUR_LAN_IP
YOUR_TAILSCALE_IP
```

如果不设置：

```sshconfig
HostKeyAlias Linux-2204
```

SSH 可能会把它们当成两个不同主机，分别记录 host key，后续可能出现 known_hosts 警告。

使用：

```sshconfig
HostKeyAlias Linux-2204
```

后，两个 IP 都统一使用 `Linux-2204` 这个别名记录 host key。

如果出现旧的 host key 冲突，可以清理：

```powershell
ssh-keygen -R YOUR_LAN_IP
ssh-keygen -R YOUR_TAILSCALE_IP
ssh-keygen -R Linux-2204
```

然后重新连接：

```powershell
ssh Linux-2204
```

首次确认 host key 即可。

---

## 9. VS Code Remote-SSH 问题与修复

命令行 SSH 已经正常，但 VS Code Remote-SSH 最初无法连接。

原因通常是：

1. VS Code 没有使用 Windows 自带的 `ssh.exe`。
2. VS Code 没有读取正确的 SSH config。
3. VS Code 扩展进程中 `powershell.exe` 路径解析不一致。
4. VS Code 旧连接缓存仍指向旧 IP。

最终修复思路是：强制 VS Code 使用与命令行一致的 OpenSSH 和 config 文件。

---

## 10. VS Code 设置

打开 VS Code：

```text
Ctrl + Shift + P
Preferences: Open User Settings (JSON)
```

加入或修改：

```json
{
    "remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe",
    "remote.SSH.configFile": "C:\\Users\\YOUR_WINDOWS_USERNAME\\.ssh\\config",
    "remote.SSH.useLocalServer": false,
    "remote.SSH.showLoginTerminal": true,
    "remote.SSH.logLevel": "trace"
}
```

关键项：

```json
"remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe"
```

强制 VS Code 使用 Windows 系统 OpenSSH，而不是 Git 自带 SSH 或其他 SSH。

```json
"remote.SSH.configFile": "C:\\Users\\YOUR_WINDOWS_USERNAME\\.ssh\\config"
```

强制 VS Code 读取当前已经验证成功的 SSH 配置文件。

```json
"remote.SSH.useLocalServer": false
```

避免 VS Code Remote-SSH 的 local server 模式引入额外问题。

```json
"remote.SSH.showLoginTerminal": true
```

显示登录终端，方便观察交互式错误。

```json
"remote.SSH.logLevel": "trace"
```

输出详细日志，方便排错。

---

## 11. VS Code 中连接方式

在 VS Code 中使用：

```text
Ctrl + Shift + P
Remote-SSH: Connect to Host...
Linux-2204
```

不要选择旧的：

```text
YOUR_LAN_IP
YOUR_TAILSCALE_IP
```

只选择：

```text
Linux-2204
```

这样 VS Code 才会走自动判断逻辑。

---

## 12. VS Code 中的验证方法

在 VS Code 内置终端或普通 PowerShell 中运行：

```powershell
C:\Windows\System32\OpenSSH\ssh.exe -G Linux-2204 | Select-String "hostname|user|hostkeyalias"
```

网线可达时应看到：

```text
hostname YOUR_LAN_IP
```

网线不可达时应看到：

```text
hostname YOUR_TAILSCALE_IP
```

如果这里正确，但 VS Code 仍无法连接，应查看：

```text
View -> Output -> Remote - SSH
```

重点检查 VS Code 实际使用的 SSH 路径是否为：

```text
C:\Windows\System32\OpenSSH\ssh.exe
```

如果显示的是 Git 自带 SSH，例如：

```text
C:\Program Files\Git\usr\bin\ssh.exe
```

则说明 VS Code 设置没有生效，需要重新检查：

```json
"remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe"
```

---

## 13. Ubuntu 服务端建议检查项

通常 Ubuntu 端不需要改动，但如果 Tailscale 能 ping 通却 SSH 不通，可检查：

### 13.1 SSH 是否监听 22 端口

```bash
sudo ss -ltnp | grep :22
```

正常情况下应看到 SSH 服务监听 `0.0.0.0:22` 或对应地址。

### 13.2 sshd_config 是否限制了 ListenAddress

检查：

```bash
sudo grep -i ListenAddress /etc/ssh/sshd_config
```

如果写死为：

```text
ListenAddress YOUR_LAN_IP
```

则 Tailscale IP 可能无法连接。

可考虑删除该限制，或增加 Tailscale 地址。修改后重启 SSH：

```bash
sudo systemctl restart ssh
```

### 13.3 防火墙是否允许 Tailscale SSH

如果使用 `ufw`，可允许 Tailscale 接口访问 SSH：

```bash
sudo ufw allow in on tailscale0 to any port 22 proto tcp
```

---

## 14. 常见错误总结

### 错误 1：Match 写法错误

错误写法：

```sshconfig
Match Linux-2204 exec "..."
```

报错：

```text
Unsupported Match attribute Linux-2204
Bad Match condition
```

正确写法：

```sshconfig
Match host Linux-2204 exec "..."
```

---

### 错误 2：VS Code 连不上，但命令行可以

优先检查 VS Code 的 SSH 路径：

```json
"remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe"
```

以及 config 文件：

```json
"remote.SSH.configFile": "C:\\Users\\YOUR_WINDOWS_USERNAME\\.ssh\\config"
```

---

### 错误 3：VS Code 仍然连旧 IP

在 VS Code 中不要选择旧 IP 入口，只选择：

```text
Linux-2204
```

必要时清理 VS Code 远端 server：

```bash
rm -rf ~/.vscode-server ~/.vscode-remote
```

然后重新连接。

---

## 15. 最终结论

最终可稳定使用：

```powershell
ssh Linux-2204
```

自动连接逻辑为：

```text
网线可达：
    Linux-2204 -> YOUR_SSH_USERNAME@YOUR_LAN_IP

网线不可达：
    Linux-2204 -> YOUR_SSH_USERNAME@YOUR_TAILSCALE_IP
```

VS Code Remote-SSH 也使用同一个主机别名：

```text
Linux-2204
```

并通过以下 VS Code 设置保证与命令行行为一致：

```json
{
    "remote.SSH.path": "C:\\Windows\\System32\\OpenSSH\\ssh.exe",
    "remote.SSH.configFile": "C:\\Users\\YOUR_WINDOWS_USERNAME\\.ssh\\config",
    "remote.SSH.useLocalServer": false,
    "remote.SSH.showLoginTerminal": true,
    "remote.SSH.logLevel": "trace"
}
```

最终效果：

* 命令行 SSH 不需要手动切 IP。
* VS Code Remote-SSH 不需要手动切 IP。
* 局域网优先，速度更快。
* 离开局域网后自动使用 Tailscale。
* 同一台服务器使用统一 host key 别名，避免 known_hosts 混乱。
