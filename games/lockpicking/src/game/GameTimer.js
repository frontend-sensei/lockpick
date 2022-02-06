/**
 * Creates a GameTimer
 * @class GameTimer
 */
export class GameTimer {
  /**
   *
   * @param {number} timer - The timer value, in milliseconds
   */
  constructor(timer) {
    this.timer = timer;
    this.launched = false;
    this.finished = false;
    this.timerId = null;
  }

  /**
   * Starts timer and set up status properties
   */
  start() {
    this.launched = true;

    let timerId = setInterval(() => {
      if (this.timer <= 0) {
        this.stop();
      }
      this.timer -= 1000;
    }, 1000);

    this.timerId = timerId;
  }

  /**
   * Stops timer and change status properties
   */
  stop() {
    this.timerId = clearInterval(this.timerId);
    this.launched = false;
    this.finished = true;
  }
}
