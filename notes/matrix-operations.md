# Matrix Operations Tutorial

## Introduction

Matrices are rectangular arrays of numbers that are fundamental in linear algebra and many applications.

## Basic Definitions

A matrix $A$ of size $m \times n$ has $m$ rows and $n$ columns:

$$A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}$$

## Matrix Addition

Two matrices of the same size can be added element-wise:

$$C = A + B \Rightarrow c_{ij} = a_{ij} + b_{ij}$$

**Example:**
$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} + \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} = \begin{pmatrix} 6 & 8 \\ 10 & 12 \end{pmatrix}$$

## Matrix Multiplication

For matrices $A$ (size $m \times p$) and $B$ (size $p \times n$):

$$C = AB \Rightarrow c_{ij} = \sum_{k=1}^{p} a_{ik}b_{kj}$$

**Example:**
$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$$

### Properties of Matrix Multiplication

1. **Associative**: $(AB)C = A(BC)$
2. **Distributive**: $A(B + C) = AB + AC$
3. **Not Commutative**: $AB \neq BA$ in general

## Special Matrices

### Identity Matrix
$$I_n = \begin{pmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1
\end{pmatrix}$$

Property: $AI = IA = A$ for any compatible matrix $A$.

### Transpose
The transpose of matrix $A$ is denoted $A^T$ where $(A^T)_{ij} = A_{ji}$.

### Inverse Matrix
For a square matrix $A$, if there exists a matrix $A^{-1}$ such that:
$$AA^{-1} = A^{-1}A = I$$

then $A^{-1}$ is called the inverse of $A$.

## Determinant

For a $2 \times 2$ matrix:
$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

For larger matrices, use cofactor expansion:
$$\det(A) = \sum_{j=1}^n (-1)^{i+j} a_{ij} M_{ij}$$

where $M_{ij}$ is the $(i,j)$ minor.

## Eigenvalues and Eigenvectors

For a square matrix $A$, if there exists a non-zero vector $\mathbf{v}$ and scalar $\lambda$ such that:
$$A\mathbf{v} = \lambda\mathbf{v}$$

then $\lambda$ is an eigenvalue and $\mathbf{v}$ is the corresponding eigenvector.

To find eigenvalues, solve the characteristic equation:
$$\det(A - \lambda I) = 0$$

## Applications

1. **Computer Graphics**: Transformations (rotation, scaling, translation)
2. **Machine Learning**: Data representation, PCA
3. **Physics**: Quantum mechanics, mechanics
4. **Economics**: Input-output models
5. **Engineering**: Control systems, signal processing

## Computational Complexity

- Matrix addition: $O(mn)$
- Matrix multiplication: $O(mnp)$ naive, $O(n^{2.376})$ with current best algorithms
- Matrix inversion: $O(n^3)$ using Gaussian elimination
- Determinant: $O(n^3)$ using LU decomposition

## Python Example

```python
import numpy as np

# Create matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Operations
C = A + B          # Addition
D = A @ B          # Multiplication
A_inv = np.linalg.inv(A)  # Inverse
det_A = np.linalg.det(A)  # Determinant
eigenvals, eigenvecs = np.linalg.eig(A)  # Eigenvalues/vectors
```