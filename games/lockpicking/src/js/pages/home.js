import { Progress } from "../game/progress/Progress.js";
import { Popup } from "../components/Popup.js";
import { Tabs } from "../components/Tabs.js";
import "../components/clickSound.js";
import "../components/mainThemeSound.js";

const progress = new Progress().restore();

const playAudio = new Audio("../../assets/sounds/reverse.mp3");
playAudio.volume = 0.01;

document.getElementById("play").addEventListener("click", () => {
  playAudio.play();

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
      <button class="popup-button" data-hide-btn>Ok</button>
    </div>`,
  });
  howToPlayPopup.render();
});

function renderVideoSource() {
  const videoSourceEl = document.createElement("source");
  const videoSourcePath = "./assets/video/";
  videoSourceEl.src =
    window.innerWidth > 480
      ? `${videoSourcePath}desktop_bg.mp4`
      : `${videoSourcePath}mobile_bg.mp4`;
  document.querySelector(".home-page__video-background").prepend(videoSourceEl);
}
renderVideoSource();

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
      <button class="popup-button" data-hide-btn>Ok</button>
    </div>`,
    listeners: {
      resetProgress: () => {
        progress.clear();
      },
    },
    onCreated: () => {
      const options = {
        tabs: {
          standard: {
            name: "Standard",
            content: ``,
          },
          hardcore: {
            name: "Hardcore",
            content: ``,
          },
          time: {
            name: "Time",
            content: `
          <table class="table">
              <tr class="table-row">
                <th class="table-header">№</th>
                <th class="table-header">Pinlocks</th>
                <th class="table-header">Time</th>
              </tr>
              <tr class="table-row">
                <td class="table-data">1.1</td>
                <td class="table-data">1.2</td>
                <td class="table-data">1.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">2.1</td>
                <td class="table-data">2.2</td>
                <td class="table-data">2.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
              <tr class="table-row">
                <td class="table-data">3.1</td>
                <td class="table-data">3.2</td>
                <td class="table-data">3.3</td>
              </tr>
          </table>`,
          },
        },
      };
      new Tabs(options).render(".popup-scores-content");
    },
  });
  scoresPopup.render();
});
