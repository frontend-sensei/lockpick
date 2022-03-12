export class Countdown {
  constructor(root) {
    this.root = root;
    this.countdownNode = null;
    this.countdownValueNode = null;
  }

  render() {
    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown";
    countdownEl.innerHTML = `<div class="countdown-value"></div>`;
    this.root._ui.node.appendChild(countdownEl);

    this.countdownNode = this.root._ui.node.querySelector(".countdown");
    this.countdownValueNode =
      this.root._ui.node.querySelector(".countdown-value");
  }

  start() {
    this.render();
    const countdown = 1;

    return new Promise((resolve) => {
      let secondsPassed = 0;
      let interval = setInterval(() => {
        if (secondsPassed >= countdown) {
          interval = clearInterval(interval);
          this.countdownValueNode.innerHTML = "Go!";
          this.countdownNode.classList.add("hidden");
          resolve();
          return;
        }

        this.countdownValueNode.innerHTML = countdown - secondsPassed;
        secondsPassed++;
      }, 1000);
    });
  }
}
