# Fourier Transform Introduction

## Definition

The Fourier Transform of a function $f(t)$ is defined as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

The inverse Fourier Transform is:

$$f(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{i\omega t} d\omega$$

## Fourier Transform and Distribution

### Definition

The Fourier transform of a function $f \in L^1(\mathbb{R}^d)$ is defined by:

$$\hat{f}(w) = \int_{\mathbb{R}^d} f(x) e^{-iwx} dx$$

and the inverse Fourier transform is defined by:

$$f(x) = \frac{1}{(2\pi)^d} \int_{\mathbb{R}^d} \hat{f}(w) e^{iwx} dw$$

**Lemma 1:** Let $f \in L^1(\mathbb{R}^d)$, then the Fourier transform of $f$ is a continuous function.

**Lemma 2:** 
$$\hat{1}(w) = \int_{\mathbb{R}^d} e^{-iwx} dx = (2\pi)^d \delta(w)$$

$$\hat{\delta}(w) = \int_{\mathbb{R}^d} \delta(x) e^{-iwx} dx = 1$$

**Remark:** The adjoint operator of Fourier transform is:

$$F^{\star} = (2\pi)^d F^{-1}$$

By this property, we can obtain the Plancherel theorem.

**Plancherel Theorem:** Let $f \in L^1(\mathbb{R}^d) \cap L^2(\mathbb{R}^d)$, then:

$$\int_{\mathbb{R}^d} |f(x)|^2 dx = \frac{1}{(2\pi)^d} \int_{\mathbb{R}^d} |\hat{f}(w)|^2 dw$$

**Proof:** 
$$\begin{align}
(2\pi)^d \int_{\mathbb{R}^d} |f(x)|^2 dx &= (2\pi)^d \int_{\mathbb{R}^d} f(x) \overline{f(x)} dx \\
&= (2\pi)^d \int_{\mathbb{R}^d} f(x) \overline{F^{-1}Ff(x)} dx \\
&= \langle f, F^{\star}Ff \rangle \\
&= \langle \hat{f}, \hat{f} \rangle
\end{align}$$
**Corollary (Parseval Formula for Laplace Transform):** Let $u, v \in L^1(\mathbb{R}) \cap L^2(\mathbb{R})$, then:

$$\frac{1}{2\pi} \langle Lu, Lv \rangle = \frac{1}{2\pi} \int_{-\infty}^{\infty} F[u(\cdot)e^{-s_1\cdot}](s_2) F[v(\cdot)e^{-s_1\cdot}](s_2) ds_2 = (e^{-2s_1\cdot}u(\cdot), v(\cdot))$$

### Fourier Transform of Real Functions

**Lemma:** Let $f \in L^1(\mathbb{R}^d)$ be a real function, then:

$$\hat{f}(-w) = \overline{\hat{f}(w)}$$

That is, when $f$ is real, then $\Re\hat{f}$ is even and $\Im\hat{f}$ is odd.

**Proof:**
$$\begin{align}
\hat{f}(-w) &= \int_{\mathbb{R}^d} f(x) e^{iw \cdot x} dx = \overline{\int_{\mathbb{R}^d} f(x) e^{-iw \cdot x} dx} \\
&= \overline{\hat{f}(w)}
\end{align}$$

**Corollary:** If $f \in L^1(\mathbb{R}^d)$ is a real function, and $\lim_{|w| \to \infty} \hat{f}(w) = A$, then $A$ is real.

**Proof:**
$$A = \lim_{|w| \to \infty} \hat{f}(w) = \lim_{|w| \to \infty} \hat{f}(-w) = \overline{A}$$

### Derivation of Distribution

**Definition:** Let $f \in D'(\mathbb{R}^d)$, the distributional derivative of $f$ is defined by:

$$\langle \partial^{\alpha} f, \phi \rangle = (-1)^{|\alpha|} \langle f, \partial^{\alpha} \phi \rangle$$

for any $\phi \in C_0^{\infty}(\mathbb{R}^d)$.

**Example 1:** Let $f(x) = \delta(x)$, then:

$$\langle \partial^{\alpha} \delta, \phi \rangle = (-1)^{|\alpha|} \langle \delta, \partial^{\alpha} \phi \rangle = (-1)^{|\alpha|} \partial^{\alpha} \phi(0)$$

**Example 2:**
$$\langle \frac{d}{dx} \text{sign}(x), \phi \rangle = -\langle \text{sign}(x), \frac{d}{dx} \phi \rangle = 2\phi(0) = \langle 2\delta, \phi \rangle$$

Removing test function yields $\frac{d}{dx} \text{sign}(x) = 2\delta(x)$.

So:
$$\frac{d^2}{dx^2} e^{ik|x|} = \frac{d}{dx}(ike^{ik|x|} \text{sign}(x)) = -k^2 e^{ik|x|} + 2ik\delta(x)$$

From this we can obtain the fundamental solution of 1D Helmholtz equation:
$$\frac{d^2}{dx^2} e^{ik|x|} + k^2 e^{ik|x|} = 2ik\delta(x)$$
## Sommerfeld Integral Path

**Jordan Lemma:** Let $f(z)$ be a complex function, and $a > 0$ be a positive number. If $f(z)$ is continuous on the upper half plane $\text{Im}(z) \geq 0$ and $|f(z)| \leq M_R$ for $z \in C_R$, then:

$$\int_{C_R} f(z) e^{iaz} dz \leq \frac{\pi}{a} M_R$$

where $C_R$ is the semi-circle $|z| = R$ in the upper half plane.

**Corollary (Jordan Lemma for Lower Half Plane):** Let $f(z)$ be a complex function, and $a < 0$ be a negative number. If $f(z)$ is continuous on the lower half plane $\text{Im}(z) \leq 0$ and $|f(z)| \leq M_R$ for $z \in C_R$, then:

$$\int_{C_R} f(z) e^{iaz} dz \leq \frac{\pi}{|a|} M_R$$

where $C_R$ is the semi-circle $|z| = R$ in the lower half plane.

**Weyl Identity** ([note](https://engineering.purdue.edu/wcchew/ece604f19/Lecture%20Notes/Lect35.pdf)):

$$\frac{e^{ik_0 r}}{r} = \frac{i}{2\pi} \int_{\mathbb{R}^2} dk_x dk_y \frac{e^{ik_x x + ik_y y + ik_z |z|}}{k_z}$$

where $k_z = \sqrt{k_0^2 - k_x^2 - k_y^2}$.
