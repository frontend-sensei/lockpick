/**
 * Creates a Timer
 * @class Timer
 */
export class Timer {
  /**
   * @param {Object} root - The root object
   * @param {number} timer - The timer value, in milliseconds
   */
  constructor(options) {
    this.launched = false;
    this.paused = false;
    this.finished = false;
    this.intervalId = null;
    this.timer = options.timer;
    this.timeLeft = 0;
    this.onStopCallback = options.onStopCallback
      ? options.onStopCallback
      : () => {};
  }

  /**
   * Starts timer and set up status properties
   */
  start() {
    if (this.finished) return;

    this.launched = true;
    this.paused = true;

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (this.timer <= 0) {
        return this.stop();
      }
      this.timer -= 50;
    }, 50);
  }

  /**
   * Pause timer and change status properties
   */
  pause() {
    this.intervalId = clearInterval(this.intervalId);
    this.launched = false;
    this.paused = true;
  }

  /**
   * Stops timer and change status properties
   */
  stop() {
    this.intervalId = clearInterval(this.intervalId);
    this.launched = false;
    this.finished = true;
    this.onStopCallback();
  }
}
