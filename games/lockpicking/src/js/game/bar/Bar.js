import { BarUI } from "./BarUI.js";

export class Bar {
  constructor(root) {
    this.root = root;
    this._ui = new BarUI(root);
  }

  render(selector) {
    this._ui.render(selector);
  }
}
