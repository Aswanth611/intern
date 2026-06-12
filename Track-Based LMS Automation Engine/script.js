// LMS Automation Engine - Core Logic & Data Simulation

// 1. Mock Content Database
const TRACKS_DB = [
  {
    id: 1,
    name: "Software Development",
    description: "Learn web programming, modern JavaScript, and build scalable backends with Node.js.",
    modules: [
      {
        id: 101,
        title: "Web Programming Foundations",
        sequence_order: 1,
        lessons: [
          { id: 1011, title: "Introduction to HTML5 Semantics", sequence_order: 1 },
          { id: 1012, title: "CSS Layouts & Flexbox Essentials", sequence_order: 2 },
          { id: 1013, title: "Responsive Web Design & Media Queries", sequence_order: 3 },
          { id: 1014, title: "Introduction to JavaScript Variables & Logic", sequence_order: 4 },
          { id: 1015, title: "Basic DOM Access & Event Handlers", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "Which HTML5 element represents self-contained, independent content like a blog post?",
            options: ["<section>", "<article>", "<div>", "<aside>"],
            answer: 1
          },
          {
            q: "In Flexbox, which property controls alignment along the main axis?",
            options: ["align-items", "justify-content", "align-content", "flex-direction"],
            answer: 1
          },
          {
            q: "What does the JS expression 'typeof []' return?",
            options: ["'array'", "'object'", "'list'", "'null'"],
            answer: 1
          }
        ]
      },
      {
        id: 102,
        title: "JavaScript & DOM Manipulation",
        sequence_order: 2,
        lessons: [
          { id: 1021, title: "Advanced DOM Selectors & Creation", sequence_order: 1 },
          { id: 1022, title: "Fetch API & Async/Await Operations", sequence_order: 2 },
          { id: 1023, title: "LocalStorage & Session Storage Web APIs", sequence_order: 3 },
          { id: 1024, title: "ES6 Modules & Modern JS Patterns", sequence_order: 4 },
          { id: 1025, title: "Error Handling & Debugging Techniques", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "Which method is used to dynamically create an element in JavaScript?",
            options: ["document.createElement()", "document.newElement()", "document.addElement()", "document.makeElement()"],
            answer: 0
          },
          {
            q: "What storage type persists data even after the browser is closed?",
            options: ["SessionStorage", "Cookies", "LocalStorage", "IndexedDB only"],
            answer: 2
          },
          {
            q: "Which keyword is used to handle exceptions in JavaScript?",
            options: ["catch", "try", "throw", "all of the above"],
            answer: 3
          }
        ]
      },
      {
        id: 103,
        title: "Backend Basics with Node.js",
        sequence_order: 3,
        lessons: [
          { id: 1031, title: "Understanding Runtime Environments & Node.js", sequence_order: 1 },
          { id: 1032, title: "Setting Up Express Server & Basic Routing", sequence_order: 2 },
          { id: 1033, title: "RESTful API Design Principles", sequence_order: 3 },
          { id: 1034, title: "Introduction to Databases & SQL", sequence_order: 4 },
          { id: 1035, title: "Deployment, Environment Variables & Security", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "Which Node.js core module provides file system utilities?",
            options: ["path", "fs", "os", "http"],
            answer: 1
          },
          {
            q: "In Express, what does 'res.status(201)' typically signify?",
            options: ["Request OK", "Resource Created Successfully", "Bad Request", "Internal Server Error"],
            answer: 1
          },
          {
            q: "Which HTTP verb is best suited for updating an existing database record?",
            options: ["GET", "POST", "PUT/PATCH", "DELETE"],
            answer: 2
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "AI Automation",
    description: "Design automated systems connecting web APIs, databases, and LLM reasoning loops.",
    modules: [
      {
        id: 201,
        title: "AI Basics & Ecosystem",
        sequence_order: 1,
        lessons: [
          { id: 2011, title: "What is Generative AI & LLMs?", sequence_order: 1 },
          { id: 2012, title: "Exploring the OpenAI API and Models", sequence_order: 2 },
          { id: 2013, title: "Understanding Embeddings & Vector Databases", sequence_order: 3 },
          { id: 2014, title: "Overview of AI Agents & Auto-systems", sequence_order: 4 },
          { id: 2015, title: "Security & Safety in AI Deployments", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What does 'LLM' stand for in Artificial Intelligence?",
            options: ["Low Level Model", "Large Language Model", "Logical Learning Matrix", "Linear Language Mapping"],
            answer: 1
          },
          {
            q: "Which type of database is optimized for similarity searches on text embeddings?",
            options: ["Relational Database", "Vector Database", "Key-Value Store", "Document Database"],
            answer: 1
          },
          {
            q: "What represents the core reasoning pattern of an AI Agent?",
            options: ["Looping prompt commands", "Pre-calculated static scripts", "Autonomous goal assessment and tool execution", "Simple regex classification"],
            answer: 2
          }
        ]
      },
      {
        id: 202,
        title: "Prompt Engineering & Patterns",
        sequence_order: 2,
        lessons: [
          { id: 2021, title: "Zero-shot & Few-shot Prompting Methods", sequence_order: 1 },
          { id: 2022, title: "Chain of Thought & Reasoning Patterns", sequence_order: 2 },
          { id: 2023, title: "System vs User Prompts & Guidelines", sequence_order: 3 },
          { id: 2024, title: "Managing Token Limits & Prompt Contexts", sequence_order: 4 },
          { id: 2025, title: "Preventing Prompt Injection & Guardrails", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What is 'few-shot prompting'?",
            options: ["Giving the model limited chances to answer", "Providing a few input-output examples in the instructions", "Using very short sentences", "Running the model at lower speed"],
            answer: 1
          },
          {
            q: "What characterizes Chain of Thought (CoT) prompting?",
            options: ["Linking multiple LLMs together", "Instructing the model to output its intermediate reasoning steps", "Limiting the prompt vocabulary", "Using continuous inputs"],
            answer: 1
          },
          {
            q: "What is prompt injection?",
            options: ["Updating the model's weights", "Maliciously hijacking the system's instructions via user inputs", "Inserting syntax tokens", "Increasing token count"],
            answer: 1
          }
        ]
      },
      {
        id: 203,
        title: "Workflow Automation & Integrations",
        sequence_order: 3,
        lessons: [
          { id: 2031, title: "Introduction to Make.com & Zapier", sequence_order: 1 },
          { id: 2032, title: "Connecting Webhooks and APIs to AI", sequence_order: 2 },
          { id: 2033, title: "Processing Email & Sheets with LLMs", sequence_order: 3 },
          { id: 2034, title: "Building Multi-step LangChain Workflows", sequence_order: 4 },
          { id: 2035, title: "Deploying an Automated Customer Service Agent", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "Which tool allows visual setup of automated webhook connections and conditional branches?",
            options: ["Visual Studio Code", "Make.com", "GitBash", "GitHub Pages"],
            answer: 1
          },
          {
            q: "What triggers a workflow immediately when an external event occurs?",
            options: ["Polling API call", "Instant Webhook listener", "Cron Job Schedule", "Static File system event"],
            answer: 1
          },
          {
            q: "What is LangChain?",
            options: ["A programming language for blockchains", "An open-source orchestration framework for building LLM apps", "A language translation API", "A database engine"],
            answer: 1
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "AI Foundations",
    description: "Deep dive into statistical models, machine learning, and deep neural network concepts.",
    modules: [
      {
        id: 301,
        title: "History & Core Concepts",
        sequence_order: 1,
        lessons: [
          { id: 3011, title: "Evolution of Artificial Intelligence", sequence_order: 1 },
          { id: 3012, title: "Supervised vs Unsupervised Learning", sequence_order: 2 },
          { id: 3013, title: "Linear Regression & Classification Concepts", sequence_order: 3 },
          { id: 3014, title: "Evaluating Machine Learning Models", sequence_order: 4 },
          { id: 3015, title: "Overfitting, Underfitting & Regularization", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What category does predicting house prices (a continuous value) fall under?",
            options: ["Classification", "Unsupervised Clustering", "Regression", "Reinforcement Learning"],
            answer: 2
          },
          {
            q: "What is 'overfitting' in machine learning?",
            options: ["When the model is too simple for the training data", "When the model fits training data perfectly but performs poorly on new test data", "When training takes too long", "When the data size is too small"],
            answer: 1
          },
          {
            q: "What technique is used to penalize complex models to prevent overfitting?",
            options: ["Feature Scaling", "Regularization (L1/L2)", "Gradient Boosting", "Stochastic Splitting"],
            answer: 1
          }
        ]
      },
      {
        id: 302,
        title: "Machine Learning Demystified",
        sequence_order: 2,
        lessons: [
          { id: 3021, title: "Decision Trees & Random Forests", sequence_order: 1 },
          { id: 3022, title: "Gradient Descent Optimization Explained", sequence_order: 2 },
          { id: 3023, title: "Support Vector Machines & Kernels", sequence_order: 3 },
          { id: 3024, title: "Feature Engineering & Preprocessing Data", sequence_order: 4 },
          { id: 3025, title: "Unsupervised Clustering & K-Means", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What is a Random Forest?",
            options: ["A single complex Decision Tree", "An ensemble of multiple Decision Trees", "A neural network architecture", "A data cleaning pipeline"],
            answer: 1
          },
          {
            q: "What does Gradient Descent optimize?",
            options: ["The learning rate constant", "The cost/loss function weights", "The size of test splits", "The number of features"],
            answer: 1
          },
          {
            q: "Which algorithm organizes unlabeled data into groups based on similarity?",
            options: ["Linear Regression", "Logistic Regression", "K-Means Clustering", "Random Forest Classifier"],
            answer: 2
          }
        ]
      },
      {
        id: 303,
        title: "Neural Networks & Deep Learning",
        sequence_order: 3,
        lessons: [
          { id: 3031, title: "Structure of a Perceptron & Activation Functions", sequence_order: 1 },
          { id: 3032, title: "Backpropagation & Training Networks", sequence_order: 2 },
          { id: 3033, title: "Convolutional Neural Networks (CNNs) for Images", sequence_order: 3 },
          { id: 3034, title: "Recurrent Neural Networks (RNNs) & Transformers", sequence_order: 4 },
          { id: 3035, title: "Training Large Models: GPUs & Optimization", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What is the primary purpose of an activation function in a neural network?",
            options: ["To compute the sum of inputs", "To introduce non-linearity", "To adjust learning rates", "To save progress weights"],
            answer: 1
          },
          {
            q: "Which network architecture revolutionized NLP by introducing Self-Attention mechanisms?",
            options: ["Convolutional Networks", "Recurrent Networks", "Transformer Networks", "Feedforward Networks"],
            answer: 2
          },
          {
            q: "What algorithm propagates errors backwards through the network to update weights?",
            options: ["Forward propagation", "Gradient ascent", "Backpropagation", "Kernel trick"],
            answer: 2
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "AI Content Creation",
    description: "Master generative media: write text, generate images, and compose audio/video using AI tools.",
    modules: [
      {
        id: 401,
        title: "Generative Text & Copywriting",
        sequence_order: 1,
        lessons: [
          { id: 4011, title: "Writing Dynamic Blog Posts with LLMs", sequence_order: 1 },
          { id: 4012, title: "Creating Compelling Social Media Copy", sequence_order: 2 },
          { id: 4013, title: "Tone & Voice Customization Techniques", sequence_order: 3 },
          { id: 4014, title: "Automated Translation & Localization", sequence_order: 4 },
          { id: 4015, title: "Editing, Proofreading & Fact-checking AI Output", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What is 'hallucination' in generative text models?",
            options: ["Generating text in multiple languages", "Generating factually incorrect or fabricated information", "Displaying images", "Running out of token limits"],
            answer: 1
          },
          {
            q: "Which parameter controls the random creativity of text outputs in LLMs?",
            options: ["Max tokens", "Temperature", "Presence penalty", "Frequency penalty"],
            answer: 1
          },
          {
            q: "Why is fact-checking critical when writing copy with LLMs?",
            options: ["Because LLMs generate deterministic facts only", "Because LLMs lack real-time verification and can confidently make up citations", "Because text files are compressed", "Because it is required by search engine robots"],
            answer: 1
          }
        ]
      },
      {
        id: 402,
        title: "AI Art & Image Generation",
        sequence_order: 2,
        lessons: [
          { id: 4021, title: "Text-to-Image Prompts in Midjourney & DALL-E 3", sequence_order: 1 },
          { id: 4022, title: "Controlling Aspect Ratios & Style Parameters", sequence_order: 2 },
          { id: 4023, title: "Image-to-Image & Outpainting Workflows", sequence_order: 3 },
          { id: 4024, title: "Editing Images with Inpainting Techniques", sequence_order: 4 },
          { id: 4025, title: "Creating Consistent Brand Assets & Logos", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "What is 'inpainting' in AI art generators?",
            options: ["Resizing the canvas to a wider frame", "Regenerating a selected part within an existing image", "Combining two completely separate files", "Converting vectors to PNG"],
            answer: 1
          },
          {
            q: "What parameter in Midjourney specifies aspect ratio? (e.g. wide-screen)",
            options: ["--s 250", "--ar 16:9", "--v 6.0", "--q 2"],
            answer: 1
          },
          {
            q: "What is 'outpainting'?",
            options: ["Removing background subjects", "Extending the image elements beyond its original boundaries", "Stylizing vectors", "Converting sketch to realistic photo"],
            answer: 1
          }
        ]
      },
      {
        id: 403,
        title: "AI Video & Audio Production",
        sequence_order: 3,
        lessons: [
          { id: 4031, title: "Scripting & Storyboarding with AI assistance", sequence_order: 1 },
          { id: 4032, title: "Voice Synthesis & Text-to-Speech (ElevenLabs)", sequence_order: 2 },
          { id: 4033, title: "Generating Videos from Text (Runway Gen-2)", sequence_order: 3 },
          { id: 4034, title: "AI Audio Enhancement & Music Generation", sequence_order: 4 },
          { id: 4035, title: "Assembling a Short Film with AI Tools", sequence_order: 5 }
        ],
        quiz: [
          {
            q: "Which AI tool is famous for high-fidelity human voice cloning and speech synthesis?",
            options: ["Midjourney", "ElevenLabs", "GitHub Copilot", "Stable Diffusion"],
            answer: 1
          },
          {
            q: "What technology powers text-to-video tools like Sora or Runway Gen-2?",
            options: ["Traditional keyframe keying", "Diffusion models operating on video frame sequences", "Static canvas interpolation", "Standard MP3 compression algorithms"],
            answer: 1
          },
          {
            q: "What is the best workflow to create a finished video using generative AI?",
            options: ["Generate everything in one single prompt", "Script -> Voice Over -> Video Shots -> Background Music -> Video Editor compilation", "Direct text-to-feature-length outputs", "None of the above"],
            answer: 1
          }
        ]
      }
    ]
  }
];

// 2. State Management (Simulating the Database tables in LocalStorage)
let student = null;     // 'students' table row
let progress = [];      // 'progress' table rows
let quizResults = [];   // 'quiz_results' table rows
let activeTab = "prototype";
let currentQuizModuleId = null;

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  setupTabListeners();
  setupTrackCardListeners();
  loadStateFromStorage();
  renderApp();
  setupErdListeners();
});

// Tab Routing System
function setupTabListeners() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  
  const selectedLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  const selectedPanel = document.getElementById(`${tabId}-panel`);
  
  if (selectedLink && selectedPanel) {
    selectedLink.classList.add("active");
    selectedPanel.classList.add("active");
  }
  
  // Custom actions per tab view
  if (tabId === "erd") {
    resetErdHighlighting();
  }
}

// Setup Event Listeners for Track Card selection
function setupTrackCardListeners() {
  document.querySelectorAll(".track-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".track-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      document.getElementById("btn-generate-path").removeAttribute("disabled");
    });
  });
}

// 3. Database State Loading/Saving & User Helper Functions
function loadUsersFromStorage() {
  const storedUsers = localStorage.getItem("lms_users");
  return storedUsers ? JSON.parse(storedUsers) : [];
}

function getSafeUserSuffix() {
  const email = localStorage.getItem("lms_current_user");
  return email ? email.toLowerCase().replace(/[^a-z0-9]/g, "_") : "";
}

function loadStateFromStorage() {
  const currentUserEmail = localStorage.getItem("lms_current_user");
  if (currentUserEmail) {
    const suffix = getSafeUserSuffix();
    const storedStudent = localStorage.getItem(`lms_student_${suffix}`);
    const storedProgress = localStorage.getItem(`lms_progress_${suffix}`);
    const storedQuiz = localStorage.getItem(`lms_quiz_${suffix}`);

    if (storedStudent) {
      student = JSON.parse(storedStudent);
      progress = storedProgress ? JSON.parse(storedProgress) : [];
      quizResults = storedQuiz ? JSON.parse(storedQuiz) : [];
    } else {
      // Fallback: Initialize student details if user is authenticated but state is empty
      const users = loadUsersFromStorage();
      const userObj = users.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());
      if (userObj) {
        student = {
          id: userObj.id || 1,
          name: userObj.name,
          email: userObj.email,
          selected_track_id: null,
          enrolled_at: new Date().toISOString()
        };
      } else {
        student = null;
      }
      progress = [];
      quizResults = [];
    }
  } else {
    student = null;
    progress = [];
    quizResults = [];
  }
}

function saveStateToStorage() {
  const currentUserEmail = localStorage.getItem("lms_current_user");
  if (currentUserEmail && student) {
    const suffix = getSafeUserSuffix();
    localStorage.setItem(`lms_student_${suffix}`, JSON.stringify(student));
    localStorage.setItem(`lms_progress_${suffix}`, JSON.stringify(progress));
    localStorage.setItem(`lms_quiz_${suffix}`, JSON.stringify(quizResults));
  }
  updateDbJsonViewer();
}

function updateDbJsonViewer() {
  const jsonViewer = document.getElementById("db-json-code");
  if (!jsonViewer) return;

  if (!student) {
    jsonViewer.innerHTML = `{\n  "status": "No active database session. Please enroll a student to initialize tables."\n}`;
    return;
  }

  const selectedTrack = student.selected_track_id ? TRACKS_DB.find(t => t.id === student.selected_track_id) : null;

  const databaseState = {
    students: [student],
    tracks: TRACKS_DB.map(t => ({ id: t.id, name: t.name, desc: t.description.substring(0, 40) + "..." })),
    modules: selectedTrack ? selectedTrack.modules.map(m => ({
      id: m.id,
      track_id: student.selected_track_id,
      title: m.title,
      sequence_order: m.sequence_order
    })) : [],
    micro_lessons: selectedTrack ? progress.map(p => {
      // Find lesson details
      let foundLesson = null;
      for (const mod of selectedTrack.modules) {
        const les = mod.lessons.find(l => l.id === p.lesson_id);
        if (les) {
          foundLesson = les;
          break;
        }
      }
      return {
        id: p.lesson_id,
        module_id: p.module_id,
        title: foundLesson ? foundLesson.title : "Lesson",
        sequence_order: foundLesson ? foundLesson.sequence_order : 1
      };
    }) : [],
    progress: progress.map(p => ({
      id: p.id,
      student_id: p.student_id,
      lesson_id: p.lesson_id,
      status: p.status,
      completed_at: p.completed_at
    })),
    quiz_results: quizResults
  };

  jsonViewer.innerHTML = JSON.stringify(databaseState, null, 2);
}

// Smooth Screen Transition Helper
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
        
        // Force reflow
        toEl.offsetHeight;
        
        if (callback) callback();
        
        setTimeout(() => {
          toEl.classList.remove("transition-in");
        }, 300);
      }
    }, 300);
  } else if (toEl) {
    toEl.style.display = "block";
    if (callback) callback();
  }
}

