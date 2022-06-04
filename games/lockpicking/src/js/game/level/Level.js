/**
 * Creates a new Level
 * @class Level
 */
export class Level {
  /**
   * @param {number} id - The id value.
   * @param {number} steps - The count of pins.
   * @param {number} areaHeight - The areaHeight value, in pixels.
   * @param {number} areaMovingSpeed - The areaMovingSpeed value, in milliseconds.
   */
  constructor({ id, steps, areaHeight, pointerMovingSpeed }) {
    this.id = id;
    this.steps = steps;
    this.areaHeight = areaHeight;
    this.pointerMovingSpeed = pointerMovingSpeed;
  }
}
