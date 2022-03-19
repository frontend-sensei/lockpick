/**
 * Creates a new Countdown
 * @class Countdown
 */
export class Countdown {
  constructor(root) {
    this.root = root;
    this.countdown = 1;
    this.countdownNode = null;
    this.countdownValueNode = null;
  }

  /**
   * @private
   */
  render() {
    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown";
    countdownEl.innerHTML = `<div class="countdown-value"></div>`;
    this.root._ui.node.appendChild(countdownEl);

    this.countdownNode = this.root._ui.node.querySelector(".countdown");
    this.countdownValueNode =
      this.root._ui.node.querySelector(".countdown-value");
  }

  /**
   * @public
   */
  start() {
    this.render();

    return new Promise((resolve) => {
      let secondsPassed = 0;
      let interval = setInterval(() => {
        if (secondsPassed >= this.countdown) {
          clearInterval(interval);
          this.countdownValueNode.innerHTML = "Go!";
          this.countdownNode.classList.add("hidden");
          resolve();
          return;
        }

        this.countdownValueNode.innerHTML = this.countdown - secondsPassed;
        secondsPassed++;
      }, 1000);
    });
  }
}
