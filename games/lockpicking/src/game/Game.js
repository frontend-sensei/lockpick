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
  }

  /**
   * Stop the game and reset values
   */
  stop() {
    this.launched = false;
  }
}
