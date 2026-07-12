# Mangata & Gallo

A fictional fine-jewelry brand homepage, designed and built as a course project for Meta's **HTML and CSS in Depth** (Coursera).

**Live demo:** https://m-gallo.netlify.app

## About

Mangata & Gallo is a concept brand — a fine jewelry atelier for engagements, weddings, and anniversaries. The name blends "mangata" (the moon's reflection on water) and "gallo" (rooster, a symbol of dawn), which shapes the whole design: a night-to-dawn color palette, carried through in the hero section's animated horizon line.

This project isn't a real business — it was built to practice production-quality HTML/CSS layout, a cohesive design system, and front-end polish beyond the basics.

## Features

- Custom design system built with CSS variables (color palette, typography, spacing) tied to the brand concept
- Responsive layout across desktop, tablet, and mobile, including a fully custom mobile navigation menu with an animated hamburger toggle
- Active navigation state — the nav highlights the section currently in view while scrolling, using the Intersection Observer API
- Hand-drawn SVG icons and an animated hero illustration (a horizon line that draws itself in, with a moon and sun fading in on either end)
- A working appointment request form with client-side validation (required fields, email format checking), inline error messages, and a honeypot field for spam protection
- Form submissions handled via Netlify Forms — no backend required
- Accessibility considerations: semantic HTML, `aria-label`s on icon-only controls, `aria-live` status updates on form submission, and `prefers-reduced-motion` support
- Sticky, blurred header on scroll
- Subtle paper-grain texture overlay for a tactile, non-template feel

## Built with

- HTML5
- CSS3 (custom properties, Grid, Flexbox, no framework)
- Vanilla JavaScript (ES6)
- Netlify (hosting + form handling)
- Google Fonts (Fraunces, Inter)

## Author

Mile Kostić — [GitHub](https://github.com/SiBONS) · [LinkedIn](https://www.linkedin.com/in/mile-kostic/)
