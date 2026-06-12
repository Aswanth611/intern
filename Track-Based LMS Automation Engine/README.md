# ⚡ NexusFlow LMS - Automation Engine

Welcome to **NexusFlow LMS**, a high-fidelity Learning Management System (LMS) automation engine prototype built for the **Tomatrix Day 7 Internship Task**. 

This application implements a complete automation engine that manages student onboarding, dynamic learning track roadmap generation, micro-lesson progression, module assessments, and real-time dashboard stats tracking—all synchronized with a simulated database!

---

## 🎨 Design System: Cyberpunk Volcano
NexusFlow features a unique **Cyberpunk Volcano** aesthetic. It uses:
- 🌌 Deep Obsidian Black (`#050508`) backgrounds with glowing radials.
- 🌋 Burning Volcano Orange (`#f97316`) and Deep Magenta (`#db2777`) gradients for interactive highlights.
- 🌟 Golden Amber (`#fbbf24`) accents and pulsing inline SVG logo points.
- 🌫️ Translucent glassmorphic cards and floating fluid background orbs.

---

## ⚡ Key Features
- **🔒 Secure Portal Login**: Center-aligned glassmorphic entry form with smooth transition states.
- **🗺️ Adaptive Track Roadmaps**: Dynamically generates learning paths for 4 tracks: *Software Development*, *AI Automation*, *AI Foundations*, and *AI Content Creation*.
- **🗝️ Sequential Lesson Unlocking**: Locks future modules. Unlocks lessons one-by-one upon completion.
- **📊 Real-time Progress Dashboard**: Updates streak count, passed module counts, progress percentages, and next target actions on the fly.
- **📝 Automated Quiz Redirects**: Instantly redirects to multiple-choice assessments once a module is done. Requires $\ge 60\%$ (2/3 correct) to unlock the next module.
- **🧪 Live Database State Inspector**: Formats and displays simulated database tables (`students`, `tracks`, `modules`, `micro_lessons`, `progress`, `quiz_results`) inside local storage in real-time.
- **📈 Interactive Flowchart**: Highlights the active step of the student journey dynamically as you interact with the course prototype.
- **🗃️ Visual Schema ERD**: Hovering over tables dims unrelated items and highlights the table keys and foreign relationships.

---

## 📂 Project Structure
```text
lms-automation-engine/
├── index.html   # Main page tab panels, SVGs, forms, and layout footer
├── style.css    # Color variables, glassmorphic layout rules, and keyframe animations
├── script.js    # Simulation data, localStorage DB sync, transitions, and quiz grading
├── server.js    # Lightweight static Node.js server (Runs on Port 3000)
└── README.md    # Documentation and setup instructions (This file)
```

---

## 🚀 Quick Start Guide

### Option A: Direct Launch (No Setup)
1. Go to the project folder.
2. Double-click [index.html](index.html) to open the application directly in any web browser.

### Option B: Local Node Server (Recommended)
1. Open your terminal or PowerShell console.
2. Navigate to the project directory:
   ```bash
   cd C:\Users\manju\.gemini\antigravity\scratch\lms-automation-engine
   ```
3. Launch the server script:
   ```bash
   node server.js
   ```
4. Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Code Highlights & Fixes

### 1. Liquid-Smooth Screen Transitions
The application features hardware-accelerated fade-and-slide translations:
```javascript
// script.js
function transitionToScreen(fromId, toId, callback) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  if (fromEl) {
    fromEl.classList.add("transition-out");
    setTimeout(() => {
      fromEl.style.display = "none";
      fromEl.classList.remove("transition-out");
      if (toEl) {
        toEl.style.display = "block";
        toEl.classList.add("transition-in");
        toEl.offsetHeight; // force reflow
        if (callback) callback();
        setTimeout(() => { toEl.classList.remove("transition-in"); }, 300);
      }
    }, 300);
  }
}
```

### 2. Quiz Option Character Escaping
To prevent HTML syntax options (like `<section>`, `<div>`) from rendering as actual HTML tags and appearing blank in the buttons, options are sanitized:
```javascript
// script.js
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
```

---

## 📝 Author & License
- **Author:** Aswanth (Intern)
- **Coursework:** Tomatrix Internship Task 7
- **License:** MIT License
