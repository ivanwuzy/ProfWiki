# HKU MaRS Lab

> Source: https://mars.hku.hk/
> Collected: 2026-09-11
> Published: Unknown
> Source Level: A0（官方机构或研究者本人公开正文；自述按原口径记录）
> Capture: 公开网页正文；删除脚本、联系方式与办公室信息；资料日期与当前状态分开判断。

## 原文

HKU MaRS Lab
Skip to content
Home
News Center
Research
People
Publications
Dataset
Spatial
Intelligence
Robotic Control
Embodied AI
Aerial Platform and
Manipulation
About Us
Welcome to the Mechatronics and Robotic Systems (MaRS)
Laboratory.
We are part of the Department of Mechanical Engineering at the
University
of Hong Kong (HKU). Our lab is dedicated to developing
intelligent robotic
systems, especially aerial robots, that can autonomously and
efficiently
operate in complex real-world environments. Our research vision
is to
enable robots to understand tasks, reason about the physical
world, and
make autonomous decisions in a human-like manner, while
exceeding human
capabilities in speed, precision, and operational efficiency.
Our current
research directions include
Spatial
Intelligence
,
Robotic
Control
,
Embodied AI
, and
Aerial
Platform and Manipulation
.
We have multiple openings for research assistants, MPhil
students, and PhD
students. We welcome candidates
who are
passionate about unmanned aerial vehicles, spatial intelligence,
robot
autonomy, embodied AI, and real-world robotic
applications.
Candidates with experience in mechanical design, manufacturing,
embedded
systems, control engineering,
SLAM, or learning-based robotics are encouraged
to contact
Prof. Fu Zhang at
for
further details.
Project Highlights
Visibility-Aware Cooperative Tracking with Decentralized LiDAR-Based Aerial
Swarms (T-RO 2026)
For a drone to follow a moving
subject, it must keep an unobstructed line of sight, and a single tree or wall
in the wrong place is enough to lose the target. A team of drones can cover for
one another, but only if they know, at every instant, where the blind spots are
and how to redistribute themselves in three-dimensional (3D) space. This work
introduces a Spherical Signed Distance Field (SSDF), a representation that
encodes the 3D pattern of occlusion around a moving target and, for the first
time, brings this graphics technique into robotic planning. Built on an
incremental update algorithm that runs onboard in real time, it lets each drone
measure how deeply it is hidden and in which direction to escape. Coupling this
with a field-of-view cost for heterogeneous LiDARs and an
electrostatic-potential-inspired metric that spreads the swarm around the
target, a fully decentralized system of four drones sustains near-complete
visibility while tracking flying drones and human runners through cluttered
outdoor environments.
Authors: Longji Yin, Yunfan
Ren, Fangcheng Zhu, Liuyu Shi, Fanze Kong, Benxu Tang, Wenyi Liu, Ximin Lyu, and
Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Memory-Efficient Boundary Map for Large-Scale Occupancy Grid Mapping (IJRR Q3
2026, Best
Seasonal Paper Honorable Mention)
For autonomous robots to
operate safely and make informed decisions, they must constantly know which
areas in the environment are occupied, free or unknown. Traditionally, this is
done by mapping the entire three-dimensional (3D) environment, which consumes a
massive amount of memory, especially in large-scale scenarios. This work
introduces a novel two-dimensional (2D) boundary representation that reduces
memory consumption by up to 100x. Additionally, it features a specialized data
structure for fast map queries and a global-local framework to update the map
from real-time sensor data. Unlike existing methods that trade-off among memory,
query and update efficiency, this work achieves significant memory savings while
preserving high query and update performance, breaking this "impossible
trinity”.
Authors: Benxu Tang, Yunfan
Ren, Yixi Cai, Fanze Kong, Wenyi Liu,
Fangcheng Zhu, Longji Yin, Liuyu Shi, and Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Safety-assured high-speed navigation for MAVs (Science Robotics'25 Visual
Featuring)
Micro air vehicles (MAVs)
enable high-speed autonomous navigation for search and rescue but face
challenges in weight, sensing, and control. We present SUPER, a 280-mm MAV with
a thrust-to-weight ratio >5.0 for agile flight in cluttered environments. It
uses a lightweight 3D LiDAR for long-range obstacle detection and an efficient
planning framework that generates two trajectories—one for safety, another for
speed. Compared to baselines, SUPER reduced failure rates by 35.9x, halved
planning time, and achieved 20 m/s speeds, successfully avoiding obstacles.
SUPER marks a milestone in MAV autonomy, bridging lab research to real-world
applications.
Authors: Yunfan Ren, Fangcheng
Zhu, Guozheng Lu, Yixi Cai, Longji Yin, Fanze Kong, Jiarong Lin, Nan Chen, Fu
Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
FAST-LIVO2: Fast, Direct LiDAR-Inertial-Visual Odometry (TRO'25, King-Sun Fu
Memorial Best Paper Award.)
Fast-LIVO2 is a fast, direct
LiDAR-inertial-visual odometry framework designed for accurate and robust state
estimation in SLAM tasks, ideal for real-time, onboard robotic applications. It
fuses IMU, LiDAR, and image measurements using an error-state iterated Kalman
filter (ESIKF) and a sequential update strategy. Direct methods are employed for
visual and LiDAR fusion, using a unified voxel map for geometric structure and
image alignment. Plane priors and dynamic reference patch updates enhance image
alignment accuracy. Extensive experiments show Fast-LIVO2's superior accuracy,
robustness, and computational efficiency. Applications include UAV navigation,
airborne mapping, and 3D model rendering.
Authors: Chunran Zheng, Wei Xu,
Zuhao Zou, Tong Hua, Chongjian Yuan, Dongjiao He, Bingyang Zhou, Zheng Liu,
Jiarong Lin, Fangcheng Zhu, Yunfan Ren, Rong Wang, Fanle Meng, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Autonomous Tail-Sitter Flights in Unknown Environments (TRO'25)
Trajectory generation for fully
autonomous tail-sitter UAVs is challenging due to their nonlinear aerodynamics.
This article presents the first fully autonomous tail-sitter UAV capable of
high-speed navigation in unknown, cluttered environments. Enabled by LiDAR-based
sensing and differential-flatness-based planning, it uses onboard computation
for real-time control. We propose an optimization-based trajectory planning
framework ensuring high-speed, collision-free, and dynamically feasible motion.
To solve this nonlinear, constrained problem, we develop EFOPT, a
feasibility-assured solver. Extensive simulations and real-world tests,
including flights up to 15 m/s, validate its performance in diverse
environments.
Authors: Guozheng Lu, Yunfan
Ren, Fangcheng Zhu, Haotian Li, Ruize Xue, Yixi Cai, Ximin Lyu, Fu Zhang
Videos:
bilibili
youtube
Paper:
Link
Moving event detection from LiDAR point streams (Nature Communications'24)
In dynamic environments, robots
require instantaneous detection of moving events with microseconds of latency.
This task, known as moving event detection, is typically achieved using event
cameras. While light detection and ranging (LiDAR) sensors are essential for
robots due to their dense and accurate depth measurements, their use in event
detection has not been thoroughly explored. Current approaches involve
accumulating LiDAR points into frames and detecting object-level motions,
resulting in a latency of tens to hundreds of milliseconds. We present a
different approach called M-detector, which determines if a point is moving
immediately after its arrival, resulting in a point-by-point detection with a
latency of just several microseconds. M-detector is designed based on occlusion
principles and can be used in different environments with various types of LiDAR
sensors. Our experiments demonstrate the effectiveness of M-detector on various
datasets and applications, showcasing its superior accuracy, computational
efficiency, detection latency, and generalization ability.
Authors: Huajie Wu, Yihang Li,
Wei Xu, Fanze Kong, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Free access here
Swarm-LIO2: Decentralized, Effcient LiDAR-inertial Odometry for UAV Swarms
(TRO'24)
Swarm-LIO2 is a fully
decentralized, plug-and-play, and bandwidth-efficient LiDAR-inertial odometry
system for aerial swarms. It ensures accurate self and mutual state estimation,
vital for tasks like cooperative exploration and search and rescue. Swarm-LIO2
uses a decentralized network to exchange minimal information, such as identity
and mutual observations. It automatically detects new UAV teammates and
initializes temporal offsets and global transformations. The system integrates
LiDAR, IMU, and mutual observations in an efficient ESIKF framework, enhancing
accuracy and consistency.
Authors: Fangcheng Zhu*, Yunfan
Ren*, Longji Yin*, Fanze Kong, Qingbo Liu, Ruize Xue, Wenyi Liu, Yixi Cai,
Guozheng Lu, Haotian Li, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
R
3
LIVE++ : A Robust, Real-Time, Radiance Reconstruction Package With
a Tightly-Coupled LiDAR-Inertial-Visual State Estimator (TPAMI'24)
R
3
LIVE++ is a
LiDAR-inertial-visual fusion framework designed for robust and accurate state
estimation and real-time radiance map reconstruction. It integrates real-time
LiDAR-inertial odometry (LIO) for geometric structure and visual-inertial
odometry (VIO) for radiance information. Building on R
3
LIVE, it
enhances localization and mapping accuracy by considering camera photometric
calibration and online exposure time estimation. Extensive experiments on
various datasets show R
3
LIVE++'s superior accuracy and robustness
compared to state-of-the-art SLAM systems. Applications based on the
reconstructed maps include HDR imaging, virtual environment exploration, and 3D
video gaming.
Authors: Jiarong Lin, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
A self-rotating, single-actuated UAV with extended sensor field of view for
autonomous navigation (Science Robotics'23 Visual Featuring)
We present poweredflying
ultra-underactuated LiDAR sensing aerial robot (PULSAR), an agile and
selfrotating UAV whose three-dimensional position is fully controlled by
actuating only one motor to obtain the required thrust and moment. The use of a
single actuator effectively reduces the energy loss in powered flights.
Consequently, PULSAR consumes 26.7% less power than the benchmarked quadrotor
with the same total propeller disk area and avionic payloads while retaining a
good level of agility. Augmented by an onboard LiDAR sensor, PULSAR can perform
autonomous navigation in unknown environments and detect both static and dynamic
obstacles in panoramic views without any external instruments.
Authors: Nan Chen, Fanze Kong,
Wei Xu, Yixi Cai, Haotian Li, Dongjiao He, Youming Qin, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Trajectory generation and tracking control for aggressive tail-sitter flights
(IJRR'23)
We tackle the theoretical and
practical issues of trajectory generation and tracking control for tail-sitter
UAVs. We focus on the differential flatness property using accurate UAV
aerodynamic models, laying the groundwork for feasible trajectory generation and
high-performance tracking. We found that tail-sitters are differentially flat
with precise aerodynamic models across the entire flight envelope. This allows
us to utilize high-fidelity models for accurate flight planning and control. We
propose an optimization-based trajectory planner that accounts for kinodynamic
constraints, singularity-free conditions, and actuator saturation. To track the
trajectory, we developed a global, singularity-free, minimally parameterized
on-manifold MPC. Our algorithms were tested on the quadrotor tail-sitter
prototype "Hong Hu" and demonstrated effectiveness in various real-world
experiments, including agile SE(3) flight, typical maneuvers, and aggressive
aerobatics.
Authors: Guozheng Lu, Yixi Cai,
Nan Chen, Fanze Kong, Yunfan Ren, Fu Zhang
Videos:
bilibili
youtube
Paper:
Link
Efficient and Consistent Bundle Adjustment on Lidar Point Clouds (TRO'23)
BALM2 is an efficient and
consistent bundle adjustment method for LiDAR sensors, addressing the
simultaneous determination of sensor poses and scene geometry. It uses edge and
plane features to represent geometry, minimizing the Euclidean distance from raw
points to these features. This formulation allows for analytical solutions,
reducing optimization dimensions. The method introduces point clusters to encode
raw points with compact parameters, enhancing optimization efficiency. A
second-order BA solver is developed, providing consistent pose estimates and
uncertainty evaluation. This solver avoids raw point enumeration in optimization
steps.
Authors: Zheng Liu, Xiyuan Liu,
Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Occupancy Grid Mapping Without Ray-Casting for High-Resolution LiDAR Sensors
(TRO'23)
We present D-Map, an efficient
occupancy mapping framework for high-resolution LiDAR sensors. To address
computational efficiency challenges, I propose three main innovations. First, I
use depth images to determine occupancy states instead of traditional
ray-casting. Second, an efficient on-tree update strategy is introduced,
avoiding redundant visits to small cells and reducing updates. Third, I remove
known cells during each update, leveraging LiDAR's low false alarm rate,
enhancing efficiency and introducing a decremental property. Theoretical
analysis and extensive benchmark experiments demonstrate D-Map's superior
efficiency and comparable accuracy. Real-world applications include real-time
occupancy mapping on a handheld device and an aerial platform.
Authors: Yixi Cai, Fanze Kong,
Yunfan Ren, Fangcheng Zhu, Jiarong Lin, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
MARS-LVIG dataset: A multi-sensor aerial robots SLAM dataset for
LiDAR-visual-inertial-GNSS fusion (IJRR’23)
In recent years, advancements
in LiDAR technology have made 3D LiDAR sensors more accessible, spurring
interest in multi-sensor fusion for SLAM research. However, datasets with aerial
downward-looking views are scarce. To address this, I introduce the MARS-LVIG
dataset, providing unique aerial LiDAR-Visual-Inertial-GNSS data from altitudes
between 80 m and 130 m. The dataset includes 21 sequences across diverse
environments, with UAV speeds from 3 m/s to 12 m/s, covering areas up to 577,000
m². It features a synchronized sensor package and includes ground truth for
localization and mapping. Download at: https://mars.hku.hk/dataset.html.
Authors: Haotian Li, Yuying
Zou, Nan Chen, Jiarong Lin, Xiyuan Liu, Wei Xu, Chunran Zheng, Rundong Li,
Dongjiao He, Fanze Kong, Yixi Cai, Zheng Liu, Shunbo Zhou, Kaiwen Xue, Fu Zhang
Dataset:
dataset
Paper:
Link
BTC: A Binary and Triangle Combined Descriptor for 3D Place Recognition (TRO'23)
Accurate and robust place
recognition is crucial for robot navigation, yet achieving full pose invariance
across diverse scenes is challenging. In this work, I propose the Binary
Triangle Combined (BTC) descriptor, a novel global and local combined
descriptor. We extract keypoints from a point cloud and form unique triangles
from any three keypoints. The triangle sides form a global descriptor, while a
binary descriptor captures local point distributions. This combination allows
for natural similarity determination and accurate relative pose estimation. Our
BTC descriptor enhances accuracy, efficiency, and robustness by combining global
and local geometric information. Extensive comparisons with state-of-the-art
methods on diverse datasets demonstrate BTC's superior adaptability and
precision, especially in challenging scenarios with significant viewpoint
variations.
Authors: Chongjian Yuan,
Jiarong Lin, Zheng Liu, Hairuo Wei, Xiaoping Hong, Fu Zhang
Videos:
youtube
Code:
Github
Star
Paper:
Link
Immesh: An immediate lidar localization and meshing framework (TRO'23)
In this article, I propose
ImMesh, a novel LiDAR(-inertial) odometry and mapping framework for real-time
simultaneous localization and meshing. ImMesh consists of four tightly-coupled
modules: receiver, localization, meshing, and broadcaster. The localization
module processes sensor data to estimate sensor pose and dynamically update the
map. The meshing module incrementally reconstructs triangle meshes from
registered LiDAR scans using an efficient voxel structure. This voxel-wise
meshing operation is designed for efficiency, projecting 3D points to 2D planes
and reconstructing triangles incrementally. ImMesh publishes real-time odometry,
maps, and meshes via the broadcaster. This framework uniquely achieves
large-scale, real-time mesh reconstruction using only a standard CPU.
Authors: Jiarong Lin, Chongjian
Yuan, Yixi Cai, Haotian Li, Yunfan Ren, Yuying Zou, Xiaoping Hong, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
Point-LIO: Robust High-Bandwidth LiDAR-Inertial Odometry (Advanced Intelligent
Systems'23 Readers' Choice Finalist)
Point-LIO is a robust and
high-bandwidth LiDAR-inertial odometry with the capability to estimate extremely
aggressive robotic motions. In experiments, it is able to provide accurate,
high-frequency odometry (4-8 kHz) and reliable mapping under severe vibrations
and aggressive motions with high angular velocity beyond the IMU measuring
ranges. And Point-LIO is computationally efficient, robust, versatile on public
datasets with general motions. As an odometry, Point-LIO could be used in
various autonomous tasks, such as trajectory planning, control, and perception,
especially in cases involving very fast ego-motions or requiring high-rate
odometry output and mapping.
Authors: Dongjiao He, Wei Xu,
Nan Chen, Fanze Kong, Chongjian Yuan, Fu Zhang
Videos:
bilibili
youtube
Code:
Github
Star
Paper:
Link
FAST-LIO2: Fast Direct LiDAR-inertial Odometry (TRO'22 Popular Highlights)
FAST-LIO2 is
computationally-efficient (e.g., up to 100 Hz odometry and mapping in large
outdoor environments), robust (e.g., reliable pose estimation in cluttered
indoor environments with rotation up to 1000 deg/s), versatile (i.e., applicable
to both multi-line spinning and solid-state LiDARs, UAV and handheld platforms,
and Intel and ARM-based processors), while still achieving higher or comparable
accuracy with existing methods.
Authors: Wei Xu, Yixi Cai,
Dongjiao He, Jiarong Lin, Fu Zhang
Videos:
bilibili
youtube1
youtube2
Code:
Github
Star
Paper:
Link
Mechatronics and Robotic Systems Lab
Site Map
News Center
Research
People
Publications
Dataset
Contact
LG-02, Haking Wong Building,
University of Hong Kong,
Pokfulam, Hong Kong
© 2026 Mechatronics and Robotic Systems
Lab
of
Mechanical
Engineering Dept.
at
University of
Hong Kong
