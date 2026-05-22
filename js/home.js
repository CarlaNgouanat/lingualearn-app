import { vocabulary } from "./state.js";

import { getCategoryClass } from "./ui.js";

export function renderHome(app) {
  // Global stats

  const totalWords = vocabulary.length;

  const knownWords = vocabulary.filter((word) => word.known).length;

  const reviewWords = totalWords - knownWords;

  // Count words by category

  const categories = {};

  vocabulary.forEach((word) => {
    if (!categories[word.category]) {
      categories[word.category] = 0;
    }

    categories[word.category]++;
  });

  app.innerHTML = `

    <section class="hero">

      <h1>Welcome back</h1>

      <p>
        English → German vocabulary trainer
      </p>

    </section>

    <section class="stats-grid">

      <div class="stats-card card">

        <h2>${totalWords}</h2>

        <span>Total words</span>

      </div>

      <div class="stats-card green card">

        <h2>${knownWords}</h2>

        <span>Known</span>

      </div>

      <div class="stats-card blue card">

        <h2>${reviewWords}</h2>

        <span>To review</span>

      </div>

    </section>

    <section class="categories-section card">

      <div class="section-title">

        <h3>Categories</h3>

      </div>

      <div class="categories-grid">

        ${Object.entries(categories)

          .map(
            ([category, count]) => `

              <div
                class="
                  category-card
                  ${getCategoryClass(category)}
                "
              >

                <h4>${category}</h4>

                <p>${count} words</p>

              </div>

            `,
          )

          .join("")}

      </div>

    </section>

  `;
}
