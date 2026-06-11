/**
 * FlashMind AI - AI Flashcard Generator Logic
 * Full client-side application utilizing the Google Gemini API with structured JSON output.
 */

// --- Constants & Config ---
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const LOCAL_STORAGE_PREFIX = "flashmind_flashcard_";

// --- Application State ---
const state = {
    apiKey: "",
    studyKit: null, // Holds { flashcards: [], keyConcepts: [], revisionCards: [] }
    currentCardIndex: 0,
    starredCards: new Set(), // Set of card indices
    learnedCards: new Set(), // Set of card indices
    activeTab: "flashcards",
    viewMode: "carousel", // "carousel" or "grid"
    selectedFileContent: null,
    selectedFileName: null
};

// --- Sample Lesson Data (For quick testing) ---
const SAMPLE_LESSON = `Photosynthesis & Cellular Respiration

Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight and turn it into chemical energy. The general chemical equation for photosynthesis is:
6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2
This process occurs in the chloroplasts, specifically within the thylakoid membranes (for light-dependent reactions) and the stroma (for light-independent reactions or the Calvin Cycle). Chlorophyll is the primary pigment involved, absorbing blue and red light while reflecting green light.

In contrast, Cellular Respiration is the process by which cells break down glucose into energy in the form of Adenosine Triphosphate (ATP). The equation is essentially the reverse of photosynthesis:
C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP (Energy)
Respiration occurs in three major stages: Glycolysis (in the cytoplasm, anaerobic), the Krebs Cycle (in the mitochondrial matrix, aerobic), and the Electron Transport Chain (ETC, on the inner mitochondrial membrane, aerobic). The ETC is the most productive stage, generating approximately 32 to 34 ATP molecules per glucose molecule, bringing the total theoretical yield of cellular respiration to about 36-38 ATP.

These two pathways form a biological cycle. The products of photosynthesis (glucose and oxygen) are the inputs for cellular respiration. Conversely, the products of cellular respiration (carbon dioxide and water) serve as the inputs for photosynthesis. This relationship maintains the atmospheric balance of oxygen and carbon dioxide on Earth.`;

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initAppState();
    registerEventListeners();
    checkAPIKeyStatus();
    loadCachedStudyKit();
});

// --- State & Storage Handlers ---
function initAppState() {
    state.apiKey = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}api_key`) || "";
    
    // Load starred/learned sets from localStorage if available
    try {
        const starred = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}starred`);
        if (starred) state.starredCards = new Set(JSON.parse(starred));
        
        const learned = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}learned`);
        if (learned) state.learnedCards = new Set(JSON.parse(learned));
    } catch (e) {
        console.error("Error loading starred/learned cards from cache:", e);
    }
}

function saveAPIKey(key) {
    state.apiKey = key.trim();
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}api_key`, state.apiKey);
    checkAPIKeyStatus();
}

function clearAPIKey() {
    state.apiKey = "";
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}api_key`);
    checkAPIKeyStatus();
}

function checkAPIKeyStatus() {
    const banner = document.getElementById("api-status-banner");
    const text = document.getElementById("api-status-text");
    const keyInput = document.getElementById("gemini-key");
    const apiAlert = document.getElementById("api-alert");

    keyInput.value = state.apiKey;

    if (state.apiKey) {
        banner.classList.add("configured");
        text.textContent = "Gemini API Key Configured";
        if (apiAlert) apiAlert.style.display = "none";
    } else {
        banner.classList.remove("configured");
        text.textContent = "No API Key Configured";
        if (apiAlert) apiAlert.style.display = "flex";
    }
}

function saveStudyKitToCache(kit) {
    try {
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}last_kit`, JSON.stringify(kit));
    } catch (e) {
        console.warn("Could not cache study kit in localStorage (possibly too large)", e);
    }
}

