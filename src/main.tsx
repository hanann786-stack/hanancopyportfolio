import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Page load fade-in
const markLoaded = () => {
  requestAnimationFrame(() => document.body.classList.add("page-loaded"));
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", markLoaded);
} else {
  markLoaded();
}
