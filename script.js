// =========================
// ELEMENTS
// =========================

const body = document.body;

const navbar = document.querySelector("nav");

const menu = document.querySelector(".menu");

const menuBtn = document.querySelector(".menu-btn");

const themeBtn = document.querySelector(".theme-btn");

const scrollTop = document.querySelector(".scroll-top");

const form = document.forms["submit-to-google-sheet"];

const msg = document.getElementById("msg");

// =========================
// GOOGLE SHEET URL
// =========================

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyW0ZgOaGQFImaaiJF7cFA2vhzud9EWxsytNVWg3q8oufwE2v7HQ46QNDoRN2t5w35T/exec";

// =========================
// TYPED JS
// =========================

new Typed(".typing-text", {
  strings: ["Frontend Developer", "UI Designer", "Web Developer"],

  typeSpeed: 80,

  backSpeed: 50,

  loop: true,
});

// =========================
// SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {
  // Navbar Shadow
  navbar.classList.toggle("sticky", window.scrollY > 20);

  // Scroll Top Button
  scrollTop.classList.toggle("show", window.scrollY > 300);
});

// =========================
// MOBILE MENU
// =========================

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");

  body.style.overflow = menu.classList.contains("active") ? "hidden" : "auto";
});

// Close Menu On Click
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");

    body.style.overflow = "auto";
  });
});

// =========================
// THEME SYSTEM
// =========================

// Detect Saved Theme
const savedTheme = localStorage.getItem("theme");

// System Theme
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

// Apply Theme
const applyTheme = (dark) => {
  body.classList.toggle("dark-theme", dark);

  themeBtn.innerHTML = dark
    ? `<i class="fa-solid fa-sun"></i>`
    : `<i class="fa-solid fa-moon"></i>`;
};

// Initial Theme
if (savedTheme) {
  applyTheme(savedTheme === "dark");
} else {
  applyTheme(systemDark.matches);
}

// Manual Toggle
themeBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-theme");

  applyTheme(!isDark);

  localStorage.setItem(
    "theme",

    !isDark ? "dark" : "light",
  );
});

// Auto System Theme Change
systemDark.addEventListener("change", (e) => {
  // Only if user never manually selected
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches);
  }
});

// =========================
// FORM SUBMIT
// =========================

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await fetch(scriptURL, {
        method: "POST",

        body: new FormData(form),
      });

      msg.textContent = "Message sent successfully";

      form.reset();

      setTimeout(() => {
        msg.textContent = "";
      }, 5000);
    } catch (error) {
      msg.textContent = "Something went wrong";
    }
  });
}
// =========================
// MOBILE ACTIVE NAV
// =========================

const mobileNavLinks = document.querySelectorAll(".mobile-bottom-nav a");

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNavLinks.forEach((nav) => {
      nav.classList.remove("active");
    });

    link.classList.add("active");
  });
});
