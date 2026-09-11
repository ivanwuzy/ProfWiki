# hku-arc

> Source: https://arclab.hku.hk/
> Collected: 2026-09-11
> Published: Unknown
> Source Level: A0（官方机构或研究者本人公开正文；自述按原口径记录）
> Capture: 公开网页正文；删除脚本、联系方式与办公室信息；资料日期与当前状态分开判断。

## 原文

Welcome to
Adaptive
Robotic Controls Lab (ArcLab)
.
ArcLab is located at the Mechanical Engineering (ME) at the University of Hong Kong (HKU).
Our research focuses on various control techniques which can
enhance the autonomy of robotics.
News
People
Research
Robots
Publications
Software
Videos
Open Positions
Contact Us
12.2025 Our recent paper on bipedal robot locomotion on soft
terrain has been accepted by IEEE Robotics and Automation Letters.
Paper title:
MILD: Tractable Terrain Modeling for Learning Improved Bipedal Locomotion on Deformable Surfaces
Video link:
09.2025 Our recent paper on quadrupedal navigation in complex
terrains has been reported by
IEEE Spectrum
.
Report link:
IEEE Spectrum
Paper link:
Learning Autonomous and Safe Quadruped Traversal of Complex Terrains Using Multi-Layer Elevation Maps
Video link:
Youtube
09.2025 Blind locomotion policies have shown its power over
challenging terrains. However, they cannot allow robots to traverse
through risky terrains that contain wide gaps. Locomotion with
environmental perception (active locomotion that uses vision,
lidar, or other sensors) can solve such challenges. We propose
MARG, a framework that can percept the environment and actively
plan the footholds that can avoid falling into gaps.
The work has been accepted by
IEEE Transactions on Robotics
.
Title:
MARG: MAstering Risky Gap Terrains for Legged Robots with Elevation Mapping
Video:
Youtube link
09.2025 Reinforcement learning for highly dynamic robotic motions
requires complicated design and tuning of reward functions.
Imitation learning approaches the problem by mimicing the motion of
animals. Many imitation learning frameworks rely on precise motion
data that are recorded using motion capture systems, which is
costly and time-consuming as it requires professional animal
trainers and expensive motion capture devices.
We propose a imitation learning framework that can imitate
aggressive motions only from monocular videos. Our framework can
reconstruct 3D motions from 2D monocular videos.
The work has been published by
Nature Portfolio Journal
Robotics (npj robotics)
.
Title:
Learning aggressive animal locomotion skills for quadrupedal robots solely from monocular videos
Video:
Youtube
08.2025 How to perform dynamic jumping through constrained space?
We propose a hierarchical learning framework:
ConsJump
.
This framework enables quadrupedal robots to automatically transit
from walking to jumping over constrained spaces. The robot can
dynamically jump through waypoints given by users.
The paper has been published by
Advanced Robotics Research
.
Title:
Learning Highly Dynamic Skills Transition for Quadruped Jumping Through Constrained Space
Video: Youtube
08.2025 How to percept and traverse through different obstacles
using one unified policy?
We propose a framework that contains a perception module and a
locomotion module. For perception, we propose a multi-layer
elevation map which can capture the characteristics of various
terrains such as overhangs. For locomotion, our policy can perform
different motions in one policy, such as climbing, crawling, and
jumping. Finally, our framework can recognize different obstacles
and can traverse through them using different skills autonomously.
The paper has been accepted by
IEEE Robotics and Automation Letters
:
Title:
Learning Autonomous and Safe Quadruped Traversal of Complex Terrains Using Multi-Layer Elevation Maps
Video link:
Youtube
07.2025 Performing bipedal locomotion (not only standing) is
extremely difficult for quadrupedal robots cause their feet only
have pointwise contact with the surface and their motors are
designed for quadrupedal locomotion.
We propose
TumblerNet
, which can enable
quadrupedal robots to perform bipedal locomotion in challenging
terrains and in the presence of external disturbances. TumblerNet
can also quickly recover its upright position after falling over or
being stumbled. Furthermore, it can also perform stable bipedal
locomotion in highly soft terrain such as a sandy beach.
The paper has been accepted by
Nature Portfolio Journal
Robotics (npj robotics)
.
Paper title:
Learning stable bipedal locomotion skills for quadrupedal robots on challenging terrains with automatic fall recovery
PDF Link:
https://rdcu.be/eyPz8
Video Link:
Youtube
07.2025 How to enhance stability while imitating certain motions?
We propose a stable imitation learning framework that can not only
enhance stability, but also change the speed of the motion. We
demonstrate that the framework can also enable quadrupedal robots
to learn bipedal locomotion.
The paper is accepted by
Advanced Robotics Research
.
Paper title:
Stable Imitation of Multi-Gait and Bipedal Motions for Quadrupedal Robots over Uneven Terrains
Video Link:
Youtube
06.2025 We have two papers accepted by
IROS 2025
.
Paper: Like Playing a Video Game: Spatial-Temporal Optimization of Foot Trajectories for Controlled Football Kicking in Bipedal Robots
Video Link:
Youtube
Paper: Numerical Optimization-based Kinematics with Pose Tracking Control for Continuum Robots
Video Link:
Bili
06.2025 Quadrupedal robots can easily lose control during highly
dynamic motions such as jumping.
Our
RAL
paper proposes a learning framework that enables
quadrupedal robots to jump in an omnidirectional fashion.
Paper title:
OmniNet: Omnidirectional Jumping Neural Network With Height-Awareness for Quadrupedal Robots
Video Link:
Youtube
04.2025 Quadrupedal robots inevitably fall over when walking on
extremely steep stairs or challenging terrains.
How to quickly recover its postures without rolling down? Our
FR-Net in
RAL
proposes a solution for this.
Paper title:
FR-Net: Learning Robust Quadrupedal Fall Recovery on Challenging Terrains through Mass-Contact Prediction
Video link:
Youtube
04.2025 How to search dynamic objects in unknown environments? We
propose a time potential map which can estimate the target
distribution based on historical search information. The paper is
accepted by
Robotics and Autonomous Systems
.
Paper title:
DAPTP: Distributed Awareness Planner using Time Potential for dynamic target search
Video:
Youtube
03.2025 From perception to action? Yes, our
RAL
paper proposes an
end-to-end learning-based framework for UAVs to avoid obstacles in
dynamic environments with high speeds.
Paper title:
Flying in Highly Dynamic Environments With End-to-End Learning Approach
Video link:
Youtube
02.2025 Our work on 3D Gaussian Splatting has been accepted by
IEEE Transactions on Instrumentation and Measurement
.
Paper title:
LVI-GS: Tightly-coupled LiDAR-Visual-Inertial SLAM using 3D Gaussian Splatting
01.2025 Our AET paper has been published in
Nature Communications
.
Paper title:
A dexterous and
compliant aerial continuum manipulator for cluttered and
constrained environments
This paper proposes a highly dexterous and compliant aerial
continuum manipulator (Aerial Elephant Trunk). We have proposed the
design, designed the shape estimation method, developed a feedback
controller, and proposed a whole-body motion planning module such
that the UAV and the continuum manipulator could carry out tasks as
a whole.
AET can perform various challenging aerial manipulation tasks,
including but not limited to:
1) grasping object of various sizes and shapes;
2) traversing constrained pipelines with various shapes;
3) aerial writing/painting;
4) performing manipulation in various complex environments.
Main Video
Video Clips:
Aerial shape deformation
Aerial
grasping
Pipeline
traversal
Aerial
grasping in complex environments
Aerial
painting
12.2024 Our first PhD student at HKU has successfully defended his
PhD thesis
12.2024 Have you ever seen an aerial continuum manipulator that can
perform various challenging tasks?
We introduce Aerial Elephant Trunk (AET), which can perform
dexterous manipulation tasks in complex environments that are
filled with obstacles.
The paper has been accepted by
Nature Communications
.
More details will follow.
12.2024
Navigating in a highly dynamic and cluttered environment is a very
complex task for UAVs. We propose FAPP, a fast and adaptive
perception and planning framework for drones.
Check our latest
IEEE Transactions on Robotics
paper for more details:
Paper:
FAPP: Fast and Adaptive Perception and Planning for UAVs in Dynamic Cluttered Environments
Video:
FAPP
11.2024 We are honored to have Prof. Yunhui Liu visiting our lab.
09.2024 We are honored to have Prof. Toshio Fukuda visiting our lab.
08.2024 How to use Deep Reinforcement Learning for path planning
and obstacle avoidance while achieving a similar smoothness
performance of conventional methods? We propose an end-to-end
approach that considers the motion constraints of differential
drive robots, which can obtain a high velocity and smooth path
while significantly reducing the processing time. Please see our
IEEE transactions on intelligent vehicles
paper for more details:
Paper:
Mobile Robot Collision Avoidance Based on Deep Reinforcement Learning with Motion Constraints
Video:
DRL
05.2024 3D dense mapping in aggressive motions remains challenging.
We have used event cameras to improve dense mapping under
aggressive motions. The performance is even better than several
NERF-based methods.
Please check our
Advanced Intelligent Systems
paper for more details:
Paper:
EVI-SAM: Robust, Real-Time, Tightly-Coupled Event–Visual–Inertial State Estimation and 3D Dense Mapping
Video:
EVI-SAM
04.2024 How to search for unknown dynamic objects in unknown
environments using multiple robots?
We provide a Multi-Agent Reinforcement Learning framework to
solving this issue.
Check our
RAL
paper and video for more details:
Paper:
HMA-SAR: Multi-Agent Search and Rescue for Unknown Located Dynamic Targets in Completely Unknown Environments
Video:
HMA-SAR
03.2024 How to control quadruped robots with various configurations
(structures, size, weights, etc.) and allow them to walk stably in
various terrains?
We provide one solution to that with our MorAL framework. See our
RAL
paper:
Title:
MorAL: Learning Morphologically Adaptive Locomotion Controller for Quadrupedal Robots on Challenging Terrains
Video:
MorAL
03.2024 We have just opensourced the software for our event-based
visual odometry algorithm:
ESVIO
.
Code:
Github
Link
Paper:
P. Chen, W. Guan and P. Lu, "ESVIO: Event-Based Stereo Visual Inertial Odometry," in IEEE Robotics and Automation Letters, vol. 8, no. 6, pp. 3661-3668, June 2023.
02.2024 Our paper on continuum robotic arm has been accepted by
IEEE
Robotics and Automation Letters
.
A Tendon-driven Continuum Manipulator with Robust Shape Estimation by
Multiple IMUs
11.2023 Our paper on SLAM has been accepted by
IEEE Transactions on Intelligent Vehicles
.
ECMD: An Event-Centric Multisensory Driving Dataset for SLAM
10.2023 Our paper on quadruped robot has been accepted
by
IEEE Robotics and Automation Letters
:
FT-Net: Learning Failure Recovery and Fault-tolerant Locomotion For Quadruped Robots
Our FT-net can enable quadruped robots to work even in the presence
of partial and total rotor failures.
09.2023 Our paper on event-based visual odometry has been accepted
by
IEEE Transactions on Automation Science and Engineering
:
PL-EVIO: Robust monocular event-based visual inertial odometry with point and line features
Our event-based VO can enable quadrotors to perform aggressive
maneuvers by using the onboard estimation without replying on
motion capture systems.
07.2023 Our paper on deep reinforcement learning has been accepted
by
IEEE Robotics and Automation Letters
:
Learning Agile Flights through Narrow Gaps with Varying Angles using Onboard Sensing
06.2023 Our paper on dynamic obstacle avoidance has been accepted
by
IEEE/ASME Transactions on Mechatronics.
Title:
Flying in Dynamic Scenes With Multitarget Velocimetry and
Perception-Enhanced Planning
05.2023 Our paper on visual odometry has been accepted by
IEEE Transactions on Instrumentation and Measurement
Title: Filtering 2D-3D Outliers by Camera Adjustment for Visual Odometry
04.2023 Our event-based VIO has been
accepted by
IEEE Robotics and Automation Letters
:
ESVIO: Event-based Stereo Visual Inertial Odometry
The ESVIO
can provide a stable and accurate state estimation in the presence
of aggressive motions (aggressive rotational rates) and dark
environments.
aggressive rotational rates:
from bright to dark environment:
Link
VIDEO Youtube
VIDEO bilibili
03.2023 We are excited to share our aerial continuum arm AeCoM.
AeCoM: An Aerial Continuum Manipulator with IMU-based Kinematic
Modeling and Tendon-slacking Prevention.
IEEE Transactions
on Systems, Man, and Cybernetics: Systems
, 2023, 1-13.
LINK
VIDEO
Youtube
VIDEO Bilibili
07.2022 Our paper
Perception and Avoidance of Multiple Small Fast Moving Objects for
Quadrotors with Only Low-cost RGBD Camera
has been
accepted by
IEEE Robotics and Automation Letters
Our quadrotor can avoid multiple fast-moving tennis balls which are
thrown simultaneously or continuously with only a RGBD camera.
PDF
LINK
VIDEO
07.2022 Our paper on event camera-based VIO has been acceptd by
IROS 2022:
Monocular Event Visual Inertial Odometry based on Event-corner
using Sliding Windows Graph-based Optimization
VIDEO
06.2022 Our paper has been accepted by
Journal of Intelligent & Robotic Systems
Terminal Sliding Mode Control for Quadrotors with Chattering Reduction and Disturbances Estimator: Theory and Application
(the work was finished in 2019)
VIDEO
LINK
05.2022 Our papers have been accepted by
Franklin Open
.
Event-Triggered Integral Sliding Mode Formation Control for Multiple Quadrotor UAVs with Unknown Disturbances
Comparative Study of State and Unknown Input Estimation for Continuous-discrete Stochastic Systems.
12.04.2022 Our paper
Real-time identification and avoidance of simultaneous static and dynamic obstacles on point cloud for UAVs navigation
submitted to
Robotics and Autonomous Systems
has been accepted.
Our drone can avoid both static and dynamic obstacles while
navigating in an unknown environment.
PDF
Link
VIDEO
27.01.2022 Our paper
Stereo Orientation Prior for UAV Robust and Accurate Visual Odometry
is accepted by
IEEE/ASME Transactions on Mechatronics
.
Link
VIDEO
15.09.2021 GUAN W.P. joins the lab as a PhD student. He will be
working on SLAM for ground robots.
23.08.2021 Our paper is accepted by
IEEE Transactions on Neural Networks and Learning Systems
(TNNLS)
.
Title:
Flying Through a Narrow Gap Using End-to-end Deep Reinforcement
Learning Augmented with Curriculum Learning and Sim2Real
We used purely deep reinforcement learning to tackle the task
instead of referring to any traditional methods.
PDF
Link
Video
20.08.2021 LU Minghao, SUN Jiahao and XIE Yuhan joined the lab as
PhD/Mphil students.
01.07.2021 Our paper is accepeted by
IROS 2021
.
Title:
A Motion decoupled Aerial Robotic
Manipulator for Better Inspection
We designed a motion decoupling mechanism and a gravity
compensation mechanism to facilitate the use of these aerial
manipulators for inspection tasks.
Video Link
01.11.2020 XU Juntao and XIE Yuhan joined the lab as research
assistant. They work on the visual tracking and deep reinforcement
learning for drones.
05.09.2020 PENG Rui joined the lab as a PhD student. He was a
Research assistant working on the vision for UAVs.
03.09.2020
A preliminary demo
of the quadrotor flight
despite the
loss of two propellers
.
VIDEO
This is the demo video for the following paper:
P Lu, E van Kampen,
Active fault-tolerant control for quadrotors subjected to a complete rotor failure
,
2015 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 4698-4703.
01.09.2020
ArcLab has moved to department of
Mechanical Engineering,
the University of Hong Kong
.
01.07.2020
NIE Shengyi and PENG Rui joined the group as a research assistant.
01.07.2020
Paper "
Computationally
Efficient Obstacle Avoidance Trajectory Planner for UAVs Based on
Heuristic Angular Search Method
" is accepted by
IROS 2020
. Experimental results coming soon.
VIDEO
17.01.2020
Paper "
Nonsingular Terminal Sliding Mode Control for a Quadrotor UAV with a Total Rotor Failure
" has been accepted
and published online by Aerospace Science and Technology.
18.12.2019
A preliminary video of
deep reinforcement learning for aggressive
quadrotor flights
.
We
purely
use deep reinforcement learning to plan the
trajectory of a quadrotor to pass through titled narrow gaps.
VIDEO
15.12.2019
Paper "
Performance comparison of representative model-based fault reconstruction algorithms for aircraft sensor fault detection and diagnosis
"
has been accepted and published online by Aerospace Science and Technology.
04.12.2019
Paper "
Dynamic Obstacle Avoidance for UAVs Using a Fast Trajectory Planning Approach
" has been accepted by ROBIO 2019.
PDF
LINK
VIDEO
(initial
version)
Drone is passing through moving objects in real time.
06.11.2019
We have won the thrid place in the
IROS Autonomous Drone Racing
competition
.
Video for part of
our flight during the competition
.
16.10.2019
Welcome our new RA-
Rui CAO
.
20.09.2019
A preview of the work on
accurate stereo visual odometry for quadrotors
We developed a stereo-vision Orientation prior visual odometry
for UAV navigation.
Video
20.09.2019
A preview of the video regarding
terminal sliding mode for quadrotors
subjected to rotor failures and external disturbances
. Our
proposed method is very robust against partial rotor failures and
external disturbances.
Video
30.08.2019
Welcome our new PhD
Han Chen
!
16.08.2019
Video of our work:
Object Pose Estimation using end-to-end CNN for UAVs
Video
20.06.2019
Our paper titled "
Adaptive Unscented Kalman Filter-based Disturbance Rejection With    Application to High Precision Hydraulic Robotic Control
"
has been accepted by
IROS 2019
!
The video of the paper can be found at:
Video
The preliminary version of the paper is at:
PDF
Collaborative paper titled "
Boundary Effect-Aware Visual Tracking for UAV with Online Enhanced Background Learning and Multi-Frame Consensus Verification
"
with Tong Ji University has been accepted by
IROS 2019
!
24.05.2019
Dr Lu is giving a Keynote at
Global Conference on UAV application
and Anti-UAV 2019
.
30.03.2019
Keynote speech at ICEDME 2019.
25.02.2019
Welcome our new RA
Yanhui Guo
!
14.02.2019
Welcome our new Postdoc
Zhiwei HOU
!
14.01.2019
Welcome our new PhD student
Ran DUAN
!
Ran was working in our lab as a Research Assistant before his PhD Study.
02.01.2019
Welcome our new Research Assistant
Zhangjie
TU
!
28.11.2018
Dr Peng Lu is invited to give a talk at
South China University of
Technology
.
Advanced
control techniques for autonomous UAVs and robotics
14.11-16.11 2018
Dr Peng Lu is invited to give a two-day lecture at
Chengdu
Aircraft Design & Research Institute
.
31.10.2018
Welcome our new Research Assistant
Ran DUAN
!
18.10.2018
Our paper titled "
Nonlinear Disturbance Attenuation Control of Hydraulic
Robotics
"
has been accepted by
ROBIO 2018
!
We present an efficient and effective control approach for robotics such
as hydraulic robots.
The link is at:
Paper
The paper is at:
PDF
The video is at:
Youtube Link
12.10.2018
Welcome visitors from
Hong Kong Institution of Engineers (HKIE)
.
We have performed two successful UAV demos.
01.10.2018
Welcome our new visiting PhD student
Qizhi He
!
21.09.2018
Welcome our new RA
Chenxi Xiao
!
25.07.2018
Collaborative paper with TU Delft is accepted by
Journal of Guidance,
Control and Dynamics
!
Incremental Sliding Mode Fault-Tolerant Flight Control
29.06.2018
Collaborative paper with ETH&UZH RPG Group is accepted by
IROS 2018
!
PAMPC: Perception-Aware Model
Predictive Control for Quadrotors
24.05.2018
Dr. Peng Lu
is invited to give a talk at
Northwestern
Polytechnical University
.
The topic is:
Nonlinear controllers for unmanned aerial vehicles: challenges and
applications
27.12.2017
Dr. Peng Lu
is invited to give a talk at
Shanghai
Jiao Tong University
.
The topic is:
Advanced motion planning and control techniques for robotics
©
All rights reserved.