// 4. Rendering logic based on state
function renderApp() {
  updateDbJsonViewer();
  updateWorkflowDiagramState();

  const loginArea = document.getElementById("login-area");
  const trackArea = document.getElementById("track-area");
  const dashboardArea = document.getElementById("dashboard-area");

  if (!student) {
    // State 1: Anonymous student, show Login screen
    loginArea.style.display = "block";
    trackArea.style.display = "none";
    dashboardArea.style.display = "none";
    
    // Reset inputs safely
    const loginEmailEl = document.getElementById("login-email");
    if (loginEmailEl) loginEmailEl.value = "";
    const loginPassEl = document.getElementById("login-password");
    if (loginPassEl) loginPassEl.value = "";
  } else if (student && student.selected_track_id === null) {
    // State 2: Logged in but track not selected
    loginArea.style.display = "none";
    trackArea.style.display = "block";
    dashboardArea.style.display = "none";
    
    document.getElementById("track-greeting").innerText = `Welcome, ${student.name}! Let's launch your learning path.`;
    document.getElementById("btn-generate-path").setAttribute("disabled", "true");
    document.querySelectorAll(".track-card").forEach(c => c.classList.remove("selected"));
  } else {
    // State 3: Active student, show Dashboard
    loginArea.style.display = "none";
    trackArea.style.display = "none";
    dashboardArea.style.display = "block";
    
    // Update Dashboard Header Information
    document.getElementById("dashboard-student-name").innerText = student.name;
    const activeTrack = TRACKS_DB.find(t => t.id === student.selected_track_id);
    document.getElementById("dashboard-track-name").innerText = activeTrack.name;

    renderRoadmap(activeTrack);
    renderMetrics(activeTrack);
  }
}

