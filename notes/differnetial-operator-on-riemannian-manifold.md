
***

The notes derive the general formula(in local coordinates) for the curl, div and Lapace operaotr on a 3-dimensional Riemannian manifold.

### Introduction

The starting point is the generalized Stokes' theorem:
$$ \int_{\Sigma} \langle \mathrm{curl} X, N \rangle_g dA = \int_{\partial \Sigma} \langle X, T \rangle_g ds $$
The goal is to find a coordinate-based expression for $\text{curl} X$. The derivation is based on the relationship $\text{curl} X = \beta^{-1}(d(X^♭))$.

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
$$ \beta(X) = \sqrt{|g|}(X^1 dx^2 \wedge dx^3 - X^2 dx^1 \wedge dx^3 + X^3 dx^1 \wedge dx^2)  $$
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

By the definition of divergence operator,
 $$\text{div}X=*^{-1}d\beta(X)=\frac{1}{\sqrt{|g|}}\frac{\partial}{\partial x^i}(\sqrt{g}X^i)$$
and 
$$\text{grad}f=(df)^\#=g^{ij}\frac{\partial f}{\partial x^i}\frac{\partial}{\partial x^{j}}$$
Then by compositing the above operator, we can derive the second order Laplace operator
$$\Delta f=\text{div}\text{grad}f=\frac{1}{\sqrt{|g|}}\frac{\partial}{\partial x^i}(\sqrt{g}g^{ij}\frac{\partial f}{\partial x^j})$$
### Remark: Euclidean Space

For Euclidean space, the metric tensor is the identity matrix, $g_{ij} = \delta_{ij}$, and its determinant is $|g|=1$. The formula simplifies significantly:
$g_{ij}X^j = \delta_{ij}X^j = X^i$.

Substituting this into the general formula yields:
$$ \mathrm{curl} X = \left(\frac{\partial X^3}{\partial x^2} - \frac{\partial X^2}{\partial x^3}\right)\frac{\partial}{\partial x^1} + \left(\frac{\partial X^1}{\partial x^3} - \frac{\partial X^3}{\partial x^1}\right)\frac{\partial}{\partial x^2} + \left(\frac{\partial X^2}{\partial x^1} - \frac{\partial X^1}{\partial x^2}\right)\frac{\partial}{\partial x^3} $$
which is the classical definition of the curl operator.
### Vector Calculus in Matrix Form

If we write vector calculus in matrix form, the curl operator $\nabla\times$ acting on a vector field in `ℝ³` can be represented by the following matrix of differential operators:

$$ \nabla\times = \begin{pmatrix} 0 & -\partial_{x_3} & \partial_{x_2} \\ \partial_{x_3} & 0 & -\partial_{x_1} \\ -\partial_{x_2} & \partial_{x_1} & 0 \end{pmatrix} $$

The operator $\nabla\times\nabla\times$ is then the matrix product of $\nabla\times$ with itself:
$$ \nabla\times\nabla\times = \begin{pmatrix} -\partial_{x_2}^2 - \partial_{x_3}^2 & \partial_{x_1 x_2}^2 & \partial_{x_1 x_3}^2 \\ \partial_{x_2 x_1}^2 & -\partial_{x_1}^2 - \partial_{x_3}^2  & \partial_{x_2 x_3}^2 \\ \partial_{x_3 x_1}^2 & \partial_{x_3 x_2}^2 & -\partial_{x_1}^2 - \partial_{x_2}^2 \end{pmatrix} $$

And we denote the vector Laplacian $\bar{\Delta}$ as the diagonal matrix with the scalar Laplacian `Δ` on the diagonal:
$$ \bar{\Delta} = \begin{bmatrix} \Delta & & \\ & \Delta & \\ & & \Delta \end{bmatrix} $$
Then we have the well-known vector calculus identity:
$$ \bar{\Delta} + \nabla\times\nabla\times = \nabla\nabla\cdot $$
This is an important formula. *(Note: `∇∇·` represents the `grad-div` operator.)*

Our question is, when this operator are defined in Riemannian Manifold(we fix the dimension $n=3$), is this  formula still correct? Recall that in Riemannian Manifold with metric $g$,
 $$\text{div}X=*^{-1}d\beta(X)=\frac{1}{\sqrt{|g|}}\frac{\partial}{\partial x^i}(\sqrt{g}X^i)$$
