---
layout: post
title: "Work theorem from the martingale perspective"
date: 2024-06-05 17:30:00 +0530
tags: [dynamics]
---
Alternative proof to ([Manzano 2021](https://doi.org/10.1103/PhysRevLett.126.080603)) without the use of fluctuation theorem/stochastic entropy production/path integral formulation.

In the overdamped Langevin equation, let the SDE be
$$
\gamma \mathrm{d} x=-H_x(x,t) \mathrm{d} t+\sqrt{\frac{2 \gamma}{\beta}} \mathrm{d}  B_t.
$$
The corresponding Fokker-Planck equation would be
$$
\rho_t  =\frac{1}{\gamma}\left[H_{x x} \rho+H_{x }{\rho_x}\right]+\frac{1}{\beta \gamma} \rho_{x x}
$$
in the 1D setting.

Let $\psi(x,t)$ be any solution to the following PDE:
$$
-\psi_t=\frac{1}{\gamma}\left[H_{x x} \psi+H_x \psi_x\right]+\frac{1}{\beta \gamma} \psi_{x x}.
$$
For example, $\psi(x,t) = \rho(x,t'-t)$.

We divide the whole system to three parts, the interior (object of interest, whose position tracked by $x$), the environment (of temperature $T$ and driving the movement of $x$ stochastically), the external field (providing a time dependent potential $H(x,t)$).

In the previous studies, the work done from the exterior to the system is given by $W = \int_0^t H_t(x(s),s)\mathrm{d}s$, where $x(s)$ is a sample trajectory of the system.  The part of work that drives the movement of the particle $\int_0^t H_x(x(s),s)\mathrm{d}x(s)$ is dissipated into the environment and is not considered to be "useful".

Another hard question is on how to define a trajectory-wise entropy. The choice here is to set as
$$
S(x(t)) = \rho(x,t).
$$

> First proposed by Udo Seifert in 2005 @Seifert2005July.

We consider the following derived stochastic process
$$
\tilde{A}(t) = -\beta \int_0^t H_t(x(s), s) d s+\beta \Delta H(x(t), t)+ \Delta \ln (\psi(x(t), t)) .
$$
We apply Ito formula to find $\mathrm{d}\tilde{A}$ as follows
$$
\begin{aligned}
 d \tilde{A}=&\underline{-\beta H_t(x(t), t) \mathrm{d}t}+\underline{\beta H_t(x(t),t)\mathrm{d}t}+\beta H_x \mathrm{d} x+\frac{1}{2} \beta H_{x x}\mathrm{d}x^2 \\
 &\quad+\frac{\psi_t}{\psi} \mathrm{d} t+\frac{\psi_x}{\psi} \mathrm{d} x+\frac{1}{2}\left[\frac{\psi_{x x}}{\psi}-\frac{\psi_x^2}{\psi^2}\right] \mathrm{d}x^2 \\
 =&\beta H _x \mathrm{d} x+\frac{1}{2} \beta H _{xx }\mathrm{d} x^2+\frac{\psi_t}{\psi} \mathrm{d} t+\frac{\psi_x}{\psi} \mathrm{d} x+\frac{1}{2}\left[\frac{\psi_{ x x}}{\psi}-\frac{\psi_x^2}{\psi^2}\right] \mathrm{d} x^2 \\
\end{aligned}
$$
We have
$$
\mathrm{d} x=-\frac{H_x}{\gamma} \mathrm{d} t+\frac{1}{\sqrt{\gamma \beta / 2}} \mathrm{d} B_t, \quad \mathrm{d} x^2=\frac{2}{\gamma \beta} \mathrm{d} t.
$$
Now, insert the expressions into $\mathrm{d}\tilde{A}$, we have
$$
\begin{aligned}
 \mathrm{d} \tilde{A}=&-\frac{\beta H_x^2}{\gamma} \mathrm{d} t+\frac{\beta H_x}{\sqrt{\gamma \beta / 2}} \mathrm{d} B_t+\frac{H_{x x}}{\gamma} \mathrm{d} t+\frac{\psi_t}{\psi} d t-\frac{\psi_x H_x}{\psi \gamma} \mathrm{d} t \\
& +\frac{\psi_ x / \psi}{\sqrt{\gamma \beta /{2}}} \mathrm{d}B _t+\frac{1}{\gamma \beta}\left[\frac{\psi_{x x }}{\psi}-\frac{\psi_x^2}{\psi^2}\right] \mathrm{d} t \\
&
\end{aligned}
$$
We next substitute $\psi_t$ according to the definition
$$
\frac{\psi_t}{\psi}=-\frac{1}{\gamma}\left[H_{xx}+H _x\frac{\psi_x}{\psi}\right]-\frac{1}{\beta \gamma} \frac{\psi_{xx}}{\psi}.
$$
$$
\begin{aligned}
    \mathrm{d}\tilde{A} &= -\frac{\beta H_x^2}{\gamma} \, \mathrm{d}t + \frac{\beta H_x}{\sqrt{\gamma \beta/2}} \, \mathrm{d}B_t + \frac{H_{xx}}{\gamma} \, \mathrm{d}t + \left(- \frac{H_{xx}}{\gamma} \, \mathrm{d}t - \frac{H _x \psi_x}{\gamma \psi} \, \mathrm{d}t - \frac{1}{\gamma \beta} \frac{\psi_{xx}}{\psi} \, \mathrm{d}t\right)
    \\
    &\quad\; \left.- \frac{\psi_x H_x}{\psi\gamma} \, \mathrm{d}t + \frac{\psi_x/\psi}{\sqrt{\gamma \beta/2}} \, \mathrm{d}B_t + \frac{1}{\gamma \beta} \frac{\psi_{xx}}{\psi} \, \mathrm{d}t  - \frac{1}{\gamma \beta} \frac{\psi_x^2}{\psi^2}\mathrm{d}t\right.\\
    &= -\left( \frac{\beta H _x^2}{\gamma} + \frac{2 H_x \psi_x}{\gamma \psi} + \frac{\psi_x^2}{\psi^2 \gamma\beta} \right) \, \mathrm{d}t + \frac{1}{\sqrt{\gamma \beta/2}}  \left(\frac{\psi_ x}{\psi}+\beta H_x \right) \, \mathrm{d}B_t.
\end{aligned}

$$

Consequently, we have
$$
\mathrm{d}\tilde{A}=-\frac{1}{\gamma \beta}\left(\frac{\psi_x}{\psi}+\beta H_x\right)^2 \mathrm{d} t+\frac{1}{\sqrt{\gamma \beta /2}}\left(\frac{\psi_ x}{\psi}+\beta H_x\right) \mathrm{d} B _t .
$$
Then, it naturally follows that
$$
\mathrm{d}\exp(\tilde{A} ) = \exp(\tilde A)\left[\mathrm{d}\tilde A + \frac{1}{2} \mathrm{d} \tilde A^2\right] = \exp(\tilde{A}) \frac{1}{\sqrt{\gamma \beta/2}} \left( \frac{\psi_x}{\psi} + \beta H_x \right)\mathrm{d}B_t
$$
$\Rightarrow$ $\exp(\tilde{A})$ is an exponential martingale.
$$
\mathbb{E}\exp(\tilde A_{t})  = \mathbb{E} \exp(\tilde{A}_0) = 1.
$$

Note that the martingale property does not depend on initial distribution of $x(0)$ or the choice of $\psi(x,t)$.
While we require that $\rho(x,0)$ to be defined. The singular case where the initial distribution is not absolutely continuous with respect to the Lebesgue measure can be thought of as a limiting case of a sequence of absolutely continuous distributions.
### Choice of $\psi(x,t)$
Intuitively, one might want to choose $\psi(x,t) = \rho(x,T-t)$. However, this choice only works when $H(t)$ is time independent. When the Hamiltonian is time dependent, this choice is incorrect, as 
$$
\frac{\mathrm{d}}{\mathrm{d}t} \rho(x, T-t) = - \rho_t(x, T-t) = \frac{1}{\gamma}\left[H_{xx}(x,T-t) \rho + H_x (x,T-t)\rho_x\right] + \frac{1}{\beta \gamma} \rho_{xx}.
$$
This is not desired.

In order to construct a proper choice of $\psi(x,t)$, we proceed as follows. First, choose a given time $T$. Let $\tilde{\rho}(x,0) = \rho(x,T)$ and $\tilde{H}(x,t) = H(x,T-t)$. Let $\tilde{\rho}(x,t)$ be the solution to the Fokker-Planck equation
$$
\tilde{\rho}_t = \frac{1}{\gamma} \left[\tilde{H}_{xx} \tilde{\rho} + \tilde{H}_x \tilde{\rho}_x\right] + \frac{1}{\beta \gamma} \tilde{\rho}_{xx}.
$$
with initial condition $\tilde{\rho}(x,0) = \rho(x,T)$.
Then, we set $\psi(x,t) = \tilde{\rho}(x,T- t)$. 


Now, we verify that $\psi(x,t)$ satisfies the PDE
$$
\begin{aligned}
-\psi_t &= \frac{1}{\gamma} \left[\tilde {H}_{xx}(x,T-t) \psi + \tilde{ H}_x(x,T-t) \psi_x\right] + \frac{1}{\beta \gamma} \psi_{xx} \\
&= \frac{1}{\gamma} \left[H_{xx}(x,t) \psi + H_x(x,t) \psi_x\right] + \frac{1}{\beta \gamma} \psi_{xx}.
\end{aligned}
$$
This is the desired result.


### Corollary
$$
\begin{aligned}
A(t)-\tilde{A}(t) &= \Delta \ln \frac{\rho(x(t),t)}{\psi(x(t), t)} \\
&=\ln \frac{\rho(x(t),t)}{\psi(x(t),t)} - \ln \frac{\rho(x(0),0)}{\psi(x(0),0)}\\
&= \ln \frac{\rho(x(t),t)}{\tilde{\rho}(x(t),T-t)} - \ln \frac{\rho(x(0),0)}{\tilde{\rho}(x(0),T)}\\
\end{aligned}
$$
>[!note]
>In the paper @Manzano2021February, the authors chose a different basis $e^{A - \ln \frac{\rho(x(t),t)}{\tilde \rho(x(t),T-t)}}$ is a martingale with nonconstant initial values. It is indeed a martingale, but the initial value is not constantly $1$. In this case, only $A(0)=\tilde {A}(0)=0$ and $e^{A(0)}=e^{\tilde A{(0)}}=1$.
>$$\mathbb{E} e^{A(0) - \ln \frac{\rho(x(0),0)}{\tilde{\rho}(x(0),T)} }= \mathbb{E}\left[\frac{\tilde\rho(x(0),T)}{\rho(x(0),0)}\right] = \int_{x(0)} \rho(x(0),0) \frac{\tilde\rho(x(0),T)}{\rho(x(0),0)} \mathrm{d} x(0) =1.$$

In particular, when $t=T$, $\tilde{\rho}(x(T),0) = \rho(x(T),T)$, then
$$
\begin{aligned}
A(T) - \tilde{A}(T) &= \ln \frac{\rho(x(T),T)}{\tilde{\rho}(x(T),0)} - \ln \frac{\rho(x(0),0)}{\tilde{\rho}(x(0),T)}\\
&= \ln \frac{\rho(x(T),T)}{\rho(x(T),T)} - \ln \frac{\rho(x(0),0)}{\tilde \rho(x(0),T)}\\
&=  \ln \frac{\tilde{\rho}(x(0),T)}{\rho(x(0),0)}.
\end{aligned}
$$
We compute the expectation of $e^{A(T)}$ by conditioning on $x(0)$, since we know that $\mathbb{E}\left[e^{\tilde A(T)} \mid x(0)\right]=1$.
$$
\begin{aligned}
\mathbb{E}\left[e^{A(T)}\right] = \mathbb{E} \left[e^{\tilde A(T)} \frac{\tilde \rho(x(0),T)}{\rho(x(0),0)}\right] = \int_{x(0)} \tilde \rho(x(0),T) \mathbb{E} \left[e^{\tilde{A}(T)} \mid x(0)\right] \mathrm{d}x(0)= 1.
\end{aligned}
$$
This is the Jarzynski equality for the overdamped Langevin equation, which does not rely on the initial distribution of $x(0)$.