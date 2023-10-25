---
layout: post
title:  "A note on Langevin Equations and Stochastic Differential Equations"
date:   2023-10-15 21:21:21 +0530
tags: [stochastic]
---
> This series of notes is based on a comparison of stochastic processes in physics and mathematics, during my study of PHYS243M (Nonequilibrium Statistical Mechanics in Complex Systems) by Prof. Shenshen Wang at UCLA.
  
In physics literature, the stochastic term in the Langevin equations is often denoted as $F(t)$, which is presumably Gaussian distributed, and satisfies the following property:

$$
\langle F(t) \rangle = 0, \quad \langle F(t) F(t') \rangle = 2B \delta (t- t').
$$

For general stochastic differential equations in math community, such notations are not used. Instead, one uses the abstract symbol $\mathrm{d}W_t$, where $W_t$ represents a Wiener process, also known as the standard Brownian motion. $W_t$ is defined by the following properties:
- The trajectory of $W_t$ is continuous with probability 1.
- For given $t$, $W_t \sim \mathcal{N}(0,t)$, i.e., $W_t$ follows a Gaussian distribution with mean 0, variance $t$ (1d version).
- For any countable set ${t_0,...,t_n}$ with $t_0 < t_1 < \cdots < t_n$, $\{W_{t_i}-W_{t_{i-1}}: i\in \{ 1 ,..., N\}\}$ are independent of each other.

For the symbol $\mathrm{d} W_t$, it is only defined in the Ito integral, representing that

$$
\int_0^t X_s \mathrm{d} W_s := \lim_{N \rightarrow \infty} \sum_{i=0}^{N-1} X_{\frac{i}{N} t}(W_{\frac{i+1}{N}t} - W_{\frac{i}{N}t}).
$$

As a side note, the limit is taken in a proper $L^2$ sense.

