---
layout: post
title: "Citation crawler"
date: 2023-11-03 21:51:21 +0530
tags: [network]
---

[Citation crawler](https://github.com/hsianktin/paper_network_builder)
is a tool to build a network of papers based on keywords. The network
is a directed graph, where each node represents a paper, and each edge
represents a citation from source paper to target paper.

The overall purpose of this tool is to help me understand the
landscape of a research topic and identify the most important papers
in the field.

![citation crawler](/assets/citation_crawler_example.png)

I color the nodes by the year of publication, and annotate the nodes 
with meta information such as cited-counts and a link to the paper.

Currently, two types of node sizing are supported:
- the number of citations a paper has received
- the number of citations a paper has received + the number of references a paper has made

The first type of node sizing is more common, but tends to favor older papers.
The second type of node sizing is more balanced, but tends to favor newer papers.

The position of the nodes are determined by Kamada-Kawai layout, i.e.,
the nodes are placed such that the total spring energy is minimized.