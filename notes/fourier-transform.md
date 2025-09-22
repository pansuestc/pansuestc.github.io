# Fourier Transform Introduction

## Definition

The Fourier Transform of a function $f(t)$ is defined as:

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

The inverse Fourier Transform is:

$$f(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{i\omega t} d\omega$$

## Properties

### Linearity
If $F_1(\omega)$ and $F_2(\omega)$ are the Fourier transforms of $f_1(t)$ and $f_2(t)$ respectively, then:

$$\mathcal{F}[af_1(t) + bf_2(t)] = aF_1(\omega) + bF_2(\omega)$$

### Time Shifting
$$\mathcal{F}[f(t-a)] = e^{-i\omega a}F(\omega)$$

### Frequency Shifting
$$\mathcal{F}[e^{i\omega_0 t}f(t)] = F(\omega - \omega_0)$$

## Common Transforms

| Function $f(t)$ | Fourier Transform $F(\omega)$ |
|-----------------|-------------------------------|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{-at}u(t)$ (for $a > 0$) | $\frac{1}{a + i\omega}$ |
| $\cos(\omega_0 t)$ | $\pi[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$ |

## Applications

1. **Signal Processing**: Analyzing frequency content of signals
2. **Image Processing**: Filtering and enhancement
3. **Differential Equations**: Solving PDEs
4. **Quantum Mechanics**: Wave function analysis

## Example: Gaussian Function

For the Gaussian function $f(t) = e^{-at^2}$ where $a > 0$:

$$F(\omega) = \sqrt{\frac{\pi}{a}} e^{-\omega^2/(4a)}$$

This shows that the Fourier transform of a Gaussian is also a Gaussian!

## Discrete Fourier Transform (DFT)

For digital signals with $N$ samples:

$$X[k] = \sum_{n=0}^{N-1} x[n] e^{-i2\pi kn/N}$$

The DFT is efficiently computed using the Fast Fourier Transform (FFT) algorithm.