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
<p class="feature-label">Kinetic proofreading</p>
<div markdown="1">
A recent interest of mine, inspired by the work of Anton Zilman, is to
understand and evaluating nonequilibrium processes by its functions. In our
[paper](https://doi.org/10.1371/journal.pcbi.1012183) on the stochastic kinetic proofreading
(KPR) processes, we introduced a simplification, a deterministic processing
time, to the classical KPR processes and obtained analytical understanding of
how the whole process preserves information from input to output. While KPR has
been applied to many different biological processes including replication and
signaling, we highlight the differences in the biological context. Consequently,
the performance metrics for KPR are different in different scenarios, which
resolved the conflicts in results from Zilman's work and previous understanding
of speed-accuracy tradeoff in KPR. Our simplification to KPR allows for a
generalized form of KPR with higher accuracy and speed, in which both the
activation (processing) time and unbinding time are near deterministic.
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">Stochastic thermodynamics</p>
<div markdown="1">
Since the beginning of last century, (nonequilibrium) statistical physics has
developed independently a set of tools to deal with stochastic (Langevin)
processes, while the math community adopted a different set of tools for
stochastic calculus. There can be some fruitful consequences of introducing
existing mathematical tools, in particular, the Ito formula, to the field of
stochastic thermodynamics. For example, as Manzano et al. showed in their
[work](https://doi.org/10.1103/PhysRevLett.126.080603), the work theorem can be
derived from the martingale perspective. Their proof is still based on the
language of Crook's fluctuation theorem and path integrals. However, the use of
inverse paths may endanger the requirement of adaptivity in the martingale with
respect to the filtration, let alone the path integral formulation is not well
established in mathematics. We provide an alternative [proof]({{ site.baseurl
}}/blog/work-theorem-martingale.html) to the martingale property without the use
of fluctuation theorem/stochastic entropy production/path integral formulation.
</div>
</div>

<div class="feature" markdown="1">
<p class="feature-label">Research tools</p>
<div markdown="1">
I also develop tools to facilitate research itself, such as [citation
crawler](https://github.com/hsianktin/paper_network_builder), a [tool]({{ site.baseurl }}/blog/citation-crawler.html) 
to build [interactive](assets/citation_crawler.html) network of papers based on citation information.
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
