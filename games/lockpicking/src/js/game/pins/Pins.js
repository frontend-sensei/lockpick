/**
 * Creates a Pins visualization
 * @class Pins
 */
export class Pins {
  constructor(root) {
    this.root = root;
    this.node = null;
  }

  /**
   * @private
   * @returns {string} HTML string
   */
  getHTML() {
    const pins = this.root.level.steps;
    return `
    <div class="pins-wrapper">
      <span class="pins-label">Pins:</span>
      <div class="pins-counter">
        <span class="pins-unlocked">0</span>
        <span class="pins-delimiter">/</span>
        <span class="pins-count">${pins}</span>
      </div>
    </div>
    `;
  }

  /**
   * @public
   * @param {string} selector
   */
  render(selector) {
    const pinsEl = document.createElement("div");
    pinsEl.classList = "pins";
    pinsEl.innerHTML = this.getHTML();
    document.querySelector(selector).appendChild(pinsEl);
    this.node = document.querySelector(".pins");
    this.unlockedNode = this.node.querySelector(".pins-unlocked");
  }

  /**
   * @public
   * @param {number} pinsUnlocked
   */
  updateUnlocked(pinsUnlocked) {
    this.unlockedNode.innerHTML = pinsUnlocked;
  }
}
