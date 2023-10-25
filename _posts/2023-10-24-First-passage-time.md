---
layout: post
title: "First passage time"
date: 2023-10-24 21:51:21 +0530
tags: [stochastic]
---


> This series of notes is based on a comparison of stochastic processes in physics and mathematics, during my study of PHYS243M (Nonequilibrium Statistical Mechanics in Complex Systems) by Prof. Shenshen Wang at UCLA.

>In this note, we discuss the calculation of mean first passage time to a region by a particle follows stochastic differential equation, or Langevin equation.

### Derivation via survival probability
>The general idea is that we track a system up to the moment at which the particle reaches the desired location. In mathematics, it is to "stop" a stochastic process $X_t$ with the first passage time $T$, giving rise to $X_{t\wedge T}$, $t\wedge T \equiv \min \\\{ t, T \\\}$. In this case, the Fokker-Planck equation of $X_{t\wedge T}$ behaves as if the target state is an absorbing state, i.e. absorbing boundary condition in the following.

The motion of a cloud of initial points satisfies the Fokker-Planck equation

$$
\frac{\partial P(\vec{a}, t)}{\partial t}=-\nabla_{\vec{a}} \cdot(\vec{v}(\vec{a}) P)+\nabla_{\vec{a}} \cdot \vec{B} \cdot \nabla_{\vec{a}} P \equiv \mathcal{L} P
$$

- IC. $P(\vec{a}, \theta)=\delta\left(\vec{a}-\vec{a}_0\right), \quad \vec{a}_0 \in V$
- BC. $P(\vec{a}, t)=0, \quad \vec{a} \in \partial V$ 

***Formal solution*** 

$$
P(\vec{a}, t \mid \vec{a}_0)=e^{\mathcal{L} t} \delta\left(\vec{a}-\vec{a}_0\right)
$$
with $P(\vec{a}, t \rightarrow \infty)=0$ due to absorbing B.C.

***Survival probability***

$$
S\left(t, \vec{a}_0\right)=\int_V d \vec{a} P(\vec{a}, t)
$$

***Dist. of first passage time (FPT)***

$$
\rho\left(t, \vec{a}_0\right)=-d S\left(t, \vec{a}_0\right) / d t
$$

***MFPT*** (1st moment of $\rho$)

$$
\tau\left(\vec{a}_0\right)=\int_0^{\infty} \mathrm{d} t t \underbrace{\rho\left(t, \vec{a}_0\right)}_{- \mathrm{d} S / \mathrm{d} t}=\int_0^{\infty} \mathrm{d} t S\left(t, \vec{a}_0\right)-\left.t S\right|_0 ^{\infty}\left(\textrm{using } S\left(\infty, \vec{a}_0\right)=0\right)
$$

> The advantage of this approach is that we can get a complete characterization for the distribution of waiting time. The disadvantage is that we only get the waiting time distribution for a specific initial point.

### Method of conditioning

This is an alternative method based on conditional probability or recurrence relation to calculate **mean first passage time** $\tau(\vec{a}_0)$ as a function of initial point $\vec{a}_0$. We formally write

$$
\tau\left(\vec{a}_0\right)=\int_0^{\infty} \mathrm{d} t \int_V \mathrm{d} \vec{a} P\left(\vec{a}, t \mid \vec{a}_0\right)
$$

Let $\mathcal{L}^*$ represent the dual operator of the Fokker-Planck operator $\mathcal{L}$ with respect to the inner product $\langle u, \rho \rangle=\int u \rho \mathrm{d}x$, we claim that

$$
\mathcal{L}^*_{(a_0)} P(\vec{a}, t \mid \vec{a}_0) = \mathcal{L}_{(a)}P(\vec{a},t \mid \vec{a}_0).
$$
Here, the subscripts $(a_0)$ and $(a)$ denote the variables the operator acts on.

See the note for the [Kolmogorov backward equation](/blog/Kolmogorov-backward-eq.html) for a proof on this relation.

Thus

$$
\mathcal{L}^{*} P(\vec{a}, t \mid \vec{a}_0) = \partial_{t} P(\vec{a},t).
$$
We then observe that

$$
\mathcal{L}^*  \tau(\vec{a}_0) = \int_V \mathrm{d} \vec{a}\int_0^t \mathrm{d} t \partial_{t} P(\vec{a},t \mid \vec{a}_0) = \int_V \mathrm{d} \vec{a} \left( P(\vec{a}, \infty) - P(\vec{a}_0, 0) \right) = - 1.
$$

Therefore, we have the following description of mean first passage time.

$$
\mathcal{L}^{*} \tau\left(\vec{a}_0\right)=-1, \quad \tau(\vec{a}_0)=0 ~ \forall  \vec{a}_0 \in \partial_{} V.
$$

> Note that a similar result holds for general continuous-time Markov chains.
