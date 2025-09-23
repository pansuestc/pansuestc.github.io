# Asymptotic behaviour of kernel
To obtain numerical stability of the double layer kernel, we need to investigate its asymptotic behaviour.

## Elastic wave kernel in 2D
When discretizing the single layer operator of elastic wave equation, we need to compute the Hessian matrix of Hankel function. Asymptotic expansion of the Hessian matrix of $(H_0^{(1)}(k_1|x-y|)-H_0^{(1)}(k_2|x-y|))$.
    First we consider the radiational function $f(r)$, where $r=|x-y|$, then

$$
\nabla f(r)=f'(r)\frac{x-y}{r}
$$

and

$$
\nabla^2 f(r)=f''(r)\frac{(x-y)(x-y)^T}{r^2}+f'(r)\left(\frac{I}{r}-\frac{(x-y)(x-y)^T}{r^3}\right)
$$

Let $\hat{r}=\frac{x-y}{r}$, by chain rule

$$
\nabla_x^2 f(kr)=k^2\nabla^2 f(kr)=k^2f''(kr)\hat{r}^T\hat{r}+kf'(kr)\frac{1}{r}\left(I-\hat{r}^T\hat{r}\right)
$$

Then let $f(r)=H_0^{(1)}(r)$,

$$
\begin{aligned}
\nabla_x^2 f(k_1r)-\nabla_x^2 f(k_2r) &= \left(k_1^2f''(k_1r)-k_2^2f''(k_2r)\right)\hat{r}^T\hat{r} \\
&\quad +\left(k_1f'(k_1r)-k_2f'(k_2r)\right)\frac{1}{r}\left(I-\hat{r}^T\hat{r}\right)
\end{aligned}
$$

Running the following code in Mathematica, we can get the asymptotic expansion of $af'(az)-bf'(bz)$ and $a^2f''(az)-b^2f''(bz)$, where $f(z)=H_0^{(1)}(z)$.

```mathematica
exp1=Asymptotic[-a HankelH1[1,a z]+b HankelH1[1,b z],{z,0,4}]
FullSimplify[exp1]
```

```mathematica
exp2=Asymptotic[a^2 (-HankelH1[0,a z]+1/(a z) HankelH1[1,a z])
-b^2 (-HankelH1[0,b z]+1/(b z) HankelH1[1,b z]),{z,0,4}]
FullSimplify[exp2]
```

$$
\begin{aligned}
af'(az)-bf'(bz) &= \frac{i z^3 \left(4 a^4 \log \left(\frac{a z}{2}\right)-2 i \pi  a^4+4 \gamma  a^4-5 a^4-4 b^4 \log \left(\frac{b z}{2}\right)+5 b^4+2 i \pi  b^4-4 \gamma  b^4\right)}{32 \pi } \\
&\quad -\frac{i z \left(2 a^2 \log \left(\frac{a z}{2}\right)-i \pi  a^2+2 \gamma  a^2-a^2-2 b^2 \log \left(\frac{b z}{2}\right)+b^2+i \pi  b^2-2 \gamma  b^2\right)}{2 \pi }
\end{aligned}
$$

and

$$
\begin{aligned}
a^2f''(az)-b^2f''(bz) &= -\frac{i z^4 \left(30 a^6 \log \left(\frac{a z}{2}\right)-15 i \pi  a^6+30 \gamma  a^6-44 a^6-30 b^6 \log \left(\frac{b z}{2}\right)+44 b^6+15 i \pi  b^6-30 \gamma  b^6\right)}{1152 \pi } \\
&\quad +\frac{i z^2 \left(12 a^4 \log \left(\frac{a z}{2}\right)-6 i \pi  a^4+12 \gamma  a^4-11 a^4-12 b^4 \log \left(\frac{b z}{2}\right)+11 b^4+6 i \pi  b^4-12 \gamma  b^4\right)}{32 \pi } \\
&\quad +\frac{i \left(2 a^2 \log \left(\frac{a z}{2}\right)-i \pi  a^2+2 \gamma  a^2+a^2-2 b^2 \log \left(\frac{b z}{2}\right)-b^2+i \pi  b^2-2 \gamma  b^2\right)}{2 \pi }
\end{aligned}
$$

## Transmission kernel
Similarly, we can get the asymptotic expansion of $\partial_{n_x}\partial_{n_y}\Phi(k_1 r)-\partial_{n_x}\partial_{n_y}\Phi(k_2 r)$. From the above remark, we have