function loadCachedStudyKit() {
    try {
        const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}last_kit`);
        if (cached) {
            state.studyKit = JSON.parse(cached);
            renderStudyKit();
        }
    } catch (e) {
        console.error("Error loading cached study kit:", e);
    }
}

function persistProgress() {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}starred`, JSON.stringify([...state.starredCards]));
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}learned`, JSON.stringify([...state.learnedCards]));
    updateFooterStats();
}

function clearStudyKit() {
    state.studyKit = null;
    state.currentCardIndex = 0;
    state.starredCards.clear();
    state.learnedCards.clear();
    persistProgress();
    
    // Clear localStorage cache
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}last_kit`);
    
    // Reset Tab Counts
    document.getElementById("flashcard-count").textContent = "0";
    document.getElementById("concept-count").textContent = "0";
    document.getElementById("revision-count").textContent = "0";
    
    // Reset UI visibility states
    document.getElementById("workspace-placeholder").style.display = "flex";
    document.getElementById("workspace-loading").style.display = "none";
    document.querySelector(".tab-contents").style.display = "none";
    document.getElementById("workspace-footer").style.display = "none";
    
    // Clear inner HTML roots
    document.getElementById("flashcard-grid-root").innerHTML = "";
    document.getElementById("glossary-root").innerHTML = "";
    document.getElementById("revision-deck-root").innerHTML = "";
}

// --- DOM Event Listeners ---
function registerEventListeners() {
    // Settings Modal
    const modal = document.getElementById("settings-modal");
    const openSettingsBtn = document.getElementById("open-settings-btn");
    const closeSettingsBtn = document.getElementById("close-settings-btn");
    const setupApiAlertBtn = document.getElementById("setup-api-alert-btn");
    const saveSettingsBtn = document.getElementById("save-settings-btn");
    const clearKeyBtn = document.getElementById("clear-key-btn");
    const toggleKeyVisibility = document.getElementById("toggle-key-visibility");
    const keyInput = document.getElementById("gemini-key");

    const openModal = () => { modal.style.display = "flex"; keyInput.focus(); };
    const closeModal = () => modal.style.display = "none";

    openSettingsBtn.addEventListener("click", openModal);
    closeSettingsBtn.addEventListener("click", closeModal);
    if (setupApiAlertBtn) setupApiAlertBtn.addEventListener("click", openModal);
    
    // Close modal on click outside content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Save and Delete key
    saveSettingsBtn.addEventListener("click", () => {
        const key = keyInput.value.trim();
        if (!key) {
            showToast("Please enter a valid key or click Delete", "warning");
            return;
        }
        if (!key.startsWith("AIzaSy")) {
            showToast("Warning: API key doesn't match standard Google format (starts with AIzaSy)", "warning");
        }
        saveAPIKey(key);
        showToast("Gemini API key saved successfully!", "success");
        closeModal();
    });

    clearKeyBtn.addEventListener("click", () => {
        clearAPIKey();
        keyInput.value = "";
        showToast("API Key deleted.", "info");
        closeModal();
    });

    // Reveal key
    toggleKeyVisibility.addEventListener("click", () => {
        const type = keyInput.getAttribute("type") === "password" ? "text" : "password";
        keyInput.setAttribute("type", type);
        // Toggle icon style
        toggleKeyVisibility.classList.toggle("revealed");
    });

    // File Dropzone & Browsing
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const removeFileBtn = document.getElementById("remove-file-btn");

    dropzone.addEventListener("click", (e) => {
        // Prevent click if clicking the remove button
        if (e.target.closest("#remove-file-btn")) return;
        fileInput.click();
    });

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    removeFileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        resetFileUploader();
        showToast("File removed", "info");
    });

    // Clear Input button
    document.getElementById("clear-input-btn").addEventListener("click", () => {
        document.getElementById("lesson-text").value = "";
        resetFileUploader();
        clearStudyKit();
        showToast("Inputs and workspace cleared", "info");
    });

    // Generate Button
    document.getElementById("generate-btn").addEventListener("click", generateStudyKit);

    // Tab Navigation
    const tabs = document.querySelectorAll(".tab-link");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            
            const paneId = `tab-${tab.dataset.tab}`;
            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.remove("active");
            });
            document.getElementById(paneId).classList.add("active");
            state.activeTab = tab.dataset.tab;
        });
    });

    // Flashcard View Mode Toggle
    const carouselBtn = document.getElementById("view-carousel-btn");
    const gridBtn = document.getElementById("view-grid-btn");
    const carouselContainer = document.getElementById("carousel-view-container");
    const gridContainer = document.getElementById("grid-view-container");

    carouselBtn.addEventListener("click", () => {
        carouselBtn.classList.add("active");
        gridBtn.classList.remove("active");
        carouselContainer.style.display = "block";
        gridContainer.style.display = "none";
        state.viewMode = "carousel";
    });

    gridBtn.addEventListener("click", () => {
        gridBtn.classList.add("active");
        carouselBtn.classList.remove("active");
        carouselContainer.style.display = "none";
        gridContainer.style.display = "block";
        state.viewMode = "grid";
        renderFlashcardsGrid();
    });

    // Active Card 3D Flip Action
    const activeCard = document.getElementById("active-flashcard");
    activeCard.addEventListener("click", flipActiveCard);
    activeCard.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            flipActiveCard();
        }
    });

    // Carousel Navigation
    document.getElementById("prev-card-btn").addEventListener("click", navigatePrevCard);
    document.getElementById("next-card-btn").addEventListener("click", navigateNextCard);

    // Card Actions
    document.getElementById("star-card-btn").addEventListener("click", toggleStarActiveCard);
    document.getElementById("learned-card-btn").addEventListener("click", toggleLearnedActiveCard);

    // Keyboard Shortcuts
    document.addEventListener("keydown", handleKeyboardShortcuts);

    // Search Filtering
    const searchInput = document.getElementById("concepts-search");
    const clearSearchBtn = document.getElementById("clear-search-btn");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        filterConcepts(query);
        clearSearchBtn.style.display = query ? "block" : "none";
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        filterConcepts("");
        clearSearchBtn.style.display = "none";
        searchInput.focus();
    });

    // Export Controls
    document.getElementById("copy-markdown-btn").addEventListener("click", copyMarkdownToClipboard);
    document.getElementById("download-json-btn").addEventListener("click", downloadJSONStudyKit);
    document.getElementById("print-btn").addEventListener("click", () => window.print());
}

