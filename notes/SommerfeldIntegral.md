

### Analysis using Sommerfeld Integrals

The notes outline a method for solving a wave scattering problem over an infinite plane boundary $\Gamma$ using boundary integral equations, specifically with the Sommerfeld integral representation of the Green's function.

The boundary is defined as the x-axis:
$$
\Gamma: (-\infty, +\infty) \times \{0\}
$$

#### 1. Green's Function Representation

The fundamental solution (Green's function) is represented as an integral over plane waves (a Sommerfeld integral). The notes define a component of the Green's function as:
$$
G(\mathbf{x}) = \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(\lambda x_1 + |x_2| \sqrt{k^2 - \lambda^2})}}{\sqrt{k^2 - \lambda^2}} \,d\lambda= \frac{1}{4\pi} \int_{\mathbb{R}} \frac{e^{-\sqrt{\lambda^2 - k^2}|x_2|}}{\sqrt{\lambda^2 - k^2}}e^{ix_1\lambda} \, d\lambda
$$
Here, $\mathbf{x} = (x_1, x_2)$, $k$ is the wavenumber, and the integral is over the real line $\mathbb{R}$.

The normal derivative of the Green's function, which is needed for the double-layer potential, is calculated with respect to $x_2$:
$$
\frac{\partial G}{\partial x_2} = \frac{i}{4\pi} \int_{\mathbb{R}} \frac{i\sqrt{k^2 - \lambda^2}}{\sqrt{k^2 - \lambda^2}} e^{i(\lambda x_1 + x_2 \sqrt{k^2 - \lambda^2})} \, d\lambda
$$
$$
= \frac{i^2}{4\pi} \int_{\mathbb{R}} e^{i(\lambda x_1 + x_2 \sqrt{k^2 - \lambda^2})} \, d\lambda
$$
$$
= -\frac{1}{4\pi} \int_{\mathbb{R}} e^{i(\lambda x_1 + x_2 \sqrt{k^2 - \lambda^2})} \, d\lambda
$$



#### 2. Layer Potential Representations

The scattered field $u^s(\mathbf{x})$ can be represented using single or double-layer potentials over the boundary $\Gamma$.

**Double-Layer Representation**

The scattered field is given by an integral of the normal derivative of the Green's function against a density function $b(\mathbf{x}')$. 

