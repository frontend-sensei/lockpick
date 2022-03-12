import { Bar } from "./bar/Bar.js";
import { PinsUI } from "./pins/PinsUI.js";
import { Attempts } from "./attempts/Attempts.js";
import { MobileUnlockBtn } from "./mobile-unlock-btn/MobileUnlockBtn.js";
import { UnlockLabel } from "./unlock-label/UnlockLabel.js";
import { Lockpick } from "./lockpick/Lockpick.js";

export class UI {
  constructor(root) {
    this.root = root;
    this.node = null;
    this._Bar = new Bar(root);
    this._PinsUI = new PinsUI(root);
    this._Attempts = new Attempts(root);
    this._Lockpick = new Lockpick(this.root.level.steps);

    if (this.root.isMobile) {
      this._MobileUnlockBtn = new MobileUnlockBtn(root);
    }
  }

  getHTML() {
    return `
      <div class="bar-row"></div>
    `;
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = this.getHTML();
    element.className = `game`;

    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`Selector - "${this.selector}" not found`);
    }
    wrapper.appendChild(element);

    this.node = document.querySelector(".game");

    this._Bar.render(".bar-row");
    this._PinsUI.render(".bar-row");
    this._Lockpick.render(".bar-row");
    this._Attempts.render(".game");
    if (this.root.isMobile) {
      this._MobileUnlockBtn.render();
    } else {
      new UnlockLabel().render(".bar-row");
    }
  }
}
