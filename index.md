---
layout: default
title: Home
---

<section class="hero" aria-labelledby="hero-name">
  <canvas class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-text">
    <p class="eyebrow">Biomathematics · UCLA</p>
    <h1 id="hero-name">Xiangting Li</h1>
    <p class="hero-lede">Stochastic processes in biological systems: how DNA and proteins interact across scales, and what nonequilibrium processes do for the cell.</p>
    <p class="hero-actions">
      <a class="btn btn-primary" href="{{ site.baseurl }}/research">Research</a>
      <a class="btn" href="{{ site.baseurl }}/publications">Publications</a>
      <a class="btn" href="{{ site.baseurl }}/assets/resume.pdf" target="_blank" rel="noopener">CV</a>
      <a class="btn btn-ghost" href="https://github.com/{{ site.github_username }}" rel="noopener">GitHub</a>
    </p>
    <ul class="chips" aria-label="Topics">
      <li>DNA–protein interactions</li><li>Kinetic proofreading</li><li>Stochastic thermodynamics</li><li>Martingales &amp; Itô calculus</li>
    </ul>
  </div>
</section>

<section class="section reveal" markdown="1">

## Welcome

Hello! My name is Xiangting Li and I am currently pursuing my Ph.D. in
biomathematics at UCLA, advised by Prof. [Tom
Chou](https://www.math.ucla.edu/~tchou/index.html). My research
focuses on understanding the stochastic processes that occur in
biological systems, particularly diving into how DNA and proteins
interact across different scales.

</section>

<section class="section reveal" markdown="1">

## Current work

<div class="feature" markdown="1">
<p class="feature-label">Kinetic proofreading</p>
<div markdown="1">
A recent interest of mine, inspired by the work of Anton Zilman, is to
understand and evaluating nonequilibrium processes by its functions. In our
[paper](https://arxiv.org/abs/2402.04547) on the stochastic kinetic proofreading
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

I received my B.S. in the Integrated Science Program at Peking University. The
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

At UCLA, my work is focused on characterizing the stochastic dynamics
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

- Xia, M., **Li, X.**, Shen, Q., Chou, T. (2024). Learning unbounded-domain spatiotemporal differential equations using adaptive spectral methods, _Journal of Applied Mathematics and Computing_, (2024). [DOI:10.1007/s12190-024-02131-2](http://dx.doi.org/10.1007/s12190-024-02131-2).
- **Li, X.**, Chou, T. (2023). Stochastic nucleosome disassembly mediated by remodelers and histone fragmentation,  _Journal of Chemical Physics_, (2023). [DOI:10.1063/5.0165136](https://doi.org/10.1063/5.0165136).
- **Li, X.**, Habibipour, S., Chou, T., Yang, O. O. (2023). The role of APOBEC3-induced mutations in the differential evolution of monkeypox virus, _Virus Evolution_, [doi:10.1093/ve/vead058](https://doi.org/10.1093/ve/vead058).
- Ding, J.\*, **Li, X.**\*, Shen, J., Zhao, Y., Zhong S., Lai, L., Niu H., Qi, Z. (2023). ssDNA accessibility of Rad51 is regulated by orchestrating multiple RPA dynamics, _Nature Communications_, [doi:10.1038/s41467-023-39579-y](https://doi.org/10.1038/s41467-023-39579-y).
- **Li, X.**, Chou, T. (2023). Stochastic dynamics and ribosome-RNAP interactions in transcription-translation coupling, _Biophysical Journal_, [doi:10.1016/j.bpj.2022.09.041](https://doi.org/10.1016/j.bpj.2022.09.041).
{: .pub-list}

<p class="note">* Denotes co-first authorship. <a href="{{ site.baseurl }}/publications">Full list →</a></p>

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
