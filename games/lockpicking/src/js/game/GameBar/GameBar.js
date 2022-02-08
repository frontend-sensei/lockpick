import { GameBarUI } from "./GameBarUI.js";

export class GameBar {
  constructor() {
    this._gameBarUI = new GameBarUI();
  }

  render(selector) {
    this._gameBarUI.render(selector);
  }
}
