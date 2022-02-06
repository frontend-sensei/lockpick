/**
 * Creates a new Game
 * @class Game
 */
class Game {
  /**
   * @param {Object} level
   */
  constructor(level) {
    this.attemts = 3;
    this.launched = false;
    this.level = level;
  }

  /**
   * Sets up and run the game
   */
  start() {
    this.launched = true;
    this.addListeners();
  }

  /**
   * Stop the game and reset values
   */
  stop() {
    this.launched = false;
    this.removeListeners();
  }

  /**
   * Add listeners on the game start
   */
  addListeners() {
    window.addEventListener("keydown", () => {});
  }

  /**
   * Remove listeners on the game stop
   */
  removeListeners() {
    window.removeEventListener("keydown", () => {});
  }
}
