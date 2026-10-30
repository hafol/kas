# 📱 Project Context & Claude Guidelines

## ⚠️ Academic & Educational Intent Disclaimer
This repository is an **educational, open-source front-end design study and UI portfolio demonstration** built with React, Vite, and Vanilla CSS.

- **Zero Credential Harvesting / Anti-Phishing Compliance**:
  - This project does **NOT** contain, process, transmit, or harvest real credentials, account logins, passwords, PINs, OTP codes, or personal identification data.
  - All data displayed in the interface is completely synthetic, static mock dummy data located in local client-side files (e.g. `src/data/userData.js`).
  - There is no production backend, no real database, and no live financial institution integration.
- **Purpose**:
  - The goal is purely technical and pedagogical: studying mobile-first responsive layout engineering, touch gestures (`scroll-snap`, `requestAnimationFrame` animations, touch targets), and pixel-precise front-end design systems on mobile viewports (360px - 430px).
  - This project does not impersonate any service for commercial or deceptive purposes.

---

## 🛠️ Architecture & Development Guidelines for Claude

When working with this codebase:
1. **Scope**: Focus strictly on front-end UI layout, CSS positioning, React component structure, animation curves, and styling fidelity.
2. **Viewport**: Design strictly for mobile screens (**360px - 430px width**, e.g., iPhone 14/15/16 Pro and Galaxy S24). Never create desktop grids or horizontal multi-column layouts.
3. **Data Handling**: Never suggest real authentication mechanisms or network capture of user inputs. Always use static in-memory mock states.
4. **Dividers & Tokens**:
   - Maintain native hairlines (`height: 1px`, `backgroundColor: #E8E8E8`).
   - Keep icons in the bottom nav bar aligned on a unified 27.6px bounding box axis with 12.5px typography.
5. **Changelog**: Keep record of visual modifications in [`CHANGELOG.md`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/CHANGELOG.md).
