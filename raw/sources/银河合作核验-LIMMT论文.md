# LIMMT论文

- Source: https://arxiv.org/html/2606.06953
- Collected: 2026-09-09
- Published: Unknown
- Extraction: 公开来源相关正文摘录；去除导航、HTML注释、无关内容及联系信息，保留原文措辞与署名顺序。摘录论文版本、作者机构、摘要；不将预印本自动写成会议录用。

## 原文摘录

arXiv:2606.06953v1 [cs.RO] 05 Jun 2026
1]Tsinghua University
2]GalBot
3]Shanghai Jiao Tong University
4]Peking University
5]Shanghai Qi Zhi Institute
\contribution
[*]Equal Contribution
\contribution
[†]Corresponding author
\page
https://giraffeguan.github.io/limmt/
LIMMT
: Less is More for Motion Tracking
Yu Guan
Zekun Qi
Chenghuai Lin
Xuchuan Chen
Dairu Liu
Wenyao Zhang
Jilong Wang
Xinqiang Yu
He Wang
Li Yi
Affiliation:
[
Affiliation:
[
Affiliation:
[
Affiliation:
[
Affiliation:
[
August 24, 2026
Abstract
We argue that high-quality motion data can steer tracking policies toward better optimization trajectories early in training. In this work, we introduce
LIMMT
(
Less Is More for Motion Tracking
). To our knowledge, this is the first
data-centric
study for physics-based humanoid motion tracking. We go beyond simply removing low-quality and erroneous clips, but define motion data quality through three dimensions:
physics feasibility
,
diversity
, and
complexity
. We show that even training with
under 3%
of AMASS yields better tracking performance than training with the full dataset. We further conduct data cleaning on the estimated web-sourced mocap data. Extensive experiments and analyses validate the effectiveness of our framework.
