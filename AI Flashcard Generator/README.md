# FlashMind AI: AI Flashcard Generator

An elegant, client-side, AI-powered study tool built with **Vanilla HTML, CSS, and JavaScript**. This application processes raw lesson content and generates three structured study assets: interactive 3D flashcards, key concepts dictionaries, and scannable revision summaries. It interfaces directly with the Google Gemini API (`gemini-2.5-flash`) via the client-side `fetch` API.

---

## Features
- **3D Interactive Flashcards**: Study with beautiful Q&A cards. Support for mouse click flipping, keyboard navigation (Arrow Keys to slide, Spacebar to flip), and card bookmarks ("Star Card" / "Mark Learned").
- **Grid View**: Toggle between a single focused carousel view and a comprehensive grid overview of all cards.
- **Key Concepts Glossary**: Searchable, alphabetical list of technical vocabulary definitions.
- **Revision Summaries**: Clean, bulleted summary sheets categorized by topic.
- **Flexible File Integration**: Paste text manually or drag and drop `.txt`/`.md` files.
- **Seamless Local Persistence**: API keys, starred cards, and the last generated study kits are saved to `localStorage`, so your progress persists through page reloads.
- **Full Exports**: Export your generated study notes as a copy-ready Markdown structure, a portable JSON database, or save/print as a professional PDF.
- **Stunning Dark Aesthetic**: Glassmorphism elements, modern gradients, Outfit/Inter typography, and subtle micro-interactions.

---

## Setup & Running Locally

Since the application is built entirely on native web standards, it has **zero setup requirements** and does not require Node.js, npm, Python, or local servers.

1. **Open index.html**:
   - Double-click the `index.html` file in your system explorer to launch the app directly in any modern browser (Chrome, Edge, Firefox, Safari).
   - Alternatively, if you have a local server extension (like VS Code Live Server), you can host it through that.

2. **Configure your API Key**:
   - Open the **Settings** gear icon in the top right.
   - Insert your Google Gemini API Key. If you do not have one, follow the link in the settings panel to get one for free from Google AI Studio.
   - Click **Save Changes**. Your key is securely stored in your local browser's storage and never sent to any third-party servers.

3. **Generate your Study Material**:
   - Paste text inside the textarea or click **Use Sample Lesson** to test it instantly with preset biology notes.
   - Select your target card count and click **Generate Study Kit**.

---

## File Structure
- `index.html` — Layout structure, SVG icons, and settings models.
- `styles.css` — Modern design styling, animations, colors, and print stylesheets.
- `app.js` — Core application logic, event listeners, state caches, and Gemini API fetch integrations.
- `README.md` — Setup guides and system documentation.
