/* CATEGORY COLORS */

export function getCategoryClass(category) {
  switch (category) {
    case "Travel":
      return "travel";

    case "Food":
      return "food";

    case "Work":
      return "work";

    case "Daily Life":
      return "daily";

    default:
      return "";
  }
}
