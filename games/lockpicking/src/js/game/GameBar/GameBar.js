import { GameBarUI } from "./GameBarUI.js";

export class GameBar {
  constructor() {
    this._BarUI = new GameBarUI();
  }

  render(selector) {
    this._BarUI.render(selector);
  }
}
