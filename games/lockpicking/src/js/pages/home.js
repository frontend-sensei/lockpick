import { Progress } from "../game/progress/Progress.js";
import { Popup } from "../game/popup/Popup.js";
import "../components/clickSound.js";

document.getElementById("play").addEventListener("click", () => {
  document.getElementById("playWrapper").classList.add("active");
  setTimeout(() => (location.href = "game.html"), 2000);
});

const progress = new Progress().restore();

document
  .getElementById("resetProgress")
  .addEventListener("click", () => progress.clear());

let howToPlayPopup = null;
document.getElementById("howToPlay").addEventListener("click", (event) => {
  event.preventDefault();

  if (howToPlayPopup) {
    howToPlayPopup.show();
    return;
  }
  howToPlayPopup = new Popup({
    html: `<h2 class="popup-headline">How to play</h2>
    <img class="popup-img" src="https://media.giphy.com/media/BkL4Vyz0z2iYQMhwFw/giphy.gif">
    <p>Just press space in the right moment. You have limited time for lock pick.</p>
    <div class="popup-buttons">
      <button class="popup-button" id="okBtn">Ok</button>
    </div>`,
    hideButtonId: "okBtn",
  });
  howToPlayPopup.render();
});
