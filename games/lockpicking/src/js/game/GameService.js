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

    this.timer = new vendors._TimerClass(5000);
    this.render();
  }

  render() {
    const ui = new this.vendors._uiClass();
    ui.render(".game-page");
  }

  start() {
    this.launched = true;
    this.addListeners();

    this.timer.start();
  }

  stop() {
    this.launched = false;
    this.removeListeners();

    this.timer.stop();
  }

  addListeners() {
    window.addEventListener("keydown", this.keydownHandler);
  }

  removeListeners() {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  keydownHandler() {
    if (event.keyCode === 32) {
      this.timer.pause();
      setTimeout(() => {
        this.timer.start();
      }, 1500);
    }
  }
}
