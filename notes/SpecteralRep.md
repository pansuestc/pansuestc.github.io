# Fourier representation of Green function
## Introudcution
Although Green function in free space can be written in closed form, the Fourier representation also are useful in some complex gemoerties.

***

### Three-Dimensional Case

The free-space Green's function for the Helmholtz equation is:
$$ G = \frac{e^{ikR}}{4\pi R} $$
The Helmholtz equation is:
$$ \Delta G + k^2 G = -\delta(x) $$
Using the Fourier transform, where $\mathcal{F}(\Delta G) = -|\xi|^2 \hat{G}$ and $\mathcal{F}(-\delta(x)) = -1$, we have:
$$ (-|\xi|^2 + k^2)\hat{G} = -1 $$
$$ \implies \hat{G} = \frac{1}{|\xi|^2 - k^2} $$
Taking the inverse Fourier transform to find $G$:
$$
\begin{aligned}
G &= \frac{1}{(2\pi)^3} \int_{\mathbb{R}^3} \frac{1}{|\xi|^2 - k^2} e^{i x \cdot \xi} d\xi \\
&= \frac{1}{(2\pi)^3} \int_{\mathbb{R}^3} \frac{e^{i(x_1\xi_1 + x_2\xi_2 + x_3\xi_3)}}{\xi_1^2 + \xi_2^2 + \xi_3^2 - k^2} d\xi_1 d\xi_2 d\xi_3
\end{aligned}
$$
We integrate with respect to $\xi_3$ first, using contour integration. The poles are at:
$$ \xi_3^2 - (k^2 - \xi_1^2 - \xi_2^2) = 0 \implies \xi_{3,0} = \pm\sqrt{k^2 - \xi_1^2 - \xi_2^2} \equiv \pm \tilde{q} $$
We find the integral by applying the residue theorem. For $x_3 > 0$, we close the contour in the upper half-plane:
$$
\begin{aligned}
\int_{\mathbb{R}} \frac{e^{i(x_1\xi_1 + x_2\xi_2)} e^{ix_3\xi_3}}{\xi_3^2 - \tilde{q}^2} d\xi_3 &= 2\pi i \cdot \text{Res}\left( \frac{e^{i(\dots) + ix_3\xi_3}}{(\xi_3 - \tilde{q})(\xi_3 + \tilde{q})}, \xi_3 = \tilde{q} \right) \\
&= 2\pi i \left( \frac{e^{i(x_1\xi_1 + x_2\xi_2 + x_3\tilde{q})}}{2\tilde{q}} \right) \\
&= \pi i \frac{e^{i(x_1\xi_1 + x_2\xi_2 + x_3\tilde{q})}}{\tilde{q}}
\end{aligned}
$$
Thus, substituting this back, we get the Sommerfeld identity:
$$ G(x) = \frac{i}{2(2\pi)^2} \int_{\mathbb{R}^2} \frac{e^{i(x_1\xi_1 + x_2\xi_2 + x_3\sqrt{k^2-\xi_1^2-\xi_2^2})}}{\sqrt{k^2-\xi_1^2-\xi_2^2}} d\xi_1 d\xi_2 \quad, x_3 > 0 $$
For $x_3 < 0$, it has a similar result. Thus,
$$ G(x) = \frac{i}{2(2\pi)^2} \int_{\mathbb{R}^2} \frac{e^{i(x_1\xi_1 + x_2\xi_2 + |x_3|\tilde{q})}}{\tilde{q}} d\xi_1 d\xi_2 $$
Relating this to the known form of the Green's function:
$$ \frac{e^{ikR}}{R} = \frac{i}{2\pi} \int_{\mathbb{R}^2} \frac{e^{i(x_1\xi_1 + x_2\xi_2 + |x_3|\tilde{q})}}{\tilde{q}} d\xi_1 d\xi_2 $$

***

### Two-Dimensional Case

The Green's function is given by the Hankel function:
$$ G = \frac{i}{4} H_0^{(1)}(kR) $$
Starting from the Helmholtz equation in the Fourier domain:
$$ (\Delta + k^2)G = -\delta(x) \implies (-|\xi|^2+k^2)\hat{G} = -1 $$
$$ \hat{G} = \frac{1}{|\xi|^2 - k^2} $$
$$ G = \frac{1}{(2\pi)^2} \int_{\mathbb{R}^2} \frac{e^{i(x_1\xi_1 + x_2\xi_2)}}{|\xi|^2 - k^2} d\xi_1 d\xi_2 $$
Integrating with respect to $\xi_2$ using the residue theorem:
$$ \int_{\mathbb{R}} \frac{e^{i(x_1\xi_1+x_2\xi_2)}}{|\xi|^2 - k^2} d\xi_2 = \pi i \frac{e^{i(x_1\xi_1 + x_2\sqrt{k^2-\xi_1^2})}}{\sqrt{k^2-\xi_1^2}} $$
Thus,
$$ G(x) = \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(x_1\xi_1 + x_2\sqrt{k^2-\xi_1^2})}}{\sqrt{k^2-\xi_1^2}} d\xi_1 $$

Let $\eta=\sqrt{k^2-\xi^2}$, then
$$ G(x) = \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(x_1\xi + |x_2|\eta)}}{\eta} d\xi $$

