/**
 * Creates a new GameService
 * @class GameService
 */
export class GameService {
  /**
   * @param {Object} level
   * @param {Object} vendors
   */
  constructor(level, vendors) {
    this.attemts = 3;
    this.launched = false;
    this.level = level;
    this.vendors = vendors;

    this.keydownHandler = this.keydownHandler.bind(this);
    this.pendingHandler = false;

    this._ui = new vendors._UIClass();
    this._timer = new vendors._TimerClass(this, 2000);
    this.render();
  }

  render() {
    this._ui.render(".game-page");
  }

  start() {
    this.launched = true;
    this.addListeners();

    this._timer.start();
    this._ui._Bar._BarUI.movePointer();
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

  gameOver() {
    // Show popup
    // redirect to home page
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

    console.log("Call");

    this.pendingHandler = true;

    if (this._timer.finished) {
      return;
    }
    if (event.keyCode === 32) {
      this._timer.pause();
      this._ui._Bar._BarUI.stopPointer();
      setTimeout(() => {
        this._timer.start();
        this._ui._Bar._BarUI.movePointer();
        this.pendingHandler = false;
      }, 1500);
    }
  }
}
