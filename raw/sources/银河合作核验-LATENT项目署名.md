# LATENT项目署名

- Source: https://zzk273.github.io/LATENT/
- Collected: 2026-09-09
- Published: Unknown
- Extraction: 公开来源相关正文摘录；去除导航、HTML注释、无关内容及联系信息，保留原文措辞与署名顺序。

## 原文摘录

LATENT
Paper
arXiv
Video
Code
LATENT
Learning Athletic Humanoid Tennis Skills from Imperfect Human Motion Data
Paper
arXiv
Video
Code
Learning Athletic Humanoid Tennis Skills from Imperfect Human Motion Data
Zhikai Zhang
1,3*
,
Haofei Lu
1,3*
,
Yunrui Lian
1,3*
,
Ziqing Chen
1,3
,
Yun Liu
1,3
,
Chenghuai Lin
3
,
Han Xue
1,3
,
Zicheng Zeng
3
,
Zekun Qi
1,3
, Shaolin Zheng
3
,
Qing Luan
3
,
Jingbo Wang
5
,
Junliang Xing
1
,
He Wang
2,3
,
Li Yi
1,4†
*
Equal contribution
†
Corresponding author
1
Tsinghua University,
2
Peking University,
3
Galbot,
4
Shanghai Qi Zhi Institute,
5
Shanghai AI Laboratory
Abstract
Human athletes demonstrate versatile and highly-dynamic tennis skills to successfully conduct competitive rallies with a high-speed tennis ball.
However, reproducing such behaviors on humanoid robots is difficult, partially due to the lack of perfect humanoid action data or human kinematic
motion data in tennis scenarios as reference. In this work, we propose LATENT, a system that Learns Athletic humanoid
TEnnis skills from imperfect human motioN daTa.
The imperfect human motion data consist only of motion fragments that capture the primitive skills used when playing tennis rather than precise
and complete human-tennis motion sequences from real-world tennis matches, thereby significantly reducing the difficulty of data collection. Our
key insight is that, despite being imperfect, such quasi-realistic data still provide priors about human primitive skills in tennis scenarios.
With further correction and composition, we learn a humanoid policy that can consistently strike incoming balls under a wide range of conditions
and return them to target locations, while preserving natural motion styles.
We also propose a series of designs for robust sim-to-real transfer and deploy our policy on the Unitree G1 humanoid robot. Our method achieves
surprising results in the real world and can stably sustain multi-shot rallies with human players.
Multi-shot Rallies
Rally 1
Rally 2
Rally 3
Rally 4
Reactive footwork
Footwork 1
Footwork 2
Footwork 3
Footwork 4
Try to beat different human players
Human Player 1
Human Player 2
Human Player 3
Self play (simulation)
Self play
BibTeX
@misc{zhang2026learningathletichumanoidtennis,
title={Learning Athletic Humanoid Tennis Skills from Imperfect Human Motion Data},
author={Zhikai Zhang and Haofei Lu and Yunrui Lian and Ziqing Chen and Yun Liu and Chenghuai Lin and Han Xue and Zicheng Zeng and Zekun Qi and Shaolin Zheng and Qing Luan and Jingbo Wang and Junliang Xing and He Wang and Li Yi},
year={2026},
eprint={2603.12686},
archivePrefix={arXiv},
primaryClass={cs.RO},
url={https://arxiv.org/abs/2603.12686},
}
Website template borrowed from
NeRFies
and
UMI on Legs
.
