# ChaosNexus: A Foundation Model for ODE-based Chaotic System Forecasting with Hierarchical Multi-scale Awareness

> Source: https://icml.cc/virtual/2026/poster/62408
> Collected: 2026-09-08
> Published: 2026-07-08

POSTER Wed, Jul 8, 2026 • 6:30 PM – 8:15 PM PDT HALL A #2801

## ChaosNexus: A Foundation Model for ODE-based Chaotic System Forecasting with Hierarchical Multi-scale Awareness

Chang Liu ⋅ Bohao Zhao ⋅ Jingtao Ding ⋅ Yong Li

Project Page: https://github.com/tsinghua-fib-lab/ChaosNexus

OpenReview: https://openreview.net/forum?id=gtURIPKbx6

## Abstract

Foundation models show great promise in achieving zero-shot or few-shot forecasting for ODE-based chaotic systems via large-scale pretraining. However, existing architectures often fail to capture the multi-scale temporal structures and distinct spectral characteristics of chaotic dynamics. To address this, we introduce ChaosNexus, a foundation model for chaotic system forecasting underpinned by the proposed ScaleFormer architecture. By processing temporal contexts across hierarchically varying patch sizes, ChaosNexus effectively captures long-range dependencies and preserves high-frequency fluctuations. To address heterogeneity across distinct systems, we integrate Mixture-of-Experts (MoE) layers into each ScaleFormer block and explicitly condition the final forecasts on a learned frequency fingerprint, providing the model with a global spectral view of the system. Extensive evaluations on over 9,000 synthetic systems demonstrate that ChaosNexus achieves superior fidelity in long-term attractor statistics while maintaining competitive point-wise accuracy. Furthermore, in real-world applications, it achieves a remarkable zero-shot mean error below 1°C for 5-day station-based weather forecasting. Code is available at https://github.com/tsinghua-fib-lab/ChaosNexus.