$$
u^s(\mathbf{x}) = \int_{\Gamma} \frac{\partial G(\mathbf{x}, \mathbf{x}')}{\partial n'} b(\mathbf{x}') \, ds' = \int_{\Gamma} \frac{\partial G(\mathbf{x}-\mathbf{x}')}{\partial x_2'} b(\mathbf{x}') \, ds'
$$

Substituting the integral for $\frac{\partial G}{\partial x_2}$ and setting $ds' = dx_1'$:
$$
u^s(\mathbf{x}) = \int_{-\infty}^{+\infty} \left( \frac{1}{4\pi} \int_{\mathbb{R}} e^{i(\lambda(x_1-x_1') + x_2\sqrt{k^2-\lambda^2})} \, d\lambda \right) b(x_1') \, dx_1'
$$
By swapping the order of integration, we can isolate the Fourier transform of the density $b(x_1')$. Let $\hat{b}(\lambda) = \int_{-\infty}^{\infty} b(x_1') e^{-iqx_1'} \, dx_1'$.

$$
u^s(\mathbf{x}) = \frac{1}{4\pi} \int_{\mathbb{R}} e^{ix_2\sqrt{k^2-\lambda^2}} e^{iqx_1} \left( \int_{-\infty}^{\infty} e^{-iqx_1'} b(x_1') \, dx_1' \right) \, d\lambda
$$
$$
= \frac{1}{4\pi} \int_{\mathbb{R}} \underbrace{e^{ix_2\sqrt{k^2-\lambda^2}}}_{\textcircled{1}} \underbrace{e^{iqx_1} \hat{b}(\lambda)}_{\textcircled{2}} \, d\lambda
$$



A key observation is noted:
> "When one of ①, ② decay exponential, the integral can be truncated in a finite interval."
This occurs for $|\lambda| > k$, where $\sqrt{k^2-\lambda^2}$ becomes imaginary, leading to $e^{-x_2\sqrt{\lambda^2-k^2}}$ (an evanescent wave) which decays exponentially with $x_2$.

**Single-Layer Representation**

$$
u^s(\mathbf{x}) = \int_{\Gamma} G(\mathbf{x}, \mathbf{x}') b(\mathbf{x}') \, ds'
$$
Substituting the expression for $G$:
$$
= \int_{-\infty}^{\infty} \left( \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(\lambda(x_1-x_1') + x_2\sqrt{k^2-\lambda^2})}}{\sqrt{k^2-\lambda^2}} \, d\lambda \right) b(x_1') \, dx_1'
$$
Swapping the integration order again:
$$
= \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{ix_2\sqrt{k^2-\lambda^2}} e^{i\lambda x_1}}{\sqrt{k^2-\lambda^2}} \left( \int_{-\infty}^{\infty} e^{-i\lambda x_1'} b(x_1') \, dx_1' \right) \, d\lambda
$$
$$
= \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{ix_2\sqrt{k^2-\lambda^2}}}{\sqrt{k^2-\lambda^2}} e^{i\lambda x_1} \hat{b}(\lambda) \, d\lambda
$$



***

> Recall that the Green's function representation is given by the Sommerfeld integral:
$$
G(\mathbf{x}) = \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(\lambda x_1 + |x_2| \sqrt{k^2 - \lambda^2})}}{\sqrt{k^2 - \lambda^2}} \,d\lambda= \frac{1}{4\pi} \int_{\mathbb{R}} \frac{e^{-\sqrt{\lambda^2 - k^2}|x_2|}}{\sqrt{\lambda^2 - k^2}}e^{ix_1\lambda} \, d\lambda
$$

Let $u^s = S_{\Gamma_0}[\sigma_w] + F_{I_0}[\eta_w]$

where
$$
S_{\Gamma_0}[\sigma](x) = \int_{M_s} G(x, x') \sigma(x') ds'
$$

$$
F_{I_0}[\eta_w](x) = \int_{-M}^{M} \frac{e^{-\sqrt{\lambda^2-k^2}x_2}}{\sqrt{\lambda^2-k^2}} e^{i\lambda x_1} \hat{\eta_w}(\lambda) d\lambda 
$$

② first we construct the solution reprensented by single layer potential. By employing using boundary condition(Here,$n=(0,1)$)
$$
\frac{\partial u^s}{\partial n} + ik\alpha u^s = g \quad \text{on } \Gamma
$$
we have
$$
(-\frac{1}{2}I + K' + ik\alpha S_{\Gamma_0})[\sigma] = g
$$
since $K'[\sigma] = 0$ we have.
$$
(-\frac{1}{2} + ik\alpha S_{\Gamma_0})[\sigma] = g
$$

Let $\sigma_w =W_m\sigma$



Denote the Fourier transform of $f$ as $\mathcal{F}f$.
$$
g = -\frac{\partial u^i}{\partial n} - ik\alpha u^s = (-\frac{1}{2} + ik\alpha S_{\Gamma_0}) [\sigma_w] + \int_{-\infty}^{\infty} (-\sqrt{\lambda^2-k^2}+ik\alpha)\frac{1}{\sqrt{\lambda^2-k^2}}e^{ix_1\lambda} \mathcal{F}\eta_w \, d\lambda
$$

Notice that $$g = -\frac{\partial G_k}{\partial n} - ik\alpha G_k = -\frac{1}{4\pi}\int_{-\infty}^{\infty} (1 + \frac{ik\alpha}{\sqrt{\lambda^2-k^2}}) e^{i\lambda x_1} d\lambda$$

and applying the fourier transform, $$\mathcal{F}g =  -\frac{1}{2}\mathcal{F}\sigma_w + ik\alpha \mathcal{F}(S_{\Gamma_0} [\sigma_w]) + \textcolor{red}{2\pi}(-\sqrt{\lambda^2-k^2}+ik\alpha) \frac{1}{\sqrt{\lambda^2-k^2}} \mathcal{F}\eta_w$$

it can be rewritten as $$\textcolor{red}{2\pi}(-1 + \frac{ik\alpha}{\sqrt{\lambda^2-k^2}}) \mathcal{F}\eta_w = \textcolor{red}{\frac{1}{2}}e^{-\sqrt{\lambda^2-k^2}h}(1- \frac{ik\alpha}{\sqrt{\lambda^2-k^2}})  + \frac{1}{2}\mathcal{F}\sigma_w - ik\alpha \mathcal{F}S_{\Gamma_0}[\sigma_w]$$

> Since $\mathcal{F}\eta_w$ decays exponentially, we can truncate the Sommerfeld integral  in a finite interval. We summarize the results as follows: 
> 1. Solve the integral equation for $\sigma$
> $$(-\frac{1}{2} + ik\alpha S_{\Gamma_0})[\sigma] = g$$
> 2. Compute $\mathcal{F}\sigma_w$
> 3. Compute $\mathcal{F}\eta_w$ 
> $$\mathcal{F}\eta_w = \frac{\frac{1}{2\pi}(\frac{1}{2}\mathcal{F}\sigma_w - ik\alpha \mathcal{F}S_{\Gamma_0}[\sigma_w]) + \frac{1}{2\pi}\textcolor{red}{\frac{1}{2}}e^{-\sqrt{\lambda^2-k^2}h}(1- \frac{ik\alpha}{\sqrt{\lambda^2-k^2}})}{-1 + \frac{ik\alpha}{\sqrt{\lambda^2-k^2}}}$$
> 4. Finally, the scattered field is the sum of the single layer potential and the Sommerfeld integral:
> $$u^s = S_{\Gamma_0}[\sigma_w] + F_{I_0}[\eta_w]$$


### Single Layer Potential Composition
Recall that the scattered field $u^s(\mathbf{x})$ can be represented using a single-layer potential over the boundary $\Gamma$.
$$
u^s(\mathbf{x}) = \int_{\Gamma} G(\mathbf{x}, \mathbf{x}') \varphi(\mathbf{x}') \, ds'
$$
Let $\eta=\sqrt{\lambda^2-k^2}$, by Sommerfeld integral, we have
$$u^s(\mathbf{x})
= \frac{1}{4\pi} \int_{\mathbb{R}} \frac{e^{-\eta|x_2|}}{\eta} e^{i\lambda x_1} \hat{\varphi}(\lambda) \, d\lambda
$$

Let $\varphi=W\varphi+(1-W)\varphi$, then we can split the scattered field into two parts:
$$
u^s = S_{\Gamma_0}[\varphi_w] + F_{I_0}[\mathcal{F}(\varphi+(1-W)\varphi)]
$$
where
$$
F_{I_0}[g](x) = \frac{1}{4\pi} \int_{-N_0}^{N_0} \frac{e^{-\eta|x_2|}}{\eta} e^{i\lambda x_1} g(\lambda) d\lambda 
$$
For a point source $u^i(x,x')$ located at $x'=(x_1', x_2')$ above the boundary $\Gamma$, the density function $\varphi$ can be obtained by solving the boundary integral equation:
$$
S\varphi=-u^i|_{\Gamma}
$$
By image method and the jump relation of single layer potential, we have
$$\varphi(x) = -2\frac{\partial}{\partial x_2}u^i(x,x')|_{\Gamma} = \frac{ik}{2} H_1^{(1)}(k|x-x'|)\frac{x_2-x_2'}{|x-x'|}$$
with its Fourier transform
$$
\hat{\varphi}(\lambda) =-e^{-\eta|x_2'|}e^{-i\lambda x_1'} 
$$


### Problem
1. We need the Fourier transform of the incident wave $u^i$ on the boundary $\Gamma$.
2. When the plane is locally perturbed.

#### Operator Composition

$$
\Rightarrow (D_{z_0} D_z q_z)(x) = \int_L \left( \int_{-\infty}^{+\infty} k(x,y) k(y,z) dy_1 \right) q(z) dz
$$

$$
\begin{aligned}
& y = (y_1, 0) \\
& z = (z_1, z_2)
\end{aligned}
$$

$$
\int_{-\infty}^{+\infty} k(x,y) k(y,z) dy_1
$$

$$
= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \operatorname{sgn}(x_2) e^{-\sqrt{\eta^2-k^2}|x_2|} e^{i\eta x_1} \operatorname{sgn}(-z_2) e^{-\sqrt{\eta^2-k^2}|z_2|} e^{-i\eta z_1} d\eta \quad x=(x_1, x_2)
$$

$$
= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \operatorname{sgn}(x_2) e^{-\sqrt{\eta^2-k^2}|x_2|} e^{i\eta x_1} \operatorname{sgn}(-z_2) e^{-\sqrt{\eta^2-k^2}|z_2|} e^{i\eta z_1} d\eta
$$

$$
= \frac{1}{2\pi} \int_{-\infty}^{+\infty} \operatorname{sgn}(x_2) \operatorname{sgn}(-z_2) e^{-\sqrt{\eta^2-k^2}|x_2|} e^{-\sqrt{\eta^2-k^2}|z_2|} e^{i\eta(x_1-z_1)} d\eta
$$


Let
$$
G(x,y) = \frac{i}{4} H_0^{(1)}(k|x-y|)
$$

please compute
$$
\int_{-\infty}^{+\infty} \frac{\partial}{\partial y_2} G(x,y) \frac{\partial}{\partial n_z} G(y,z) dy_2
$$

where $x=(x_1, x_2)$, $y=(y_1, 0)$, $z=(z_1, z_2)$, $n_z=(a, b)$



$s=x_1-z_1,L=|x_2|+|z_2|,R=\sqrt{s^2+L^2}$

Recall that the Green's function for the 2D Helmholtz equation is given by
$$
G(x,y) = \frac{i}{4} H_0^{(1)}(k|x-y|)
$$

when $x=(x_1, x_2)$, $y=(y_1, 0)$, $z=(z_1, z_2)$, $n_z=(0, 1)$

$$
\begin{align}
&\int_{-\infty}^{+\infty} \frac{\partial}{\partial y_2} G(x,y) \frac{\partial}{\partial n_z} G(y,z) dy_2\\&= \operatorname{sgn}(x_2)\operatorname{sgn}(-z_2)\frac{1}{8\pi} \int_{-\infty}^{+\infty}  e^{-\sqrt{\eta^2-k^2}(|x_2|+|z_2|)}  e^{i\eta (x_1-z_1)} d\eta\\
&=\operatorname{sgn}(x_2)\operatorname{sgn}(-z_2)\frac{-1}{2}sgn(z_2)\partial_{z_2}G(kR)\\
&=\operatorname{sgn}(x_2)\operatorname{sgn}(-z_2)\frac{kG'(kR)}{2R}(|x_2|+|z_2|)
\end{align}
$$

when $x=(x_1, x_2)$, $y=(y_1, 0)$, $z=(z_1, z_2)$, $n_z=(1, 0)$

$$
\begin{align}
&\int_{-\infty}^{+\infty} \frac{\partial}{\partial y_2} G(x,y) \frac{\partial}{\partial n_z} G(y,z) dy_2\\
&= \operatorname{sgn}(x_2)\frac{-i}{8\pi} \int_{-\infty}^{+\infty}  e^{-\sqrt{\eta^2-k^2}(|x_2|+|z_2|)}  \frac{\lambda}{\sqrt{\eta^2-k^2}}e^{i\eta (x_1-z_1)} d\eta\\
&=\operatorname{sgn}(x_2)\frac{-1}{2} \partial_{z_1}G(kR)\\
&=\operatorname{sgn}(x_2)\frac{kG'(kR)}{2R}(x_1-z_1)
\end{align}
$$

thus the final result is given by
$$
\int_{-\infty}^{+\infty} \frac{\partial}{\partial y_2} G(x,y) \frac{\partial}{\partial n_z} G(y,z) dy_2 = \frac{kG'(kR)}{2R} \operatorname{sgn}(x_2)\Big[ n_z \cdot (x_1-z_1, (|x_2|+|z_2|) \operatorname{sgn}(-z_2)) \Big]
$$

The result is verified using Mathematica 14 with the following code:

```mathematica
(* 为了代码清晰，我们先定义两个辅助变量 *)
(* y 代表垂直距离之和 *)
y = Abs[x2] + Abs[z2];

(* x 代表水平距离 *)
x = x1 - z1;

(* 定义积分表达式 *)
integrand =1/Pi/8 Sign[x2] Sign[-z2] Exp[-Sqrt[eta^2 - k^2] * y] * Exp[I * eta * x];
integrand2 =-I/Pi/8 Sign[x2] eta Exp[-Sqrt[eta^2 - k^2] * y]/Sqrt[eta^2 - k^2] * Exp[I * eta * x];
R=Sqrt[x^2+y^2];
Gd=-I/4*HankelH1[1,k R] k;
exact =-1/2 Sign[x2] Sign[-z2]  Gd  y/R;
exact2 =1/2 Sign[x2]   Gd  (-x)/R;
(* 设定一组参数 *)
params = {k -> 1.5, x1 -> 2, z1 -> 3, x2 -> 1, z2 -> 1};

(* 进行数值积分 *)
numericValue = NIntegrate[integrand /. params, {eta, -20+I, -1.5+I,0,1.5-I,20-I}]
(* 输出: 0.165275 + 0. I *)
N[exact/. params]

numericValue2 = NIntegrate[integrand2 /. params, {eta, -20+I, -1.5+I,0,1.5-I,20-I}]
N[exact2/. params]
```


### Single Layer Potential Representation
The scattered field $u^s(\mathbf{x})$ can be represented using a single-layer potential over the boundary $\Gamma$.
$$
u^s(\mathbf{x}) = \int_{\Gamma} G(\mathbf{x}, \mathbf{x}') b(\mathbf{x}') \, ds'
$$
Let $u=\sqrt{\eta^2-k^2}$, we need to compute the following integral:
$$\int_{-\infty}^{+\infty}    \frac{e^{-u(|x_2|+|z_2|)}}{u^2}e^{i\eta (x_1-z_1)} d\eta
$$


  



