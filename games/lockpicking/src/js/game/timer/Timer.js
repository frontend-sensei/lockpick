/**
 * Creates a Timer
 * @class Timer
 */
export class Timer {
  /**
   * @param {Object} root - The root object
   * @param {number} timer - The timer value, in milliseconds
   */
  constructor(root, timer) {
    this.root = root;
    this.timer = timer;
    this.launched = false;
    this.paused = false;
    this.finished = false;
    this.interval = 1000;
    this.intervalId = null;
    this.timeLeft = 0;
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
   * Starts timer and set up status properties
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
    this.root.onDefeat();
  }
}
