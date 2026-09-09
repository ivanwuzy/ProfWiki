# Click-and-Traverse项目

- Source: https://axian12138.github.io/CAT/
- Collected: 2026-09-09
- Published: Unknown
- Extraction: 公开来源相关正文摘录；去除导航、HTML注释、无关内容及联系信息，保留原文措辞与署名顺序。

## 原文摘录

Collision-Free Humanoid Traversal in Cluttered Indoor Scenes
Paper
arXiv
Video
Code
Click and Traverse
Collision-Free Humanoid Traversal in Cluttered Indoor Scenes
Paper
arXiv
Video
Code
Click and Traverse
Collision-Free Humanoid Traversal in Cluttered Indoor Scenes
Han Xue
1,3*
, Sikai Liang
2,3*
,
Zhikai Zhang
1,3*
,
Zicheng Zeng
3,5
,
Yun Liu
1,3
,
Yunrui Lian
1,3
,
Jilong Wang
3,6
,
Qingtao Liu
3,7
,
Xuesong Shi
3
,
Li Yi
1,4†
1
Tsinghua University,
2
Tongji University,
3
Galbot,
4
Shanghai Qi Zhi Institute,
5
South China University of Technology,
6
Peking University,
7
Zhejiang University
Abstract
We study the problem of collision-free humanoid traversal in cluttered indoor scenes, such as hurdling over objects scattered on the floor, crouching under low-hanging obstacles, or squeezing through narrow passages. To achieve this goal, the humanoid needs to map its perception of surrounding obstacles to the corresponding traversal skills.
However, due to the reward engineering bottleneck, perception–control gap and sim-to-real transfer challenge, directly learning such mappings is highly challenging. Therefore, we introduce Humanoid Potential Field (
HumanoidPF
), a unified representation that tightly bridges environmental perception with whole-body control. It induces dense, structured guidance to streamline reward engineering and provides compact, task-relevant and sim-to-real-robust perceptual observations.
To enable the HumanoidPF to learn generalizable traversal skills through diverse and highly challenging cluttered indoor scenes, we further propose a hybrid scene generation method, incorporating crops of realistic 3D indoor scenes and procedurally synthesized obstacles. We successfully transfer our policy to the real world and develop a teleoperation system that allows a user to command the humanoid to traverse in cluttered indoor scenes with just a single click. Extensive experiments are conducted in both simulation and the real world to validate the effectiveness of our method.
Real-world cluttered indoor scenes
detour through narrow passage
crouch under the table
avoid the cat and holiday ribbon
hurdle over the cat
crouch and hurdle
crouch under moving obstacle
Simulator results (test set)
Simulator results (training set)
Overall pipeline.
We learn a visuomotor policy that maps diverse obstacle geometries and spatial layouts to corresponding whole-body traversal skills.
Left:
HumanoidPF for whole-body traversal learning.
(Top)
Construction of HumanoidPF, a reformulation of APF tailored for humanoid whole-body traversal;
(Bottom)
its use as informative perceptual representation and collision-avoidance rewards.
Right:
Scalable training and deployment pipeline.
(Top)
Hybrid scene generation for constructing diverse and challenging training environments;
(Middle)
parallel training of multiple specialist policies followed by distillation into a single generalist policy;
(Bottom)
sim-to-real deployment via Click-and-Traverse, an intuitive loco-navigation teleoperation in cluttered indoor scenes.
BibTeX
@misc{xue2026collisionfreehumanoidtraversalcluttered,
title={Collision-Free Humanoid Traversal in Cluttered Indoor Scenes},
author={Han Xue and Sikai Liang and Zhikai Zhang and Zicheng Zeng and Yun Liu and Yunrui Lian and Jilong Wang and Qingtao Liu and Xuesong Shi and Li Yi},
year={2026},
eprint={2601.16035},
archivePrefix={arXiv},
primaryClass={cs.RO},
url={https://arxiv.org/abs/2601.16035},
}
Website template borrowed from
NeRFies
and
UMI on Legs
.
