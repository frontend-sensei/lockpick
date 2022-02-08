import { GameBar } from "./GameBar/GameBar.js";

export class GameUI {
  constructor() {
    this._Bar = new GameBar();
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = ``;
    element.className = `game`;
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`GameBarUI: selector - "${this.selector}" not found`);
    }
    wrapper.appendChild(element);

    this._Bar.render(".game");
  }
}
