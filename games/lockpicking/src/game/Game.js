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
    this.launch = false;
    this.level = level;
  }
}