// --- File Upload Processing ---
function handleFile(file) {
    const ext = file.name.split(".").pop().toLowerCase();
    const allowed = ["txt", "md"];
    
    if (!allowed.includes(ext)) {
        showToast("Invalid file type. Please upload a .txt or .md file.", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        state.selectedFileContent = e.target.result;
        state.selectedFileName = file.name;
        
        // Populate textarea with loaded content
        document.getElementById("lesson-text").value = e.target.result;
        
        // Update uploader UI
        const dropzone = document.getElementById("dropzone");
        const content = dropzone.querySelector(".dropzone-content");
        const indicator = document.getElementById("file-indicator");
        
        content.style.display = "none";
        indicator.style.display = "flex";
        indicator.querySelector(".file-name").textContent = file.name;
        
        showToast(`Loaded: ${file.name}`, "success");
    };
    reader.onerror = () => {
        showToast("Error reading file.", "error");
    };
    reader.readAsText(file);
}

function resetFileUploader() {
    state.selectedFileContent = null;
    state.selectedFileName = null;
    document.getElementById("file-input").value = "";
    
    const dropzone = document.getElementById("dropzone");
    const content = dropzone.querySelector(".dropzone-content");
    const indicator = document.getElementById("file-indicator");
    
    content.style.display = "flex";
    indicator.style.display = "none";
}

// --- Gemini AI Integration ---
async function generateStudyKit() {
    if (!state.apiKey) {
        showToast("Gemini API Key is required to generate study kits. Please configure it in settings.", "warning");
        document.getElementById("settings-modal").style.display = "flex";
        return;
    }

    const rawText = document.getElementById("lesson-text").value.trim();
    if (rawText.length < 50) {
        showToast("Lesson text must be at least 50 characters long to generate high-quality study materials.", "warning");
        return;
    }

    const cardCount = document.getElementById("card-count").value;
    const depthLevel = document.getElementById("depth-level").value;

    // Transition UI state to Loading
    toggleLoadingState(true);
    setLoadingProgress("Analyzing text structure...", 15);

    try {
        const prompt = buildPrompt(rawText, cardCount, depthLevel);
        
        setLoadingProgress("Establishing secure connection with Gemini...", 35);
        
        const responseData = await callGeminiAPI(prompt);
        
        setLoadingProgress("Processing structured AI response...", 75);
        
        if (!responseData || !responseData.candidates || responseData.candidates.length === 0) {
            throw new Error("Invalid API response format received from Google Gemini.");
        }

        const candidateText = responseData.candidates[0].content.parts[0].text;
        
        setLoadingProgress("Validating study kit structures...", 90);
        
        const kitData = JSON.parse(candidateText);
        
        if (!kitData.flashcards || !kitData.keyConcepts || !kitData.revisionCards) {
            throw new Error("Generated content is missing required structured sections.");
        }

        // Save generated data to application state
        state.studyKit = kitData;
        state.currentCardIndex = 0;
        
        // Reset progress counters
        state.starredCards.clear();
        state.learnedCards.clear();
        persistProgress();

        // Cache generated result
        saveStudyKitToCache(kitData);

        // Render sections
        renderStudyKit();
        
        showToast("Study Kit generated successfully!", "success");
    } catch (error) {
        console.error("Generation Error:", error);
        showToast(`Generation Failed: ${error.message}`, "error");
    } finally {
        toggleLoadingState(false);
    }
}

function buildPrompt(lessonText, minCards, depth) {
    return `You are a world-class, premium EdTech educational designer. 
Your task is to analyze the lesson text provided below and extract highly effective, comprehensive study assets.

Generate three distinct types of study materials:
1. Interactive Flashcards: Create at least ${minCards} detailed Flashcards. Design them in Q/A format. Each flashcard should test an essential fact, dynamic mechanism, formula, or concept. Write direct, challenging questions for the front and clear, self-contained answers for the back.
2. Key Concepts: Extract all important technical terms, vocabulary, or models. Provide a glossary of definitions.
3. Revision Cards: Create a list of summary cards covering the main ideas of each section. Group key notes by their respective topics/subtopics. Provide 3 to 5 scannable, high-impact bullet-point summaries per card.

Depth Level required: ${depth === 'detailed' ? 'In-depth, academic, conceptual, and highly descriptive' : 'Standard, concise, and focused on core principles'}.

Ensure that all outputs are factual and strictly based on the provided text.

LESSON TEXT:
${lessonText}`;
}

async function callGeminiAPI(promptText) {
    const payload = {
        contents: [
            {
                parts: [
                    { text: promptText }
                ]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    flashcards: {
                        type: "ARRAY",
                        description: "At least 10 educational flashcards in a Q/A structure",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING", description: "Direct question for the front of the card" },
                                answer: { type: "STRING", description: "Complete, accurate answer for the back of the card" }
                            },
                            required: ["question", "answer"]
                        }
                    },
                    keyConcepts: {
                        type: "ARRAY",
                        description: "Glossary of key terms with accurate definitions",
                        items: {
                            type: "OBJECT",
                            properties: {
                                term: { type: "STRING", description: "The term or keyword" },
                                definition: { type: "STRING", description: "Brief, understandable definition" }
                            },
                            required: ["term", "definition"]
                        }
                    },
                    revisionCards: {
                        type: "ARRAY",
                        description: "Bulleted summary cards grouped by main subtopics",
                        items: {
                            type: "OBJECT",
                            properties: {
                                title: { type: "STRING", description: "The section or subtopic title" },
                                bulletPoints: {
                                    type: "ARRAY",
                                    items: { type: "STRING" },
                                    description: "Scannable summary bullet points (3-5 items)"
                                }
                            },
                            required: ["title", "bulletPoints"]
                        }
                    }
                },
                required: ["flashcards", "keyConcepts", "revisionCards"]
            }
        }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${state.apiKey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errText = await response.text();
        let errMsg = "API network request failed.";
        try {
            const errObj = JSON.parse(errText);
            if (errObj.error && errObj.error.message) {
                errMsg = errObj.error.message;
            }
        } catch (_) {}
        throw new Error(errMsg);
    }

    return await response.json();
}

