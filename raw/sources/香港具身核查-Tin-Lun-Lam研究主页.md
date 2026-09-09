# Tin-Lun-Lam研究主页

- Source: https://freeformrobotics.org/tllam
- Collected: 2026-09-08
- Published: Unknown
- Source Level: A0（机构、实验室或本人公开页面；自述按原口径保存）
- Capture: 网页可见正文；清除脚本与部分导航，省略联系方式和办公室信息，其余保留原文。

## 原文

Tin Lun LAM
Skip to main content
Skip to navigation
Tin Lun LAM
Ph.D. (CUHK) | IEEE Senior Member | World's Top 2% Scientists
|
|
Linkedin
|
Google Scholar
Associate Professor, Assistant Dean (Research)
of SSE
, The Chinese University of Hong Kong, Shenzhen
Deputy Director, National-local Joint Engineering Laboratory of Robotics and Intelligent Manufacturing
Associate Editor, IEEE Transactions on Robotics (T-RO)
Associate Editor, IEEE Transactions on Automation Science and Engineering (T-ASE)
Technical Editor, IEEE/ASME Transactions on Mechatronics (TMECH)
Associate Editor,
Journal of Field Robotics (JFR)
Associate Co-Chair, IEEE-RAS Technical Committee on Mechanisms and Design
Vice Chair, IEEE Robotics and Automation Society (RAS) Guangzhou Chapter
Research Interests: Field Robotics, Multi-robot Collaboration, Modular Robots, Mechanism Design
Research Group:
Freeform Robotics
|
YouTube
|
BiliBili
Biography
Tin Lun LAM is a tenured Associate Professor - Presidential Young Fellow at
The Chinese University of Hong Kong, Shenzhen
. He also serves as Deputy Director of the National-local Joint Engineering Laboratory of Robotics and Intelligent Manufacturing. He is a Senior Member of IEEE and acts as an Associate Editor of IEEE Transactions on Robotics (T-RO), IEEE Transactions on Automation Science and Engineering (T-ASE), and the Journal of Field Robotics (JFR), as well as Technical Editor for IEEE/ASME Transactions on Mechatronics (TMECH). He received his B.Eng. Degree with First Class Honors and Ph.D. Degree from
The Chinese University of Hong Kong
in 2006 and 2010, respectively. His research focuses on Field Robotics, Multi-robot Collaboration, Modular Robots, and Mechanism Design. He has authored and co-authored 4 books and over 100 research papers in top-tier international journals and conferences in both Robotics and AI, including Science Robotics, Nature Communications, T-RO, IJRR, TPAMI, TIP, TMECH, JFR, RA-L, NeurIPS, ICCV, ICRA, and IROS. He has been granted over 100 patents. His awards and recognitions include the
IEEE/ASME TMECH Best Paper Award
(2011), IEEE/RSJ IROS Best Paper Award on Robot Mechanisms and Design (2020), Distinguished Young Scholars Fund from Guangdong Natural Science Foundation (2023), Xiong Youlun Zhihu Excellent Youth Scientist Award (2023), Young Researcher Award of The Chinese University of Hong Kong, Shenzhen (2023), Intel China Outstanding Research Award (2024), recognition in Stanford/Elsevier's World's Top 2% Scientists (2025), and IEEE ICRA Best Conference Paper Award Finalist (2025). His research has been featured in internationally renowned media, including CCTV, Reuters, Forbes, Discovery, IEEE Spectrum, NIKKEI, and NHK.
Selected Projects
Freeform Robot
Freeform modular self-reconfigurable robotic systems offer exceptional self-adaptation, self-healing, and multifunctionality, enabling robot teams to dynamically assemble, disassemble, and reconfigure into arbitrary shapes and structures to address diverse tasks in complex, unstructured, and dynamic environments. Unlike traditional modular robots constrained by fixed docking points or lattice-based geometries, this project pioneers freeform connectivity—allowing arbitrary, omnidirectional attachment at any point on module surfaces—breaking limitations in mechanical structure, relative positioning, and motion planning for real-world deployment. These developments provide a theoretical and technical foundation for general-purpose robotic swarms—capable of on-demand multifunctional applications—and support broad applications in search and rescue, space exploration, disaster response, environmental monitoring, and industrial inspection.
Media Coverages
:
Metal Spheres Swarm Together to Create Freeform Modular Robots - IEEE Spectrum
Magnetic FreeBOT orbs work together to climb large obstacles
-
Engadget
Video: Snail-inspired swarm robots cooperate to build structures on demand - Interesting Engineering
Selected Publications:
Guanqi Liang, Auke Jan Ijspeert, Mark Yim, Tin Lun Lam, "Modular Reconfigurable Robots: Towards On-Demand Multifunctional Applications," Science Robotics, February 2026. [
paper
]
Yuxiao Tu, Guanqi Liang, Di Wu, Xinzhuo Li, Tin Lun Lam, “Locomotion and Self-reconfiguration Autonomy for Spherical Freeform Modular Robots,” International Journal of Robotics Research (IJRR), July 2025. [
paper
] [
video
]
[
Cover Image
]
Da Zhao, Haobo Luo, Yuxiao Tu, Chongxi Meng, Tin Lun Lam, “Snail-Inspired Robotic Swarms: A Hybrid Connector Drives Collective Adaptation in Unstructured Outdoor Environments,” Nature Communications, April 29, 2024. [
paper
] [
video
]
Guanqi Liang, Haobo Luo, Ming Li, Huihuan Qian and
Tin Lun Lam
, “FreeBOT: A Freeform Modular Self-reconfigurable Robot with Arbitrary Connection Point - Design and Implementation,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Las Vegas, NV, USA (Virtual), October 25-29, 2020. [
paper
] [
video
]
[
IROS
Best Paper Award on Robot Mechanisms and Design
]
Collaborative Relative Localization
Multi-robot systems require accurate, infrastructure-free relative localization to enable robust coordination, formation control, reconfiguration, and collaborative tasks in GPS-denied or unstructured environments. This project develops self-contained (onboard-only) relative pose estimation methods that achieve high precision across extreme distance scales—from direct contact (0 mm) to over 100 meters—where no single sensing modality suffices. Robots operate independently without fixed anchors or external references, addressing real-world challenges such as variable configurations (especially in modular/self-reconfigurable robots), measurement noise, occlusions, and computational constraints.
The research segments localization by operational range and tailors specialized, complementary approaches:
Contact-range (0 m, ~1 mm accuracy)
: Magnetic sensor arrays + graph neural network (GNN)-based detection for precise module connection identification in freeform modular robots.
Short-range (<5 m, ~1 cm accuracy)
: Configuration-adaptive visual methods fusing direct vision detection, robust module recognition, and odometry optimization to handle dynamic/unstructured features in spherical or freeform modular systems.
Middle-range (<50 m, ~10 cm accuracy)
: Ultra-wideband (UWB) ranging + odometry fusion with asymptotically efficient estimators (e.g., weighted semidefinite relaxation) for robust, theoretically grounded 2D/3D pose recovery under noise and motion errors.
Long-range (>50 m, ~1 m accuracy)
: Visual semantic landmarks and graph-based matching for scalable, viewpoint-robust global alignment in large-scale settings.
These multi-modal, self-contained techniques support applications in modular self-reconfigurable swarms, heterogeneous robot teams, search & rescue, exploration, and industrial collaboration, emphasizing low-cost hardware, real-time performance, and adaptability.
Selected
P
ublications:
Yuming Liu, Qiu Zheng, Yuxiao Tu, Yuan Gao, Guanqi Liang, Tin Lun Lam, "Configuration-Adaptive Visual Relative Localization for Spherical Modular Self-Reconfigurable Robots," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Atlanta, USA, May 19 - 23, 2025. [
paper
] [
video
]
[2025 IEEE ICRA Best Conference Paper Award - Finalist]
Yuxiao Tu, Tin Lun Lam, "Configuration Identification for a Freeform Modular Self-reconfigurable Robot - FreeSN," IEEE Transactions on Robotics (T-RO), August 2023. [
paper
] [
video
]
Yue Wang, Muhan Lin, Xinyi Xie, Yuan Gao, Fuqin Deng, Tin Lun Lam, “Asymptotically Efficient Estimator for Range-based Robot Relative Localization,” IEEE/ASME Transactions on Mechatronics (TMECH), June 2023. [
paper
] [
video
]
Collaborative
Environment Perception
In multi-robot collaborative systems, robust environment perception and seamless data fusion across heterogeneous sensors and platforms are essential for coordinated operation in complex, dynamic settings. This research tackles core challenges in multi-robot perception, focusing on accurate data association and interference mitigation to enable reliable shared understanding of the environment.
Key challenges addressed include:
Temporal mismatches
— Differences in data acquisition times cause variations in lighting, shadows, or scene dynamics, complicating feature matching and fusion.
Viewpoint diversity
— Disparate perspectives from multiple robots lead to geometric and appearance inconsistencies, hindering cross-robot data alignment.
Mutual visual interference
— Robots operating in close proximity introduce occlusions, reflections, or dynamic artifacts (e.g., from motion or lighting), degrading individual and collective perception quality.
The proposed approaches leverage advanced multi-sensor fusion, semantic-aware graph matching, robust SLAM under dynamic and occluded conditions, low-light enhancement, and knowledge transfer techniques (e.g., ground-to-aerial) to overcome these issues, achieving improved accuracy, real-time performance, and resilience in large-scale or degraded environments.
Selected
P
ublications:
Junjie Hu, Chenyou Fan, Mete Ozay, Qing Gao, Yulan Guo, Tin Lun Lam, “Robust Depth Estimation Under Sensor Degradations: A Multi-Sensor Fusion Perspective,” IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI), June 2025. [
paper
]
Junjie Hu, Chenyou Fan, Mete Ozay, Hua Feng, Yuan Gao, Tin Lun Lam, “Unlocking Drone Perception in Low AGL Heights: Progressive Semi-Supervised Learning for Ground-to-Aerial Perception Knowledge Transfer,” IEEE Transactions on Intelligent Transportation Systems (TITS), May 2025. [
paper
]
Xiyue Guo, Junjie Hu, Junfeng Chen, Fuqin Deng, Tin Lun Lam, “Semantic Histogram Based Graph Matching for Real-Time Multi-Robot Global Localization in Large Scale Environment,”  IEEE Robotics and Automation Letters (RA-L), October 2021. [
paper
] [
code
] [
video
]
Junjie Hu, Xiyue Guo, Junfeng Chen, Guanqi Liang, Fuqin Deng, Tin Lun Lam, “A Two-stage Unsupervised Approach for Low light Image Enhancement, ”IEEE Robotics and Automation Letters (RA-L), October 2021. [
paper
] [
video
]
Mobile Collaboration
This research develops advanced planning and coordination frameworks for heterogeneous multi-robot systems, where teams of robots with diverse capabilities collaborate to accomplish complex tasks in dynamic, unstructured environments. Key challenges addressed include accurate system modeling under heterogeneity, real-time computation of optimal plans, and adaptive reconfiguration in response to environmental changes or task variations.
The approaches center on:
Constrained multi-task assignment and scheduling models that account for robot-specific capabilities, temporal constraints, and inter-robot dependencies.
Hybrid solution methods combining operations research techniques (for exact/near-optimal allocation) with machine learning (e.g., deep multi-agent reinforcement learning, asymmetric self-play, capability matching, meta-RL) for scalable, adaptive performance in high-dimensional or uncertain scenarios.
Dynamic adaptation mechanisms enabling on-the-fly replanning, coordination learning, and robust execution under disturbances.
These innovations provide theoretical and algorithmic foundations for deploying heterogeneous robot teams in demanding real-world applications, including unmanned mining operations, security and anti-terrorism patrols, dynamic path coverage, human-robot co-adaptation, and collaborative catching/surveillance tasks.
Selected
P
ublications:
Xi Chen, Yuan Gao, Hangxin Liu, Fangkai Yang, Ali Ghadirzadeh, Jun Yang, Bin Liang, Chongjie Zhang, Tin Lun Lam, Song-Chun Zhu, "Cross-Robot Behavior Adaptation through Intention Alignment," Science Robotics, March 2026.
[
paper
]
Yuan Gao, Junfeng Chen, Xi Chen, Chongyang Wang, Junjie Hu, Fuqin Deng, Tin Lun Lam, “Asymmetric Self-Play-Enabled Intelligent Heterogeneous Multirobot Catching System Using Deep Multiagent Reinforcement Learning,” IEEE Transactions on Robotics (T-RO), April 2023. [
paper
] [
video
]
Hoi-Yin Lee, Peng Zhou, Bin Zhang, Liuming Qiu, Bowen Fan, Anqing Duan, Jingtao Tang, Tin Lun Lam, and David Navarro-Alarcon, "A Distributed Dynamic Framework to Allocate Collaborative Tasks Based on Capability Matching in Heterogeneous Multi-Robot Systems," IEEE Transactions on Cognitive and Developmental Systems (TCDS), April 2023. [
paper
] [
video
]
Jingtao Tang, Yuan Gao, Tin Lun Lam, “Learning to Coordinate for a Worker-Station Multi-robot System in Planar Coverage Tasks,” IEEE Robotics and Automation Letters (RA-L), October 2022. [
paper
] [
video
]
Collaborative
M
anipulation
This joint project between the
University of Edinburgh (UoE, SLMC Group)
and the
Shenzhen Institute of Artificial Intelligence and Robotics for Society (AIRS)
advances fundamental and applied research in AI and robotics. It centers on three interconnected scientific pillars: Multi-Contact Planning and Control, Multi-Agent Collaborative Manipulation, and Robot Perception—enabling teams of mobile manipulators (legged, wheeled, or hybrid platforms) to perform coordinated loco-manipulation tasks that exceed single-robot capabilities, such as handling large/heavy payloads, dynamic object transport, or complex interactions in unstructured environments.
Principal Investigators:
Prof. Sethu Vijayakumar (UoE), Prof. Tin Lun Lam (AIRS)
More information:
AIRS project page
|
UoE SLMC project page
Selected
P
ublications:
Ran Long, Christian Rauch, Tianwei Zhang, Vladimir Ivan, Tin Lun Lam, Sethu Vijayakumar, “RGB-D SLAM in Indoor Planar Environments with Multiple Large Dynamic Objects,” IEEE Robotics and Automation Letters (RA-L), June 2022. [
paper
] [
video
]
Zhangjie Tu, Tianwei Zhang, Lei Yan, Tin Lun Lam, “Whole-Body Control for Velocity-Controlled Mobile Collaborative Robots Using Coupling Dynamic Movement Primitives,” Proceedings of the IEEE-RAS International Conference on Humanoid Robots (Humanoids), Okinawa, Japan, November 28-30, 2022. [
paper
] [
video
]
Xiaoyu Zhang, Lei Yan, Tin Lun Lam, Sethu Vijayakumar, “Task-Space Decomposed Motion Planning Framework for Multi-Robot Loco-Manipulation,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Xian, China, May 30 – June 5, 2021. [
paper
] [
video
]
Inflatable Robotic Arm and Finger
This project presents the mechanical design and implementation of a low-cost, lightweight inflatable robotic arm and finger system based on soft robotics principles. By employing readily available, inexpensive inflatable materials, the design enables simple fabrication and scalability for mass production. The system operates at very low pneumatic pressure, facilitating safe, compliant, and direct physical interaction with humans without requiring external force/torque sensors. This approach inherently provides intrinsic safety and gentleness through material compliance and soft actuation.
Selected
P
ublications:
Ronghuai Qi, Amir Khajepour, William W Melek, Tin Lun Lam, Yangsheng Xu, "Design, Kinematics, and Control of a Multijoint Soft Inflatable Arm for Human-Safe Interaction," IEEE Transactions on Robotics (T-RO), vol. 33, no. 3, pp. 594-609, June 2017. [
paper
] [
video
]
Ronghuai Qi, Tin Lun Lam, and Yangsheng Xu, “Design and Implementation of a Low-Cost and Lightweight Inflatable Robot Finger,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Chicago, Illinois, USA, pp. 28-33, September 14-18, 2014.
[
paper
] [
video
]
Ronghuai Qi, Tin Lun Lam, and Yangsheng Xu, “Mechanical design and implementation of a soft inflatable robot arm for safe human-robot interaction," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Hong Kong, China, pp. 3490-3495, May 31 - June 5, 2014.
[
paper
]
Tree-climbing Robot
Treebot is a bio-inspired tree-climbing robot designed for superior maneuverability on irregular and complex tree structures. Drawing from biological climbing strategies, it achieves exceptional reach—including branches and features beyond the capabilities of prior state-of-the-art tree-climbing robots—while using only five actuators. This minimal actuation enables a compact, lightweight design that maintains high flexibility and efficiency in unstructured natural environments.
The system incorporates a continuum maneuvering mechanism, tactile sensing for autonomous navigation, specialized tree grippers, and optimized motion planning (including inchworm-inspired gait strategies). These innovations support safe, adaptive climbing without complex hardware, making Treebot suitable for applications such as forest monitoring, arboriculture, inspection, and ecological research.
Media Coverages
:
Treebot Learns to Autonomously Climb Trees - IEEE Spectrum
Meet Treebot, the tree-climbing forest sentinel
-
Reuters
Selected
P
ublications:
Tin Lun Lam, and Yangsheng Xu, “
Tree Climbing Robots: Design, Kinematics and Motion Planning
,” Springer Tracts in Advanced Robotics, vol. 78, Springer-Verlag, March 2012.
Tin Lun Lam, and Yangsheng Xu, “Motion Planning for Tree Climbing with Inchworm-like Robots,” Journal of Field Robotics (JFR), vol. 30, no. 1, pp. 87-101, January 2013.
Tin Lun Lam, and Yangsheng Xu, “Biologically Inspired Tree-climbing Robot with Continuum Maneuvering Mechanism,” Journal of Field Robotics (JFR), vol. 29, no. 6, pp. 843-860, November 2012.
Tin Lun Lam, and Yangsheng Xu, “Climbing Strategy for a Flexible Tree Climbing Robot - Treebot,” IEEE Transactions on Robotics (T-RO), vol. 27, no. 6, pp. 1107-1117, December 2011.
Omni-directional Vehicle
This project introduces a novel omnidirectional steer-by-wire system for four-wheel independent steering (4WIS) vehicles, enabling true omnidirectional mobility with enhanced driver usability. The system features an extended steering interface combined with a behavior-based control framework. Drivers can operate the vehicle in a conventional (Ackermann-like) manner or switch seamlessly to full omnidirectional control—without requiring explicit mode changes or complex reconfiguration. Retaining familiar traditional steering inputs significantly reduces the learning curve and improves adoption for both novice and experienced operators.
Media Coverages
:
Asia Tech Week - Omni-Directional Car |
Discovery
Selected
P
ublications:
Yangsheng Xu, Jingyu Yan, Huihuan Qian, and Tin Lun Lam, “
Hybrid Electric Vehicle Design and Control: Intelligent Omnidirectional Hybrids
,” McGraw-Hill, December 6, 2013.
Tin Lun Lam, Huihuan Qian and Yangsheng Xu, “Omnidirectional Steering Interface and Control for a Four-Wheel Independent Steering Vehicle,” IEEE/ASME Transactions on Mechatronics (TMECH), vol. 15, no. 3, pp. 329-338, June 2010.
[
2011 IEEE/ASME Transactions on Mechatronics Best Paper Award
]
Tin Lun Lam, Huihuan Qian, and Yangsheng Xu, “Longitudinal Wheel-slip Control for Four Wheel Independent Steering and Drive Vehicles”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Hong Kong, China, pp. 5280-5285, May 31 - June 5, 2014.
Tin Lun Lam, Jingyu Yan, Huihuan Qian, and Yangsheng Xu, “Traction/Braking Force Distribution Algorithm for Omni-directional All-wheel-independent-drive Vehicles”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Kongresszentrum Karlsruhe, Karlsruhe, Germany, pp. 738-743, May 6-10, 2013.
Tin Lun Lam, Huihuan Qian, and Yangsheng Xu, “Direct Yaw Moment Control for Four Wheel Independent Steering and Drive Vehicles based on Centripetal Force Detection”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), St. Paul, Minnesota, USA, pp. 103-108, May 14-18, 2012.
Ocean Robotics
This project develops energy-sustainable robotic systems for long-endurance ocean exploration, addressing the critical challenge of power autonomy in marine environments. By harnessing renewable ambient energy sources—primarily wind and waves—the systems achieve extended operational range with minimal reliance on batteries or frequent recharging. These approaches enable sustainable, eco-friendly marine robotics suitable for applications such as ocean monitoring, environmental surveying, data collection, and hybrid energy planning in remote or harsh conditions.
Selected
P
ublications:
Lyucheng Xie, Hongzheng Cui, Tin Lun Lam*, "Speed up of Wave-Driven Unmanned Surface Vehicle Using Passively Transformable Two-segment Foils," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022.
Yan Gao, Lyucheng Xie, Tin Lun Lam*, "Thrust Enhancement of Wave-driven Unmanned Surface Vehicle by using Asymmetric Foil," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Xian, China, May 30 - June 5, 2021.
Qinbo Sun, Weimin Qi, Hengli Liu, Zhenglong Sun, Tin Lun Lam, and Huihuan Qian, “OceanVoy: A Hybrid Energy Planning System for Autonomous Sailboat,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Las Vegas, NV, USA (Virtual), October 25-29, 2020.
[2020 IROS Best Application Paper Award - Finalist]
Ruoyu Xu, Hengli Liu, Chongfeng Liu, Zhenglong Sun, Tin Lun Lam, Huihuan Qian, "A Novel Solar Tracker Driven by Waves: From Idea to Implementation", Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Paris, France, May 31 - June 4, 2020.
Selected P
ublications
Tree Climbing Robots: Design, Kinematics and Motion Planning
Springer Tracts in Advanced Robotics, 2012
Tin Lun Lam, and Yangsheng Xu
Hybrid Electric Vehicle Design and Control: Intelligent Omnidirectional Hybrids
McGraw-Hill, 2013
Yangsheng Xu, Jingyu Yan, Huihuan Qian, and Tin Lun Lam
Distributed Autonomous Robotic Systems - 1
7
th International Symposium
Springer Cham
,
02 November 2025
Alexandra Nilles, Kirstin H. Petersen, Tin Lun Lam, Amanda Prorok, Michael Rubenstein, Michael Otte
Distributed Autonomous Robotic Systems - 16th International Symposium
Springer Nature Switzerland AG, 2024
Julien Bourgeois, Jamie Paik, Benoît Piranda, Justin Werfel, Sabine Hauert, Alyssa Pierson, Heiko Hamann, Tin Lun Lam, Fumitoshi Matsuno, Negar Mehr, Abdallah Makhoul
Introduction to Intelligent Robot System Design: Application Development with ROS
Springer Singapore, 2023
Gang Peng, Tin Lun Lam, Chunxu Hu, Yu Yao, Jintao Liu, Fan Yang
Books
:
Alexandra Nilles, Kirstin H. Petersen,
Tin Lun Lam
, Amanda Prorok, Michael Rubenstein, Michael Otte, "
Distributed Autonomous Robotic Systems - 17th International Symposium
," Volume 34 of Springer Proceedings in Advanced Robotics, Springer Cham, 02 November 2025.
Julien Bourgeois, Jamie Paik, Benoît Piranda, Justin Werfel, Sabine Hauert, Alyssa Pierson, Heiko Hamann,
Tin Lun Lam
, Fumitoshi Matsuno, Negar Mehr, Abdallah Makhoul, "
Distributed Autonomous Robotic Systems - 16th International Symposium
," Volume 28 of Springer Proceedings in Advanced Robotics, Springer Nature Switzerland AG, 16 Apr 2024.
Gang Peng,
Tin Lun Lam
, Chunxu Hu, Yu Yao, Jintao Liu, Fan Yang, "
Introduction to Intelligent Robot System Design: Application Development with ROS
," Springer Singapore, 2023.
Yangsheng Xu, Jingyu Yan, Huihuan Qian, and
Tin Lun Lam
, “
Hybrid Electric Vehicle Design and Control: Intelligent Omnidirectional Hybrids
,” McGraw-Hill, December 6, 2013.
Tin Lun Lam
, and Yangsheng Xu, “
Tree Climbing Robots: Design, Kinematics and Motion Planning
,
” Springer Tracts in Advanced Robotics,
v
ol. 78, Springer-Verlag, March 2012.
Journals:
(
*
Corresponding author) (
†
C
ontributed equally)
Guanqi Liang, Rong Ou, Peiqi Wang, Xianghong Wang,
Tin Lun Lam
*, "
Collaborative Visual Localization for Modular Self-Reconfigurable Robots
,"
Advanced Intelligent Systems
(AIS),
18 April 2026.
Xi Chen
†
*, Yuan Gao†, Hangxin Liu, Fangkai Yang, Ali Ghadirzadeh, Jun Yang, Bin Liang, Chongjie Zhang*,
Tin Lun Lam
*, Song-Chun Zhu, "
Cross-Robot Behavior Adaptation through Intention Alignment
,"
Science Robotics
, Vol 11, Issue 112, 18 March 2026.
Guanqi Liang, Auke Jan Ijspeert, Mark Yim,
Tin Lun Lam
*, "
Modular Reconfigurable Robots: Towards On-Demand Multifunctional Applications
,"
Science Robotics
,  Vol 11, Issue 111, 25 February 2026.
Zhenliang Zheng, Yongyuan Xu, Xuchun He,
Tin Lun Lam
*, Ning Ding*, "
A cascaded strategy with embodied artificial intelligence: forward kinematics solutions for CCRobot-S
,"
Journal of Field Robotics
(JFR), December 2025.
[
Cover Image
]
Liguang Zhou, Junjie Hu, Yuhongze Zhou,
Tin Lun Lam
*, Yangsheng Xu, "
Peer Learning Approach to Unbiased Scene Graph Generation for Traffic Scene Understanding
,"
IEEE Transactions on Intelligent Transportation Systems
(T-ITS), November 2025.
Zhenliang Zheng, Ning Ding*, Herbert Werner, Feng Ren, Yongyuan Xu, Wenchao Zhang, Xiaoli Hu, Jianguo Zhang,
Tin Lun Lam
*, "
CCRobot-S: A Robotic Cable-Climbing Squad Collaborating for Fast Inspection and Heavy-Duty Maintenance
,"
IEEE Transactions on Robotics
(T-RO), October 2025.
Yuxiao Tu, Guanqi Liang, Di Wu, Xinzhuo Li,
Tin Lun Lam
*, "
Locomotion and Self-reconfiguration Autonomy for Spherical Freeform Modular Robots
,"
International Journal of Robotics Research
(IJRR), July 2025.
[
Cover Image
]
Junjie Hu, Chenyou Fan, Mete Ozay, Qing Gao, Yulan Guo,
Tin Lun Lam
*, "
Robust Depth Estimation Under Sensor Degradations: A Multi-Sensor Fusion Perspective
,"
IEEE Transactions on Pattern Analysis and Machine Intelligence
(TPAMI), June 2025.
Guanqi Liang, Rong Ou, Yuxiao Tu, Di Wu,
Tin Lun Lam
*, "
S-DISG: Position and Torque Sensing for Driving Integrated Spherical Gear
,"
IEEE/ASME Transactions on Mechatronics
(TMECH), August 2025.
Junjie Hu, Chenyou Fan, Mete Ozay, Hua Feng, Yuan Gao,
Tin Lun Lam
*, "
Unlocking Drone Perception in Low AGL Heights: Progressive Semi-Supervised Learning for Ground-to-Aerial Perception Knowledge Transfer
,"
IEEE Transactions on Intelligent Transportation Systems
(T-ITS), May
15,
2025.
Zhenliang Zheng, Chao Wang, Xiaoli Hu, Lun Zhang, Wenchao Zhang, Yongyuan Xu, Pengfei Liu, Xufang Pang,
Tin Lun Lam
*, Ning Ding*, “
Developing a Climbing Robot for Stay Cable Maintenance with Security and Rescue Mechanisms
,”
Journal of Field Robotics
(JFR), February 2025.
[
Inside Back Cover
]
Liguang Zhou, Yuhongze Zhou, Xiaonan Qi, Junjie Hu,
Tin Lun Lam
*, Yangsheng Xu, "
Feature Pyramid Attention Network for Audio-Visual Scene Classification
,"
CAAI Transactions on Intelligence Technology
, November 26, 2024.
Di Wu, Yuxiao Tu, Guanqi Liang, Lijun Zong,
Tin Lun Lam
*, "
Linear-Time Quasi-Static Stability Detection for Modular Reconfigurable Robots
,"
International Journal of Robotics Research
(IJRR), November 25, 2024.
Guanqi Liang, Di Wu, Yuxiao Tu,
Tin Lun Lam
*, "
Decoding Modular Reconfigurable Robots: A Survey on Mechanisms and Design
,"
International Journal of Robotics Research
(IJRR)
, October 14, 2024.
Lai Wei, Yanzhe Wang, Yibo Hu,
Tin Lun Lam
*, Yanding Wei*, "
Online Dual Robot-Human Collaboration Trajectory Generation by Convex Optimization,
"
Robotics and Computer-Integrated Manufacturing
(RCIM),  Volume 91, February 2025, 102850.
Jiatao Ding, Cosimo Della Santina*,
Tin Lun Lam
*, Jianxin Pang*, Xiaohui Xiao, Nikos Tsagarakis, and Yanlong Huang, "
Robust Humanoid Locomotion via Sequential Stepping and Angular Momentum Optimization
,"
IEEE Transactions on Industrial Electronics
(TIE), July 8, 2024.
Da Zhao, Haobo Luo, Yuxiao Tu, Chongxi Meng,
Tin Lun Lam
*, "
Snail-Inspired Robotic Swarms: A Hybrid Connector Drives Collective Adaptation in Unstructured Outdoor Environments
,"
Nature Communications
, April 2024.
Chongxi Meng
, Tianwei Zhang,
Da Zhao
, and
Tin Lun Lam
*, "
Fast and Comfortable Interactive Mobile Robot-to-Human Object Handover
,"
Cyborg and Bionic Systems
, April 3, 2024.
Junjie Hu, Chenyou Fan, Mete Ozay, Hualie Jiang,
Tin Lun Lam
*, "
Dense Depth Distillation with Out-of-Distribution Simulated Images
,"
Knowledge-Based Systems
(KBS), December 2023.
Junjie Hu, Chenyou Fan, Liguang Zhou, Qing Gao, Honghai Liu,
Tin Lun Lam
*, "
Lifelong-MonoDepth: Lifelong Learning for Multidomain Monocular Metric Depth Estimation
,"
IEEE Transactions on Neural Networks and Learning Systems
(TNNLS), October 2023.
Guanqi Liang, Lijun Zong,
Tin Lun Lam
*, "
DISG: Driving-Integrated Spherical Gear Enables Singularity-Free Full-Range Joint Motion
,"
IEEE Transactions on Robotics
(T-RO), September 2023.
Junjie Hu, Chenyou Fan, Xiyue Guo, Liguang Zhou,
Tin Lun Lam
*, "
Self-supervised Single-line LiDAR Depth Completion
,"
IEEE Robotics and Automation Letters
(RA-L), September 2023.
Yuxiao Tu,
Tin Lun Lam
*,
"Configuration Identification for a Freeform Modular Self-reconfigurable Robot - FreeSN
,"
IEEE Transactions on Robotics
(T-RO), August 2023.
Yue Wang, Muhan Lin, Xinyi Xie, Yuan Gao, Fuqin Deng,
Tin Lun Lam
*, "
Asymptotically Efficient Estimator for Range-Based Robot Relative Localization
,"
IEEE/ASME Transactions on Mechatronics
(TMECH), June 2023.
Mingjian Liang, Junjie Hu, Chenyu Bao, Hua Feng, Fuqin Deng,
Tin Lun Lam
*, "
Explicit Attention-Enhanced Fusion for RGB-Thermal Perception Tasks
,"
IEEE Robotics and Automation Letters
(RA-L), May 2023.
Yuan Gao, Junfeng Chen, Xi Chen, Chongyang Wang, Junjie Hu, Fuqin Deng,
Tin Lun Lam
*, "
Asymmetric Self-Play-Enabled Intelligent Heterogeneous Multirobot Catching System Using Deep Multiagent Reinforcement Learning
,"
IEEE Transactions on Robotics
(T-RO), April 2023.
Yuhongze Zhou, Liguang Zhou,
Tin Lun Lam
*, Yangsheng Xu, "
Sampling Propagation Attention with Trimap Generation Network for Natural Image Matting
,"
IEEE Transactions on Circuits and Systems for Video Technology
(TCSVT), March 2023.
Liguang
Zhou, Yuhongze Zhou, Xiaonan Qi, Junjie Hu,
Tin Lun Lam
*, Yangsheng Xu, "
Attentional Graph Convolutional Network for Structure-aware Audio-Visual Scene Classification
,"
IEEE Transactions on Instrumentation and Measurement
(TIM), March 2023.
Jiatao Ding,
Tin Lun Lam
*, Ligang Ge, Jianxin Pang*, Yanlong Huang, "
Safe and Adaptive 3-D Locomotion via Constrained Task-Space Imitation Learning
,”
IEEE/ASME Transactions on Mechatronics
(TMECH), February 2023.
Junjie Hu, Chenyu Bao, Mete Ozay, Chenyou Fan, Qing Gao, Honghai Liu,
Tin Lun Lam
*, "
Deep Depth Completion from Extremely Sparse Data: A Survey
,"
IEEE Transactions on Pattern Analysis and Machine Intelligence
(TPAMI), December 2022.
Haobo Luo,
Tin Lun Lam
*, "
Auto-Optimizing Connection Planning Method for Chain-Type Modular Self-Reconfiguration Robots
,"
IEEE Transactions on Robotics
(T-RO),
November
2022.
Jingtao Tang, Yuan Gao,
Tin Lun Lam
*, "
Learning to Coordinate for a Worker-Station Multi-robot System in Planar Coverage Tasks
,"
IEEE Robotics and Automation Letters
(RA-L), vol. 7, no. 4, pp. 12315-12322, October 2022.
Shuai Zhao, Liguang Zhou, Wenxiao Wang, Deng Cai,
Tin Lun Lam
*, Yangsheng Xu, "
Toward Better Accuracy-Efficiency Trade-Offs: Divide and Co-Training
,"
IEEE Transactions on Image Processing
(T-IP), vol. 31, pp. 5869-5880, September 2022.
Lijun Zong, Guanqi Liang,
Tin Lun Lam
*, "
Kinematics Modeling and Control of Spherical Rolling Contact Joint and Manipulator
,"
IEEE Transactions on Robotics
(T-RO), August 2022.
Haobo Luo,
Tin Lun Lam*
, “
Adaptive Flow Planning of Modular Spherical Robot Considering Static Gravity Stability
,”
IEEE Robotics and Automation Letters
(RA-L), vol. 7, no. 2, pp. 4228-4235, April 2022.
Xiyue Guo, Junjie Hu, Junfeng Chen, Fuqin Deng,
Tin Lun Lam*
, "
Semantic Histogram Based Graph Matching for Real-Time Multi-Robot Global Localization in Large Scale Environment
,"
IEEE Robotics and Automation Letters
(RA-L)
, vol. 6, no. 4, pp. 8349-8356, October 2021.
Junjie Hu, Xiyue Guo, Junfeng Chen, Guanqi Liang, Fuqin Deng,
Tin Lun Lam*
, “
A Two-stage Unsupervised Approach for Low light Image Enhancement
, ”
IEEE Robotics and Automation Letters
(RA-L)
, vol. 6, no. 4, pp. 8363-8370, October 2021.
Tin Lun Lam
, and Yangsheng Xu, “
Motion Planning for Tree Climbing with Inchworm-like Robots
,”
Journal of Field Robotics
(JFR)
, vol. 30, no. 1, pp. 87-101, January 2013.
Tin Lun Lam
, and Yangsheng Xu, “
Biologically Inspired Tree-climbing Robot with Continuum Maneuvering Mechanism
,”
Journal of Field Robotics
(JFR)
, vol. 29, no. 6, pp. 843-860, November 2012.
Tin Lun Lam
, and Yangsheng Xu, “
Climbing Strategy for a Flexible Tree Climbing Robot - Treebot
,”
IEEE Transactions on Robotics
(
T-RO
)
, vol. 27, no. 6, pp. 1107-1117, December 2011.
Tin Lun Lam
, Huihuan Qian and Yangsheng Xu, “
Omnidirectional Steering Interface and Control for a Four-Wheel Independent Steering Vehicle
,”
IEEE/ASME Transactions on Mechatronics
(
TMECH
)
, vol. 15, no. 3, pp. 329-338, June 2010.
[
IEEE/ASME Transactions on Mechatronics Best Paper Award
]
Conferences:
(
*
Corresponding author)
Yun Wang, Longguang Wang, Chenghao Zhang, Yongjian Zhang, Zhanjie Zhang, Ao Ma, Chenyou Fan,
Tin Lun Lam
*, Junjie Hu*, "Learning Robust Stereo Matching in the Wild with Selective Mixture-of-Experts," International Conference on Computer Vision (ICCV), Honolulu, Hawai'i, Oct 19 – 23th, 2025.
Jie Gu,
Tin Lun Lam*
, Chunxu Tian, Zhihao Xia, Yongheng Xing, Dan Zhang*, "MODUR: A Modular Dual-reconfigurable robot," Proceedings of the 2025 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Hangzhou, China, 19 - 25 October, 2025.
Chenyu Bao, Junjie Hu, Qiu Zheng,
Tin Lun Lam
*, "Topology-based Visual Active Room Segmentation," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Atlanta, USA, May 19 - 23, 2025.
Yuming Liu, Qiu Zheng, Yuxiao Tu, Yuan Gao, Guanqi Liang,
Tin Lun Lam
*, "Configuration-Adaptive Visual Relative Localization for Spherical Modular Self-Reconfigurable Robots," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Atlanta, USA, May 19 - 23, 2025.
[IEEE
ICRA
Best Conference Paper Award
- Finalist
]
Qiu Zheng, Junjie Hu, Yuming Liu, Zengfeng Zeng, Wang Fan,
Tin Lun Lam
*, "Transferring Visual Knowledge: Semi-Supervised Instance Segmentation for Object Navigation Across Varying Height Viewpoints," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Atlanta, USA, May 19 - 23, 2025.
Peiqi Wang, Guanqi Liang, Da Zhao,
Tin Lun Lam
*, "Enhancing Connection Strength in Freeform Modular Reconfigurable Robots through Holey Sphere and Gripper Mechanisms," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Atlanta, USA, May 19 - 23, 2025.
Xinzhuo Li, Yuxiao Tu, Guanqi Liang, Di Wu,
Tin Lun Lam
*, "Energy Sharing Mechanism for Freeform Robots Utilizing Conductive Spherical Sliding Surfaces," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Abu Dhabi, UAE, October 14 – 18, 2024.
Wenqiang Lai, Yuan Gao,
Tin Lun Lam
*, "Vision-Language Model-based Physical Reasoning for Robot Liquid Perception," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Abu Dhabi, UAE, October 14 – 18, 2024.
Junfeng Chen, Yuan Gao, Junjie Hu, Fuqin Deng,
Tin Lun Lam
*, “Meta-Reinforcement Learning Based Cooperative Surface Inspection of 3D Uncertain Structures using Multi-robot Systems,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Yokohama, Japan, May 13th to 17th, 2024.
Rong Ou, Guanqi Liang,
Tin Lun Lam
*, "FPECMV: Learning-based Fault-Tolerant Collaborative Localization under Limited Connectivity," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Detroit, Michigan, USA, October 1-5, 2023.
Lyucheng Xie, Hongzheng Cui,
Tin Lun Lam
*, "Speed up of Wave-Driven Unmanned Surface Vehicle Using Passively Transformable Two-segment Foils," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022.
Chongxi
Meng
, Tianwei Zhang,
Tin Lun Lam
*, "Fast and Comfortable Interactive Robot-to-Human Object Handover," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022.
Huifeng Guan, Yuan Gao, Min Zhao, Yong Yang, Fuqin Deng*,
Tin Lun Lam
*, "AB-Mapper: Attention and BicNet based Multi-agent Path Planning for Dynamic Environment," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Kyoto, Japan, October 23-27, 2022.
Yuxiao Tu, Guanqi Liang,
Tin Lun Lam
*, “FreeSN: A Freeform Strut-node Structured Modular Self-reconfigurable Robot - Design and Implementation,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Philadelphia, USA, May 23-27, 2022.
Guanqi Liang, Yuxiao Tu, Lijun Zong, Junfeng Chen,
Tin Lun Lam
*, “Energy Sharing Mechanism for a Freeform Robotic System – FreeBOT,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Philadelphia, USA, May 23-27, 2022.
Da Zhao,
Tin Lun Lam
*, “SnailBot: A Continuously Dockable Modular Self-reconfigurable Robot Using Rocker-bogie Suspension,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Philadelphia, USA, May 23-27, 2022.
Fuqin Deng, Hua Feng, Mingjian Liang, Qi Feng, Ningbo Yi, Yong Yang, Yuan Gao, Junfeng Chen,
Tin Lun Lam
*, “Abnormal Occupancy Grid Map Recognition using Attention Network,” Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Philadelphia, USA, May 23-27, 2022.
Liguang Zhou, Jun C
en
, Zhenglong Sun,
Tin Lun Lam
*, Yangsheng Xu, "BORM: Bayesian Object Relation Model for Indoor Scene Recognition," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Prague, Czech Republic, September 27 - October 1, 2021.
Bo Miao, Liguang Zhou, Ajmal Saeed Mian,
Tin Lun Lam
*, Yangsheng Xu, "Object-to-Scene: Learning to Transfer Object Knowledge to Indoor Scene Recognition," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Prague, Czech Republic, September 27 - October 1, 2021.
Fuqin Deng, Hua Feng, Mingjian Liang, Hongmin Wang, Yong Yang, Yuan Gao, Junfeng Chen, Junjie Hu, Xiyue Guo,
Tin Lun Lam
*, "FEANet: Feature-Enhanced Attention Network for RGB-Thermal Real-time Semantic Segmentation," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Prague, Czech Republic, September 27 - October 1, 2021.
Tianwei Zhang, Huayan Zhang, Xiaofei Li*, Junfeng Chen,
Tin Lun Lam*
, Sethu Vijayakumar, "AcousticFusion: Fusing Sound Source Localization to Visual SLAM in dynamic environments," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Prague, Czech Republic, September 27 - October 1, 2021.
Huayan Zhang, Tianwei Zhang*,
Tin Lun Lam*
, Sethu Vijayakumar, "PoseFusion2: Simultaneous Background Reconstruction and Human Shape Recovery in Real-time," Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Prague, Czech Republic, September 27 - October 1, 2021.
Yuxiao Tu, Guanqi Liang,
Tin Lun Lam*
, "Graph Convolutional Network based Configuration Detection for Freeform Modular Robot Using Magnetic Sensor Array," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Xian, China, May 30 - June 5, 2021.
Yan Gao, Lyucheng Xie,
Tin Lun Lam*
, "Thrust Enhancement of Wave-driven Unmanned Surface Vehicle by using Asymmetric Foil," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Xian, China, May 30 - June 5, 2021.
Liguang Zhou, Chenping Du, Zhenglong Sun,
Tin Lun Lam*
, Yangsheng Xu, "Long-Range Hand Gesture Recognition via Attention-based SSD Network," Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Xian, China, May 30 - June 5, 2021.
Guanqi Liang, Haobo Luo, Ming Li, Huihuan Qian and
Tin Lun Lam*
, “FreeBOT: A Freeform Modular Self-reconfigurable Robot with Arbitrary Connection Point - Design and Implementation,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Las Vegas, NV, USA (Virtual), October 25-29, 2020.
[
IROS
Best Paper Award on Robot Mechanisms and Design
]
Ming Li, Guanqi Liang, Haobo Luo, Huihuan Qian and
Tin Lun Lam*
, “Robot-to-Robot Relative Pose Estimation based on Semidefinite Relaxation Optimization,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Las Vegas, NV, USA (Virtual), October 25-29, 2020.
Haobo Luo, Ming Li, Guanqi Liang, Huihuan Qian and
Tin Lun Lam*
, “An Obstacles-crossing Strategy Based on the Self-reconfiguration of Modular Sphere Robots,” Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Las Vegas, NV, USA (Virtual), October 25-29, 2020.
Tin Lun Lam
, Huihuan Qian, and Yangsheng Xu, “Longitudinal Wheel-slip Control for Four Wheel Independent Steering and Drive Vehicles”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Hong Kong, China, pp. 5280-5285, May 31 - June 5, 2014.
Tin Lun Lam
, Jingyu Yan, Huihuan Qian, and Yangsheng Xu, “Traction/Braking Force Distribution Algorithm for Omni-directional All-wheel-independent-drive Vehicles”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Kongresszentrum Karlsruhe, Karlsruhe, Germany, pp. 738-743, May 6-10, 2013.
Tin Lun Lam
, Hoi Wut Yip, Huihuan Qian, and Yangsheng Xu, “Collision Avoidance of Industrial Robot Arms using an Invisible Sensitive Skin”, Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Vilamoura, Algarve, Portugal, pp. 4542-4543, October 7-12, 2012.
Tin Lun Lam
, Huihuan Qian, and Yangsheng Xu, “Direct Yaw Moment Control for Four Wheel Independent Steering and Drive Vehicles based on Centripetal Force Detection”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), St. Paul, Minnesota, USA, pp. 103-108, May 14-18, 2012.
Tin Lun Lam
, and Yangsheng Xu, “Mechanical Design of a Tree Gripper for Miniature Tree-Climbing Robots”, Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), San Francisco, California, USA, pp. 1487-1492, September 25-30, 2011.
Tin Lun Lam
, and Yangsheng Xu, “A Flexible Tree Climbing Robot: Treebot – Design and Implementation”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Shanghai, China, pp. 5849-5854, May 9-13, 2011.
Tin Lun Lam
, and Yangsheng Xu, “Treebot: Autonomous Tree Climbing by Tactile Sensing”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Shanghai, China, pp. 789-794, May 9-13, 2011.
Tin Lun Lam
, Guoqing Xu, Huihuan Qian, and Yangsheng Xu, “Linear-time Path and Motion Planning Algorithm for a Tree Climbing Robot – TreeBot”, Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), Taipei, Taiwan, pp. 4988-4994, October 18-22, 2010.
Tin Lun Lam
, Yangsheng Xu, and Guoqing Xu, “Traction Force Distribution on Omni-directional Four Wheel Independent Drive Electric Vehicle”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Kobe, Japan, pp. 3724-3729, May 12-17, 2009.
Tin Lun Lam
, Huihuan Qian, Yangsheng Xu, and Guoqing Xu, “Omni-directional steer-by-wire interface for four-wheel independent steering vehicle”, Proceedings of the IEEE International Conference on Robotics and Automation (ICRA), Kobe, Japan, pp. 1383-1388, May 12-17, 2009.
