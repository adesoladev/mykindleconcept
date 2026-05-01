// ── NAV: scroll effect ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── HAMBURGER ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});
// Close on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
});

// ── INTERSECTION OBSERVER (fade-up) ──
const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);
fadeEls.forEach((el) => observer.observe(el));

// ── FORM SUBMIT ──
async function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");
  const formData = new FormData(form);

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    preferred_date: formData.get("preferred_date"),
    type_of_experience: formData.get("type_of_experience"),
    budget_range: formData.get("budget_range"),
    vision: formData.get("vision"),
  };

  try {
    const response = await fetch("https://formspree.io/f/xykozzrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      form.style.display = "none";
      document.getElementById("formSuccess").style.display = "block";
    } else {
      const data = await response.json();
      alert(
        data?.errors?.[0]?.message || "Something went wrong. Please try again.",
      );
    }
  } catch (err) {
    alert("Network error. Please check your connection and try again.");
  }
}

// ── SMOOTH SCROLL for nav links ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
