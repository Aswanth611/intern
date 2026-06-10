/* ==========================================
   AGENTX BY TOMATRIX - COMPLETE SCRIPT
   ========================================== */

// =========================
// NAVBAR HIDE ON SCROLL DOWN / SHOW ON SCROLL UP
// =========================
const header = document.querySelector(".header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollY = window.scrollY;
});

// =========================
// MOBILE MENU
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "85px";
            navLinks.style.right = "5%";
            navLinks.style.padding = "25px";
            navLinks.style.borderRadius = "20px";
            navLinks.style.background = "rgba(8,12,30,0.95)";
            navLinks.style.backdropFilter = "blur(25px)";
            navLinks.style.gap = "20px";
            navLinks.style.zIndex = "999";
            navLinks.style.border = "1px solid rgba(255,255,255,.08)";
            navLinks.style.width = "200px";
        }
    });
}

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            if (navLinks.style.display === "flex") {
                navLinks.style.display = "none";
            }
        }
    });
});

// =========================
// PLATFORM TAB SWITCHER (No Screenshots - Interactive Console)
// =========================
const tabButtons = document.querySelectorAll(".tab-btn");
const consoleTab = document.getElementById("consoleTab");
const workflowTab = document.getElementById("workflowTab");
const analyticsTab = document.getElementById("analyticsTab");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        const tab = button.dataset.tab;
        
        if (consoleTab) consoleTab.style.display = "none";
        if (workflowTab) workflowTab.style.display = "none";
        if (analyticsTab) analyticsTab.style.display = "none";
        
        if (tab === "console") {
            if (consoleTab) consoleTab.style.display = "block";
        } else if (tab === "workflow") {
            if (workflowTab) workflowTab.style.display = "block";
        } else if (tab === "analytics") {
            if (analyticsTab) analyticsTab.style.display = "block";
        }
    });
});

// =========================
// LIVE CONSOLE TYPING EFFECT
// =========================
const typingText = document.getElementById("typingText");
if (typingText) {
    const messages = [
        "Analyzing incoming data streams...",
        "Processing 1,247 new records...",
        "Detecting optimization opportunities...",
        "Autonomous action: optimizing workflow...",
        "Ready for next command."
    ];
    let msgIndex = 0;
    let charIndex = 0;
    
    function typeMessage() {
        if (msgIndex >= messages.length) msgIndex = 0;
        const currentMsg = messages[msgIndex];
        if (charIndex <= currentMsg.length) {
            typingText.textContent = currentMsg.substring(0, charIndex);
            charIndex++;
            setTimeout(typeMessage, 50);
        } else {
            setTimeout(() => {
                charIndex = 0;
                msgIndex++;
                typeMessage();
            }, 3000);
        }
    }
    typeMessage();
}

// =========================
// AGENT COMMAND INPUT
// =========================
const agentCommand = document.getElementById("agentCommand");
const sendCommandBtn = document.getElementById("sendCommandBtn");
const consoleBody = document.getElementById("consoleBody");

function addCommandResponse(command, response) {
    if (!consoleBody) return;
    const responseLine = document.createElement("div");
    responseLine.className = "console-line";
    responseLine.innerHTML = `<span class="prompt">←</span> ${response}`;
    const commandLine = document.createElement("div");
    commandLine.className = "console-line";
    commandLine.innerHTML = `<span class="prompt">→</span> <span style="color:#00f5d4;">${command}</span>`;
    consoleBody.insertBefore(commandLine, document.querySelector(".console-command-line"));
    consoleBody.insertBefore(responseLine, document.querySelector(".console-command-line"));
}

if (sendCommandBtn && agentCommand) {
    sendCommandBtn.addEventListener("click", () => {
        const command = agentCommand.value.trim().toLowerCase();
        if (!command) return;
        
        let response = "";
        if (command.includes("status")) {
            response = "System status: All systems operational. 3 agents active. 98% efficiency.";
        } else if (command.includes("run report")) {
            response = "Generating report... Weekly performance: +32% increase in automated tasks. Top performing agent: SalesBot.";
        } else if (command.includes("help")) {
            response = "Available commands: status, run report, optimize tasks, show agents";
        } else if (command.includes("optimize")) {
            response = "Optimization in progress... Identified 4 bottlenecks. Autonomous action scheduled.";
        } else if (command.includes("show agents")) {
            response = "Active agents: SalesBot (active), SupportBot (active), DataBot (processing)";
        } else {
            response = `Processing "${command}"... AgentX is analyzing. Use 'help' for available commands.`;
        }
        
        addCommandResponse(command, response);
        agentCommand.value = "";
    });
    
    agentCommand.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendCommandBtn.click();
    });
}

