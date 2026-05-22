import { renderHome } from "./home.js";
import { renderVocabulary } from "./vocabulary.js";
import { renderFlashcards } from "./flashcards.js";

const app = document.getElementById("app");

const navButtons = document.querySelectorAll(".nav-btn");

// Update active navigation button

function setActiveButton(page) {
  navButtons.forEach((button) => {
    const isActive = button.dataset.page === page;

    button.classList.toggle("active", isActive);
  });
}

// Render selected page

function loadPage(page) {
  setActiveButton(page);

  switch (page) {
    case "vocabulary":
      renderVocabulary(app);
      break;

    case "flashcards":
      renderFlashcards(app);
      break;

    default:
      renderHome(app);
  }
}

// Navigation events

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPage = button.dataset.page;

    loadPage(selectedPage);
  });
});

// Initial page

loadPage("home");
