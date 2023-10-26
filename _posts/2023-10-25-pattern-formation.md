---
layout: post
title: "PHYS243M Pattern formation"
date: 2023-10-25 21:51:21 +0530
tags: [dynamics]
---
> This series of notes is based on a comparison of stochastic processes in physics and mathematics, during my study of PHYS243M (Nonequilibrium Statistical Mechanics in Complex Systems) by Prof. Shenshen Wang at UCLA.


Turing pattern (1952) "The Chemical Basis of Morphogenesis" for developmental biology.

Morphogenesis is a wide category of biological processes during the development of an individual. It guides the cells and organisms to differentiate according to their discrepancy in spatial locations, such as digit formation. Well studied examples include Wnt signaling pathway and Hedgehog signaling pathway.

- Initial condition: homogeneous equation at the beginning. 
	- Stable against homogeneous perturbation.
		- homogeneous perturbation: $u(\delta) = u_0 + \delta u$ where $u_0$ and $\delta u$ is translation invariant.
- Need interactions between at least two species.


### Settings
Consider a two species system $u$ and $v$,

$$
\begin{equation}
\begin{aligned}
\partial_{t} u &= D_u \Delta u+ f(u,v),\\
\partial_{t} v &= D_v \Delta u + g(u,v).
\end{aligned}\tag{1}
\end{equation}
$$

Space coordinate: $x \in \mathbb{R}^n$
#### Derivation of diffusion equation
One can start from the classical phenomenological Fick's law: flux $J_u = D_u \nabla u$.
Then by the conservation law (Liouville equation), we have

$$
\partial_{t} u = \nabla \cdot J_u
$$

Alternatively, one can consider large number $N$ of identical particles distributed in a container $V$. They follow the damped Langevin dynamics, such that they are completely independent of each other and have no interactions at all. For a fixed "small" volume $\Delta V$, we have

$$
\int_{\Delta V}u(x) \mathrm{d} x \approx \# \text{ of particles in } \Delta V \approx N \int_{\Delta V} \rho(x)\mathrm{d} x + \text{fluctuations}.
$$
On the right hand side, $\rho$ represents the probability density and on the left hand side, $u$  represents the concentration.

If $\Delta V$ is "macroscopically" small and "microscopically" large, such that the fluctuations vanish due to the law of large numbers. Then we have the following relation:

$$
u = N \rho.
$$

Now it is no coincidence that the diffusion equation coincides with the Fokker-Planck equation of the damped Langevin equation.

>Specifically, the assumption of independence and no interaction is usually understood in the macroscopic scale as the ***dilute solution assumption***.

#### Linear/Local stability analysis of reaction-diffusion equations
Usually, reaction-diffusion is nonlinear due to the potential chemical reaction terms $f$ and $g$. When A. Turing wrote the paper, inability to computationally explore the solution to the reaction diffusion system makes an analytical approach necessary.

The basic elements of an analytical treatment includes the following:
- Linearization near steady states.
- Reduction to classically solved models and considering only special solutions.
- Separation of scale in terms of "interior" and "boundary layer".
	- Within the "interior" domain, $x$ is allowed to range for the whole space $\mathbb{R}^{d}$ to simplify the discussion.


##### Linearization
Let $u_0$ and $v_0$ be the homogeneous steady state to the reaction diffusion equation and consider perturbation of the form:

$$
u= u_0 + \delta \mu, \quad v = v_0 + \delta \nu.
$$

$\delta \rightarrow 0$ indicates a small quantity. $\mu(x,t)$ and $\nu(x,t)$ represents the first order perturbation to $u_0$ and $v_0$.

Substitute $u=u_0+ \delta \mu$ and $v = v_0 + \delta \nu$ into the reaction diffusion equation and collect the $O(\delta)$ terms to obtain

$$
\begin{equation}
\begin{aligned}
\partial_{t} \mu &=  D_u  \Delta\mu + \partial_{u}f  \mu + \partial_{v} f  \nu,\\
\partial_{t} \nu &= D_{u} \Delta \nu + \partial_{u}g \mu + \partial_{v} g  \nu
.
\end{aligned}\tag{2}
\end{equation}
$$

Here, the derivatives $\partial_{u}f$, $\partial_{v}f$, $\partial_{u}g$, $\partial_{v}g$ are all constants taking values at $(u_0,v_0)$ and will be abbreviated as $f_u, f_v, g_u, g_v$ in short.

Only consider the "interior" domain for generality, where $x \in \mathbb{R}^d$. Apply Fourier transform over the space coordinate $x$ to obtain 

$$
\partial_t\left[\begin{array}{c}
\tilde{\mu} \\
\tilde{\nu}
\end{array}\right]=\left[\begin{array}{cc}
-D_u\left\|k^2\right\|+f_u & f_v \\
g_u & -D_v\left\|k^2\right\|+g_v
\end{array}\right]\left[\begin{array}{l}
\tilde\mu \\
\tilde\nu
\end{array}\right] ,
$$
where $k \in \mathbb{R}^d$ is the frequency vector and $\|k^2\|=\sum_{i=1}^d k_i^2$.

Note that $\tilde \mu$ and $\tilde v$ are functions depending on $k$ and $t$. In other words, the Fourier-transformed equation above is a first-order PDE and can be readily solved by the method of characteristics. In particular, the characteristic lines corresponding to different frequencies $k$ does not cross over. It suffices to evaluate the behavior of $\tilde\mu$ and $\tilde v$ starting from an *arbitrarily* fixed $k$.

With that, the behavior of $\tilde \mu$ and $\tilde \nu$ is characterized by the corresponding eigenvalues $\lambda_i$, $(\mu_i, \nu_i)$ satisfying 

$$
0= \begin{pmatrix}
- k ^2 D_u + f_u - \lambda_i & f_v\\
g_u & - k^2 D_{v} + g_v - \lambda_i
\end{pmatrix}
\begin{pmatrix}
\mu_i\\ 
\nu_i
\end{pmatrix}.
$$

For the emergence of nontrivial patterns, we require the following conditions:
- When $D_u=D_v=0$, $\operatorname{Re}\lambda_i < 0$ for $i=1,2$ and for all values of $k$.
- When $D_u>0$, $D_v >0$, for some value of $k$, and for some value of $i$, $\operatorname{Re} \lambda_i > 0$.

The characterization above amounts to the following conditions:
$$
f_u + g_v < 0, \quad f_u g_v - f_v g_u >0, \quad D_u g_v + D_v f_u > 0.
$$
WLOG, assume $g_v < 0$ ($v$ called inhibitor), then $f_u > 0$ and $D_v > D_u$. Intuitively, the inhibitor has to diffuse faster than the other one.

Two paradigms are the activation-inhibition network and activation-depletion network.

Note that the analysis above suggests existence of alternative attractor, either another steady state, or more complex patterns such as oscillations and chaos. In most cases, they can only be observed numerically.