## TE and TM polarization
The electric field of TE polarization is parallel to the $x-y$ plane, and the magnetic field is parallel to the $z$ axis. The electric field of TM polarization is parallel to the $z$ axis, and the magnetic field is parallel to the $x-y$ plane. In TE mode, the coordinates can always be rotated about the z axis to
make the electric field point only, e.g., in the y direction.

then $E=(0,E_y,0)$ and $H=(H_x,0,H_z)$, the Maxwell's equations can be simplified as
$$\begin{equation}
    \mu\nabla\times\mu^{-1}\nabla\times E-\omega^2\mu\epsilon E=0
\end{equation}
$$
by the formula $\nabla\times\mu E=\nabla\mu\times E+\mu\nabla\times E$, we have
$$\begin{equation}
   \mu \nabla\mu^{-1}\times(\nabla\times E)+\nabla\times\nabla\times E-\omega^2\mu\epsilon E=0
\end{equation}
$$

$$\begin{equation}
   \mu\begin{pmatrix}
    \partial_x\mu^{-1}\\
    \partial_y\mu^{-1}\\
    \partial_z\mu^{-1}
   \end{pmatrix}\times\begin{pmatrix}
    \partial_y E_z-\partial_z E_y\\
    \partial_z E_x-\partial_x E_z\\
    \partial_x E_y-\partial_y E_x
    \end{pmatrix}+\begin{pmatrix}
        (-\partial_y^2-\partial_z^2)E_x+\partial_y\partial_x E_y+\partial_z\partial_x E_z\\
        \partial_x\partial_y E_x-(\partial_x^2+\partial_z^2) E_y+\partial_z\partial_y E_z\\
        \partial_x\partial_z E_x+\partial_y\partial_z E_y-(\partial_x^2+\partial_y^2) E_z
    \end{pmatrix}-\omega^2\mu\epsilon\begin{pmatrix}
        0\\
        E_y\\
        0
    \end{pmatrix}=0
\end{equation}$$
note that $E=(0,E_y,0)$, $\mu,\epsilon$ only varying in z direction and $\nabla\cdot\epsilon E_y=0$, extracting the $y$ component, we have
$$\begin{equation}
    \mu\partial_z\mu^{-1}(\partial_zE_y)+\partial_x^2E_y+\partial_z^2E_y+\omega^2\mu\epsilon E_y=0
\end{equation}$$
> When $\mu$ is constant, the equation reduces to standard Helmholtz equation
$$\begin{equation}
    \Delta E_y+\omega^2\mu\epsilon E_y=0
\end{equation}$$

### Reflection from half-space
Consider a TE wave incident from the upper half-space to the lower half-space. Let $E_y=e_y(z)e^{ik_xx}$,then general expression in the upper half-space is a linear superposition of $e^{\pm  ik_zz}$, which can be written as
$$\begin{equation}
    e_y(z)=\begin{cases}
        e_0e^{-ik_{1z}z}+R^{TE}e^{ik_{1z}z},\quad z>0\\
        T^{TE}e^{-ik_{2z}z},\quad z<0
    \end{cases}
\end{equation}$$

where $k_{iz}=\sqrt{k_i^2-k_x^2},k_i^2=w^2\varepsilon_i\mu_i$. 
By the continuous condition of $E_y$ and $\partial_zE_y$ at $z=0$, we have
$$\begin{equation}
    R^{TE}=\frac{\mu_2k_{1z}-\mu_1k_{2z}}{\mu_2k_{1z}+\mu_1k_{2z}}
\end{equation}$$
and 
$$\begin{equation}
    T^{TE}=\frac{2\mu_2k_{1z}}{\mu_2k_{1z}+\mu_1k_{2z}}
\end{equation}$$

> Remark:  If $k_1>k_2$,there exist $k_x$ such that $k_1 > k_x>k_2$ impling $k_{1z}$ is real and $k_{2z}$ is purely imaginary,which is Fresnel reflection coefficient and transmission coefficient. Hence the magnitude of $R^{TE}$ equals to 1. This phenomenon is known as total internal reflection.
    For $\frac{\mu_2}{\mu_1}\neq 1$,there exist values of $k_x$ such that $R^{TE}=0$, which is Brewster angle.

* By Snell's law, $k_1\cos(\theta_1)=k_2\cos(\theta_2)$ , denote the incident angle $\theta_1=\theta_1$,then the incident direction is $d(-\theta_1)=(\cos\theta_1,-\sin\theta_1)$,the reflected direction is $d(\theta_1)=(\cos\theta_1,\sin\theta_1)$,the transmitted direction is $d(\theta_2)=(\cos\theta_2,-\sin\theta_2)$.

## Layered Green function in 2D
Consider a two-layered medium with interface at $x_2=0$, the wave numbers are $k_1$ in the upper half-space and $k_2$ in the lower half-space. The Green function satisfies
$$
G(x,x')=\begin{cases}
     \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(x_1-x_1')\xi}}{\eta}\left[e^{i|x_2-x_2'|\eta}+R^{TE}e^{i|x_2+x_2'|\eta} \right]d\xi ,\quad x_2>0\\
    \frac{i}{4\pi} \int_{\mathbb{R}} \frac{e^{i(x_1-x_1')\xi}}{\eta}T^{TE}e^{-ix_2\eta+ix_2'\eta_2} d\xi,\quad x_2<0
\end{cases}
$$

where $\eta=\sqrt{k_1^2-\xi^2},\eta_2=\sqrt{k_2^2-\xi^2}$.

