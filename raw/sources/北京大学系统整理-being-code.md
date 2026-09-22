# GitHub - BeingBeyond/Being-H: Being-H is BeingBeyond's family of human-centric embodied foundation models. · GitHub

> Source: https://github.com/BeingBeyond/Being-H
> Collected: 2026-09-22
> Published: Unknown
> Note: 正文与公开页面文本摘录；省略邮箱、联系方式等非研究必需内容。网页导航可能保留；采集日期不等同发布日期。

GitHub - BeingBeyond/Being-H: Being-H is BeingBeyond's family of human-centric embodied foundation models. · GitHub
Skip to content
Navigation Menu
Sign in
Appearance settings
Platform
AI CODE CREATION
GitHub Copilot
Write better code with AI
GitHub Copilot app
Direct agents from issue to merge
MCP Registry
Integrate external tools
DEVELOPER WORKFLOWS
Actions
Automate any workflow
Codespaces
Instant dev environments
Issues
Plan and track work
Code Review
Manage code changes
Code Quality
Enforce quality at merge
APPLICATION SECURITY
GitHub Advanced Security
Find and fix vulnerabilities
Code security
Secure your code as you build
Secret protection
Stop leaks before they start
EXPLORE
Why GitHub
Documentation
Blog
Changelog
Marketplace
View all features
Solutions
BY COMPANY SIZE
Enterprises
Small and medium teams
Startups
Nonprofits
BY USE CASE
App Modernization
DevSecOps
DevOps
CI/CD
View all use cases
BY INDUSTRY
Healthcare
Financial services
Manufacturing
Government
View all industries
View all solutions
Resources
EXPLORE BY TOPIC
AI
Software Development
DevOps
Security
View all topics
EXPLORE BY TYPE
Customer stories
Events & webinars
Ebooks & reports
Business insights
GitHub Skills
SUPPORT & SERVICES
Documentation
Customer support
Community forum
Trust center
Partners
View all resources
Open Source
COMMUNITY
GitHub Sponsors
Fund open source developers
PROGRAMS
Security Lab
Maintainer Community
GitHub Stars
Archive Program
REPOSITORIES
Topics
Trending
Collections
Enterprise
ENTERPRISE SOLUTIONS
Enterprise platform
AI-powered developer platform
AVAILABLE ADD-ONS
GitHub Advanced Security
Enterprise-grade security features
Copilot for Business
Enterprise-grade AI features
Premium Support
Enterprise-grade 24/7 support
Pricing
Search
/
Sign in
Sign up
Appearance settings
You signed in with another tab or window.
Reload
to refresh your session.
You signed out in another tab or window.
Reload
to refresh your session.
You switched accounts on another tab or window.
Reload
to refresh your session.
Dismiss alert
BeingBeyond
/
Being-H
Public
Notifications
You must be signed in to change notification settings
Fork
62
Star
1.1k
Code
Issues
18
Pull requests
4
Actions
Projects
Security and quality
0
Insights
Additional navigation options
Code
Issues
Pull requests
Actions
Projects
Security and quality
Insights
main
Branches
Tags
Go to file
Code
Open more actions menu
Latest commit
History
51 Commits
51 Commits
Folders and files
Name
Name
Last commit message
Last commit date
Being-H05
Being-H05
Being-H07
Being-H07
tutorials
tutorials
.gitignore
.gitignore
LICENSE
LICENSE
README.md
README.md
View all files
Repository files navigation
README
Apache-2.0 license
More
items
Being-H
Being-H is BeingBeyond's family of human-centric embodied foundation models.
Within this repository,
Being-H0.7
is our flagship
WAM
model and
Being-H0.5
is our flagship
VLA
model.
Model Family
Project
Positioning
Summary
Links
Being-H0.7
Flagship WAM
A latent world-action model from egocentric videos with future-aware latent reasoning.
Blog
/
Paper
Being-H0.5
Flagship VLA
A human-centric VLA model for cross-embodiment generalization with a unified action space.
Blog
/
Paper
/
Models
Being-H0
Previous VLA
The first Being-H release for human-video VLA pretraining.
Blog
/
Paper
/
Models
News
[2026-06-09]
: We add
Being-H-EDU
, an educational tutorial workspace for post-training and deployment examples.
[2026-05-01]
:
Being-H0
is accepted by ICML 2026! Welcome to connect with the BeingBeyond Team at the venue then! 🔥🔥
[2026-04-14]
: We publish
Being-H0.7
, our flagship WAM model. See the
blog
and
paper
. Code and checkpoints are coming soon!
[2026-03-20]
: We release the
UniHand_Preview
dataset, a subset of the Being-H0.5 pre-training mixture.
[2026-01-24]
: We update the H0.5 training, inference, and data preparation docs, and open-source post-training data for PND Adam-U through our
Hugging Face dataset collection
.
[2026-01-20]
: We publish
Being-H0.5
, our flagship VLA model for cross-embodiment generalization.
[2025-08-02]
: We release the
Being-H0
codebase and pretrained models through the
BeingBeyond Hugging Face collections
.
[2025-07-21]
: We publish
Being-H0
, our first human-video VLA release. Read the
paper
.
Projects Based on Being-H
We are seeing a growing set of excellent projects built on top of the Being-H family:
Unmasking the Illusion of Embodied Reasoning in Vision-Language-Action Models.
arXiv 26'04
|
website
|
GitHub
Conservative Offline Robot Policy Learning via Posterior-Transition Reweighting.
arXiv 26'03
|
website
|
GitHub
DexHiL: A Human-in-the-Loop Framework for Vision-Language-Action Model Post-Training in Dexterous Manipulation.
arXiv 26'03
|
website
Joint-Aligned Latent Action: Towards Scalable VLA Pretraining in the Wild.
arXiv 26'02
|
website
|
GitHub
Rethinking Visual-Language-Action Model Scaling: Alignment, Mixture, and Regularization.
arXiv 26'02
|
website
|
GitHub
Spatial-Aware VLA Pretraining through Visual-Physical Alignment from Human Videos.
arXiv 25'12
|
website
|
GitHub
Feel free to open a pull request if you want to share work built on Being-H.
Tutorials
Tutorials
collect practical examples for adapting, post-training, evaluating, and deploying Being-H models on educational robots and community benchmarks.
Being-H-EDU
: an educational tutorial workspace for data processing, post-training, and local robot deployment with Being-H0.5. The current public example supports SO101.
Citation
If you find the Being-H family useful, please consider citing the relevant release:
Being-H0.7
@article
{
beingbeyond2026beingh07
,
title
=
{
Being-H0. 7: A Latent World-Action Model from Egocentric Videos
}
,
author
=
{
Luo, Hao and Zhang, Wanpeng and Feng, Yicheng and Zheng, Sipeng and Xu, Haiweng and Xu, Chaoyi and Xi, Ziheng and Fu, Yuhui and Lu, Zongqing
}
,
journal
=
{
arXiv preprint arXiv:2605.00078
}
,
year
=
{
2026
}
}
Being-H0.5
@article
{
beingbeyond2026beingh05
,
title
=
{
Being-H0. 5: Scaling Human-Centric Robot Learning for Cross-Embodiment Generalization
}
,
author
=
{
Luo, Hao and Wang, Ye and Zhang, Wanpeng and Zheng, Sipeng and Xi, Ziheng and Xu, Chaoyi and Xu, Haiweng and Yuan, Haoqi and Zhang, Chi and Wang, Yiqing and others
}
,
journal
=
{
arXiv preprint arXiv:2601.12993
}
,
year
=
{
2026
}
}
Being-H0
@inproceedings
{
beingbeyond2025beingh0
,
title
=
{
Being-H0: Vision-Language-Action Pretraining from Large-Scale Human Videos
}
,
author
=
{
Luo, Hao and Feng, Yicheng and Zhang, Wanpeng and Zheng, Sipeng and Wang, Ye and Yuan, Haoqi and Liu, Jiazheng and Xu, Chaoyi and Jin, Qin and Lu, Zongqing
}
,
booktitle
=
{
International Conference on Machine Learning
}
,
year
=
{
2026
}
,
organization
=
{
PMLR
}
}
License
This repository is released under Apache-2.0. See
LICENSE
.
About
Being-H is BeingBeyond's family of human-centric embodied foundation models.
research.beingbeyond.com/being-h08
Resources
Readme
Apache-2.0 license
Activity
Custom properties
Stars
1.1k
stars
Watchers
21
watching
Forks
62
forks
Report repository
Contributors
Languages
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
You can’t perform that action at this time.
