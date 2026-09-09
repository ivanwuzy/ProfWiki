# R2S2与OpenWBT项目

- Source: https://zzk273.github.io/R2S2/
- Collected: 2026-09-09
- Published: Unknown
- Extraction: 公开来源相关正文摘录；去除导航、HTML注释、无关内容及联系信息，保留原文措辞与署名顺序。

## 原文摘录

Unleashing Humanoid Reaching Potential via Real-world-Ready Skill Space
Paper
arXiv
Video
Code (OpenWBT)
R
2
S
2
Unleashing Humanoid Reaching Potential via Real-world-Ready Skill Space
Paper
arXiv
Video
Code (OpenWBT)
Unleashing Humanoid Reaching Potential via Real-world-Ready Skill Space
RA-L, 2025
Zhikai Zhang
1,3*
,
Chao Chen
3,6*
,
Han Xue
1,3*
,
Jilong Wang
2,3
, Sikai Liang
3,7
, Yun Liu
1,3
,
Zongzhang Zhang
6
,
He Wang
2,3
,
Li Yi
1,4,5
1
Tsinghua University,
2
Peking University,
3
Galbot,
4
Shanghai AI Laboratory,
5
Shanghai Qi Zhi Institute,
6
Nanjing University,
7
Tongji University
Primitive Skills - Locomotion
Forward Locomotion
Robust Locomotion
Lateral Locomotion
Turning Locomotion
Primitive Skills - Body Pose Adjustment
H1 Body Pose Adjustment
G1 Body Pose Adjustment
Autonomous Tasks
Point Touch
Sequential Box Pickup
Multi-Height Box Pickup
Teleoperation
Desk Cleaning 1
Desk Cleaning 2
High Surface Wiping
Item Pickup
Writing
G1 Teleoperation
Abstract
Humans possess a large reachable space in the 3D world, enabling interaction with objects at varying heights and distances.  However, realizing such large-space reaching on humanoids is a complex whole-body control problem and requires the robot to master diverse skills simultaneously—including base positioning and reorientation, height and body posture adjustments, and end-effector pose control. Learning from scratch often leads to optimization difficulty and poor sim2real transferability.
To address this challenge, we propose Real-world-Ready Skill Space (R
2
S
2
). Our approach begins with a carefully designed skill library consisting of real-world-ready primitive skills. We ensure optimal performance and robust sim2real transfer through individual skill tuning and sim2real evaluation. These skills are then ensembled into a unified latent space, serving as a structured prior that helps task execution in an efficient and sim2real transferable manner.
A high-level planner, trained to sample skills from this space, enables the robot to accomplish real-world goal-reaching tasks. We demonstrate zero-shot sim2real transfer and validate R
2
S
2
in multiple challenging goal-reaching scenarios, including point touch and box pickup.
R
2
S
2
Overview.
We present Real-world-Ready Skill Space (R
2
S
2
), a skill space that encompasses and encodes various real-world-ready motor skills.
1) We decompose the complex WBC motor skills into a library of primitive skills, each separately tuned and sim2real evaluated.
2) We ensemble multiple primitive skills into a student policy with a variational information bottleneck.
3) We train high-level planning policies to sample from R
2
S
2
to efficiently and stably accomplish real-world goal-reaching tasks.
BibTeX
@misc{zhang2025unleashinghumanoidreachingpotential,
title={Unleashing Humanoid Reaching Potential via Real-world-Ready Skill Space},
author={Zhikai Zhang and Chao Chen and Han Xue and Jilong Wang and Sikai Liang and Yun Liu and Zongzhang Zhang and He Wang and Li Yi},
year={2025},
eprint={2505.10918},
archivePrefix={arXiv},
primaryClass={cs.RO},
url={https://arxiv.org/abs/2505.10918},
}
Website template borrowed from
NeRFies
and
UMI on Legs
.
