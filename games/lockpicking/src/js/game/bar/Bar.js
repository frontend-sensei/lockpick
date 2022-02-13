import { BarUI } from "./BarUI.js";

export class Bar {
  constructor(root) {
    this.root = root;
    this._BarUI = new BarUI(root);
  }

  render(selector) {
    this._BarUI.render(selector);
  }
}