$$
\nabla_x\nabla_yf(r)=-\nabla_x^2f(r)= -f''(r)\hat{r}^T\hat{r}-f'(r)\frac{1}{r}\left(I-\hat{r}^T\hat{r}\right)
$$

then

$$
\begin{aligned}
\nabla_x\nabla_yf_1(r)-\nabla_x\nabla_yf_2(r) &= -\left(f_1''(r)-f_2''(r)\right)\hat{r}^T\hat{r} \\
&\quad -\left(f_1'(r)-f_2'(r)\right)\frac{1}{r}\left(I-\hat{r}^T\hat{r}\right)
\end{aligned}
$$

For three dimension, let $f(r,k)=\frac{e^{\mathrm{i}kr}}{r}$, then

$$
\begin{aligned}
f'(r,k) &= \frac{e^{\mathrm{i}kr}(ikr-1)}{r^2} \\
f''(r,k) &= \frac{e^{\mathrm{i}kr}(-k^2r^2-2ikr+2)}{r^3}
\end{aligned}
$$

by the Taylor expansion $f(r,k)=\sum_{n=0}^{\infty}\frac{(ik)^n}{n!}r^{n-1}$, we have

$$
f_1(r)-f_2(r) = \sum_{n=1}^{\infty}\frac{(ik_1)^n-(ik_2)^n}{n!}r^{n-1}
$$

$$
f_1^{(m)}(r)-f_2^{(m)}(r) = \sum_{n=m}^{\infty}\frac{(ik_1)^n-(ik_2)^n}{n!}(n-1)(n-2)\cdots(n-m)r^{n-m-1}
$$


## Double layer operator in 3D
First, we expand the surface function $x(u)$ by Taylor series:

$$
x=x(u)=\sum_{|\alpha|\ge 0} \frac{1}{\alpha!}D^\alpha x(0)\,u^\alpha
$$

we denote $x_0=x(0)$, $n_0$ is the outward normal vector at $x_0$, then

$$
x-x_0=\sum_{|\alpha|\ge 1} \frac{1}{\alpha!}D^\alpha x(0)\,u^\alpha
$$

$$
(x-x_0)\cdot n_0=\sum_{|\alpha|\ge 2} \frac{1}{\alpha!}D^\alpha x(0)\,u^\alpha\cdot n_0
$$

the first order derivative disappears since they form the basis of the tangent space at $x_0$. Then the square of distance can be expanded as
$$
\begin{aligned}
r^2 &= |x-x_0|^2=(x-x_0)\cdot (x-x_0) \\
&= \sum_{|\alpha|\ge 1} \frac{1}{\alpha!}D^\alpha x(0)\,u^\alpha\cdot \sum_{|\beta|\ge 1} \frac{1}{\beta!}D^\beta x(0)\,u^\beta \\
&= \sum_{|\gamma| \ge 2} \left( \sum_{\substack{\alpha + \beta = \gamma \\ |\alpha|, |\beta| \ge 1}} \frac{1}{\alpha! \, \beta!} \left( D^\alpha x(0) \cdot D^\beta x(0) \right) \right) u^\gamma
\end{aligned}
$$
thus
$$
\begin{aligned}
\frac{\partial}{\partial_{n_{x_0}}}\frac{1}{|x-x_0|} &= \frac{x-x_0}{|x-x_0|^3}\cdot n_0\\
&= \frac{1}{|x-x_0|}\frac{\sum_{|\alpha|\ge 2} \frac{1}{\alpha!}D^\alpha x(0)\cdot n_0\,u^\alpha}{\sum_{|\gamma| \ge 2} \left( \sum_{\substack{\alpha + \beta = \gamma \\ |\alpha|, |\beta| \ge 1}} \frac{1}{\alpha! \, \beta!} \left( D^\alpha x(0) \cdot D^\beta x(0) \right) \right) u^\gamma}
\end{aligned}
$$
when $u\to (0,0)$,the second factor of the above equation represents the normal curvature of the surface at $x_0$, which is given by

$$
\frac{1}{2}\frac{(Lu_1^2+2Mu_1u_2+Nu_2^2)}{Eu_1^2+2Fu_1u_2+Gu_2^2}=\frac{1}{2}\kappa_n
$$
where $L=x_{11}\cdot n_0,M=x_{12}\cdot n_0,N=x_{22}\cdot n_0$ are the second fundamental form.
thus when $u\to (0,0)$

$$
\frac{\partial}{\partial_{n_{x_0}}}\frac{1}{|x-x_0|}=\frac{1}{2|x-x_0|}\kappa_n
$$

For example. the normal curvature of the unit sphere is constant, i.e. $\kappa_n=-1$.
