---
layout: post
title: "Kolmogorov backward equation"
subtitle: "Green function and Fokker-Planck equation"
date: 2023-10-16 21:51:21 +0530
tags: [stochastic]
---

> This series of notes is based on a comparison of stochastic processes in physics and mathematics, during my study of PHYS243M (Nonequilibrium Statistical Mechanics in Complex Systems) by Prof. Shenshen Wang at UCLA.
> The result derived in this note is useful for deriving the mean first passage time (MFPT) of a stochastic differential equation (SDE).


Formally, Kolmogorov backward equation is identical to adjoint Fokker-Planck equation. However, they bear different interpretations.

We begin with the Heisenberg picture introduced in [A note on Langevin Equations and Stochastic Differential Equations](/blog/a-note-on-lange.html), i.e., adjoint Fokker-Planck equation with respect to a test function $u_0=u$.
Abstractly, $u_t$ and $\rho_t$, PDF of $X_t$ satisfy the following equations

$$
\partial_{t}u_t = \mathcal{L}^* u_t, \quad \partial_{t} \rho_t = \mathcal{L} u_t.
$$

Consider the green function $\mathcal{G}_t(x,x')$ such that

$$
\rho_t(x) = \int_{x'} \mathcal{G}_t(x,x') \rho_0(x')\mathrm{d} x'.
$$

Then, we have

$$
\begin{aligned}
\langle u_t, \rho_0 \rangle = \langle u, \rho_t \rangle &= \big\langle u(x), \langle \mathcal{G}_t(x, x'), \rho_0(x') \rangle \big\rangle\\
&= \left\langle \langle u(x), \mathcal{G}_t(x,x') \rangle, \rho_0(x')  \right\rangle
.
\end{aligned}
$$

Comparing LHS and RHS, we have

$$
u_t(x) = \int_{x'} u(x') \mathcal{G}_t(x',x) \mathrm{d} x'
$$

Apply $\partial_{t}$ and $\mathcal{L}^*$ respectively to above equation to obtain

$$
\begin{aligned}
\int_{x'} u(x') \mathcal{L}_{(x')} \mathcal{G}_t(x',x) \mathrm{d} x' &=
\int_{x'} u(x') \mathcal{L}_{(x)}^* \mathcal{G}_t(x',x) \mathrm{d} x'
\end{aligned}
\quad\forall  u.
$$

Since choice of $u$ is arbitrary, it entails that

$$
\mathcal{L}_{(x_t)} \mathcal{G}_t (x_t,x_0) = \mathcal{L}_{(x_0)}^* \mathcal{G}_t(x_t,x_0).
$$

Specifically, $\mathcal{G}_t$ satisfies the following equation:

$$
\partial_{t} \mathcal{G}_t(x_t,x) = \mathcal{L}^*_{(x)}  \mathcal{G}_t(x_t,x).
$$

With $x_t$ considered as a constant, this is more generally known as Kolmogorov backward equation.

At this moment, we shall see that both forward and backward equation characterize (different aspects of) the Green function, or probability evolution operator $\mathcal{G}_t$.