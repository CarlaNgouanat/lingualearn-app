/* GLOBAL STATE */

export let vocabulary = JSON.parse(localStorage.getItem("vocabulary")) || [
  {
    english: "Hello",
    german: "Hallo",
    category: "Daily Life",
    known: false,
  },

  {
    english: "Bread",
    german: "Das Brot",
    category: "Food",
    known: false,
  },

  {
    english: "Airport",
    german: "Flughafen",
    category: "Travel",
    known: false,
  },
];
