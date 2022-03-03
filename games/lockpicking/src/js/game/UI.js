import { Bar } from "./bar/Bar.js";
import { PinsUI } from "./pins/PinsUI.js";
import { Attempts } from "./attempts/Attempts.js";
import { MobileUnlockBtn } from "./mobile-unlock-btn/MobileUnlockBtn.js";

export class UI {
  constructor(root) {
    this.root = root;
    this.node = null;
    this._Bar = new Bar(root);
    this._PinsUI = new PinsUI(root);
    this._Attempts = new Attempts(root);

    if (this.root.isMobile) {
      this._MobileUnlockBtn = new MobileUnlockBtn(root);
    }
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = ` 
    <div class="unlock-label">
      <div class="unlock-label__img">
      </div>
      <span class="unlock-label__text">Unlock pin</div>
    </div>
    `;
    element.className = `game`;
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`Selector - "${this.selector}" not found`);
    }
    wrapper.appendChild(element);

    this.node = document.querySelector(".game");

    this._Bar.render(".game");
    this._PinsUI.render(".game");
    this._Attempts.render(".game");
    if (this.root.isMobile) {
      this._MobileUnlockBtn.render();
    }
  }
}
