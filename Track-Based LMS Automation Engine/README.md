# 🌋 NexusFlow LMS - Intelligent Learning Automation Portal

Welcome to **NexusFlow LMS**, a state-of-the-art Learning Management System designed in a **Cyberpunk Volcano** theme (Obsidian dark background, Volcano Orange/Magenta gradients, and glowing Amber accents).

---

## 📝 Project Description
This portal is a Single Page Application (SPA) that acts as an **Intelligent Learning Automation Engine**. It assigns learning paths, unlocks lessons sequentially, delivers module-level assessments, and illustrates system structures through interactive schemas. The entire interface is built with fluid transitions and responsive layouts.

---

## ⚡ What It Does
- **Account Registration & Login**: Allows creating a student profile (Name, Email, Password) and logging in using credential verification (providing alerts for missing users or incorrect passwords).
- **Forgot Password Recovery**: Includes a verification check for the registered email to securely update the account password.
- **Multi-Course Enrollment**: Students can enroll in and switch between the 4 tracks (*Software Development*, *AI Automation*, *AI Foundations*, *AI Content Creation*) at any time, saving progress across all of them independently.
- **Sequential Roadmap Gates**: Keeps lessons locked until the active one is marked complete. Completing all lessons in a module unlocks the quiz.
- **Module Assessments**: Delivers grading quizzes requiring $\ge 60\%$ (2/3 score) to unlock the next module, with safe HTML code tags escaping in the options.
- **Interactive Visualizers**: Includes an interactive flowchart (Live Workflow Diagram) that highlights active states in real-time and a Database ERD highlighting table relationships on hover.
- **Live Database Inspector**: Renders a JSON console printing real-time table states (`students`, `progress`, `quiz_results`) as you click.

---

## ⚙️ How It Works
- **Simulated Database**: Uses browser `localStorage` as a mock database.
- **Data Isolation Suffixes**: Encodes user progress under customized email suffixes (e.g. `lms_progress_demo_test_com`), isolating different users' records.
- **State Machine Routing**: A core JavaScript engine evaluates the authenticated session (`lms_current_user`) and directs routing between Login, Track Select, and Dashboard panels.
- **Metrics Filter**: Aggregates roadmap metrics (Completion %, streak, next active task) by filtering the progress database against the current track's modules.
- **Isolated Resets**: Resets current course records by removing only the active track's IDs from the student's progress arrays.
- **Running Locally**: Run a static Node.js server (`node server.js`) to serve files locally on `http://localhost:3000`.
