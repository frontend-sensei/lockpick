/**
 * Creates a new GameService
 * @class GameService
 */
export class GameService {
  /**
   * @param {Object} level
   */
  constructor(level, vendors) {
    this.attemts = 3;
    this.launched = false;
    this.level = level;
    this.vendors = vendors;

    this.render();
  }

  render() {
    const ui = new this.vendors._uiClass();
    ui.render();
  }

  start() {
    this.launched = true;
    this.addListeners();
  }

  stop() {
    this.launched = false;
    this.removeListeners();
  }

  addListeners() {
    window.addEventListener("keydown", () => {});
  }

  removeListeners() {
    window.removeEventListener("keydown", () => {});
  }
}
