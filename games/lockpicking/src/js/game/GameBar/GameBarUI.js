/**
 * Creates a new GameBarUI
 * @class GameBarUI
 */
export class GameBarUI {
  constructor() {}

  getHTML() {
    return `
      <div class="bar__area"></div>
      <div class="bar__pointer"></div>
    `;
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = this.getHTML();
    element.className = "bar";
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`GameBarUI: selector - "${selector}" not found`);
    }
    wrapper.appendChild(element);
  }
}
