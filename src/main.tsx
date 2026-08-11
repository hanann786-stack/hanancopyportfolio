import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Page load fade-in
const markLoaded = () => {
  requestAnimationFrame(() => document.body.classList.add("page-loaded"));
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", markLoaded);
} else {
  markLoaded();
}

// Release compositor layers once an entrance animation finishes
document.addEventListener(
  'animationend',
  (e) => {
    const el = e.target as HTMLElement;
    if (el instanceof HTMLElement && el.style) el.style.willChange = 'auto';
  },
  true
);

// Auto section reveal — opt-in via IntersectionObserver on top-level sections
const observeSections = () => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('section[data-reveal]').forEach((el) => {
    el.classList.add('section-reveal');
    io.observe(el);
  });
};
setTimeout(observeSections, 100);
