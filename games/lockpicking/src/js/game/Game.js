import { UI } from "./UI.js";
import { Progress } from "./progress/Progress.js";
import { Coordinates } from "./coordinates/Coordinates.js";
import { Observable } from "../utils/observable.js";
import { isMobile } from "../utils/isMobile.js";
import { Keyboard } from "../utils/Keyboard.js";
import { Listeners } from "./listeners/Listeners.js";
import { GameSounds } from "./sounds/GameSounds.js";
import { Modes } from "./modes/Modes.js";

/**
 * Creates a new Game
 * In the constructor should be passed level
 * @class Game
 */
export class Game {
  constructor() {
    this._progress = new Progress().restore();
    this._mode = new Modes(this).initMode(this._progress.getCurrentMode());
    this._levels = this._mode._levels;
    this.level = this._levels.get(this._progress.progress.nextLevel.id);

    this.attempts = this._mode.attempts || new Observable(3);
    this.PAUSE_TIMEOUT = this._mode.PAUSE_TIMEOUT || 500;

    this.isMobile = isMobile();
    this.deviceHandler = this.isMobile
      ? this.mobileUnlockHandler.bind(this)
      : this.desktopUnlockHandler.bind(this);

    this.pinsUnlocked = 0;
    // to isHandlerBusy
    this.pendingHandler = false;

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
    if(event.repeat) {
      return;
    }
    this.unlockHandler();
  }

  /**
   * Render the game
   * @public
   */
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
   */
  start() {
    this._mode.start();
  }

  stop() {
    this._mode.stop();
  }

  onDefeat() {
    this._mode.onDefeat();
  }

  onWon() {
    this._mode.onWon();
  }

  unlockHandler() {
    try {
      if (this.pendingHandler || this._mode.isNeedReturn()) {
        return;
      }
      this.pendingHandler = true;

      this._mode.beforePositionChecking()
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
      // next part means "continue to the next level step"

      // For desktop only. If UnlockLabel exists
      if(this._ui._UnlockLabel) {
        this._ui._UnlockLabel.animateTip();
      }

      setTimeout(() => {
        this.continue();
      }, this.PAUSE_TIMEOUT);
    } catch (e) {
      this.updatePendingHandlerAfterDelay()
    }
  }

  incorrectPositionHandler() {
    this._sounds.playFailed();
    this._ui.barFailure();
    this.attempts.set(this.attempts.value - 1);
  }

  updatePendingHandlerAfterDelay() {
    setTimeout(() => this.pendingHandler = false, 250)
  }

  correctPositionHandler() {
    this._sounds.playUnlocked();
    this._ui._Lockpick.stopAnimate();
    this.pinsUnlocked++;
    this._ui._Pins.updateUnlocked(this.pinsUnlocked);
    this._mode.correctPositionHandler();
  }

  continue() {
    this._ui._Bar.movePointer();
    this._ui._Lockpick.animate();
    this.updatePendingHandlerAfterDelay()
    this._mode.continue();
  }
}
