// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("mobileNav");

  if (!toggle || !panel) return;

  function openMenu() {
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function toggleMenu() {
    const isOpen = panel.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);

  // Close the menu whenever a link inside it is clicked (jumping to a section)
  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape for keyboard users
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  // If the viewport is resized past the mobile breakpoint while open, reset it
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeMenu();
  });
});

// Active nav-state on scroll
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id]");

  if (!navLinks.length || !sections.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      const isMatch = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isMatch);
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
});

// Appointment form — client-side validation + Netlify AJAX submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const submitBtn = form.querySelector(".form-submit");

  const validators = {
    "apt-name": function (value) {
      return value.trim().length > 0 ? "" : "Please enter your name.";
    },
    "apt-email": function (value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Please enter your email.";
      return re.test(value) ? "" : "Please enter a valid email address.";
    },
    "apt-occasion": function (value) {
      return value ? "" : "Please select an occasion.";
    },
  };

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const row = field.closest(".form-row");
    const errorEl = row.querySelector(".form-error");
    if (message) {
      row.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      row.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validateForm() {
    let isValid = true;
    Object.keys(validators).forEach(function (fieldId) {
      const field = document.getElementById(fieldId);
      const message = validators[fieldId](field.value);
      showError(fieldId, message);
      if (message) isValid = false;
    });
    return isValid;
  }

  // Validate a field as soon as the visitor leaves it
  Object.keys(validators).forEach(function (fieldId) {
    const field = document.getElementById(fieldId);
    field.addEventListener("blur", function () {
      showError(fieldId, validators[fieldId](field.value));
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.className = "form-status is-error";
      return;
    }

    submitBtn.disabled = true;
    status.textContent = "Sending your request\u2026";
    status.className = "form-status";

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(function () {
        status.textContent =
          "Thank you \u2014 your appointment request has been sent. We'll follow up by email shortly.";
        status.className = "form-status is-success";
        form.reset();
      })
      .catch(function () {
        status.textContent =
          "Something went wrong sending your request. Please try again, or email us directly.";
        status.className = "form-status is-error";
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
});
