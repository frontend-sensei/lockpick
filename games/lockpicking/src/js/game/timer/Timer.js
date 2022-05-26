import { uniqueId } from "../../utils/uniqueId.js";

/**
 * Creates a Timer
 * @class Timer
 */
export class Timer {
  /**
   * @param {Object} options - options object
   */
  constructor(options) {
    this.id = uniqueId();
    this.launched = false;
    this.paused = false;
    this.finished = false;
    this.intervalId = null;
    this.timer = options.timer;
    // TODO: Save time left
    this.timeLeft = 0;
    this.onStopCallback = options.onStopCallback
      ? options.onStopCallback
      : () => {};
  }

  render(selector) {
    const targetNode = document.querySelector(selector)
    if(!targetNode) {
      console.error(`Node with selector ${selector} not found!`)
      return this
    }
    const timerNode = document.createElement("div");
    timerNode.id = this.id;
    timerNode.className = "timer";
    timerNode.innerHTML = "00:00";
    targetNode.appendChild(timerNode)

    return this
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