// Authentication Form Switching
function toggleAuthMode(mode, event) {
  if (event) event.preventDefault();

  const loginView = document.getElementById("login-form-view");
  const signupView = document.getElementById("signup-form-view");
  const forgotView = document.getElementById("forgot-form-view");

  if (loginView) loginView.style.display = "none";
  if (signupView) signupView.style.display = "none";
  if (forgotView) forgotView.style.display = "none";

  if (mode === "signup") {
    if (signupView) signupView.style.display = "block";
  } else if (mode === "forgot") {
    if (forgotView) forgotView.style.display = "block";
    const stepEmail = document.getElementById("forgot-step-email");
    const stepReset = document.getElementById("forgot-step-reset");
    const forgotEmail = document.getElementById("forgot-email");
    if (stepEmail) stepEmail.style.display = "block";
    if (stepReset) stepReset.style.display = "none";
    if (forgotEmail) forgotEmail.value = "";
  } else {
    if (loginView) loginView.style.display = "block";
  }
}

// Portal Login Action
function loginStudent() {
  const emailInput = document.getElementById("login-email").value.trim();
  const passInput = document.getElementById("login-password").value;

  if (!emailInput || !passInput) {
    alert("Please enter both your email address and password!");
    return;
  }

  const users = loadUsersFromStorage();
  const user = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

  if (!user) {
    alert("User does not exist! Please create an account first.");
    toggleAuthMode("signup");
    const signupEmail = document.getElementById("signup-email");
    if (signupEmail) signupEmail.value = emailInput;
    return;
  }

  if (user.password !== passInput) {
    alert("Incorrect password! Please try again.");
    return;
  }

  // Authenticate session
  localStorage.setItem("lms_current_user", user.email);
  loadStateFromStorage();

  // Redirect based on whether track selection is complete
  const targetScreen = (student && student.selected_track_id !== null) ? "dashboard-area" : "track-area";

  transitionToScreen("login-area", targetScreen, () => {
    renderApp();
  });
}

