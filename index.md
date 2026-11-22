---
layout: default
title: Home
---

<section class="hero-wrap" aria-labelledby="hero-name">
  <div class="hero">
    <div class="hero-main">
      <div class="hero-text">
        <span class="hero-rule" aria-hidden="true"></span>
        <p class="eyebrow">Biomathematics · Southwest University</p>
        <h1 id="hero-name">Xiangting Li</h1>
        <p class="hero-lede">Stochastic processes in biological systems: how DNA and proteins interact across scales, and what nonequilibrium processes do for the cell.</p>
        <p class="hero-actions">
          <a class="btn btn-primary" href="{{ site.baseurl }}/research">Research</a>
          <a class="btn" href="{{ site.baseurl }}/publications">Publications</a>
          <a class="btn" href="{{ '/cv/' | relative_url }}">CV</a>
          <a class="btn" href="https://github.com/{{ site.github_username }}" rel="noopener">GitHub</a>
        </p>
      </div>
      <figure class="hero-plot">
        <canvas class="hero-canvas" aria-hidden="true"></canvas>
      </figure>
    </div>
  </div>
</section>

<section class="section reveal" markdown="1">

## Welcome

I'm Xiangting Li, a lecturer in the School of Mathematics and Statistics at
Southwest University. I received my Ph.D. in Biomathematics from UCLA in 2025,
where I was advised by [Tom Chou](https://www.math.ucla.edu/~tchou/index.html).
My research focuses on stochastic processes in biological systems, especially
how molecular interactions and nonequilibrium dynamics shape cellular behavior.
My dissertation is [*Stochastic Dynamics and Thermodynamics of Molecular
Interactions in the Cell*](https://escholarship.org/uc/item/7f05d5mw).

</section>

<section class="section reveal" markdown="1">

## Research highlights

<div class="feature" markdown="1">
<p class="feature-label">Mechanics of immune recognition</p>
<div markdown="1">
T-cell receptors can form catch bonds, which last longer when pulled. In
[_Newton_ (2026)](https://doi.org/10.1016/j.newton.2026.100463) we show that
catch behavior can also arise extrinsically, from the geometry of the
membrane interface: a receptor–ligand complex compressed in a narrow gap is
stabilized by a small force. Because this effect depends on gap size, bond
stiffness and receptor mobility rather than on the bond itself, it may limit
how well intrinsic bond properties discriminate ligands.
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">Kinetic proofreading</p>
<div markdown="1">
Kinetic proofreading spends energy so that cells can tell similar ligands
apart. In [_PLOS Computational Biology_ (2024)](https://doi.org/10.1371/journal.pcbi.1012183)
we compare first-passage-time and product-counting strategies in stochastic
multistep proofreading. The energy-consuming steps make the waiting time to
activation non-exponential, and this points to a generalized scheme that is
both faster and more accurate than classical proofreading.
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">Stochastic thermodynamics</p>
<div markdown="1">
I use martingale methods and Itô calculus to derive fluctuation results
without path integrals. In [_Journal of Statistical Physics_ (2025)](https://doi.org/10.1007/s10955-025-03530-w)
we prove a generalized work theorem in which the forward and backward
processes are decoupled, and a [2026 preprint](https://arxiv.org/abs/2601.12854)
extends it to stopped stochastic chemical reaction networks.
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">Learning stochastic dynamics</p>
<div markdown="1">
With Mingtao Xia and Tom Chou, I develop Wasserstein-distance losses for
learning stochastic differential equations and jump-diffusion processes from
data ([_Machine Learning_ 2025](https://doi.org/10.1007/s10994-025-06908-9);
[_MLST_ 2024](https://doi.org/10.1088/2632-2153/ad9379)), and apply neural
SDEs driven by extrinsic noise to reconstruct gene-regulation dynamics
([_PLOS Computational Biology_ 2025](https://doi.org/10.1371/journal.pcbi.1013462)).
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">DNA–protein interactions</p>
<div markdown="1">
Earlier work models how proteins share and compete for DNA and RNA: how
multiple RPA dynamics regulate Rad51 access to single-stranded DNA
([_Nature Communications_ 2023](https://doi.org/10.1038/s41467-023-39579-y)),
how remodelers disassemble nucleosomes ([_J. Chem. Phys._ 2023](https://doi.org/10.1063/5.0165136)),
and how ribosomes and RNA polymerase interact in transcription–translation
coupling ([_Biophysical Journal_ 2023](https://doi.org/10.1016/j.bpj.2022.09.041)).
</div>
</div>

</section>

<section class="section reveal" markdown="1">

## Background

My interest lies in dissecting the stochastic processes present in
biological systems, with a special emphasis on DNA-protein
interactions spanning multiple scales. My approach is a fusion of
statistical physics, mathematics, and computational techniques, all
aimed at elucidating the deterministic and stochastic dynamics that
dictate molecular interactions from a semi-analytical perspective.

I received my M.S. in Biomathematics from UCLA in 2023 and my B.S. through the
Integrated Science Program at Peking University in 2020. The undergraduate
program provided me with a broad and relatively in-depth exposure to mathematics
(analysis, geometry, topology, dynamical systems, and probability), physics
(statistical mechanics), physical chemistry, and biology (molecular,
developmental, and evolutionary biology). Beyond the training in the classroom,
I managed to appreciate different research fields from perspectives of a
mathematician, a physicist, and a biologist. Even for the same problem of
Brownian motion and Langevin equation, the physical approach and the
mathematical approach are quite different in the formalism, see my blog post [A
note on Langevin Equations and Stochastic Differential
Equations](/blog/a-note-on-lange.html) for more details. This perspective may
have profound consequences on other aspects of stochastic thermodynamics,
including the stochastic [work theorem]({{ site.baseurl
}}/blog/work-theorem-martingale.html).

During my undergraduate years, I worked with Prof. [Zhi Qi (齐
志)](https://cqb.pku.edu.cn/qizhi/) on the single-molecule biophysics
topics. I worked both as a theorist and an experimentalist, and
developed a strong interest in the stochastic processes that occur in
biological systems. 

At UCLA, my doctoral work focused on characterizing the stochastic dynamics
of DNA-protein interactions. The goal is to create a link between the
microscopic interactions occurring at the molecular level and the
macroscopic phenomena observed in biology. In pursuit of this goal, I
have explored various models of molecular biology, such as nucleosome
disassembly, the coupled processes of transcription and translation,
and understanding the driving forces behind viral evolution.

I am also interested in the development of computational tools to aid
in the analysis of biological data, with a particular flavor on
inferring first principles from experimental data using a top-down
approach.

</section>

<section class="section reveal" markdown="1">

## Recent publications

- **Li, X.** and Wang, S. (2026). [Extrinsic catch bonds may limit intrinsic ligand discrimination](https://doi.org/10.1016/j.newton.2026.100463). _Newton_.
- **Li, X.** and Chou, T. (2025). [Martingale Properties of Entropy Production and a Generalized Work Theorem with Decoupled Forward and Backward Processes](https://doi.org/10.1007/s10955-025-03530-w). _Journal of Statistical Physics_.
- Xia, M., **Li, X.**, Shen, Q., and Chou, T. (2025). [Squared Wasserstein-2 loss functions for efficient learning of stochastic differential equations](https://doi.org/10.1007/s10994-025-06908-9). _Machine Learning_.
- Zhang, J., **Li, X.**, Guo, X., You, Z., Böttcher, L., Mogilner, A., Hoffmann, A., Chou, T., and Xia, M. (2025). [Reconstructing noisy gene regulation dynamics using extrinsic-noise-driven neural stochastic differential equations](https://doi.org/10.1371/journal.pcbi.1013462). _PLOS Computational Biology_.
{: .pub-list}

<p class="note"><a href="{{ site.baseurl }}/publications">Full list →</a></p>

</section>

<section class="section reveal" markdown="1">

## Recent talks

- APS March Meetings 2024, Stochastic nucleosome disassembly mediated by remodelers and histone fragmentation,  Minneapolis, Minnesota, March 7, 2024.
- Joint Mathematics Meetings 2024, The role of APOBEC3-induced mutations in the differential evolution of monkeypox virus, San Francisco, California, January 3, 2024.
- Soft Condensed Matter Seminar, Buffer structure and robust perfect adaptation, UCLA, Los Angeles, California, November 16, 2023.
- ICSB 2023 (Dyn. 15), Population overcompensation, transients, and oscillations in age-structured Lotka-Volterra models, Hartford, Connecticut, October 10, 2023.
{: .timeline}

</section>

<section class="section reveal contact" markdown="1">

## Contact

<p class="contact-line"><span class="label">Email</span> <span>xiangting.li＠ucla.edu</span></p>

</section>