In the following, I'll show how are these two concepts correlated, and the exact meaning of $\langle F(t)F(t') \rangle = 2B \delta(t-t')$. After that, I'll prove the Ito's formula, adjoint Fokker-Planck equation, and finally Fokker-Planck equation.

### random force $F(t)$ and standard Brownian motion $W_t$
We first take the assumption that $F(t)$ satisfies the following properties:
- $F(t)$ follows a Gaussian distribution with mean $0$,
- $\langle F(t)F(t') \rangle = \delta (t-t')$.

Then, because sums of independent Gaussian random variables are still Gaussian variables, the formal integral $W_t := \int_0^t F(t')\mathrm{d} t'$ of $F(t)$ with respect to $t$ should give another Gaussian variable with mean $0$.

Its variance is given by

$$
\langle W_t^2 \rangle = \int_0^t \langle F(s)F(s') \rangle\mathrm{d} s \mathrm{d} s' =t.
$$

In particular, we note that if $t_3 > t_2> t_1$, then

$$
\langle (W_{t_3}-W_{t_2})( W_{t_2}-W_{t_1}) \rangle = \langle \int_{t_2}^{t_3}F(s)\mathrm{d} s \int_{t_1}^{t_2} F(s')\mathrm{d} s' \rangle = 0.
$$

This observation can be generalized and validates that $W_t$ is indeed a standard Brownian motion.
In other words, the white noise is a "derivative" of the standard Brownian motion

$$
W = \int F \mathrm{d}t \leftrightarrow F(t) = \mathrm{d} W/\mathrm{d} t.
$$

### Implications of $\langle F(t)F(t') \rangle= 2B \delta(t-t')$
Suppose that

$$
X_t = X_0 + \int_0^t Y_t F_t \mathrm{d} t.
$$

Consider the $N \rightarrow +\infty$ limit of the following averaged sum:

$$
\begin{aligned}
\sum_{i=1}^{N} \langle(X_{it/N} - X_{(i-1)t/N})^2\rangle &= \sum_{i=1}^N  \int_{(i-1)t/N}^{it/N}  \langle Y_s Y_s' F(s)F(s') \rangle \mathrm{d} s \mathrm{d} s' \\
(\textrm{think of $Y_s,Y_s'$ as ``regular variables''})&\approx \sum_{i=1}^N \int_{(i-1)t/N}^{it/N} \langle Y_s^2 \rangle \mathrm{d} s\\
&= \int_0^t \langle Y_s^2 \rangle \mathrm{d} s > 0
.
\end{aligned}
$$

Then, we should expect that for each sample trajectory

$$
0 \leq \lim_{N \rightarrow \infty}\sum_{i=1}^N (X_{it/N}-X_{(i-1)t/N})^2 < +\infty,
$$

and the inequality hold with nonzero probability.

The finite, nonzero quadratic variation is a remarkable property of stochastic processes related to Brownian motion or Langevin equation. By contrast, suppose $f(t)$ is a continuously-differentiable function of $t$, then it is easy to observe that 

$$
\lim_{N \rightarrow \infty}\sum_{i=1}^N (f_{it/N}-f_{(i-1)t/N})^2 = \lim_{N \rightarrow \infty} \sum_{i=1}^N f'^2_{it/N} \frac{1}{N^2} = \lim_{N \rightarrow \infty} O(1/N) = 0.
$$

In fact, one can show that if $\langle Y_s^2 \rangle> \varepsilon$ for some $\varepsilon$ and for all $s \in [0,t]$, then $X_t$ is nowhere differentiable with probability 1. This is the reason why the math community no longer uses $F(t)$, which is supposed to be $\mathrm{d}W_t/\mathrm{d}t$ and does not exist in the usual sense (may exist in some limits, as discussed in the class).

As a fun note, this is why for drawing the trajectories of a Brownian motion particle, we better draw zig-zag patterns rather than smooth sine/cosine waves.

Speaking of experimental measurements, if we can obtain data at infinitely dense time steps, we can then quantify intrinsic noises by evaluating the growth rate of the quadratic variation over time. If the system has only extrinsic noise, and the dynamics can be described by ODE, then we will expect that the quadratic variation of the trajectory is 0. Unfortunately, noise in measurement may confound the finding.
#### Finite quadratic variation and Ito's formula
There is another interesting consequence of the finite quadratic variation property.
Let $X_t$ now be defined as the following general form:

$$
X_t - X_0 = \int_0^t v(X_s) \mathrm{d} s + \int_0^t Y_s \mathrm{d} W_s.
$$

This is slightly more general than Langevin equation in the sense that the magnitude of random force $F_t$ can be another stochastic or deterministic process, even depending on $X_t$.

And let $f(x)$ be continuously twice-differentiable, then

$$
\begin{aligned}
f(X_t) -f(X_0) =& \lim_{ N \rightarrow \infty} \sum_{i=0}^{N-1} f'(X_{it/N}) (X_{(i+1)t/N} - X_{it/N}) \\&+ \frac{1}{2}f''(X_{it/N})(X_{(i+1)t/N} - X_{it/N})^2 \\&+\textrm{small remainders}
\end{aligned}
$$

The small remainders converge to $0$ as $N \rightarrow \infty$, one can observe that the first-order term converge to 

$$
\int_0^t f'(X_s) v(X_s)\mathrm{d} s +\int_0^t f'(X_s) Y_s \mathrm{d} W_s.
$$

On the other hand, the second-order term will go to

$$
\frac{1}{2} \int_0^t f''(X_s) Y_s^2 \mathrm{d}s.
$$

Hence, we have

$$
f(X_t) - f(X_0) = \int_0^t \left[f'(X_s) v(X_s) + \frac{1}{2} f''(X_s) Y_s^2\right]\mathrm{d} s + \int_0^t f'(X_s) Y_s \mathrm{d}W_s.
$$

This equation is known as the Ito formula. Please note the emergence of $\frac{1}{2}$ factor.
In averaged differential form:

$$
\partial_{t}\langle f(X_s) \rangle = \left\langle f'(X_s)v(X_s) + \frac{1}{2}f''(X_s) Y_s^2 \right\rangle = \int\left( f'(x)v(x) + \frac{1}{2} f''(x) \sigma^2(x,s)\right) \rho(x)\mathrm{d}x
$$

The last equation assumes that $Y_s = \sigma(X_s,s)$.
### Heisenberg picture
For the general form

$$
X_t - X_0 = \int_0^t v(X_s) \mathrm{d} s + \int_0^t Y_s \mathrm{d} W_s ~\Leftrightarrow ~\frac{\mathrm{d} X_t}{\mathrm{d} t} = v(X_t) + Y_t \frac{\mathrm{d} W_t}{\mathrm{d}t},
$$

we assume in addition that $Y_t$ only depends on $X_t$ and $t$, denoted as

$$
Y_t = \sigma(X_t,t).
$$

In the Heisenberg picture, the random variable $X_0$ is a constant (does not evolve over time), and the operator $f$ itself evolves over time.
In this picture, we write $f(x,t)=f_t(x)$ with $f_0(x)=f(x)$, and use the following notation

$$
\langle f_t,X_0 \rangle = \langle  f_0, X_t \rangle := \langle  f(X_t) \rangle = \int f(x) \rho_t(x)\mathrm{d} x.
$$

Per the Ito's formula, we already know that (with change-of-variable trick to shift time at $0$ and $t$.)

$$
\langle  \partial_{t} f_t, x_0 \rangle = \int \left( f_t'(x)v(x) + \frac{1}{2}f_t''(x)\sigma_s^2\right)\rho_0(x)\mathrm{d} x =\langle (\partial_{x}f_t) v+ \frac{1}{2}\partial_{x}^2 f_t \cdot y_s^2, X_0 \rangle.
$$

Then, we obtained the evolution of the operator $f(x,t)$ as

$$
\partial_{t} f = v \partial_{x}f + \frac{1}{2} \sigma_s^2 \partial_{x}^2 f.
$$
This is known as the adjoint Fokker-Planck equation in some literature.

### Schrodinger picture (Fokker-Planck equation)
Now that we have the adjoint formulation, to obtain the Fokker-Planck equation, we only need to use some simple duality tricks.

We write the form $\langle f, X \rangle$ equivalently as $\langle f, \rho \rangle$, where $\rho$ is the probability density function of $X$.
By definition, we have

$$
\int\left( f'(x)v(x) + \frac{1}{2}f''(x)\sigma_s^2\right)\rho(x)\mathrm{d} x=\langle  \partial_{t}f, \rho  \rangle = \langle  f, \partial_{t} \rho \rangle.
$$

In order to format the LHS to the form of $\int \mathcal{L}(\rho)(x) f(x)\mathrm{d} x$, we use integral by parts.

$$
\langle f', v \rho \rangle = - \langle f, (v \rho)' \rangle, \quad \frac{1}{2}\langle f'',\sigma^2 \rho \rangle  = \frac{1}{2} \left\langle  f, (\sigma^2 \rho)'' \right\rangle.
$$

Consequently, we arrived at the Fokker-Planck equation

$$
\partial_{t} \rho = - \partial_{x} (v \rho) + \frac{1}{2} \partial_{x}^2(\sigma^2 \rho).
$$

It is straightforward to generalize this equation to higher dimensions.

The two forms of Fokker-Planck equations are adjoint to each other with respect to the bracket. However, they are not identical. In other words, the Fokker-Planck equation is not self-adjoint.

>Note that we don't need the adjoint Fokker-Planck equation to derive FP equation. Just use the following relation from Ito's formula
>$$\langle f, \partial_{t}\rho \rangle = \partial_{t} \langle f(\rho_t) \rangle = \int\left( f'(x)v(x) + \frac{1}{2}f''(x)\sigma_s^2\right)\rho(x)\mathrm{d} x$$
>and proceed with the integral by parts technique. 