// --- Loading State UI Controls ---
function toggleLoadingState(isLoading) {
    const placeholder = document.getElementById("workspace-placeholder");
    const loading = document.getElementById("workspace-loading");
    const tabContents = document.querySelector(".tab-contents");
    const generateBtn = document.getElementById("generate-btn");
    const generateSpinner = document.getElementById("generate-spinner");
    const workspaceFooter = document.getElementById("workspace-footer");

    if (isLoading) {
        placeholder.style.display = "none";
        tabContents.style.display = "none";
        workspaceFooter.style.display = "none";
        loading.style.display = "flex";
        
        generateBtn.disabled = true;
        generateSpinner.style.display = "block";
    } else {
        loading.style.display = "none";
        generateBtn.disabled = false;
        generateSpinner.style.display = "none";
    }
}

function setLoadingProgress(stepText, progressPercent) {
    document.getElementById("loading-step").textContent = stepText;
    document.getElementById("loading-progress-bar").style.width = `${progressPercent}%`;
}

// --- Rendering Handlers ---
function renderStudyKit() {
    if (!state.studyKit) return;

    // Toggle Panels Visibility
    document.getElementById("workspace-placeholder").style.display = "none";
    document.getElementById("workspace-loading").style.display = "none";
    document.querySelector(".tab-contents").style.display = "flex";
    document.getElementById("workspace-footer").style.display = "flex";

    // Update Tab Counts
    document.getElementById("flashcard-count").textContent = state.studyKit.flashcards.length;
    document.getElementById("concept-count").textContent = state.studyKit.keyConcepts.length;
    document.getElementById("revision-count").textContent = state.studyKit.revisionCards.length;

    // Render Tab Contents
    renderActiveFlashcard();
    renderFlashcardsGrid();
    renderGlossary();
    renderRevisionCards();
    
    // Update footer actions & stats
    updateFooterStats();
}

