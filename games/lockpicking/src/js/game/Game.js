import { UI } from "./UI.js";
import { Timer } from "./timer/Timer.js";
import { Progress } from "./progress/Progress.js";
import { LevelBuilder } from "./level/LevelBuilder.js";
import { Coordinates } from "./coordinates/Coordinates.js";
import { Popup } from "./popup/Popup.js";
import { Observable } from "../utils/observable.js";

/**
 * Creates a new Game
 * @class Game
 */
export class Game {
  constructor() {
    this.attempts = new Observable(3);
    this.launched = false;
    this.pendingHandler = false;
    this.keydownHandler = this.keydownHandler.bind(this);
    this.popup = null;

    this._progress = new Progress().restore();
    this._levels = new LevelBuilder().build();
    this.level = this._levels.levels.get(this._progress.progress.nextLevel.id);
    this._timer = new Timer(this, 12000);
    this._ui = new UI(this);
    this._coordinates = new Coordinates(this);

    this.pinsUnlocked = 0;

    this.render();
  }

  render() {
    this._ui.render(".game-page");
  }

  async start() {
    console.log("Steps: ", this.level.steps);
    await this.startCountdown();
    this.launched = true;
    this.addListeners();

    this._timer.start();
    this._ui._Bar._BarUI.movePointer();
  }

  startCountdown() {
    const gameSelector = ".game";
    const gameNode = document.querySelector(gameSelector);
    if (!gameNode) {
      throw new Error("Game selector not found!");
    }

    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown";
    countdownEl.innerHTML = `<div class="countdown-value"></div>`;
    gameNode.appendChild(countdownEl);

    const countdownNode = gameNode.querySelector(".countdown");
    const countdownValueNode = gameNode.querySelector(".countdown-value");

    const countdown = 3;

    return new Promise((resolve) => {
      let secondsPassed = 0;
      let interval = setInterval(() => {
        if (secondsPassed >= countdown) {
          interval = clearInterval(interval);
          countdownValueNode.innerHTML = "Go!";
          countdownNode.classList.add("hidden");
          resolve();
          return;
        }

        countdownValueNode.innerHTML = countdown - secondsPassed;
        secondsPassed++;
      }, 1000);
    });
  }

  stop() {
    this._timer.stop();
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._BarUI.stopPointer();
  }

  onDefeat() {
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._BarUI.stopPointer();
    this.gameOver();
  }

  onWon() {
    this.launched = false;
    this.removeListeners();

    const isLastLevel = this._levels.isLastLevel(this.level.id);
    const levelToSave = {
      data: this.level,
    };
    if (isLastLevel) {
      levelToSave.isLastLevel = true;
    }
    this._progress.save(levelToSave);

    const winPopup = new Popup(this, {
      headline: "You Won!",
      reloadBtnText: "Continue",
    }).render();
  }

  gameOver() {
    const gameOverPopup = new Popup(this, {
      headline: "Game over :(",
      reloadBtnText: "Retry",
    }).render();
  }

  addListeners() {
    window.addEventListener("keydown", this.keydownHandler);
  }

  removeListeners() {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  keydownHandler() {
    if (this.pendingHandler) {
      return;
    }

    this.pendingHandler = true;

    if (this._timer.finished) {
      return;
    }
    if (event.keyCode === 32) {
      this._timer.pause();
      this._ui._Bar._BarUI.stopPointer();

      const positionCorrect = this._coordinates.checkPosition();
      console.log("Position correct: ", positionCorrect);
      if (!positionCorrect) {
        this.attempts.set(this.attempts.value - 1);
        console.log("attempts: ", this.attempts.value);
      }

      if (positionCorrect) {
        this.pinsUnlocked++;
        this._ui._PinsUI.updateUnlocked(this.pinsUnlocked);
      }

      if (this.pinsUnlocked === this.level.steps) {
        this.pendingHandler = false;
        this.onWon();
        return;
      }

      if (!this.attempts.value) {
        this.pendingHandler = false;
        this.onDefeat();
        return;
      }

      console.log("Steps: ", this.level.steps);

      setTimeout(() => {
        this._timer.start();
        this._ui._Bar._BarUI.movePointer();
        this.pendingHandler = false;
      }, 1500);
    }
  }
}
