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
    this.node = null;
    this.launched = false;
    this.paused = false;
    this.finished = false;
    this.intervalId = null;
    this.timer = options.timer;
    this.previousTimer = 0;
    this.totalTime = 0;
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
    this.node = document.getElementById(this.id);

    return this
  }

  /**
   * Starts timer and set up status properties
   */
  start() {
    if (this.finished) return;

    this.launched = true;
    this.paused = true;
    this.previousTimer = this.timer

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (this.timer <= 0) {
        return this.stop();
      }
      this.timer -= 50;
      this.updateTimer()
    }, 50);
  }

  updateTimer() {
    if (!this.node) return;
    this.node.innerHTML = `${this.formatTimer(this.timer)}`
  }

  formatTimer(timer) {
    const seconds = (() => {
      const seconds = (timer / 1000).toFixed()
      if(seconds < 10) {
        return "0" + seconds
      }
      if(seconds > 30) {
        return 30
      }
      return seconds
    })();

    const milliseconds = (timer / 1000 % 1).toFixed(2).substring(2)

    return `${seconds}:${milliseconds}`
  }

  increase(milliseconds = 0) {
    if(this.timer > 30000) {
      this.timer = 30000
      return
    }
    this.timer += milliseconds;
    this.updateTimer()
  }

  /**
   * Pause timer and change status properties
   */
  pause() {
    this.intervalId = clearInterval(this.intervalId);
    this.launched = false;
    this.paused = true;
    this.updateTotalTime()
  }

  /**
   * Stops timer and change status properties
   */
  stop() {
    this.intervalId = clearInterval(this.intervalId);
    this.launched = false;
    this.finished = true;
    this.updateTotalTime()
    this.onStopCallback();
  }

  updateTotalTime() {
    this.totalTime += this.previousTimer - this.timer
  }
}