// Flashcards: Carousel View Renderer
function renderActiveFlashcard() {
    const cards = state.studyKit.flashcards;
    if (!cards || cards.length === 0) return;

    const activeCard = document.getElementById("active-flashcard");
    const frontText = document.getElementById("card-front-text");
    const backText = document.getElementById("card-back-text");
    const progressText = document.getElementById("deck-progress-text");
    const progressBar = document.getElementById("deck-progress-fill");

    const card = cards[state.currentCardIndex];

    // Reset rotation before editing text to prevent visual glitch
    activeCard.classList.remove("flipped");

    // Timeout allows transition back to front before changing text (smooth)
    setTimeout(() => {
        frontText.textContent = card.question;
        backText.textContent = card.answer;
    }, 150);

    // Update progress indicator
    const total = cards.length;
    const currentNum = state.currentCardIndex + 1;
    progressText.textContent = `Card ${currentNum} of ${total}`;
    progressBar.style.width = `${(currentNum / total) * 100}%`;

    // Star & Learned buttons status
    const starBtn = document.getElementById("star-card-btn");
    const starText = document.getElementById("star-btn-text");
    const learnedBtn = document.getElementById("learned-card-btn");
    const learnedText = document.getElementById("learned-btn-text");

    if (state.starredCards.has(state.currentCardIndex)) {
        starBtn.classList.add("starred");
        starText.textContent = "Starred";
    } else {
        starBtn.classList.remove("starred");
        starText.textContent = "Star Card";
    }

    if (state.learnedCards.has(state.currentCardIndex)) {
        learnedBtn.classList.add("learned");
        learnedText.textContent = "Learned";
    } else {
        learnedBtn.classList.remove("learned");
        learnedText.textContent = "Mark Learned";
    }
}

