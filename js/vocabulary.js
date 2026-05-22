import { vocabulary } from "./state.js";

import { saveVocabulary } from "./storage.js";

import { getCategoryClass } from "./ui.js";

export function renderVocabulary(app) {
  app.innerHTML = `

    <section class="page-header">

      <h1>Vocabulary</h1>

      <p>
        Manage your vocabulary
      </p>

    </section>

    <section class="add-word card">

      <div class="form-row">

        <input
          id="english-input"
          type="text"
          placeholder="English"
        >

        <input
          id="german-input"
          type="text"
          placeholder="Deutsch"
        >

        <select id="category-select">

          <option>Daily Life</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Work</option>

        </select>

        <button
          id="add-btn"
          class="btn primary-btn"
        >
          Add
        </button>

      </div>

    </section>

    <section class="search-section">

      <input
        id="search-input"
        class="search-input"
        type="text"
        placeholder="Search..."
      >

    </section>

    <section class="vocabulary-section card">

      <div class="section-title">

        <h2>To review</h2>

        <span>
          ${vocabulary.filter((word) => !word.known).length} words
        </span>

      </div>

      <div
        id="review-grid"
        class="vocab-grid"
      ></div>

    </section>

    <section class="vocabulary-section card">

      <div class="section-title">

        <h2>Known words</h2>

        <span>
          ${vocabulary.filter((word) => word.known).length} words
        </span>

      </div>

      <div
        id="known-grid"
        class="vocab-grid"
      ></div>

    </section>

  `;

  setupVocabulary();

  renderVocabularyCards();
}

function setupVocabulary() {
  const addBtn = document.getElementById("add-btn");

  const searchInput = document.getElementById("search-input");

  addBtn.addEventListener("click", addWord);

  searchInput.addEventListener("input", () => {
    renderVocabularyCards(searchInput.value);
  });
}

function addWord() {
  const english = document.getElementById("english-input").value.trim();

  const german = document.getElementById("german-input").value.trim();

  const category = document.getElementById("category-select").value;

  if (!english || !german) {
    alert("Please fill all fields");

    return;
  }

  vocabulary.push({
    english,
    german,
    category,
    known: false,
  });

  saveVocabulary();

  renderVocabulary(document.getElementById("app"));
}

function renderVocabularyCards(search = "") {
  const reviewGrid = document.getElementById("review-grid");

  const knownGrid = document.getElementById("known-grid");

  reviewGrid.innerHTML = "";

  knownGrid.innerHTML = "";

  const filteredWords = vocabulary.filter((word) => {
    return (
      word.english.toLowerCase().includes(search.toLowerCase()) ||
      word.german.toLowerCase().includes(search.toLowerCase())
    );
  });

  filteredWords.forEach((word, index) => {
    const card = `

    <div class="vocab-card card">

  <button
    class="delete-btn"
    data-index="${index}"
  >
    ×
  </button>

        <div
          class="
            category-badge
            ${getCategoryClass(word.category)}
          "
        >
          ${word.category}
        </div>

        <div class="word-block">

          <span>English</span>

          <h3>${word.english}</h3>

        </div>

        <div class="word-block">

          <span>Deutsch</span>

          <h3>${word.german}</h3>

        </div>

        <button
          class="
            known-btn
            btn
            ${word.known ? "secondary-btn" : "primary-btn"}
          "
          data-index="${index}"
        >

          ${word.known ? "Known" : "Mark as known"}

        </button>

      </div>

    `;

    if (word.known) {
      knownGrid.innerHTML += card;
    } else {
      reviewGrid.innerHTML += card;
    }
  });

  setupKnownButtons();
  setupDeleteButtons();
}

function setupKnownButtons() {
  const buttons = document.querySelectorAll(".known-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      vocabulary[index].known = !vocabulary[index].known;

      saveVocabulary();

      renderVocabulary(document.getElementById("app"));
    });
  });
}
function setupDeleteButtons() {
  const buttons = document.querySelectorAll(".delete-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      vocabulary.splice(index, 1);

      saveVocabulary();

      renderVocabulary(document.getElementById("app"));
    });
  });
}
