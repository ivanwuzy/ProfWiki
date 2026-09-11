# BFM-Zero项目

> Source: https://lecar-lab.github.io/BFM-Zero/
> Collected: 2026-09-11
> Published: Unknown
> 保存范围：网页正文；去除网页脚本、导航元素和联系方式，保留原文措辞。主页内容为采集时快照，不推定全部身份在采集日仍有效。

BFM-Zero: A Promptable Behavioral Foundation Model for Humanoid Control Using Unsupervised Reinforcement Learning
BFM-Zero
A Promptable Behavioral Foundation Model for Humanoid Control Using Unsupervised Reinforcement Learning
BFM-Zero: A Promptable Behavioral Foundation Model for Humanoid Control Using Unsupervised Reinforcement Learning
Yitang Li
*
Zhengyi Luo
*
Tonghe Zhang
$
Cunxi Dai
$
Anssi Kanervisto
Andrea Tirinzoni
Haoyang Weng
Kris Kitani
Mateusz Guzek
Ahmed Touati
Alessandro Lazaric
Matteo Pirotta
†
Guanya Shi
†
*
Equal contribution
$
Equal contribution
†
Equal advising
PDF
ArXiv
Video
Summary
Code
Video
Teaser Video
Abstract
Building
Behavioral Foundation Models
(BFMs) for humanoid robots has the potential to unify diverse control tasks under a single, promptable generalist policy. However, existing approaches are either exclusively deployed on simulated humanoid characters, or specialized to specific tasks such as tracking. We propose
B
F
M
-Zero
, a framework that learns an effective shared latent representation that embeds
motions
,
goals
, and
rewards
into a common space, enabling a single policy to be prompted for multiple downstream tasks without retraining. This well-structured latent space in BFM-Zero enables versatile and robust whole-body skills on a Unitree G1 humanoid in the real world, via diverse inference methods, including zero-shot
motion tracking
,
goal reaching
, and
reward optimization
, and few-shot optimization-based adaptation. Unlike prior on-policy reinforcement learning (RL) frameworks, BFM-Zero builds upon recent advancements in
unsupervised RL
and
Forward-Backward (FB)
models, which offer an
objective-centric, explainable, and smooth latent representation
of whole-body motions. We further extend BFM-Zero with critical reward shaping, domain randomization, and history-dependent asymmetric learning to bridge the sim-to-real gap. Those key design choices are quantitatively ablated in simulation. A first-of-its-kind model, BFM-Zero establishes a step toward scalable, promptable behavioral foundation models for whole-body humanoid control.
Approach
An overview of the
B
F
M
-Zero
: After the pre-training stage, BFM-Zero forms a latent space that can be used for zero-shot inference and few-shot adaptation.
Objective: Learn a
unified latent representation
that embeds tasks (e.g., target motions, rewards, goals) into a shared space and a
promptable policy
that conditions on this representation to perform diverse tasks without retraining.
BFM-Zero can
zero-shot
perform tasks including motion tracking, goal reaching, and reward optimization.
BFM-Zero supports
few-shot adaptation
to quickly adapt to specific requirements with minimal additional training.
How it works:
Unsupervised
RL and
Zero-shot
inference
In pre-training, BFM-Zero aims to learn a latent space $z\in Z$, a forward
$\boldsymbol{F}(s, a, z)$
and a backward
$\boldsymbol{B}(s)$
representations, and a $z$-conditioned policy $\pi_z$ such that:
Starting from $\{s,a\}$ and follow $\pi_z$, the visitation probability of $s'$ is approximately
$\boldsymbol{F}(s, a, z)^\top$
$\boldsymbol{B}(s')$
.
The Q-function of $\pi_z$ is given by
$\boldsymbol{F}^\top $
$z$ but not learned with supervision from any task-related rewards.
In inference time, for various objectives (goal reaching, tracking, reward optimization), we can use following fomulas to compute $z$ in a
zero-shot
way:
Goal Reaching
Natural transitions to any goal pose
Input:
Target goal pose $s_g$
$$z = B(s_g)$$
Motion Tracking
Real-time motion following
Input:
Target reference motion $\{s_1, ..., s_T\}$
$$z_t = \sum_{n}^N \lambda^n B(s_{t+n})$$
$N$ is the window-size for tracking.
Reward Optimization
Optimize reward functions in inference-time
Input:
Any given reward function $r(s)$
$$z = \sum_{i} B(s_i)r(s_i)$$
$s_i$ is the $i$-th state in the buffer.
🔑 Remark:
Compared to other frameworks, we don't give the model any specific（task-related） reward in the training, i.e., it is an
unsupervised RL
problem. Moreover, the learned representation
$\boldsymbol{F}$
,
$\boldsymbol{B}$
and latent $Z$ are
aware of humanoid dynamics
.
The
well-regularized, dynamics-aware
latent space ✨ also enables
natural and smooth
transitions during
goal reaching
,
natural and gentle
recovery in
motion tracking
and
disturbance rejection
,
zero-shot
reward optimization
(for any given reward at test time), and
efficient
few-shot adaptation
⚡.
Zero-shot Inference
ALL demos are
real-time
(except for the tracking highlight) and from
the same policy
.
Goal Reaching
Click image for real-world goal pose, click ▶ for natural transition, and drag the progress bar to view frame by frame.
00:00.00
We also test diverse initial on the ground pose to a standing pose.
Follow the gallery to see the full description of the performance.
Your browser does not support the video tag.
Target: T-Pose
BFM-Zero enables a natural and smooth transition from the ground to T-Pose.
Your browser does not support the video tag.
Target: T-Pose
A brief running-like adjustment occurs before achieving full stability.
Your browser does not support the video tag.
Target: Hands-on-hips posture
Smooth and natural transitions to Hands-on-hips posture.
Your browser does not support the video tag.
Target: Hands-on-hips posture
Rapid stabilization occurs when the initial stand-up is unsteady.
Your browser does not support the video tag.
Target: Hands-on-hips posture
Successfully recovers even after the first failed attempt to stand.
Your browser does not support the video tag.
Target: Hands-on-hips posture
If the initial pose is not natural, it prioritizes standing up quickly before fine adjustments.
Your browser does not support the video tag.
Target: Hands-on-hips posture
Besides, BFM-Zero maintains a high rate of efficient goal reaching...
Your browser does not support the video tag.
Target: Hands-on-hips posture
...a high rate of efficient goal reaching...
Your browser does not support the video tag.
Target: Hands-on-hips posture
...a high rate of efficient goal reaching.
Your browser does not support the video tag.
Target: Hands-on-hips posture
Robust even under severe wrist breakage.
Motion Tracking
Check our
highlight tracking video
in dancing with
safe, natural, and gentle recovery
even when confronted with unexpected falls.
Your browser does not support the video tag.
More motion tracking demos including styled locomotion, boxing, playing ball games and dancing. All demos come from
a single, continuous video shooting with the same policy.
Full Video (4x)
Your browser does not support the video tag.
Walk and Turn
Your browser does not support the video tag.
Ball Games
Your browser does not support the video tag.
Dancing (Including Fall and Recovery)
Your browser does not support the video tag.
Styled Walking (Salute!)
Your browser does not support the video tag.
Boxing
Your browser does not support the video tag.
Walking (Small Steps and Large Steps)
Your browser does not support the video tag.
Dancing
Reward Optimization
We do not have
any labeled(task-related) rewards
in training. The reward inference (optimization) happens in the test time. Users can
prompt in any type of reward function
w.r.t. the robot states, and the policy
zero-shot
output the optimized skills without retraining. ($R$ below is the rewards.)
Basic Locomotion
Arm Control
Base Height Control
Behavior Diversity
Skill Composition
Basic Locomotion
We enable the robot to perform basic locomotion tasks including standing still, walking forward/backward/sideways, turning left/right.
Stand Still
Go Forward
Strafe Left
Go Backward
Strafe Right
Turn Anticlockwise
Turn Clockwise
Maintains stable standing posture without movement.
$$R = (\mathrm{head\_height} = 1.2\mathrm{m}) \wedge (\mathrm{base\_vel} = 0\mathrm{m/s})$$
Your browser does not support the video tag.
Forward walking at 0.7m/s
$$R = (\mathrm{head\_height} = 1.2\mathrm{m}) \wedge (\mathrm{base\_vel\_forward} = 0.7\mathrm{m/s})$$
Your browser does not support the video tag.
Sideways movement to the left at 0.3m/s
$$R = (\mathrm{head\_height} = 1.2\mathrm{m}) \wedge (\mathrm{base\_vel\_left} = 0.3\mathrm{m/s})$$
Your browser does not support the video tag.
Backward walking at 0.3m/s
$$R = (\mathrm{head\_height} = 1.2\mathrm{m}) \wedge (\mathrm{base\_vel\_backward} = 0.3\mathrm{m/s})$$
Your browser does not support the video tag.
Sideways movement to the right at 0.3m/s
$$R = (\mathrm{head\_height} = 1.2\mathrm{m}) \wedge (\mathrm{base\_vel\_right} = 0.3\mathrm{m/s})$$
Your browser does not support the video tag.
Anticlockwise turning at 5.0 rad/s
$$R = (\mathrm{base\_height} > 0.5\mathrm{m}) \wedge (\mathrm{base\_ang\_vel\_z} = 5.0\mathrm{rad/s})$$
Your browser does not support the video tag.
Clockwise turning at 5.0 rad/s
$$R = (\mathrm{base\_height} > 0.5\mathrm{m}) \wedge (\mathrm{base\_ang\_vel\_z} = -5.0\mathrm{rad/s})$$
Your browser does not support the video tag.
Arm Control
Put down the arm
(low)
or Raise the arm
(high)
$$R_{\text{low}} = 1 - \min\{|\mathrm{wrist\_height} - 0.7\mathrm{m}| - 0.1\mathrm{m}\} = (\mathrm{wrist\_height} \in [0.6, 0.8]\mathrm{m})$$
            $$R_{\text{high}} = \min\{(\mathrm{wrist\_height} - 1.0\mathrm{m}), 1\} = (\mathrm{wrist\_height} > 1.0\mathrm{m})$$
Reward = Right wrist & Left wrist
Right wrist =
high
low
Left wrist =
high
low
Select reward values to show image
Base Height Control
Low-height Forward Motion
Base Height =
0.6m
& Go Forward
Your browser does not support the video tag.
Seated Crouch
Base Height =
0m
Your browser does not support the video tag.
Supported Crouch
Base Height =
0.25m
& Higher Knee
Your browser does not support the video tag.
Grounded Crouch
Base Height =
0m
& Higher Knee
Your browser does not support the video tag.
Behavior Diversity
By sampling different sub-buffers from the replay buffer, we can find
different
behaviors even with the
same
reward function.
$$R = (\mathrm{left\_wrist\_height} \in [0.6, 0.8]\mathrm{m}) \wedge (\mathrm{right\_wrist\_height} > 1\mathrm{m})$$
Observation:
1. All five poses
satisfy
the reward function
2. The lower-body postures have some
differences
3. The upper-body postures, especially the right arm in the last pose, have significant
differences
Your browser does not support the video tag.
Skill Composition
Taking the arm control and basic locomotion as examples, we can combine them to form new skills.
$$R = w_{\text{arm}} \cdot R_{\text{arm}} + w_{\text{loco}} \cdot R_{\text{loco}} $$
Here, w is the corresponding weight for the reward function, we express
low
as "l",
high
as "h", "arm-l-h" means the right wrist is
low
and the left wrist is
high
.
Note: All demos are from a continuous video shooting with the same policy.
▶
backward & arms-h-h
▶
strafe-right & arms-h-h
▶
strafe-left & arms-h-l
▶
forward & arms-h-l
▶
backward & arms-h-l
▶
strafe-right & arms-h-l
▶
forward & arms-l-h
▶
backward & arms-l-h
▶
strafe-right & arms-l-h
▶
forward & arms-l-l
▶
strafe-left & arms-l-l
▶
backward & arms-l-l
▶
strafe-right & arms-l-l
▶
turn anticlockwise & arms-l-l
▶
turn clockwise & arms-l-l
▶
turn-anticlockwise & arms-h-l
▶
turn-anticlockwise & arms-l-h
▶
strafe-left & arms-h-h
Note:
Right/Left is relative to the robot; the reward functions are for illustration purposes, in the inference time, we also have some soft constraints and regularization terms.
Natural Recovery from Large Disturbance
We demonstrate the robustness and flexibility of BFM-Zero: The policy enables the humanoid robot to recover gracefully from various disturbances, including
heavy pushes
,
torso kicks
,
ground pulls
, and
leg kicks
.
Your browser does not support the video tag.
Highlight:
Natural
recovery from pulling to the ground
Your browser does not support the video tag.
Highlight:
Emergent behavior
(running) from heavy pushes
Few-shot Adaptation
We demonstrate BFM-Zero's few-shot adaptation capability, the smooth structure of our latent space enables efficient
search-based optimization
in simulation to discover a better latent instead of directly using zero-shot inference within a short time.
When the robot carries a
4kg payload
on its torso, we can perform adaptation to let the robot keep single-leg standing for longer time.
Your browser does not support the video tag.
Before Adaptation
Adaptation in Sim
for less than 2 minutes
→
Your browser does not support the video tag.
After Adaptation
Space Interpolation
The
structured nature
of the learned space enables smooth interpolation between latent representations. We can leverage
Spherical Linear Interpolation
to generate intermediate latent vectors along the geodesic arc between the two end-points.
$$z_{t} := \frac{\sin((1-t)\theta)}{\sin \theta}z_0 + \frac{\sin(t\theta)}{\sin \theta}z_1, \quad \theta := \arccos\left(\langle z_0, z_1 \rangle\right), \ z_0\ne z_1, t\in[0,1].$$
We can see simple interpolation shows
meaningful semantic-level changes
.
Your browser does not support the video tag.
$z_0: \text{strafe-left}, z_1: \text{strafe-right}$
Your browser does not support the video tag.
$z_0: \text{arms-low-low}, z_1: \text{arms-low-high}$
