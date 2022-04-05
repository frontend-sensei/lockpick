import { uniqueId } from "../../utils/uniqueId.js";

/**
 * Create UnlockLabel
 * @class UnlockLabel
 */
export class UnlockLabel {
  constructor() {
    this.node = null;
  }

  /**
   * @public
   * @param {string} selector
   */
  render(selector) {
    const previousNode = document.querySelector(selector);
    if (!previousNode) {
      throw new Error(`Selector - "${selector}" not found`);
    }

    const el = document.createElement("div");
    el.className = "unlock-label";
    el.id = uniqueId();
    el.innerHTML = `
    <div class="unlock-label__img"></div>
    <span class="unlock-label__text">Unlock pin</div>
    `;

    previousNode.after(el);
    this.node = document.getElementById(el.id);
    return this;
  }

  animateTip() {
    const tipIcon = document.querySelector(".unlock-label__img");
    if (tipIcon) {
      tipIcon.classList.add("unlock-label__img--active");
      setTimeout(() => {
        tipIcon.classList.remove("unlock-label__img--active");
      }, 100);
    }
  }
}
