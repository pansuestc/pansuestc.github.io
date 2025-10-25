This note derives the BIE for a multi-layered domain boundary integral equation problem for acoustic scattering.

***
By Green's representation theorem, the solution in each layer $\Omega_j$ can be represented as:
$$ u_k^i = S_k \partial_n u^k - D_k u^k ,\quad x\in \Omega_j$$

For  three layer prolems, we have
$$
\begin{aligned}
u_1 &= S_1 \varphi_1 - D_1 q_1, \quad &x \in \Gamma_1 \\
u_2 &= S_{2,1} \varphi_1 - D_{2,1} q_1 + S_{2,2} \varphi_2 - D_{2,2} q_2, \quad &x \in \Gamma_2 \\
u_3 &= S_3 \varphi_2 - D_3 q_2, \quad &x \in \Gamma_3
\end{aligned}
$$

---

The classical jump conditions of the potential yield the solution trace on the interface as follows: 
$$
\Rightarrow
\begin{aligned}
u_1 &= S_1 \varphi_1 - (\frac{1}{2}+k_1)q_1, \quad &\partial_n u_1 &= (-\frac{1}{2}+k'_1)\varphi_1 - N_1 q_1 \\
u_2 &= S_{2,1}\varphi_1 - (-\frac{1}{2}+k_{2,1})q_1 + S_{2,2}\varphi_2 - (\frac{1}{2}+k_{2,2})q_2, \quad &\partial_n u_2 &= (+\frac{1}{2}+k'_{2,1})\varphi_1 - N_{2,1}q_1 + (-\frac{1}{2}+k'_{2,2})\varphi_2 - N_{2,2}q_2 \\
u_3 &= S_3\varphi_2 - (-\frac{1}{2}+k_3)q_2, \quad &\partial_n u_3 &= (+\frac{1}{2}+k'_3)\varphi_2 - N_3 q_2
\end{aligned}
$$
Subtract the trace for the adjacent field
$$
\Rightarrow
\begin{aligned}
u_2 - u_1 &= (S_{2,1}-S_1)\varphi_1 - (-I+k_{2,1}-k_1)q_1 + S_{2,2}\varphi_2 - D_{2,2}q_2 \\
\partial_n u_2 - \partial_n u_1 &= (I+K'_{2,1}-k'_1)\varphi_1 - (N_{2,1}-N_1)q_1 + k'_{2,2}\varphi_2 - N_{2,2}q_2
\end{aligned}
$$

$$
\Rightarrow
\begin{aligned}
u_3 - u_2 &= (S_3-S_{2,2})\varphi_2 - (-1+k_3-k_{2,2})q_2 - S_{2,1}\varphi_1 + k_{2,1}q_1 \\
\partial_n u_3 - \partial_n u_2 &= (1+k'_3-k'_{2,2})\varphi_2 - (N_3-N_{2,2})q_2 - k'_{2,1}\varphi_1 + N_{2,1}q_1
\end{aligned}
$$
Then by the transmission conditions across the interfaces, we obtain the following BIE:
$$
\begin{aligned}
\begin{bmatrix}
I + K_1 - K_{2,1} & S_{2,1} - S_1 & -K_{2,2} & S_{2,2} \\
N_1 - N_{2,1} & I + K'_{2,1} - K_1' & -N_{2,2} & K_{2,2}' \\
K_{2,1} & -S_{2,1} & I + K_{2,2} - K_3 & S_3 - S_{2,2} \\
N_{2,1} & -K'_{2,1} & N_{2,2} - N_3 & I + K'_3 - K'_{2,2}
\end{bmatrix}
\begin{bmatrix}
q_1 \\
\varphi_1 \\
q_2 \\
\varphi_2
\end{bmatrix}=\begin{bmatrix}
f_1 \\
\partial_n f_1 \\
f_2 \\
\partial_n f_2
\end{bmatrix}
\end{aligned}
$$