// =========================
// WORKFLOW PRESETS
// =========================
const presetBtns = document.querySelectorAll(".preset-btn");
const workflowMsg = document.getElementById("workflowMsg");

presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const workflow = btn.dataset.workflow;
        let message = "";
        if (workflow === "email") {
            message = "✅ Email auto-responder workflow deployed! AgentX will now automatically categorize and respond to incoming emails.";
        } else if (workflow === "report") {
            message = "✅ Daily report generator activated! You'll receive insights every morning at 8 AM.";
        } else if (workflow === "leads") {
            message = "✅ Lead scoring automation live! AgentX will prioritize hot leads and route to sales team.";
        }
        if (workflowMsg) {
            workflowMsg.textContent = message;
            workflowMsg.style.color = "#00f5d4";
            setTimeout(() => {
                workflowMsg.style.color = "#b8c0d3";
                workflowMsg.textContent = "Click any preset to deploy workflow";
            }, 5000);
        }
    });
});

// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = target / 80;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (target >= 1000) {
                    counter.innerText = Math.floor(current).toLocaleString();
                } else {
                    counter.innerText = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 50000) counter.innerText = "50K+";
                else if (target === 2400000) counter.innerText = "2.4M+";
                else if (target === 120) counter.innerText = "120+";
                else if (target === 99) counter.innerText = "99.9%";
                else counter.innerText = target;
            }
        };
        updateCounter();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// =========================
// TESTIMONIAL SLIDER
// =========================
const testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach(item => item.classList.remove("active"));
    if (testimonials[index]) testimonials[index].classList.add("active");
}

setInterval(() => {
    testimonialIndex++;
    if (testimonialIndex >= testimonials.length) testimonialIndex = 0;
    showTestimonial(testimonialIndex);
}, 5000);

// =========================
// SCROLL REVEAL ANIMATION
// =========================
const revealElements = document.querySelectorAll(
    ".feature-card, .pricing-card, .stat-card, .testimonial, .cta-card, .platform-console"
);
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .8s ease";
    revealObserver.observe(el);
});

// =========================
// CURSOR GLOW
// =========================
const cursorGlow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    }
});

// =========================
// PARTICLES BACKGROUND
// =========================
const canvas = document.getElementById("particles");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.8 + 0.2;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,245,212,${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// =========================
// FEATURE CARD TILT EFFECT
// =========================
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
});

// =========================
// LIVE DASHBOARD UPDATES
// =========================
const liveAgentStatus = document.getElementById("liveAgentStatus");
const responseTimeSpan = document.getElementById("responseTime");

if (liveAgentStatus) {
    setInterval(() => {
        const tasks = Math.floor(Math.random() * 500 + 1200);
        liveAgentStatus.textContent = `Active: ${tasks.toLocaleString()} tasks`;
    }, 5000);
}

if (responseTimeSpan) {
    setInterval(() => {
        const time = (Math.random() * 0.2 + 0.15).toFixed(2);
        responseTimeSpan.textContent = `${time}s`;
    }, 4000);
}

// =========================
// FLOATING WIDGETS ANIMATION
// =========================
const widgets = document.querySelectorAll(".floating-widget");
widgets.forEach((widget, index) => {
    let direction = 1;
    setInterval(() => {
        direction *= -1;
        widget.style.transform = `translateY(${direction * 10}px)`;
    }, 2500 + index * 600);
});

// =========================
// CTA BUTTON ALERTS (Conversion Focus)
// =========================
const ctaButtons = document.querySelectorAll(".pricingCta, #heroCta, #finalCtaBtn, #watchDemoBtn, #scheduleDemoBtn");
ctaButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (btn.id === "watchDemoBtn" || btn.id === "scheduleDemoBtn") {
            alert("🎬 AgentX demo preview available! Our team will contact you shortly for a personalized walkthrough.");
        } else {
            alert("🚀 Welcome to AgentX by ToMatrix! Your free trial request has been received. Check your email to get started.");
        }
    });
});

console.log("%cAgentX by ToMatrix Loaded Successfully 🚀", "color:#00f5d4;font-size:18px;font-weight:bold;");