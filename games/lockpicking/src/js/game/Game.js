import { UI } from "./UI.js";
import { Timer } from "./timer/Timer.js";
import { Progress } from "./progress/Progress.js";
import { LevelBuilder } from "./level/LevelBuilder.js";
import { Levels } from "./level/Levels.js";
import { Coordinates } from "./coordinates/Coordinates.js";
import { Countdown } from "./countdown/Countdown.js";
import { Observable } from "../utils/observable.js";
import { isMobile } from "../utils/isMobile.js";
import { Keyboard } from "../utils/Keyboard.js";
import { GameOverPopup } from "./popups/GameOverPopup.js";
import { GameWonPopup } from "./popups/GameWonPopup.js";
import { Listeners } from "./listeners/Listeners.js";
import { GameSounds } from "./sounds/GameSounds.js";

/**
 * Creates a new Game
 * In the constructor should be passed level
 * @class Game
 */
export class Game {
  constructor() {
    this.isMobile = isMobile();
    this.attempts = new Observable(3);
    this.pinsUnlocked = 0;
    this.PAUSE_TIMEOUT = 1500;

    this.pendingHandler = false;
    this.deviceHandler = this.isMobile
      ? this.mobileUnlockHandler.bind(this)
      : this.desktopUnlockHandler.bind(this);

    this._progress = new Progress().restore();
    this._levels = new Levels(new LevelBuilder().build());
    this.level = this._levels.get(this._progress.progress.nextLevel.id);
    // pass timer only for Timer Mode
    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 2000,
    });
    this._ui = new UI(this);
    this._coordinates = new Coordinates(this);
    this._keyboard = new Keyboard();
    this._sounds = new GameSounds();

    this._listeners = null
  }

  mobileUnlockHandler(event) {
    this.unlockHandler(event);
  }

  desktopUnlockHandler(event) {
    if (!this._keyboard.isSpacePressed(event)) {
      return;
    }
    this.unlockHandler(event);
  }

  render() {
    this._ui.render(".game-page");
    this.afterRender()
  }

  afterRender() {
    this._listeners = new Listeners(
      this.deviceHandler,
      this.isMobile,
      this._ui?._MobileUnlockBtn?.node
    );
  }

  /**
   * Start the game
   * @public
   * @returns {Promise<void>}
   */
  async start() {
    await new Countdown(this).start();
    this._listeners.register();
    this._timer.start();
    this._ui._Bar.movePointer();
    this._ui._Lockpick.animate();
  }

  stop() {
    this._timer.stop();
    this._listeners.remove();
    this._ui._Bar.stopPointer();
    this._ui._Lockpick.stopAnimate();
  }

  onDefeat() {
    this._listeners.remove();
    this._ui._Bar.stopPointer();
    this.gameOver();
  }

  onWon() {
    this._listeners.remove();

    const isLastLevel = this._levels.isLastLevel(this.level.id);
    const levelToSave = {
      data: this.level,
    };
    if (isLastLevel) {
      levelToSave.isLastLevel = true;
    }
    this._progress.save(levelToSave);

    new GameWonPopup().render();
  }

  gameOver() {
    new GameOverPopup().render();
  }

  unlockHandler() {
    try {
      if (this.pendingHandler || this._timer.finished) {
        return;
      }
      this.pendingHandler = true;

      this._timer.pause();
      this._ui._Bar.stopPointer();

      const positionCorrect = this._coordinates.checkPosition();
      if (!positionCorrect) {
        this.incorrectPositionHandler();
      }

      if (positionCorrect) {
        this.correctPositionHandler();
      }

      if (this.pinsUnlocked === this.level.steps) {
        this.onWon();
        throw new Error();
      }

      if (!this.attempts.value) {
        this.onDefeat();
        throw new Error();
      }

      this._ui._UnlockLabel.animateTip();

      setTimeout(() => {
        this.continue();
      }, this.PAUSE_TIMEOUT);
    } catch (e) {
      this.pendingHandler = false;
    }
  }

  incorrectPositionHandler() {
    this._sounds.playFailed();
    this._ui.barFailure();
    this.attempts.set(this.attempts.value - 1);
  }

  correctPositionHandler() {
    this._sounds.playUnlocked();
    this._ui._Lockpick.stopAnimate();
    this.pinsUnlocked++;
    this._ui._Pins.updateUnlocked(this.pinsUnlocked);
  }

  continue() {
    this._timer.start();
    this._ui._Bar.movePointer();
    this._ui._Lockpick.animate();
    this.pendingHandler = false;
  }
}