// Flashcards: Grid View Renderer
function renderFlashcardsGrid() {
    const root = document.getElementById("flashcard-grid-root");
    root.innerHTML = "";

    if (!state.studyKit || !state.studyKit.flashcards) return;

    state.studyKit.flashcards.forEach((card, idx) => {
        const starred = state.starredCards.has(idx);
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "grid-card-wrapper";
        
        cardWrapper.innerHTML = `
            <div class="grid-card" data-index="${idx}">
                <div class="grid-card-face grid-card-front">
                    <button class="grid-card-badge ${starred ? 'starred' : ''}" data-index="${idx}" title="Star Card">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </button>
                    <div class="grid-card-text">${card.question}</div>
                </div>
                <div class="grid-card-face grid-card-back">
                    <div class="grid-card-text">${card.answer}</div>
                </div>
            </div>
        `;

        const gridCardEl = cardWrapper.querySelector(".grid-card");
        gridCardEl.addEventListener("click", () => {
            gridCardEl.classList.toggle("flipped");
        });

        // Star click handler
        const starBtn = cardWrapper.querySelector(".grid-card-badge");
        starBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop flip card action
            toggleStarCardIndex(idx);
            starBtn.classList.toggle("starred");
        });

        root.appendChild(cardWrapper);
    });
}

