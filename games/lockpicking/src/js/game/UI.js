import { Bar } from "./bar/Bar.js";
import { PinsUI } from "./pins/PinsUI.js";

export class UI {
  constructor(root) {
    this.root = root;
    this.gameNode = null;
    this._Bar = new Bar(root);
    this._PinsUI = new PinsUI(root);
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

    this.gameNode = document.querySelector(".game");

    this._Bar.render(".game");
    this._PinsUI.render(".game");
  }
}
