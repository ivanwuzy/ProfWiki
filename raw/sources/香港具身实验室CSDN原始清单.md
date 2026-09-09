# 国内外高校具身智能实验室盘点：香港部分

- Source: https://blog.csdn.net/CV_Autobot/article/details/143159543
- Collected: 2026-09-08
- Published: Unknown
- Source Level: A2
- Capture: 原文香港部分文字摘录；图片未收录。仅作发现线索，内含姓名及归属错误，不用作当前事实锚点。

## 原文

1 香港（含内地与香港政府、科研机构联合实验室）
OpenDriveLab
——香港大学和上海人工智能实验室合作研究
主页：https://opendrivelab.com/
导师：Yi Ma、Hongyang Li、Li Chen等人
研究方向：端到端自动驾驶、具身智能
OpenDriveLab 主要聚焦于机器人和自动驾驶领域。其研究方向包括但不限于：机器人操纵的闭环视觉运动控制，致力于通过反馈机制提升自适应机器人控制能力；自动驾驶的世界模型构建，追求高保真、通用且可控的模型；多智能体行为拓扑研究，用于交互式自动驾驶中的运动预测和规划；还有融合语言能力的自动驾驶研究等。
研究成果：
来源：https://arxiv.org/abs/2409.09016 , Closed-Loop Visuomotor Control with Generative Expectation for Robotic Manipulation.
图 1 展示了 CLOVER 基于逆动力学模型（IDM）框架生成未来子目标以建立闭环策略。在背景干扰存在的情况下，行为克隆（BC）方法（如 ACT、RT - 1）无法抵抗视觉干扰，而 CLOVER 由于其闭环属性，表现出较强的鲁棒性。
来源：https://arxiv.org/pdf/2406.00439 , Learning Manipulation by Predicting Interaction.
图 1 展示了 MPI 这种面向交互的机器人操作表征学习管道。与基于（a）对比学习、（b）掩码信号建模或（c）使用随机帧的视频预测的现有技术不同，MPI 以关键帧为输入，指导模型预测过渡帧和检测被操作对象，从而促进对 “如何交互” 和 “在哪里交互” 的更好理解，在预训练中获取更具信息量的表征，并在下游任务中取得显著改进。
论文：
Closed-Loop Visuomotor Control with Generative Expectation for Robotic Manipulation , https://arxiv.org/abs/2409.09016
DriveLM: Driving with Graph Visual Question Answering , https://arxiv.org/abs/2312.14150
Planning-oriented Autonomous Driving , https://openaccess.thecvf.com/content/CVPR2023/html/Hu_Planning-Oriented_Autonomous_Driving_CVPR_2023_paper.html
Multimedia Lab (MMLab)
主页：http://mmlab.ie.cuhk.edu.hk/
导师：刘希慧等人（https://xh-liu.github.io/）
研究方向：计算机视觉、生成式模型、多模态人工智能、具身智能、AI for Science
来源：Empowering 3D Visual Grounding with Reasoning Capabilities , https://arxiv.org/pdf/2407.01525 .
图 1 展示了一个具身智能体在面对寻找舒适看电视地点的问题时的相关情况。对于具身智能体来说，它不仅需要理解 3D 环境和复杂的人类指令，还需要定位目标对象以进行交互和导航。图中对比了 GPT - 4（GPT - 4V）和作者提出的 ReGround3D 方法。GPT - 4（GPT - 4V）虽有很强的文本（多模态）推理能力，但缺乏直接感知 3D 场景、理解 3D 空间关系以及输出相应目标对象位置的能力。而作者提出的 ReGround3D 方法在真实的 3D 环境中具备 3D 感知、推理和定位能力。
来源：TC4D: Trajectory-Conditioned Text-to-4D Generation, https://arxiv.org/pdf/2403.17920 .
图 1 展示了使用轨迹条件 4D 生成（TC4D）方法生成的场景。这些场景由多个动态对象组成，是根据文本提示生成并合成在一起的。图中展示了不同的视点和时间步下的场景，其运动是通过沿给定轨迹对场景边界框进行刚性变换合成的，并利用视频扩散模型的监督来优化局部变形，从而提高了生成的 4D 场景中运动的数量和真实感。
来源：EgoPlan-Bench: Benchmarking Multimodal Large Language Models for Human-Level Planning , https://arxiv.org/abs/2312.06722 .
EgoPlan - Bench 评估规划能力，即模型像人类一样，将展示任务进展的视频、当前的视觉观察以及开放式任务目标作为输入，预测下一个可行的行动计划。相比之下，现有基准中基于以自我为中心的视频的问答示例主要评估理解能力，即模型基于对整个视频的空间和时间理解来回答问题。
论文：
DiM: Diffusion Mamba for Efficient High-Resolution Image Synthesis , https://www.arxiv.org/abs/2405.14224
4Diffusion: Multi-view Video Diffusion Model for 4D Generation , https://arxiv.org/abs/2405.20674
Divide and Conquer: Language Models can Plan and Self-Correct for Compositional Text-to-Image Generation , https://arxiv.org/abs/2401.15688
香港大学机械工程系机器人实验室
主页：https://www.mech.hku.hk/robotics
研究方向：软体机器人（如柔顺性可控制的软体机器人抓手/手部）、高性能柔性连续体机器人系统（用于介入式机器人和成像系统等，适用于微创手术、腔内内窥镜检查以及救援任务等）以及仿生机器人和执行器（从自然界获取灵感进行设计和制造，具有探索和与自然地形交互的能力）。
香港大学Hengshuang Zhao老师实验室
https://hszhao.github.io/
赵行爽老师是香港大学计算机科学系助理教授，研究方向包括计算机视觉（如场景理解、表征学习等）、生成式建模（涉及视觉内容创作、生成与操纵）、自动驾驶（涵盖环境感知、决策规划等环节）以及具身人工智能（包括机器人学习和 LLM 应用等）。
研究成果：
来源：https://depth-anything-v2.github.io/ , Depth Anything V2
来源：https://xavierchen34.github.io/LivePhoto-Page/ , LivePhoto: Real Image Animation with Text-guided Motion Control
来源：https://happinesslz.github.io/projects/LION/ .
LION 主要由几个 LION 模块组成，每个模块都配有一个用于特征增强的体素生成和一个用于沿高度维度下采样特征的体素合并。LION 模块包含用于长距离特征交互的 LION 层、用于捕获局部 3D 空间信息的 3D 空间特征描述符、用于特征下采样的体素合并以及用于特征上采样的体素扩展。
论文：
Zero-shot Image Editing with Reference Imitation , https://arxiv.org/abs/2406.07547
LARM: Large Auto-Regressive Model for Long-Horizon Embodied Intelligence , https://arxiv.org/pdf/2405.17424
Pixel-GS: Density Control with Pixel-aware Gradient for 3D Gaussian Splatting , https://arxiv.org/abs/2403.15530
香港大学Liwei Wang老师实验室：Language and Vision (LaVi) Lab
主页：https://lwwangcse.github.io/
Liwei Wang老师的研究方向集中在自然语言处理（NLP）和计算机视觉的交叉领域。具体包括语言与视觉的结合，探索如何让模型更好地理解和处理视觉与语言信息；大型语言模型相关研究，挖掘其在多模态场景下的应用潜力；多模态大模型的构建和优化；以及具身人工智能方面的研究，旨在使智能体在环境中更好地感知、理解和行动。
研究成果：
来源：https://arxiv.org/pdf/2312.02010 , Towards Learning a Generalist Model for Embodied Navigation.
先前方法学习特定任务的导航智能体，在域外视觉语言导航（VLN）成功率较低，面对未见过的任务（如问答和总结）时表现欠佳。而作者提出的 NaviLLM 不仅在具身导航所需的各种任务中表现出色，在未见过的任务上也展现出良好的泛化能力。图中不同颜色用于代表不同的示例，例如橙色代表来自域内 VLN 的示例。
来源：https://arxiv.org/pdf/2403.18252 , Beyond Embeddings: The Promise of Visual Table in Visual Reasoning.
文章提出视觉表（Visual Table）这一视觉表示形式，它由场景描述和多个对象描述构成，包含类别、属性和知识。研究通过收集小规模注释数据训练生成器创建视觉表，并在 11 个视觉推理基准上进行实验，结果表明视觉表优于以往的结构和文本表示形式，且能提升多模态大语言模型性能。
来源：https://aclanthology.org/2023.emnlp-main.570.pdf , Learning Preference Model for LLMs via Automatic Preference Data Generation.
文章提出通过自动偏好数据生成（AutoPM）学习大型语言模型（LLM）的偏好模型。AutoPM 包含广度数据生成和深度数据生成，通过遵循 HHH 标准从 LLM 中获取成对偏好数据，无需人工注释。
论文：
Multi-View Transformer for 3D Visual Grounding , S. Huang*, Y. Chen, J. Jia, L. Wang, CVPR 2022
Stratified Transformer for 3D Point Cloud Segmentation, X. Lai*, J. Liu, L. Jiang, L. Wang, H. Zhao, S. Liu, X. Qi, J. Jia, CVPR 2022
Voxel Field Fusion for 3D Object Detection, Y. Li*, X. Qi, Y. Chen, L. Wang, Z. Li, J. Sun, J. Jia, CVPR 2022
Probing Structured Pruning on Multilingual Pre-trained Models: Settings, Algorithms, and Efficiency, Y. Li*, F. Luo, R. Xu, S. Huang, F. Huang, L. Wang, ACL 2022
香港大学潘佳老师实验室
主页：https://cs.hku.hk/index.php/people/academic-staff/jpan
https://sites.google.com/site/panjia/
研究方向：智能算法、传感器和机器，以实现完全自主的机器人
研究成果：
来源：https://arxiv.org/pdf/2403.11186, NetTrack: Tracking Highly Dynamic Objects with a Net.
图 1 展示了 NetTrack 的可视化类似网，其通过细粒度网络解决传统跟踪方法因物体动态性导致内部关系扭曲的问题，还介绍了具有挑战性的 BFT 基准及相关场景。
来源：https://arxiv.org/pdf/2406.10093 , BiKC: Keypose-Conditioned Consistency Policy for Bimanual Robotic Manipulation.
图 1 展示了 BiKC 的工作流程，包含以关键姿态为条件的轨迹生成器和关键姿态预测器，关键姿态可以表示多阶段任务的各个阶段及子任务的完成情况。
来源：https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10506641, Heterogeneous Targets Trapping With Swarm Robots by Using Adaptive Density-Based Interaction.
图 1 展示了使用自适应的单层或多层环形结构的群体机器人捕获多个包含弱、强和群体移动个体的异构目标的过程，体现了与单点捕获设置相对的群体机器人对异构目标的捕获方式。
论文：
Hao Xu,
Jia Pan
*, HHD-GP: Incorporating Helmholtz-Hodge Decomposition into Gaussian Processes for Learning Dynamical Systems. In Neural Information Processing Systems (NeurIPS), 2024 [Hao Xu, Ph.D. 2024]
Dongjie Yu, Hang Xu, Yizhou Chen, Yi Ren,
Jia Pan
*. BiKC: Keypose-Conditioned Consistency Policy for Bimanual Robotic Manipulation, in Workshop on Algorithmic Foundations of Robotics (WAFR), 2024
Linhan Yang, Lei Yang, Haoran Sun, Zeqing Zhang, Haibin He, Fang Wan, Chaoyang Song,
Jia Pan
, in Workshop on Algorithmic Foundations of Robotics (WAFR), 2024 [Linhan Yang, Ph.D. 2024]
Dawei Wang, Weizi Li, Lei Zhu,
Jia Pan
*. Learning to Control and Coordinate Mixed Traffic Through Robot Vehicles at Complex and Unsignalized Intersections. International Journal of Robotics Research (IJRR), to appear [Dawei Wang, Ph.D. 2023]
香港中文大学（CUHK）机器人与自动化研究中心
主页：https://www4.mae.cuhk.edu.hk/research/robotics-and-automation/
研究方向：设计和制造、能源 / 建筑 / 环境技术、智能系统、MEMS / 纳米 / 材料技术、机器人和自动化、系统和控制
该机构在机器人与自动化领域的研究方向包括：缆索驱动机器人、机器人的计算机视觉与图像处理、移动机器人的分布式控制、外骨骼与假肢、人类技能获取、工业机器人自动化、运动学与动力学、医疗机器人、微纳机器人、运动规划与优化、机器人设计与控制、传感器与执行器、传感器、控制与接口、服务与空间机器人、服务机器人、软体机器人、步行机器人设计与控制。
香港中文大学机器人与人工智能实验室
主页：https://rail.cuhk.edu.cn/zh-hans
香港中文大学机器人与人工智能实验室（Robotics & AI Lab）由国际知名机器人与人工智能专家徐扬生院士带领，在围绕着航天机器人、工业机器人、服务机器人、特种机器人、医疗机器人、智能汽车机器人等多个领域已经成功研制了30多个机器人和智能系统，研究成果世界领先且具有广阔的应用前景。
研究成果：
模块化自重构机器人：具备自适应性和自愈能力，可应对复杂环境任务。当前研究拟对非结构化场景下的关键技术进行研究，为群体机器人、野外作业机器人等发展奠定基础，可应用于抢险搜救、反恐侦察、太空探索等领域。
海洋机器人：涉及流体力学、自动控制、人工智能、计算机仿真、传感等技术，在多种技术的交叉与融合的基础上，海洋机器人真正实现了自主的、远程的控制。
书法机器人：采用示教学习方式，可帮助老年人学习书法，对中风病人有康复作用。
智能全方位混合动力车：是解决能源和污染问题的较好办法，开发的关键技术分三类：(1)智能能量管理和控制技术，用来在油耗、动力和污染排放三个指标中取得平衡 (2)四轮驱动和四轮转向的轮系控制系统，用来实现多方向运动 (3)集合了自动泊车、智能资讯平台和智能安全功能的智能电子系统
论文：
Huifeng Guan, Yuan Gao, Min Zhao, Yong Yang, Fuqin Deng, Tin Lun Lam, “AB-Mapper: Attention and BicNet based Multi-agent Path Planning for Dynamic Environment,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022. (Accepted)
Jingtao Tang, Yuan Gao, Tin Lun Lam, “Learning to Coordinate for a Worker-Station Heterogeneous Multi-robot System in Planar Coverage Task,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022. (Accepted)
Chongxi Meng, Tianwei Zhang, Tin Lun Lam, “Fast and Comfortable Interactive Robot-to-Human Object Handover,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022. (Accepted)
深圳市人工智能与机器人研究院
主页：https://airs.cuhk.edu.cn/
简介：深圳市人工智能与机器人研究院（Shenzhen Institute of Artificial Intelligence and Robotics for Society，简称AIRS）是深圳市政府依托香港中文大学（深圳），联合多个世界顶级研究机构建立的十大基础研究机构之一。AIRS致力于研究多种应用场景的机器人，研究方向包括群体智能、特种机器人、智能机器人、医疗机器人、智能控制、微纳机器人、具身智能、通用机器人、多智能体协作、软体机器人等。
导师：徐扬生、丁宁、黄建伟、韩龙、Takeo Kanade、黄铠等人
研究成果：
图注：来源：Snail-inspired robotic swarms: a hybrid connector drives collective adaptation in unstructured outdoor environments, https://www.nature.com/articles/s41467-024-47788-2
图注：来源：PepperPose: Full-Body Pose Estimation with a Companion Robot, https://dl.acm.org/doi/full/10.1145/3613904.3642231
图注：来源：A magnetic multi-layer soft robot for on-demand targeted adhesion, https://www.nature.com/articles/s41467-024-44995-9
论文：
Snail-inspired robotic swarms: a hybrid connector drives collective adaptation in unstructured outdoor environments, https://www.nature.com/articles/s41467-024-47788-2
PepperPose: Full-Body Pose Estimation with a Companion Robot, https://dl.acm.org/doi/full/10.1145/3613904.3642231
A magnetic multi-layer soft robot for on-demand targeted adhesion, https://www.nature.com/articles/s41467-024-44995-9
Federated Learning While Providing Model as a Service: Jointly Training and Inference Optimization, https://arxiv.org/pdf/2312.12863
香港科技大学（广州）Precognition Lab
主页：https://precognition.team/#bio
导师：Prof. Junwei Liang等人
智能感知与预测实验室（Precognition Lab），致力于构建人类水平的具身人工智能系统，这些系统能够有效地感知、推理并与现实世界进行交互，从而造福人类。
研究成果：
来源：https://zeying-gong.github.io/projects/falcon/ , From Cognition to Precognition: A Future-Aware Framework for Social Navigation
来源：https://jiaming-zhou.github.io/projects/HumanRobotAlign/ , Mitigating the Human-Robot Domain Discrepancy in Visual Pre-training for Robotic Manipulation.
来源：https://www.youtube.com/watch?v=xE6M6WKw-0k ,  Open-vocabulary Mobile Manipulation in Unseen Dynamic Environments with 3D Semantic Maps
论文：
Contrastive Imitation Learning for Language-guided Multi-Task Robotic Manipulation , https://arxiv.org/pdf/2406.09738
Prioritized Semantic Learning for Zero-shot Instance Navigation , https://arxiv.org/pdf/2403.11650
Open-Vocabulary 3D Semantic Segmentation with Text-to-Image Diffusion Models , https://arxiv.org/pdf/2407.13642.pdf
香港科技大学Cheng Kar-Shun Robotics Institute (CKSRI)
主页：https://ri.hkust.edu.hk/
导师：張福民、李澤湘、沈劭劼、施凌、楊瓞仁、馮雁等人
香港科技大学的郑家纯机器人研究院（CKSRI）是一个多学科平台。其研究方向包括自主飞行（如无人机技术）、海洋机器人、智能建造、智能制造、人形机器人、视觉智能、机器人操作、柔性电子、软体机器人、智能传感器、微型机器人系统以及自动驾驶等多个领域。
研究成果：
无人机起源于军事，现应用广泛。大疆由汪滔在港科大宿舍创立，在李泽湘教授培育下发展，其研究成果使无人机可应对复杂地形，公司发展良好且支持港科大研究。
施柏荣教授与德国法兰克福高等研究院的特里施教授团队合作开发了主动高效编码（AEC）框架。该框架结合多学科知识，解释了动物和人类在婴儿期共同发展的感知和行为机制，其受神经启发的设计可使机器人更具适应性和自主性，在医学和工业等领域有广泛应用。
香港科技大学在无人机技术方面处于全球领先。电子与计算机工程系的沈劭劼教授是推动者之一。他因港科大与行业联系紧密而回校，他致力于让无人机摆脱 GPS 控制，使其能感知环境并智能应对飞行任务中的情况，而市场上的无人机仍需人保障空中安全。
论文：
An Efficient Spatial-Temporal Trajectory Planner for Autonomous Vehicles in Unstructured Environments , IEEE Transactions on Intelligent Transportation Systems, v. 25, (2), February 2024, article number 10285583, p. 1797-1814. Han, Zhichao; Wu, Yuwei; Li, Tong; Zhang, Lu; Pei, Liuao; Xu, Long; Li, Chengyang; Ma, Changjia; Xu, Chao; Shen, Shaojie; Gao, Fei
D(2)SLAM: decentralized and distributed collaborative visual-inertial SLAM system for aerial swarm , IEEE Transactions on Robotics, v. 40, July 2024, article number 10582478, p. 1-20
Xu, Hao; Liu, Peize; Chen, Xinyi; Shen, Shaojie.
FM-Fusion: Instance-Aware Semantic Mapping Boosted by Vision-Language Foundation Models , IEEE Robotics and Automation Letters, v. 9, (3), March 2024, article number 10403989, p. 2232-2239. Liu, Chuhao; Wang, Ke; Shi, Jieqi; Qiao, Zhijian; Shen, Shaojie
香港科技大学机器人研究所
主页：https://seng.hkust.edu.hk/zh-hans/node/7013
研究方向：移动机器人、无人机、智能制造、机器人感知与控制、医疗机器人等
下分实验室：
郑家纯机械人研究所 （CKSRI）
香港科技大学-Bright Dream Robotics 联合研究院
香港科技大学协同创新中心
香港科技大学-DJI 联合创新实验室
香港科技大学-生产力局工业人工智能及机械人技术联合实验室
香港科技大学-华为联合实验室
香港科技大学-小一机器学习与认知推理联合实验室
香港建筑机械人研究中心
智能自动驾驶中心 （IADC）
香港科技大学Jun MA老师实验室
主页：https://facultyprofiles.hkust-gz.edu.cn/faculty-personal-page/MA-Jun/eejma
研究方向：机器人学，自动驾驶，运动规划与控制，优化，强化学习
研究成果：
来源：https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10510603 , Improved Consensus ADMM for Cooperative Motion Planning of Large-Scale Connected Autonomous Vehicles with Limited Communication
来源：https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10417140 , Geometry-Aware Safety-Critical Local Reactive Controller for Robot Navigation in Unknown and Cluttered Environments
论文：
Cooperative autonomous driving in urban traffic scenarios by parallel optimization enforcing hard safety constraints, 2024 IEEE International Conference on Robotics and Automation (ICRA), Yokohama, Japan, 13-17 May 2024
Alternating Direction Method of Multipliers-Based Parallel Optimization for Multi-Agent Collision-Free Model Predictive Control , https://ieeexplore.ieee.org/document/10431550
Learning-Based High-Precision Tracking Control: Development, Synthesis, and Verification on Spiral Scanning With a Flexure-Based Nanopositioner , https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10443724
香港科技大学范明明老师实验室
主页：https://www.mingmingfan.com/
范明明，香港科技大学（广州）信息枢纽计算媒体与艺术学域与物联网学域助理教授、博士生导师、无障碍人机交互（APEX）课题组创始人。研究领域为人机交互，方向包括：1）智能无障碍与“适老化”交互技术设计；2）人智协同；3）虚拟与增强现实的交互技术与应用。
研究成果：
来源：FetchAid: Making Parcel Lockers More Accessible to Blind and Low Vision People With Deep-learning Enhanced Touchscreen Guidance, Error-Recovery Mechanism, and AR-based Search Support. https://arxiv.org/abs/2402.15723
来源：https://dl.acm.org/doi/pdf/10.1145/3613904.3642546 , Designing Unobtrusive Modulated Electrotactile Feedback on Fingertip Edge to Assist Blind and Low Vision (BLV) People in Comprehending Charts.
论文：
Toward Facilitating Search in VR With the Assistance of Vision Large Language Models , Chao Liu, Clarence Chi San Cheung, Mingqing Xu, Zhongyue Zhang, Mingyang Su, Mingming Fan*. https://www.mingmingfan.com/papers/VRST24_VR_Search_Framework.pdf
Investigating Size Congruency Between the Visual Perception of a VR Object and the Haptic Perception of Its Physical World Agent , Wenqi Zheng, Dawei Xiong, Cekai Weng, Jiajun Jiang, Junwei Li, Jinni Zhou, Mingming Fan*. https://www.mingmingfan.com/papers/VINCI24_VR_Size_Congruency.pdf
Designing Unobtrusive Modulated Electrotactile Feedback on Fingertip Edge to Assist Blind and Low Vision (BLV) People in Comprehending Charts. Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '24), May 11--16, 2024, Honolulu, HI, USA.
香港城市大学机器人与自动化研究中心
主页：https://www.cityu.edu.hk/cra/
研究方向：医疗机器人（如手术机器人、机器人视觉、细胞手术机器人、电磁机器人系统）、人机交互（如抓取新物体的众包、社交机器人、基于云的个人机器人系统、基于视觉的传感技术、服务机器人）、微 / 纳 / 生物机器人（如机器人辅助的微 / 纳操作、光致电动力学、纳米医学、微飞行机器人）以及智能自动化（如多机器人系统、机器学习、人工智能机器人）。
研究项目：
香港理工大学机器人与机械智能实验室-The Robotics and Machine Intelligence (ROMI) Laboratory
主页：https://www.romi-lab.org
导师：Dr David Navarro-Alarcon
研究方向：基于传感器的规划 / 控制、智能机器人运动、长期任务、医疗和手术机器人、自主操作、集体灵巧性、任务划分、编队与共识、理论基础、多机器人系统、软物体操作、视觉形状伺服、形态模型、潜在形状表示、反馈形状控制、多模态传感器融合、人机接口、医疗机器人感知、计算传感器模型、机器人感知。

