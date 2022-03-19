import { UI } from "./UI.js";
import { Timer } from "./timer/Timer.js";
import { Progress } from "./progress/Progress.js";
import { LevelBuilder } from "./level/LevelBuilder.js";
import { Coordinates } from "./coordinates/Coordinates.js";
import { Countdown } from "./countdown/Countdown.js";
import { Popup } from "./popup/Popup.js";
import { Observable } from "../utils/observable.js";
import { isMobile } from "../utils/isMobile.js";

/**
 * Creates a new Game
 * @class Game
 */
export class Game {
  constructor() {
    this.attempts = new Observable(3);
    this.launched = false;
    this.pendingHandler = false;
    this.desktopUnlockHandler = this.desktopUnlockHandler.bind(this);
    this.mobileUnlockHandler = this.mobileUnlockHandler.bind(this);
    this.popup = null;
    this.isMobile = isMobile();

    this._progress = new Progress().restore();
    this._levels = new LevelBuilder().build();
    this.level = this._levels.levels.get(this._progress.progress.nextLevel.id);
    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 2000,
    });
    this._ui = new UI(this);
    this._coordinates = new Coordinates(this);
    this.sounds = {
      unlocked: new Audio("../../assets/sounds/unlock_sound.wav"),
      failed: new Audio("../../assets/sounds/fail_sound.wav"),
    };
    this.sounds.unlocked.volume = 0.05;
    this.sounds.failed.volume = 0.05;

    this.pinsUnlocked = 0;

    this.render();
  }

  render() {
    this._ui.render(".game-page");
  }

  async start() {
    await new Countdown(this).start();
    this.launched = true;
    this.addListeners();
    this._timer.start();
    this._ui._Bar._ui.movePointer();
    this._ui._Lockpick.animate();
  }

  stop() {
    this._timer.stop();
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._ui.stopPointer();
    this._ui._Lockpick.stopAnimate();
  }

  onDefeat() {
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._ui.stopPointer();
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

    new Popup({
      html: `<h2 class="popup-headline">You Won!</h2>
      <button class="popup-button" id="backToHome">back to home</button>
      <button class="popup-button" id="reloadPage">Continue</button>`,
      listeners: {
        backToHome: this.backToHomeHandler,
        reloadPage: this.reloadPage,
      },
    }).render();
  }

  gameOver() {
    new Popup({
      html: `<h2 class="popup-headline">Game over :(</h2>
      <button class="popup-button" id="backToHome">back to home</button>
      <button class="popup-button" id="reloadPage">Retry</button>`,
      listeners: {
        backToHome: this.backToHomeHandler,
        reloadPage: this.reloadPage,
      },
    }).render();
  }

  backToHomeHandler() {
    location.href = "/";
  }

  reloadPage() {
    location.reload();
  }

  addListeners() {
    if (this.isMobile) {
      this._ui._MobileUnlockBtn.node.addEventListener(
        "click",
        this.mobileUnlockHandler
      );
    } else {
      window.addEventListener("keydown", this.desktopUnlockHandler);
    }
  }

  removeListeners() {
    if (this.isMobile) {
      this._ui._MobileUnlockBtn.node.removeEventListener(
        "click",
        this.mobileUnlockHandler
      );
    } else {
      window.removeEventListener("keydown", this.desktopUnlockHandler);
    }
  }

  unlockHandler(event, conditionFn = () => {}) {
    try {
      if (this.pendingHandler || this._timer.finished) {
        return;
      }
      this.pendingHandler = true;

      conditionFn(event);

      this._timer.pause();
      this._ui._Bar._ui.stopPointer();

      const positionCorrect = this._coordinates.checkPosition();
      const TIMEOUT = 1500;
      if (!positionCorrect) {
        this.sounds.failed.play();
        const bar = document.querySelector(".bar");
        bar.classList.add("bar--failure");
        this._ui._Lockpick.node.classList.add("failure");
        setTimeout(() => {
          bar.classList.remove("bar--failure");
          this._ui._Lockpick.node.classList.remove("failure");
        }, TIMEOUT - 150);

        this.attempts.set(this.attempts.value - 1);
      }

      if (positionCorrect) {
        this.sounds.unlocked.play();
        this._ui._Lockpick.stopAnimate();
        this.pinsUnlocked++;
        this._ui._Pins.updateUnlocked(this.pinsUnlocked);
      }

      if (this.pinsUnlocked === this.level.steps) {
        this.onWon();
        throw new Error();
      }

      if (!this.attempts.value) {
        this.onDefeat();
        throw new Error();
      }

      const spaceButtonLabel = document.querySelector(".unlock-label__img");
      if (spaceButtonLabel) {
        spaceButtonLabel.classList.add("unlock-label__img--active");
        setTimeout(() => {
          spaceButtonLabel.classList.remove("unlock-label__img--active");
        }, 100);
      }

      setTimeout(() => {
        this._timer.start();
        this._ui._Bar._ui.movePointer();
        this._ui._Lockpick.animate();
        this.pendingHandler = false;
      }, TIMEOUT);
    } catch (e) {
      this.pendingHandler = false;
    }
  }

  isSpaceTriggered(event) {
    if (event.keyCode !== 32) {
      throw new Error();
    }
  }

  mobileUnlockHandler(event) {
    this.unlockHandler(event);
  }

  desktopUnlockHandler(event) {
    this.unlockHandler(event, this.isSpaceTriggered);
  }
}