// Student Registration Action
function signupStudent() {
  const nameInput = document.getElementById("signup-name").value.trim();
  const emailInput = document.getElementById("signup-email").value.trim();
  const passInput = document.getElementById("signup-password").value;
  const trackSelect = document.getElementById("signup-track");
  const trackIdVal = trackSelect ? trackSelect.value : "";

  if (!nameInput || !emailInput || !passInput || !trackIdVal) {
    alert("Please fill in all registration fields, including your preferred learning track!");
    return;
  }

  if (!emailInput.includes("@")) {
    alert("Please enter a valid email address!");
    return;
  }

  const users = loadUsersFromStorage();
  const existingUser = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

  if (existingUser) {
    alert("An account with this email already exists! Please log in.");
    toggleAuthMode("login");
    const loginEmail = document.getElementById("login-email");
    if (loginEmail) loginEmail.value = emailInput;
    return;
  }

  // Create new credentials
  const newUser = {
    id: users.length + 1,
    name: nameInput,
    email: emailInput,
    password: passInput,
    created_at: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("lms_users", JSON.stringify(users));

  // Log user in automatically
  localStorage.setItem("lms_current_user", emailInput);

  // Initialize student profile
  const trackId = parseInt(trackIdVal);
  student = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    selected_track_id: trackId,
    enrolled_at: new Date().toISOString()
  };

  // Pre-generate learning path records
  progress = [];
  const selectedTrack = TRACKS_DB.find(t => t.id === trackId);
  let progressIdCounter = 1;

  selectedTrack.modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      const isFirst = (mod.sequence_order === 1 && lesson.sequence_order === 1);
      progress.push({
        id: progressIdCounter++,
        student_id: student.id,
        module_id: mod.id,
        lesson_id: lesson.id,
        status: isFirst ? "active" : "locked",
        completed_at: null
      });
    });
  });

  quizResults = [];

  saveStateToStorage();

  // Reset forms
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";
  if (trackSelect) trackSelect.selectedIndex = 0;

  alert(`Welcome, ${nameInput}! Your account has been created and your roadmap is generated.`);
  transitionToScreen("login-area", "dashboard-area", () => {
    renderApp();
  });
}

