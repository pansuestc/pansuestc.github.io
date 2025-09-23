Here is a transcription of the handwritten notes in Markdown format, with mathematical expressions rendered in LaTeX.

***

The notes derive the general formula for the curl of a vector field on a 3-dimensional Riemannian manifold.

### Introduction

The starting point is the generalized Stokes' theorem:
$$ \int_{\Sigma} \langle \mathrm{curl} X, N \rangle dA = \int_{\partial \Sigma} \langle X, T \rangle ds $$
The goal is to find a coordinate-based expression for `curl X`. The derivation is based on the relationship `curl X = β⁻¹(d(X♭))`.

### Derivation

Let $X$ be a vector field, $X = X^i \frac{\partial}{\partial x^i}$.
Its corresponding 1-form (covector field) is obtained via the musical isomorphism "flat" (♭):
$$ X^\flat = g_{ij} X^j dx^i $$

We define a map $\beta$ which relates vector fields to 2-forms. This map is the interior product with the volume form $dV_g = \sqrt{|g|} dx^1 \wedge \dots \wedge dx^n$:
$$
\begin{aligned}
\beta(X) &= X \rfloor dV_g = \left( \sum_i X^i \frac{\partial}{\partial x^i} \right) \rfloor \left( \sqrt{|g|} dx^1 \wedge \dots \wedge dx^n \right) \\
&= \sum_i (-1)^{i-1} X^i \sqrt{|g|} \; dx^1 \wedge \dots \wedge \widehat{dx^i} \wedge \dots \wedge dx^n
\end{aligned}
$$
where $\widehat{dx^i}$ denotes that the term is omitted.

For the 3-dimensional case ($n=3$):
$$ \beta(X) = (X^1 dx^2 \wedge dx^3 - X^2 dx^1 \wedge dx^3 + X^3 dx^1 \wedge dx^2) \sqrt{|g|} $$
The map $\beta: \mathfrak{X}(M) \to \Lambda^2(M)$ is defined on a manifold where $\dim(\mathfrak{X}(M)) = 3$.

Since $\beta(X)=0 \iff X=0$, the map $\beta$ is injective. Because the domain and codomain have the same dimension, $\beta$ is a bijection. This allows us to define its inverse, $\beta^{-1}$.

### Definition of Curl

The curl is defined using the exterior derivative ($d$) of the 1-form $X^\flat$:
$$ \mathrm{curl} X = \beta^{-1}(d(X^\flat)) $$
We calculate the 2-form $d(X^\flat)$:
$$
\begin{aligned}
d(X^\flat) &= d(g_{ij}X^j dx^i) \\
&= \frac{\partial}{\partial x^k}(g_{ij}X^j) dx^k \wedge dx^i
\end{aligned}
$$
Expanding this for $n=3$ and collecting terms for the basis 2-forms:
$$
\begin{aligned}
d(X^\flat) = & \left( \frac{\partial}{\partial x^2}(g_{i3}X^i) - \frac{\partial}{\partial x^3}(g_{i2}X^i) \right) dx^2 \wedge dx^3 \\
& - \left( \frac{\partial}{\partial x^1}(g_{i3}X^i) - \frac{\partial}{\partial x^3}(g_{i1}X^i) \right) dx^1 \wedge dx^3 \\
& + \left( \frac{\partial}{\partial x^1}(g_{i2}X^i) - \frac{\partial}{\partial x^2}(g_{i1}X^i) \right) dx^1 \wedge dx^2
\end{aligned}
$$
*(Note: Summation over the repeated index `i` is implied.)*

Applying the inverse map $\beta^{-1}$ (which maps $w_1 dx^2 \wedge dx^3 + w_2 dx^3 \wedge dx^1 + w_3 dx^1 \wedge dx^2$ to $\frac{1}{\sqrt{|g|}}(w_1 \frac{\partial}{\partial x^1} + w_2 \frac{\partial}{\partial x^2} + w_3 \frac{\partial}{\partial x^3})$) gives the final expression for the curl:
$$
\begin{aligned}
\mathrm{curl} X = \frac{1}{\sqrt{|g|}} \bigg\{ & \left(\frac{\partial}{\partial x^2}(g_{i3}X^i) - \frac{\partial}{\partial x^3}(g_{i2}X^i)\right) \frac{\partial}{\partial x^1} \\
& + \left(\frac{\partial}{\partial x^3}(g_{i1}X^i) - \frac{\partial}{\partial x^1}(g_{i3}X^i)\right) \frac{\partial}{\partial x^2} \\
& + \left(\frac{\partial}{\partial x^1}(g_{i2}X^i) - \frac{\partial}{\partial x^2}(g_{i1}X^i)\right) \frac{\partial}{\partial x^3} \bigg\}
\end{aligned}
$$

### Remark: Euclidean Space

For Euclidean space, the metric tensor is the identity matrix, $g_{ij} = \delta_{ij}$, and its determinant is $|g|=1$. The formula simplifies significantly:
$g_{ij}X^j = \delta_{ij}X^j = X^i$.

Substituting this into the general formula yields:
$$ \mathrm{curl} X = \left(\frac{\partial X^3}{\partial x^2} - \frac{\partial X^2}{\partial x^3}\right)\frac{\partial}{\partial x^1} + \left(\frac{\partial X^1}{\partial x^3} - \frac{\partial X^3}{\partial x^1}\right)\frac{\partial}{\partial x^2} + \left(\frac{\partial X^2}{\partial x^1} - \frac{\partial X^1}{\partial x^2}\right)\frac{\partial}{\partial x^3} $$
which is the classical definition of the curl operator.