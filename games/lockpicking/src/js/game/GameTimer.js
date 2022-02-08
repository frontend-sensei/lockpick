/**
 * Creates a GameTimer
 * @class GameTimer
 */
export class GameTimer {
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
    this.timerId = null;
  }

  /**
   * Starts timer and set up status properties
   */
  start() {
    console.log("Timer started");
    this.launched = true;

    let timerId = setInterval(() => {
      if (this.timer <= 0) {
        this.stop();
      }
      console.log("Timer: ", this.timer);
      this.timer -= 1000;
    }, 1000);

    this.timerId = timerId;
  }

  /**
   * Starts timer and set up status properties
   */
  pause() {
    this.timerId = clearInterval(this.timerId);
    this.launched = false;
    this.paused = true;
    console.log("called");
  }

  /**
   * Stops timer and change status properties
   */
  stop() {
    console.log("Timer stopped");
    this.timerId = clearInterval(this.timerId);
    this.launched = false;
    this.finished = true;
    this.root.onDefeat();
  }
}