// Forgot Password Flow
let verifiedForgotEmailStr = "";

function verifyForgotEmail() {
  const emailInput = document.getElementById("forgot-email").value.trim();
  if (!emailInput) {
    alert("Please enter your registered email address!");
    return;
  }

  const users = loadUsersFromStorage();
  const user = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

  if (!user) {
    alert("This email address is not registered in our system.");
    return;
  }

  verifiedForgotEmailStr = user.email;

  const stepEmail = document.getElementById("forgot-step-email");
  const stepReset = document.getElementById("forgot-step-reset");
  if (stepEmail) stepEmail.style.display = "none";
  if (stepReset) stepReset.style.display = "block";
}

function resetUserPassword() {
  const newPass = document.getElementById("forgot-new-password").value;
  const confirmPass = document.getElementById("forgot-confirm-password").value;

  if (!newPass || !confirmPass) {
    alert("Please fill in both password fields!");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match! Please check and try again.");
    return;
  }

  if (!verifiedForgotEmailStr) {
    alert("Session error. Please start the password reset flow again.");
    toggleAuthMode("login");
    return;
  }

  const users = loadUsersFromStorage();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === verifiedForgotEmailStr.toLowerCase());

  if (userIdx === -1) {
    alert("Error finding the user record. Please try again.");
    return;
  }

  users[userIdx].password = newPass;
  localStorage.setItem("lms_users", JSON.stringify(users));

  alert("Password updated successfully! Please log in with your new password.");

  // Clear forgot password inputs
  document.getElementById("forgot-email").value = "";
  document.getElementById("forgot-new-password").value = "";
  document.getElementById("forgot-confirm-password").value = "";
  verifiedForgotEmailStr = "";

  const stepEmail = document.getElementById("forgot-step-email");
  const stepReset = document.getElementById("forgot-step-reset");
  if (stepEmail) stepEmail.style.display = "block";
  if (stepReset) stepReset.style.display = "none";

  toggleAuthMode("login");
}

// Portal Logout Action
function logoutStudent() {
  student = null;
  progress = [];
  quizResults = [];
  localStorage.removeItem("lms_current_user");
  updateDbJsonViewer();
  
  // Decide which screen we're transitioning from
  const currentActiveEl = document.getElementById("track-area").style.display !== "none" ? "track-area" : "dashboard-area";
  
  transitionToScreen(currentActiveEl, "login-area", () => {
    renderApp();
  });
}

// Switch track screen
function switchToTrackSelection() {
  transitionToScreen("dashboard-area", "track-area", () => {
    if (student) {
      document.getElementById("track-greeting").innerText = `Welcome, ${student.name}! Switch to or enroll in any track below.`;
      
      document.querySelectorAll(".track-card").forEach(c => {
        c.classList.remove("selected");
        if (parseInt(c.getAttribute("data-id")) === student.selected_track_id) {
          c.classList.add("selected");
        }
      });
      document.getElementById("btn-generate-path").removeAttribute("disabled");
    }
  });
}

// Onboarding/Track Enrollment: student selects track and generates/loads roadmap
function onboardStudent() {
  const selectedCard = document.querySelector(".track-card.selected");
  if (!selectedCard || !student) {
    alert("Please select a track first!");
    return;
  }

  const trackId = parseInt(selectedCard.getAttribute("data-id"));
  student.selected_track_id = trackId;

  const selectedTrack = TRACKS_DB.find(t => t.id === trackId);
  const firstModuleId = selectedTrack.modules[0].id;

  // Check if this track is already initialized in progress
  const alreadyInitialized = progress.some(p => p.module_id === firstModuleId);

  if (!alreadyInitialized) {
    // Generate new progress records and append to existing progress
    let maxId = progress.reduce((max, p) => p.id > max ? p.id : max, 0);
    
    selectedTrack.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        // Module 1, Lesson 1 is unlocked initially. Everything else is locked.
        const isFirstLessonOfFirstModule = (mod.sequence_order === 1 && lesson.sequence_order === 1);
        
        progress.push({
          id: ++maxId,
          student_id: student.id,
          module_id: mod.id,
          lesson_id: lesson.id,
          status: isFirstLessonOfFirstModule ? "active" : "locked",
          completed_at: null
        });
      });
    });
  }

  saveStateToStorage();
  transitionToScreen("track-area", "dashboard-area", () => {
    renderApp();
  });
}

// Render dynamic learning path modules
function renderRoadmap(track) {
  const roadmapContainer = document.getElementById("roadmap-container");
  roadmapContainer.innerHTML = "";

  track.modules.forEach(mod => {
    // Check module state:
    // Completed if all its lessons are completed.
    // Unlocked if previous modules are passed and quiz taken.
    const moduleLessonsProgress = progress.filter(p => p.module_id === mod.id);
    const allCompleted = moduleLessonsProgress.every(p => p.status === "completed");
    
    // To check if unlocked: previous modules must be completed and their quizzes passed
    let isModuleUnlocked = false;
    if (mod.sequence_order === 1) {
      isModuleUnlocked = true; // First module always starts unlocked
    } else {
      // Find previous module ID
      const prevMod = track.modules.find(m => m.sequence_order === mod.sequence_order - 1);
      if (prevMod) {
        const quizPassed = quizResults.some(q => q.module_id === prevMod.id && q.passed);
        if (quizPassed) {
          isModuleUnlocked = true;
        }
      }
    }

    const moduleRow = document.createElement("div");
    moduleRow.className = `module-row ${isModuleUnlocked ? 'unlocked' : 'locked'} ${allCompleted ? 'completed' : ''}`;
    
    let statusIcon = "🔒";
    let statusText = "Locked";
    if (allCompleted) {
      statusIcon = "✓";
      statusText = "Completed";
    } else if (isModuleUnlocked) {
      statusIcon = mod.sequence_order;
      statusText = "In Progress";
    }

    moduleRow.innerHTML = `
      <div class="module-row-header" onclick="toggleLessonsList(${mod.id})">
        <div class="module-title-area">
          <div class="module-status-indicator">${statusIcon}</div>
          <div>
            <div class="module-name">${mod.title}</div>
            <div class="module-desc">Module ${mod.sequence_order} • 5 Micro-Lessons • ${statusText}</div>
          </div>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Click to toggle details</span>
        </div>
      </div>
      <div class="lessons-list" id="lessons-list-${mod.id}" style="display: ${isModuleUnlocked ? 'flex' : 'none'};">
        ${renderLessons(mod.lessons, moduleLessonsProgress)}
      </div>
    `;

    roadmapContainer.appendChild(moduleRow);
  });
}