and 
$$\text{grad}f=(df)^\#=g^{ij}\frac{\partial f}{\partial x^i}\frac{\partial}{\partial x^{j}}$$
$$\Delta f=\text{div}\text{grad}f=\frac{1}{\sqrt{|g|}}\frac{\partial}{\partial x^i}(\sqrt{g}g^{ij}\frac{\partial f}{\partial x^j})$$
$$
\begin{aligned}
\mathrm{curl} X = \beta^{-1}(d(X^\flat))=\frac{1}{\sqrt{|g|}} \bigg\{ & \left(\frac{\partial}{\partial x^2}(g_{i3}X^i) - \frac{\partial}{\partial x^3}(g_{i2}X^i)\right) \frac{\partial}{\partial x^1} \\
& + \left(\frac{\partial}{\partial x^3}(g_{i1}X^i) - \frac{\partial}{\partial x^1}(g_{i3}X^i)\right) \frac{\partial}{\partial x^2} \\
& + \left(\frac{\partial}{\partial x^1}(g_{i2}X^i) - \frac{\partial}{\partial x^2}(g_{i1}X^i)\right) \frac{\partial}{\partial x^3} \bigg\}
\end{aligned}
$$

### Helmholtz Equation and Green's Function

Next, we consider the expression $\partial_{n_x} \partial_{n_y} G(x,y)$, where `G` is the Green's function of the Helmholtz equation.

Direct computation yields:
$$
\begin{aligned}
\partial_{n_x} \partial_{n_y} G(x,y) &= \nabla_x (\nabla_y G\cdot n_y) \cdot n_x \\
&= -(n_y^T \nabla_y^2 G) \cdot n_x \quad \textit{By } \nabla(A\cdot B) = B^T\nabla A + A^T\nabla B \\
&= -(n_y^T (\bar{\Delta} + \nabla_y \times \nabla_y \times) G) \cdot n_x \quad \text{(Here the matrix with scalar are element by element)} \\
&= k^2 n_x \cdot n_y G - n_y^T (\nabla_y \times \nabla_y \times) G \cdot n_x \\
&= k^2 n_x \cdot n_y G - n_y^T \nabla_y \times (\nabla_y  G \times n_x) \\
&= k^2 n_x \cdot n_y G + n_y^T \nabla_y \times (\nabla_x G \times n_x)
\end{aligned}
$$


Thus, by Stoke's formula, we have:
$$
\begin{aligned}
\mathcal{N}\varphi &:= \int_{\Gamma} \partial_{n_x} \partial_{n_y} G(x,y) \varphi(y) dS_y \\
&= k^2 \int_{\Gamma} G(x,y) (n_x \cdot n_y) \varphi(y) dS_y +  \int_{\Gamma} n_y^T \nabla_y \times (\nabla_x G \times n_x) \varphi(y) dS_y \\
&= k^2 \int_{\Gamma} G(x,y) (n_x \cdot n_y) \varphi(y) dS_y + \int_{\Gamma} \overrightarrow{\text{curl}}_{\Gamma_x} G \cdot \overrightarrow{\text{curl}}_{\Gamma_y} (\varphi(y)) dS_y
\end{aligned}
$$

Here is a transcription of the handwritten notes in Markdown format. The notes define and use formulas for the surface curl.

***

### Some useful formula.

Let $v \in C^\infty(M)$, $d \in (C^\infty(M))^3$.

Define the surface curl for a vector field $\alpha$ (scalar result) and a scalar field $v$ (vector result):
$$ \mathrm{curl}_\Gamma \, \alpha = (\nabla \times \alpha) \cdot n, \quad \overrightarrow{\mathrm{curl}_\Gamma} \, v = n \times \nabla v. $$

Then:
#### ①
$$
\begin{aligned}
\mathrm{curl}_{\Gamma_x} (v(x,y) \alpha(y)) &= \nabla_x \times (v \alpha) \cdot n_x \\
&= (\nabla_x v \times \alpha + v \nabla_x \times \alpha) \cdot n_x \\
&= (\nabla_x v \times \alpha) \cdot n_x \\
&= (n_x \times \nabla_x v) \cdot \alpha
\end{aligned}
$$

#### ②
Consider a diagonal matrix $D = \mathrm{diag}\{d_1(x_2), d_2(x_1), d_3(x_1)\}$.
*(Note: The arguments of the functions $d_i$ are transcribed as they appear but may contain typos in the original note.)*

Then,
$$
\begin{aligned}
\mathrm{curl}_{\Gamma_x}(v D \alpha) &= \nabla \times (v D \alpha) \cdot n \\
&= (\nabla v \times D \alpha) \cdot n + v (\nabla \times (D \alpha)) \cdot n \\
&= D\alpha \cdot (n \times \nabla v) + v( (\nabla \times D)\alpha + \sum \nabla d_i \times A_i) \cdot n \\
&= D\alpha \cdot (n \times \nabla v) + v( (\nabla \times D)\alpha ) \cdot n
\end{aligned}
$$
*(Note: The expansion for $\nabla \times (D\alpha)$ uses non-standard notation and identities.)*

Since 
$$ \nabla \times D = \nabla \times 
\begin{bmatrix} d_1(x_1) & & \\& d_2(x_2) & \\& & d_3(x_3) 
\end{bmatrix} = 0 $$
we have
$$ \mathrm{curl}_{\Gamma_x}(v D \alpha) = D\alpha \cdot (n_x \times \nabla_x v) $$
