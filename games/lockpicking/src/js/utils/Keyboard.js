/**
 * Create Keyboard object which helps with detecting pressed keys
 */
export class Keyboard {
  constructor() {}

  /**
   * @public
   * @param {Object} event
   * @returns {boolean} Whether space is pressed.
   */
  isSpacePressed(event) {
    return event.keyCode === 32;
  }
}
