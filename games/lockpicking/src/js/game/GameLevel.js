/**
 * Creates a new GameLevel
 * @class GameLevel
 */
class GameLevel {
  /**
   * @param {number} steps - The steps value.
   * @param {number} areaSize - The areaSize value, in pixels.
   * @param {number} areaMovingSpeed - The areaMovingSpeed value, in milliseconds.
   * @param {number} timer - The timer value, in milliseconds.
   */
  constructor(steps, areaSize, areaMovingSpeed, timer) {
    this.steps = steps;
    this.areaSize = areaSize;
    this.areaMovingSpeed = areaMovingSpeed;
    this.timer = timer;
  }
}
