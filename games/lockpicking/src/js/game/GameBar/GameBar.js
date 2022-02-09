import { GameBarUI } from "./GameBarUI.js";

export class GameBar {
  constructor(root) {
    this.root = root;
    this._BarUI = new GameBarUI(root);
  }

  render(selector) {
    this._BarUI.render(selector);
  }
}
