import { uniqueId } from "../../utils/uniqueId.js";

export class UnlockLabel {
  constructor() {
    this.node = null;
  }

  render(selector) {
    const el = document.createElement("div");
    el.className = "unlock-label";
    el.id = uniqueId();
    el.innerHTML = `
    <div class="unlock-label__img"></div>
    <span class="unlock-label__text">Unlock pin</div>
    `;

    const previousNode = document.querySelector(selector);
    if (!previousNode) {
      throw new Error(`Selector - "${selector}" not found`);
    }
    previousNode.after(el);

    this.node = document.getElementById(el.id);
  }
}
