import { vocabulary } from "./state.js";

import { saveVocabulary } from "./storage.js";

import { getCategoryClass } from "./ui.js";

let flashcards = [];

let currentCard = 0;

let flipped = false;

export function renderFlashcards(app) {
  // Only show words not marked as known

  flashcards = vocabulary.filter((word) => !word.known);

  // Reset index if needed

  if (currentCard >= flashcards.length) {
    currentCard = 0;
  }

  // Empty state

  if (flashcards.length === 0) {
    app.innerHTML = `

      <section class="empty-state">
       <div class="empty-icon">
            ★
        </div>

        <h2>All flashcards completed!</h2>

        <p>
          You reviewed all your vocabulary.
        </p>

      </section>

    `;

    return;
  }

  const card = flashcards[currentCard];

  const progress = ((currentCard + 1) / flashcards.length) * 100;

  app.innerHTML = `

    <section class="page-header">

      <h1>Flashcards</h1>

      <p>
        Learn your vocabulary interactively
      </p>

    </section>

    <div class="progress-container">

      <div
        class="progress-bar"
        style="width: ${progress}%"
      ></div>

    </div>

    <section
      id="flashcard"
      class="flashcard card"
    >

      <div class="category-badge ${getCategoryClass(card.category)}">
        ${card.category}
      </div>

      <span>
        ${flipped ? "Deutsch" : "English"}
      </span>

      <h2>
        ${flipped ? card.german : card.english}
      </h2>

      <small>
        Click to flip
      </small>

    </section>

    <section class="flashcard-actions">

  <button
    id="review-btn"
    class="btn ${flashcards.length === 1 ? "secondary-btn" : "primary-btn"}"
  >
    Review later
  </button>

  <button
    id="known-btn"
    class="btn primary-btn"
  >
    I know this
  </button>

</section>

  `;

  setupFlashcardEvents(app);
}

function setupFlashcardEvents(app) {
  const flashcard = document.getElementById("flashcard");

  const knownBtn = document.getElementById("known-btn");

  const reviewBtn = document.getElementById("review-btn");

  // Flip card

  flashcard.addEventListener("click", () => {
    flipped = !flipped;

    renderFlashcards(app);
  });

  // Mark word as known

  knownBtn.addEventListener("click", () => {
    flashcards[currentCard].known = true;

    saveVocabulary();

    flipped = false;

    renderFlashcards(app);
  });

  // Move to next flashcard

  reviewBtn.addEventListener("click", () => {
    // Prevent useless review loop
    // when only one card remains

    if (flashcards.length === 1) {
      return;
    }

    currentCard++;

    flipped = false;

    renderFlashcards(app);
  });
}
