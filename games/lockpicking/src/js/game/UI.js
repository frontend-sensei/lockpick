import { Bar } from "./bar/Bar.js";

export class UI {
  constructor(root) {
    this.root = root;
    this._Bar = new Bar(root);
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = ``;
    element.className = `game`;
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`Selector - "${this.selector}" not found`);
    }
    wrapper.appendChild(element);

    this._Bar.render(".game");
  }
}
