/**
 * Creates a new Level
 * @class Level
 */
export class Level {
  /**
   * @param {number} steps - The steps value.
   * @param {number} areaSize - The areaSize value, in pixels.
   * @param {number} areaMovingSpeed - The areaMovingSpeed value, in milliseconds.
   * @param {number} timer - The timer value, in milliseconds.
   */
  constructor({ id, steps, areaSize, pointerMovingSpeed, timer }) {
    this.id = id;
    this.steps = steps;
    this.areaSize = areaSize;
    this.pointerMovingSpeed = pointerMovingSpeed;
    this.timer = timer;
  }
}