// Generate the HTML for the lesson items inside a module
function renderLessons(lessons, progressList) {
  return lessons.map(lesson => {
    const pRecord = progressList.find(p => p.lesson_id === lesson.id);
    const status = pRecord ? pRecord.status : "locked";

    let actionButton = "";
    let statusLabel = "";

    if (status === "active") {
      actionButton = `<button class="btn btn-primary" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="completeLesson(${lesson.id})">Complete Lesson</button>`;
      statusLabel = `<span style="color: var(--primary); font-size: 0.8rem; font-weight: 600;">Active</span>`;
    } else if (status === "completed") {
      statusLabel = `<span style="color: var(--success); font-size: 0.8rem; font-weight: 600;">Completed</span>`;
    } else if (status === "unlocked") {
      statusLabel = `<span style="color: var(--warning); font-size: 0.8rem; font-weight: 600;">Unlocked</span>`;
    } else {
      statusLabel = `<span style="color: var(--text-muted); font-size: 0.8rem;">Locked</span>`;
    }

    return `
      <div class="lesson-item ${status}">
        <div class="lesson-title-info">
          <div class="lesson-status-dot"></div>
          <div class="lesson-title">Lesson ${lesson.sequence_order}: ${lesson.title}</div>
        </div>
        <div>
          ${actionButton ? actionButton : statusLabel}
        </div>
      </div>
    `;
  }).join('');
}

function toggleLessonsList(moduleId) {
  const list = document.getElementById(`lessons-list-${moduleId}`);
  if (list) {
    list.style.display = list.style.display === "none" ? "flex" : "none";
  }
}

// 5. Complete Lesson Action Trigger
function completeLesson(lessonId) {
  // Find current progress index
  const activeIdx = progress.findIndex(p => p.lesson_id === lessonId && p.status === "active");
  if (activeIdx === -1) return;

  // 1. Mark active lesson as completed
  progress[activeIdx].status = "completed";
  progress[activeIdx].completed_at = new Date().toISOString();

  // 2. Look for the next lesson in the track progress list
  const activeModuleId = progress[activeIdx].module_id;
  const nextLessonIdx = activeIdx + 1;

  if (nextLessonIdx < progress.length && progress[nextLessonIdx].module_id === activeModuleId) {
    // Next lesson exists in the SAME module, unlock it
    progress[nextLessonIdx].status = "active";
  } else {
    // No more lessons in the current module. Check if all 5 are completed.
    const moduleLessons = progress.filter(p => p.module_id === activeModuleId);
    const allCompleted = moduleLessons.every(p => p.status === "completed");

    if (allCompleted) {
      // Trigger Redirect to Quiz
      setTimeout(() => {
        triggerQuizRedirect(activeModuleId);
      }, 500);
    }
  }

  saveStateToStorage();
  renderApp();
}

// Render Dashboard Metrics (Streaks, Completion %, next actions)
function renderMetrics(track) {
  // Isolate metrics calculations to current active track
  const trackModuleIds = track.modules.map(m => m.id);
  const trackProgress = progress.filter(p => trackModuleIds.includes(p.module_id));

  const completedLessons = trackProgress.filter(p => p.status === "completed").length;
  const totalLessons = trackProgress.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Update percentages
  document.getElementById("progress-percentage-label").innerText = `${progressPercentage}%`;
  document.getElementById("progress-percentage-bar").style.width = `${progressPercentage}%`;

  // Update metrics counts
  document.getElementById("metric-lessons-completed").innerText = `${completedLessons} / ${totalLessons}`;

  // Count passed modules
  const completedModules = track.modules.filter(mod => {
    const qPassed = quizResults.some(qr => qr.module_id === mod.id && qr.passed);
    return qPassed;
  }).length;
  document.getElementById("metric-modules-completed").innerText = `${completedModules} / ${track.modules.length}`;

  // Streak calculation (completed consecutive lessons in past 24 hours/mock, let's keep it simple: completed count / 3)
  const streak = Math.max(1, Math.floor(completedLessons / 2) + (completedModules * 2));
  document.getElementById("metric-streak").innerText = `${streak} Days`;

  // Next Action suggestion
  const nextActiveLesson = trackProgress.find(p => p.status === "active");
  const nextActionBox = document.getElementById("next-action-box");

  if (nextActiveLesson) {
    let foundLesson = null;
    let foundModule = null;
    for (const mod of track.modules) {
      const les = mod.lessons.find(l => l.id === nextActiveLesson.lesson_id);
      if (les) {
        foundLesson = les;
        foundModule = mod;
        break;
      }
    }
    nextActionBox.innerHTML = `
      <p style="font-size: 0.85rem; color: var(--text-secondary);">Current Task:</p>
      <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin: 0.25rem 0;">${foundModule.title} - Lesson ${foundLesson.sequence_order}</h4>
      <p style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">${foundLesson.title}</p>
    `;
  } else {
    // Check if there is an active quiz redirect
    const activeModuleQuizIdx = track.modules.findIndex(m => {
      const modLessons = trackProgress.filter(p => p.module_id === m.id);
      const lessonsDone = modLessons.every(p => p.status === "completed");
      const quizDone = quizResults.some(qr => qr.module_id === m.id && qr.passed);
      return lessonsDone && !quizDone;
    });

    if (activeModuleQuizIdx !== -1) {
      const quizMod = track.modules[activeModuleQuizIdx];
      nextActionBox.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Current Task:</p>
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; margin: 0.25rem 0; color: var(--warning);">Module Quiz Required</h4>
        <button class="btn btn-primary" style="padding: 0.4rem 1rem; font-size: 0.8rem; margin-top: 0.5rem;" onclick="triggerQuizRedirect(${quizMod.id})">Start Module ${quizMod.sequence_order} Quiz</button>
      `;
    } else {
      // Graduation check
      const lastModuleId = track.modules[track.modules.length - 1].id;
      const finishedAll = quizResults.some(qr => qr.module_id === lastModuleId && qr.passed);

      if (finishedAll) {
        renderGraduationCelebration();
      } else {
        nextActionBox.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-secondary);">No action active. Re-evaluating...</p>`;
      }
    }
  }
}

