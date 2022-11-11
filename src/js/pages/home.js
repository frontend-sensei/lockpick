import { Progress } from "../game/progress/Progress.js";
import { Popup } from "../components/Popup.js";
import { PopupStore } from "../components/popup-store.js";
import "../components/clickSound.js";
import "../components/mainThemeSound.js";
import { ModeSwitcher } from "../game/modes/ModeSwitcher.js";

const progress = new Progress().restore();
progress.save()

const playAudio = new Audio("src/assets/sounds/reverse.mp3");
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
  const videoSourcePath = "src/assets/video/";
  videoSourceEl.src =
    window.innerWidth > 480
      ? `${videoSourcePath}desktop_bg.mp4`
      : `${videoSourcePath}mobile_bg.mp4`;
  document.querySelector(".home-page__video-background").prepend(videoSourceEl);
}
renderVideoSource();

let storePopup = null;

document.getElementById("store").addEventListener("click", (event) => {
  event.preventDefault();

  if (storePopup) {
    storePopup.show();
    return;
  }

  storePopup = new PopupStore(progress);
  storePopup.render();
});

function initModeSwitcher() {
  const currentMode = progress.getCurrentMode()
  const switcher = new ModeSwitcher({
    currentMode,
    onSetCurrentMode: (mode) => {
      progress.setCurrentMode(mode)
    }
  })
  switcher.init()
}

initModeSwitcher()
