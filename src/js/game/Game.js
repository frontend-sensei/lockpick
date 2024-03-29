import { UI } from "./UI.js";
import { Progress } from "./progress/Progress.js";
import { Coordinates } from "./coordinates/Coordinates.js";
import { Observable } from "../utils/observable.js";
import { isMobile } from "../utils/isMobile.js";
import { Keyboard } from "../utils/Keyboard.js";
import { Listeners } from "./listeners/Listeners.js";
import { GameSounds } from "./sounds/GameSounds.js";
import { Modes } from "./modes/Modes.js";
import { CoinsController } from "./coins/CoinsController.js";

/**
 * Creates a new Game
 * In the constructor should be passed level
 * @class Game
 */
export class Game {
  constructor() {
    this._progress = new Progress().restore();
    this._mode = new Modes(this).initMode(this._progress.getCurrentMode());
    this.level = this._mode.level;

    this.COINS_FOR_WIN = this._mode.COINS_FOR_WIN;
    this.attempts = this._mode.attempts || new Observable(3);
    this.PAUSE_TIMEOUT = this._mode.PAUSE_TIMEOUT || 500;

    this.isMobile = isMobile();
    this.deviceHandler = this.isMobile
      ? this.mobileUnlockHandler.bind(this)
      : this.desktopUnlockHandler.bind(this);

    this.pinsUnlocked = 0;
    this.pendingHandler = false;

    this._coins = new CoinsController(this)
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
      if (this.pendingHandler || this._mode.isNeedReturn?.()) {
        return;
      }
      this.pendingHandler = true;

      this._mode.beforePositionChecking?.()
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
    this._coins.coinsData.comboCoins = 0
  }

  updatePendingHandlerAfterDelay() {
    setTimeout(() => this.pendingHandler = false, 250)
  }

  correctPositionHandler() {
    this._sounds.playUnlocked();
    this._ui._Lockpick.stopAnimate();
    this.pinsUnlocked++;
    this._ui._Pins.updateUnlocked(this.pinsUnlocked);
    if(this._mode.correctPositionHandler) {
      this._mode.correctPositionHandler();
    }
    if(this.level.steps === this.pinsUnlocked) {
      return
    }
    this._ui._Bar.setRandomAreaTop();
    this._ui._Bar.node.classList.add('blink');
    setTimeout(() => {
      this._ui._Bar.node.classList.remove('blink');
    },1000)
  }

  continue() {
    this._ui._Bar.movePointer();
    this._ui._Lockpick.animate();
    this.updatePendingHandlerAfterDelay()
    this._mode.continue?.();
  }
}
