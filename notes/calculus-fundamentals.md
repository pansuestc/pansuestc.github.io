# Calculus Fundamentals

## Derivatives

The derivative of a function $f(x)$ at point $x$ is defined as:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

### Basic Derivative Rules

1. **Power Rule**: $\frac{d}{dx}[x^n] = nx^{n-1}$
2. **Product Rule**: $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$
3. **Chain Rule**: $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$

### Example: Finding the derivative of $f(x) = x^3 + 2x^2 - 5x + 1$

Using the power rule:
$$f'(x) = 3x^2 + 4x - 5$$

## Integrals

The integral is the inverse operation of differentiation:

$$\int f(x) dx = F(x) + C$$

where $F'(x) = f(x)$ and $C$ is the constant of integration.

### Fundamental Theorem of Calculus

$$\int_a^b f(x) dx = F(b) - F(a)$$

### Common Integrals

- $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ (for $n \neq -1$)
- $\int e^x dx = e^x + C$
- $\int \sin(x) dx = -\cos(x) + C$
- $\int \cos(x) dx = \sin(x) + C$

## Applications

Calculus has numerous applications in:
- Physics (motion, optimization)
- Economics (marginal analysis)
- Engineering (control systems)
- Computer Science (algorithms, machine learning)