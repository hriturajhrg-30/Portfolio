const themeToggle = document.querySelector("#theme-toggle");
const searchInput = document.querySelector("#project-search");
const projectFilter = document.querySelector("#project-filter");
const projectCards = [...document.querySelectorAll(".project-card")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");
const chatSubmit = document.querySelector("#chat-submit");

document.querySelector("#year").textContent = new Date().getFullYear();

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // The theme still works when browser storage is unavailable.
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch {
  // Use the default theme when browser storage is unavailable.
}
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

function filterProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const technology = projectFilter.value;
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matchesText = !query || card.textContent.toLocaleLowerCase().includes(query) ||
      card.dataset.search.toLocaleLowerCase().includes(query);
    const technologies = card.dataset.tech.split(" ");
    const matchesTechnology = technology === "all" || technologies.includes(technology);
    const matches = matchesText && matchesTechnology;
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  resultCount.textContent = query || technology !== "all"
    ? `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} found`
    : `${visibleCount} projects`;
  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterProjects);
projectFilter.addEventListener("change", filterProjects);
filterProjects();

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    filterProjects();
    searchInput.blur();
  }
});

function addMessage(text, role, extraClass = "") {
  const message = document.createElement("p");
  message.className = `chat-message ${role === "user" ? "user-message" : "assistant-message"} ${extraClass}`.trim();
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message || chatSubmit.disabled) return;

  addMessage(message, "user");
  chatInput.value = "";
  chatInput.disabled = true;
  chatSubmit.disabled = true;
  chatSubmit.querySelector("span:first-child").textContent = "Thinking";
  const pending = addMessage("Thinking…", "assistant", "pending-message");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Request failed");
    pending.textContent = payload.answer || "I couldn’t find an answer in the portfolio information.";
    pending.classList.remove("pending-message");
  } catch {
    pending.textContent = "I can’t reach the portfolio assistant right now. Please try again later or contact me through GitHub.";
    pending.classList.remove("pending-message");
    pending.classList.add("error-message");
  } finally {
    chatInput.disabled = false;
    chatSubmit.disabled = false;
    chatSubmit.querySelector("span:first-child").textContent = "Send";
    chatInput.focus();
  }
});




