import { vocabulary } from "./state.js";

/* SAVE */

export function saveVocabulary() {
  localStorage.setItem(
    "vocabulary",

    JSON.stringify(vocabulary),
  );
}