// Helper to escape HTML tags inside strings
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 6. Quiz Module Redirection & Quiz Form Rendering
function triggerQuizRedirect(moduleId) {
  currentQuizModuleId = moduleId;
  
  // Find current track and module questions
  const track = TRACKS_DB.find(t => t.id === student.selected_track_id);
  const mod = track.modules.find(m => m.id === moduleId);

  const container = document.getElementById("roadmap-container");
  
  // Highlight "Redirect to Quiz" node in workflow diagram
  updateWorkflowDiagramState("quiz_redirect");

  container.innerHTML = `
    <div class="glass-card highlighted quiz-overlay">
      <div class="card-header" style="margin-bottom: 0.5rem;">
        <div>
          <span style="color: var(--warning); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Requirement Triggered</span>
          <h3 style="font-family: var(--font-heading); margin-top: 0.25rem;">Module Quiz: ${mod.title}</h3>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Pass Score: 2/3 (60%)</div>
      </div>
      
      <div id="quiz-questions-form">
        ${mod.quiz.map((qItem, idx) => `
          <div class="quiz-question-box" style="margin-bottom: 1rem;">
            <div class="question-text">Q${idx + 1}: ${qItem.q}</div>
            <div class="options-list" data-qidx="${idx}">
              ${qItem.options.map((opt, optIdx) => `
                <button type="button" class="option-btn" onclick="selectQuizOption(this, ${idx}, ${optIdx})">${escapeHtml(opt)}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button class="btn btn-primary" onclick="submitModuleQuiz(${moduleId})">Submit Answers</button>
        <button class="btn btn-secondary" onclick="renderApp()">Return to Roadmap</button>
      </div>
    </div>
  `;
}

function selectQuizOption(btn, questionIdx, optionIdx) {
  // Deselect other options in same list
  const list = btn.parentElement;
  list.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  list.setAttribute("data-selected-option", optionIdx);
}

// Quiz Grading & Next Module Unlocking logic
function submitModuleQuiz(moduleId) {
  const track = TRACKS_DB.find(t => t.id === student.selected_track_id);
  const mod = track.modules.find(m => m.id === moduleId);
  
  let score = 0;
  let allAnswered = true;

  const optionLists = document.querySelectorAll(".options-list");
  optionLists.forEach((list, idx) => {
    const selected = list.getAttribute("data-selected-option");
    if (selected === null) {
      allAnswered = false;
      return;
    }
    
    const selectedAnswer = parseInt(selected);
    if (selectedAnswer === mod.quiz[idx].answer) {
      score++;
    }
  });

  if (!allAnswered) {
    alert("Please answer all questions before submitting!");
    return;
  }

  const passed = score >= 2; // 60% standard pass (2 out of 3 correct)

  // 1. Record Quiz Result
  const quizRecordId = quizResults.length + 1;
  const newQuizResult = {
    id: quizRecordId,
    student_id: student.id,
    module_id: moduleId,
    score: Math.round((score / 3) * 100),
    passed: passed,
    completed_at: new Date().toISOString()
  };
  
  quizResults.push(newQuizResult);

  const container = document.getElementById("roadmap-container");

  if (passed) {
    // 2. Unlock Next Module if exists
    const nextMod = track.modules.find(m => m.sequence_order === mod.sequence_order + 1);
    
    if (nextMod) {
      // Find the first lesson of the next module and set status to "active"
      const firstLessonOfNextMod = progress.find(p => p.module_id === nextMod.id && p.lesson_id === nextMod.lessons[0].id);
      if (firstLessonOfNextMod) {
        firstLessonOfNextMod.status = "active";
      }
    }

    saveStateToStorage();

    // Show success results screen
    container.innerHTML = `
      <div class="glass-card" style="border-color: var(--success); text-align: center; padding: 3rem 1.5rem;">
        <span style="font-size: 3rem;">🎉</span>
        <h2 style="font-family: var(--font-heading); color: var(--success); margin: 1rem 0 0.5rem 0;">Quiz Passed!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">You scored ${newQuizResult.score}% on the module assessment.</p>
        
        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; padding: 1rem; max-width: 380px; margin: 0 auto 2rem auto;">
          <h4 style="color: white; margin-bottom: 0.25rem;">Automated Action Executed</h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">Next Module Unlocked. Lesson 1 of next module set to ACTIVE status.</p>
        </div>

        <button class="btn btn-primary" onclick="renderApp()">Proceed to Next Module</button>
      </div>
    `;
  } else {
    saveStateToStorage();
    // Show failure screen and allow retake
    container.innerHTML = `
      <div class="glass-card" style="border-color: var(--error); text-align: center; padding: 3rem 1.5rem;">
        <span style="font-size: 3rem;">❌</span>
        <h2 style="font-family: var(--font-heading); color: var(--error); margin: 1rem 0 0.5rem 0;">Quiz Failed</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">You scored ${newQuizResult.score}%. You need at least 60% (2/3 correct) to unlock the next module.</p>
        
        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 1rem; max-width: 380px; margin: 0 auto 2rem auto;">
          <h4 style="color: white; margin-bottom: 0.25rem;">Condition Not Met</h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">Next Module remains locked. Please review the material and try again.</p>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-primary" onclick="triggerQuizRedirect(${moduleId})">Retry Quiz</button>
          <button class="btn btn-secondary" onclick="renderApp()">Return to Roadmap</button>
        </div>
      </div>
    `;
  }
}

// Celebrate Graduation when all modules are completed
function renderGraduationCelebration() {
  const roadmapContainer = document.getElementById("roadmap-container");
  const nextActionBox = document.getElementById("next-action-box");

  roadmapContainer.innerHTML = `
    <div class="glass-card graduation-splash" style="border-color: var(--primary);">
      <div class="confetti-icon">🎓</div>
      <h2 class="gradient-text" style="font-size: 2rem; margin: 1.5rem 0 0.5rem 0;">Congratulations, ${student.name}!</h2>
      <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem auto;">
        You have successfully unlocked all modules, completed all 15 micro-lessons, passed all assessments, and graduated from the <strong>${TRACKS_DB.find(t => t.id === student.selected_track_id).name}</strong> track!
      </p>

      <div style="background: rgba(99, 102, 241, 0.06); border: 1px solid rgba(99, 102, 241, 0.15); border-radius: 12px; padding: 1.5rem; max-width: 420px; margin: 0 auto 2rem auto; text-align: left;">
        <h4 style="color: white; margin-bottom: 0.5rem; font-family: var(--font-heading);">Completed Credentials:</h4>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
          <span style="color: var(--text-secondary);">Student ID:</span>
          <span style="color: white; font-weight: bold;">LMS-STUDENT-001</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
          <span style="color: var(--text-secondary);">Completion Date:</span>
          <span style="color: white;">${new Date().toLocaleDateString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
          <span style="color: var(--text-secondary);">Course Status:</span>
          <span style="color: var(--success); font-weight: bold;">GRADUATED</span>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
        <button class="btn btn-primary" onclick="switchToTrackSelection()">Enroll in Another Track</button>
        <button class="btn btn-secondary" onclick="resetDatabaseState()">Reset Current Track Data</button>
      </div>
    </div>
  `;

  nextActionBox.innerHTML = `
    <h4 style="color: var(--success); font-family: var(--font-heading); margin-bottom: 0.25rem;">Track Complete!</h4>
    <p style="font-size: 0.8rem; color: var(--text-secondary);">You graduated with honors.</p>
  `;
}

// Reset Database state (only resets current track history, leaving other courses intact)
function resetDatabaseState() {
  if (!student || student.selected_track_id === null) return;

  const trackId = student.selected_track_id;
  const selectedTrack = TRACKS_DB.find(t => t.id === trackId);
  const trackModuleIds = selectedTrack.modules.map(m => m.id);

  // 1. Remove current track's progress records from the progress array
  progress = progress.filter(p => !trackModuleIds.includes(p.module_id));

  // 2. Remove current track's quiz results from the quizResults array
  quizResults = quizResults.filter(q => !trackModuleIds.includes(q.module_id));

  // 3. Re-initialize progress for the current track
  let maxId = progress.reduce((max, p) => p.id > max ? p.id : max, 0);
  selectedTrack.modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      const isFirst = (mod.sequence_order === 1 && lesson.sequence_order === 1);
      progress.push({
        id: ++maxId,
        student_id: student.id,
        module_id: mod.id,
        lesson_id: lesson.id,
        status: isFirst ? "active" : "locked",
        completed_at: null
      });
    });
  });

  saveStateToStorage();
  renderApp();
  alert("Current track progress has been reset successfully!");
}

