# Space / Galaxy UI/UX Guide

## 1. Concept & Vibe
The overarching theme for the RPL 1 class web app is "Space / Galaxy". This translates to a deep, dark, and immersive user interface that feels modern, futuristic, and slightly mysterious, while remaining highly functional and readable.

## 2. Color Palette
- **Backgrounds:** Deep space colors. Very dark purples, blues, and blacks.
  - Primary Background: `#0B0B1A` (Deep Void)
  - Secondary Background/Cards: `#15152D` (Dark Nebula)
- **Accents:** Vibrant cosmic colors.
  - Primary Accent: `#8A2BE2` (Stellar Purple)
  - Secondary Accent: `#FF007F` (Neon Pink / Cosmic Dust)
  - Tertiary Accent: `#00D2FF` (Cyan / Starlight)
- **Text:** 
  - Primary Text: `#FFFFFF` (Pure White)
  - Secondary Text: `#A0A0C0` (Muted Starlight)

## 3. Typography
- Keep fonts clean and modern (Geist Sans/Mono is fine).
- Highlight important numbers or titles with glowing effects or bold cosmic colors.

## 4. Visual Elements
- **Gradients:** Use deep radial gradients and linear gradients to simulate nebulae and light from distant stars.
- **Glassmorphism:** Use translucent backgrounds with backdrop-blur for cards to give a feeling of floating HUDs (Heads-Up Displays) in a spaceship.
- **Borders:** Thin, subtle borders with low opacity, occasionally glowing on hover.
- **Shadows:** Instead of traditional drop shadows, use colored glows (box-shadow with accent colors).
- **Icons:** Thin, line-based icons (Lucide works well).

## 5. Components Execution
- **Hero Section:** Dark gradient background with subtle blurred orbs (stars/nebulae) in the background. Bold glowing text.
- **Cards (Bento Grid):** Semi-transparent dark cards (`bg-white/5` or `bg-slate-900/40`), backdrop blurred, with thin border (`border-white/10`).
- **Buttons:** Gradient backgrounds (`from-purple-600 to-blue-600`) with soft glowing shadow on hover.

## 6. Implementation Notes (Tailwind CSS 4.x)
We will leverage Tailwind's arbitrary values and gradient utilities heavily:
- Background: `bg-[#0B0B1A]`
- Cards: `bg-[#15152D]/80 backdrop-blur-md border border-white/10`
- Glowing Text: `bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent`
- Shadows: `shadow-[0_0_15px_rgba(138,43,226,0.5)]`