// Glossary (Key Concepts) Renderer
function renderGlossary(filterText = "") {
    const root = document.getElementById("glossary-root");
    root.innerHTML = "";

    if (!state.studyKit || !state.studyKit.keyConcepts) return;

    const concepts = state.studyKit.keyConcepts;
    const query = filterText.toLowerCase().trim();

    const filtered = concepts.filter(concept => {
        return concept.term.toLowerCase().includes(query) || 
               concept.definition.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
        root.innerHTML = `<div class="no-results">No concepts found matching "${filterText}"</div>`;
        return;
    }

    filtered.forEach(concept => {
        const item = document.createElement("div");
        item.className = "glossary-card";
        item.innerHTML = `
            <h4>${escapeHTML(concept.term)}</h4>
            <p>${escapeHTML(concept.definition)}</p>
        `;
        root.appendChild(item);
    });
}

// Revision Cards Renderer
function renderRevisionCards() {
    const root = document.getElementById("revision-deck-root");
    root.innerHTML = "";

    if (!state.studyKit || !state.studyKit.revisionCards) return;

    state.studyKit.revisionCards.forEach(section => {
        const card = document.createElement("div");
        card.className = "revision-card";

        const bulletsHTML = section.bulletPoints
            .map(bullet => `<li>${escapeHTML(bullet)}</li>`)
            .join("");

        card.innerHTML = `
            <h3>${escapeHTML(section.title)}</h3>
            <ul class="revision-card-bullets">
                ${bulletsHTML}
            </ul>
        `;
        root.appendChild(card);
    });
}

function updateFooterStats() {
    const total = state.studyKit ? state.studyKit.flashcards.length : 0;
    const learned = state.learnedCards.size;
    document.getElementById("learned-stats-text").textContent = `${learned} of ${total} cards learned`;
}

// --- Navigation & Core Carousel Actions ---
function flipActiveCard() {
    const activeCard = document.getElementById("active-flashcard");
    activeCard.classList.toggle("flipped");
}

function navigatePrevCard() {
    if (!state.studyKit || state.studyKit.flashcards.length === 0) return;
    const total = state.studyKit.flashcards.length;
    
    // Decrement with wrapping
    state.currentCardIndex = (state.currentCardIndex - 1 + total) % total;
    renderActiveFlashcard();
}

function navigateNextCard() {
    if (!state.studyKit || state.studyKit.flashcards.length === 0) return;
    const total = state.studyKit.flashcards.length;
    
    // Increment with wrapping
    state.currentCardIndex = (state.currentCardIndex + 1) % total;
    renderActiveFlashcard();
}

function toggleStarActiveCard() {
    toggleStarCardIndex(state.currentCardIndex);
    renderActiveFlashcard();
    // Synchronize grid view stars if active
    if (state.viewMode === "grid") {
        renderFlashcardsGrid();
    }
}

function toggleStarCardIndex(idx) {
    if (state.starredCards.has(idx)) {
        state.starredCards.delete(idx);
        showToast("Card unstarred", "info");
    } else {
        state.starredCards.add(idx);
        showToast("Card starred!", "success");
    }
    persistProgress();
}

function toggleLearnedActiveCard() {
    const idx = state.currentCardIndex;
    if (state.learnedCards.has(idx)) {
        state.learnedCards.delete(idx);
        showToast("Marked as unlearned", "info");
    } else {
        state.learnedCards.add(idx);
        showToast("Marked as learned! Great job!", "success");
        // Automatically slide to next card for flow
        setTimeout(() => {
            if (state.learnedCards.has(idx)) { // Check if they didn't uncheck it immediately
                navigateNextCard();
            }
        }, 1000);
    }
    persistProgress();
    renderActiveFlashcard();
}

// Keyboard Controls
function handleKeyboardShortcuts(e) {
    // Disable shortcuts if settings modal is open or user is typing in forms
    const activeElement = document.activeElement.tagName.toLowerCase();
    const isModalOpen = document.getElementById("settings-modal").style.display === "flex";
    if (isModalOpen || activeElement === "textarea" || activeElement === "input" || activeElement === "select") {
        return;
    }

    if (state.activeTab === "flashcards" && state.viewMode === "carousel") {
        if (e.key === " ") {
            e.preventDefault();
            flipActiveCard();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            navigatePrevCard();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            navigateNextCard();
        }
    }
}

// Search Filtering Helper
function filterConcepts(query) {
    renderGlossary(query);
}

// --- Export Functions ---
function generateMarkdownContent() {
    if (!state.studyKit) return "";

    let md = `# Study Kit: Generated by FlashMind AI\n\n`;

    // Flashcards
    md += `## 📚 Flashcards\n\n`;
    state.studyKit.flashcards.forEach((card, idx) => {
        md += `### Card ${idx + 1}\n`;
        md += `**Question:** ${card.question}\n`;
        md += `**Answer:** ${card.answer}\n\n`;
    });

    // Key Concepts
    md += `## 🔑 Key Concepts Glossary\n\n`;
    state.studyKit.keyConcepts.forEach(concept => {
        md += `### ${concept.term}\n`;
        md += `${concept.definition}\n\n`;
    });

    // Summaries
    md += `## 📝 Revision Summaries\n\n`;
    state.studyKit.revisionCards.forEach(section => {
        md += `### ${section.title}\n`;
        section.bulletPoints.forEach(bullet => {
            md += `- ${bullet}\n`;
        });
        md += `\n`;
    });

    return md;
}

async function copyMarkdownToClipboard() {
    const md = generateMarkdownContent();
    if (!md) return;

    try {
        await navigator.clipboard.writeText(md);
        showToast("Markdown copied to clipboard!", "success");
    } catch (err) {
        showToast("Failed to copy text to clipboard.", "error");
    }
}

function downloadJSONStudyKit() {
    if (!state.studyKit) return;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.studyKit, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tomatrix-study-kit-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Study Kit JSON downloaded!", "success");
}

// --- Utilities ---
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <span>${message}</span>
        <button type="button" class="toast-close">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function escapeHTML(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