// 7. Interactive Workflow Diagram state highlighting
function updateWorkflowDiagramState(customState = null) {
  // Reset active classes
  const nodes = document.querySelectorAll(".flow-node");
  nodes.forEach(n => {
    n.classList.remove("active");
    n.classList.remove("completed");
  });

  if (!student) {
    // State 1: Login Screen active
    document.getElementById("node-signup").classList.add("active");
    return;
  }

  if (student && student.selected_track_id === null) {
    // State 2: Track selection active
    document.getElementById("node-signup").classList.add("completed");
    document.getElementById("node-select-track").classList.add("active");
    return;
  }

  document.getElementById("node-signup").classList.add("completed");
  document.getElementById("node-select-track").classList.add("completed");
  document.getElementById("node-gen-path").classList.add("completed");

  if (customState === "quiz_redirect") {
    document.getElementById("node-unlock-m1").classList.add("completed");
    document.getElementById("node-unlock-l1").classList.add("completed");
    document.getElementById("node-comp-l").classList.add("completed");
    document.getElementById("node-check-all-done").classList.add("completed");
    document.getElementById("node-redirect-quiz").classList.add("active");
    return;
  }

  // Evaluate state of lessons completed
  const completedLessons = progress.filter(p => p.status === "completed").length;
  const activeLesson = progress.find(p => p.status === "active");

  if (completedLessons === 0) {
    document.getElementById("node-unlock-m1").classList.add("active");
    document.getElementById("node-unlock-l1").classList.add("active");
  } else if (activeLesson) {
    document.getElementById("node-unlock-m1").classList.add("completed");
    document.getElementById("node-unlock-l1").classList.add("completed");
    document.getElementById("node-comp-l").classList.add("active");
    document.getElementById("node-unlock-next-l").classList.add("active");
  } else {
    // Quiz passed check
    const lastModuleId = TRACKS_DB.find(t => t.id === student.selected_track_id).modules[2].id;
    const completedAll = quizResults.some(qr => qr.module_id === lastModuleId && qr.passed);

    if (completedAll) {
      nodes.forEach(n => n.classList.add("completed"));
      document.getElementById("node-dashboard").classList.add("active");
    } else {
      document.getElementById("node-unlock-m1").classList.add("completed");
      document.getElementById("node-unlock-l1").classList.add("completed");
      document.getElementById("node-comp-l").classList.add("completed");
      document.getElementById("node-check-all-done").classList.add("completed");
      document.getElementById("node-redirect-quiz").classList.add("completed");
      document.getElementById("node-quiz-passed").classList.add("active");
      document.getElementById("node-unlock-next-m").classList.add("active");
    }
  }
}

// 8. ERD Interaction Listeners
function setupErdListeners() {
  document.querySelectorAll(".erd-table").forEach(table => {
    table.addEventListener("mouseenter", () => {
      const tableName = table.getAttribute("data-table");
      highlightErdRelationships(tableName);
    });

    table.addEventListener("mouseleave", () => {
      resetErdHighlighting();
    });
  });
}

function highlightErdRelationships(tableName) {
  // First, dim all ERD tables and links
  document.querySelectorAll(".erd-table").forEach(t => {
    if (t.getAttribute("data-table") !== tableName) {
      t.style.opacity = "0.35";
    } else {
      t.style.opacity = "1";
      t.classList.add("highlighted");
    }
  });

  document.querySelectorAll(".erd-link").forEach(l => {
    const fromTable = l.getAttribute("data-from");
    const toTable = l.getAttribute("data-to");
    if (fromTable === tableName || toTable === tableName) {
      l.classList.add("highlighted");
      l.style.opacity = "1";
    } else {
      l.style.opacity = "0.1";
    }
  });
}

function resetErdHighlighting() {
  document.querySelectorAll(".erd-table").forEach(t => {
    t.style.opacity = "1";
    t.classList.remove("highlighted");
  });

  document.querySelectorAll(".erd-link").forEach(l => {
    l.classList.remove("highlighted");
    l.style.opacity = "0.7";
  });
}
