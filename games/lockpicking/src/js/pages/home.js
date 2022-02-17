import { Progress } from "../game/progress/Progress.js";

document
  .getElementById("play")
  .addEventListener("click", () => (location.href = "game.html"));

const progress = new Progress().restore();

document
  .getElementById("resetProgress")
  .addEventListener("click", () => progress.clear());
