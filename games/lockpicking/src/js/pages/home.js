import { Progress } from "../game/progress/Progress.js";
import { Popup } from "../game/popup/Popup.js";
import { Tabs } from "../components/Tabs.js";

const progress = new Progress().restore();

document.getElementById("play").addEventListener("click", () => {
  document.getElementById("playWrapper").classList.add("active");
  setTimeout(() => (location.href = "game.html"), 2000);
});

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

let scoresPopup = null;

document.getElementById("scores").addEventListener("click", (event) => {
  event.preventDefault();

  if (scoresPopup) {
    scoresPopup.show();
    return;
  }

  scoresPopup = new Popup({
    html: `<h2 class="popup-headline">Scores</h2>
    <div class="popup-scores-content">
      
      <div class="tabel-wrapper">

      </div>
      <button class="popup-button" id="resetProgress">Reset progress</button>
    </div>
    <div class="popup-buttons">
      <button class="popup-button" id="okBtn">Ok</button>
    </div>`,
    listeners: {
      resetProgress: () => {
        progress.clear();
      },
    },
    hideButtonId: "okBtn",
    callback: () => {
      const options = {
        standart: {
          name: "Standart",
          tab: `input`,
          content: `label`,
        },
        hardcore: {
          name: "Hardcore",
          tab: `input`,
          content: `label`,
        },
        time: {
          name: "Time",
          tab: `input`,
          content: `label`,
        },
      };
      new Tabs(options).render(".popup-scores-content");
      let keys = Object.keys(options);

      for (let i = 0; i < keys.length; i++) {
        let currentObject = Object.values(options);
        new Tabs(options).addElement(
          currentObject[i],
          ".tabs-wrapper",
          ".tabs",
          ".tabs__content"
        );
      }
    },
  });
  scoresPopup.render();
});
