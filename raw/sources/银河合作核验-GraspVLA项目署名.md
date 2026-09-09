# GraspVLA项目署名

- Source: https://pku-epic.github.io/GraspVLA-web/
- Collected: 2026-09-09
- Published: Unknown
- Extraction: 公开来源相关正文摘录；去除导航、HTML注释、无关内容及联系信息，保留原文措辞与署名顺序。

## 原文摘录

GraspVLA: a Grasping Foundation Model Pre-trained on Billion-scale Synthetic Action Data
GraspVLA: a Grasping Foundation Model
Pre-trained on Billion-scale Synthetic Action Data
Shengliang Deng
1,3*
Mi Yan
1,2*
Songlin Wei
1,2
Haixin Ma
1
Yuxin Yang
1
Jiayi Chen
1,2
Zhiqi Zhang
1,2
Taoyu Yang
2
Xuheng Zhang
2
Heming Cui
3
Zhizheng Zhang
1,4†
He Wang
1,2,4†
1
Galbot
2
Peking University
3
The University of Hong Kong
4
Beijing Academy of Artificial Intelligence
†
corresponding author
Paper
Code
Checkpoint
Dataset
CoRL 2025
🔥[2025-12-29] We release
StereoVLA
, a VLA model powered by stereo vision and supports zero-shot deployment with high tolerance to camera pose variations.
Abstract
Embodied foundation models are gaining increasing attention for their zero-shot generalization, scalability, and adaptability to new tasks through few-shot post-training. However, existing models rely heavily on real-world data, which is costly and labor-intensive to collect. Synthetic data offers a cost-effective alternative, yet its potential remains largely underexplored. To bridge this gap, we explore the feasibility of training Vision-Language-Action (VLA) models entirely with large-scale synthetic action data. We curate SynGrasp-1B, a billion-frame robotic grasping dataset generated in simulation with photorealistic rendering and extensive domain randomization. Building on this, we present GraspVLA, a VLA model pretrained on large-scale synthetic action data as a foundational model for grasping tasks. GraspVLA integrates autoregressive perception tasks and flow-matching-based action generation into a unified Chain-of-Thought process, enabling joint training on synthetic action data and Internet semantics data. This design helps mitigate sim-to-real gaps and facilitates the transfer of learned actions to a broader range of Internet-covered objects, achieving open-vocabulary generalization in grasping. Extensive evaluations across real-world and simulation benchmarks demonstrate GraspVLA's advanced zero-shot generalizability and few-shot adaptability to specific human preferences. We will release SynGrasp-1B dataset and pre-trained weights to benefit the community.
Zero-Shot Evaluation
Pre-trained on our billion-scale dataset, GraspVLA demonstrates strong zero-shot generalizability across 6 aspects, including distractor, spatial pose, category, lighting, background, and close-loop actions.
1. Generalization to distractors
Cluttered scenes with 30+ distractors.
Dynamic distractors.
2. Generalization to lighting variations
Various lighting conditions. In the second video, even when the object is moved to a new location under dark lighting conditions, GraspVLA can still track and grasp it.
3. Generalization to spatial variations
Balls at different heights.
Eggs with different planar poses.
4. Generalization to background variations
Table with different textures.
Wall with changing colors.
5. Generalization to categories
Co-trained with grounding tasks using Internet data, GraspVLA can generalize to novel categories without any action label.
6. Closed-loop control
GraspVLA can automatically make closed-loop adjustments in response to disturbances until the task is completed.
Efficient post-training
1. Industry: new vocabulary
In industrial scenarios, although our pre-trained GraspVLA can grasp any part, it struggles to identify parts with special names.
A few data with only bounding box annotation helps GraspVLA master all the rare parts.
2. Retail: novel action patterns
In retail scenario, with a few trajectories on one kind of bottles, GraspVLA learns to sequentially pick up bottles from a densely-packed environment. This behavior can also be transferred to bottles unseen in post-training.
3. Home: align with human preference
GraspVLA learns to grasp mugs with specific grasping pose preference from a few demonstrations, and generalize to new mugs.
SynGrasp-1B
We introduce SynGrasp-1B, a billion-frame grasping dataset in simulation, featuring photorealistic rendering and extensive domain randomization, including initial robot pose, object pose, background, lighting, and material.
Data generation pipeline: We select over 10,000 object meshes from 240 categories in Objaverse and randomly place them on the table (left). We then use BoDex to generate stable grasps for each object and use CuRobo to plan grasping trajectories (middle). Finally, we apply domain randomization to materials, lighting, camera views, and backgrounds to simulate and render the trajectories (right).
Model
GraspVLA consists of an autoregressive vision-language backbone and a flow-matching based action expert. It exploits the synergy between Internet grounding data and synthetic action data with a Progressive Action Generation mechanism: the model first predicts 2D bounding boxes of the target object for both synthetic data and web data, and additionally generates grasp pose and chunked actions for synthetic data.
Contact
If you have any questions, please feel free to contact
Shengliang Deng
at [联系信息已省略] and
Mi Yan
at [联系信息已省略]
Thanks to
Lior Yariv
for the
website template
.
