/**
 * PORTOFOLIO PERSONAL - SCRIPT.JS (FINAL)
 * Multi-Page | Dark Mode | Mobile Nav | Back to Top
 * Pure JavaScript - No Framework
 */

// ========== DOM ELEMENTS ==========
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const backToTopBtn = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const currentYearEl = document.getElementById("currentYear");

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  loadTheme();
  setupEventListeners();
  setupActiveNav();
});

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
  // Mobile Nav Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMobileMenu);
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => navMenu.classList.remove("active"));
    });
  }

  // Dark Mode
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // Back to Top
  if (backToTopBtn) {
    window.addEventListener("scroll", handleScroll);
    backToTopBtn.addEventListener("click", scrollToTop);
  }

  // Navbar Scroll Effect
  window.addEventListener("scroll", handleNavbarScroll);

  // Contact Form (Demo)
  if (contactForm) contactForm.addEventListener("submit", handleFormSubmit);

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  const icon = navToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}

// ========== DARK MODE ==========
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
}

function loadTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// ========== BACK TO TOP ==========
function handleScroll() {
  if (backToTopBtn) {
    if (window.scrollY > 400) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  }
  handleNavbarScroll();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
}

// ========== ACTIVE NAV (Multi-Page) ==========
function setupActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
    else link.classList.remove("active");
  });
}

// ========== CONTACT FORM (Demo) ==========
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name")?.value;
  if (!name) {
    alert("Mohon lengkapi semua field!");
    return;
  }
  alert(`Terima kasih, ${name}!\nPesan Anda telah diterima (demo).`);
  contactForm?.reset();
}

// ========== UTILITY: Debounce ==========
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
window.addEventListener("scroll", debounce(handleScroll, 100));

// ========== ANDROID WEBVIEW DETECTION ==========
if (
  navigator.userAgent.match(/Android/i) &&
  navigator.userAgent.match(/WebView/i)
) {
  console.log("Running in Android WebView");
  document.body.classList.add("android-webview");
}
