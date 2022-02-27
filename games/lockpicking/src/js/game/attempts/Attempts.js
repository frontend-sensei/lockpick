import { uniqueId } from "../../utils/uniqueId.js";

export class Attempts {
  constructor(root) {
    this.root = root;
  }

  getHTML() {
    return `<div class="attempts-count"></div>`;
  }

  render() {
    const attemptsEl = document.createElement("div");
    attemptsEl.classList = "attempts";
    attemptsEl.id = uniqueId();
    attemptsEl.innerHTML = this.getHTML();
    this.root._ui.node.appendChild(attemptsEl);
    this.node = document.getElementById(attemptsEl.id);
    this.nodeAttemptsCount = this.node.querySelector(".attempts-count");
    this.root.attempts.subscribe(this.updateAttemptsCount.bind(this));
  }

  updateAttemptsCount(count) {
    this.nodeAttemptsCount.innerHTML = count;
  }
}
