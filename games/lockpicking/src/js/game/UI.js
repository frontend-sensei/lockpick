import { Bar } from "./bar/Bar.js";
import { Pins } from "./pins/Pins.js";
import { Attempts } from "./attempts/Attempts.js";
import { MobileUnlockBtn } from "./mobile-unlock-btn/MobileUnlockBtn.js";
import { UnlockLabel } from "./unlock-label/UnlockLabel.js";
import { Lockpick } from "./lockpick/Lockpick.js";
import { Coins } from "./coins/Coins.js";

export class UI {
  constructor(root) {
    this.root = root;
    this.node = null;
    this._Bar = new Bar(root);
    this._Pins = new Pins(root);
    this._Attempts = new Attempts(root);
    this._Coins = new Coins(root);
    this._Lockpick = new Lockpick(this.root.level.steps);

    if (this.root.isMobile) {
      this._MobileUnlockBtn = new MobileUnlockBtn(root);
    } else {
      this._UnlockLabel = null;
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

    const notificationsRow = document.createElement("div")
    notificationsRow.className = "notifications-row"
    wrapper.appendChild(notificationsRow);

    const backButton = document.createElement("a")
    backButton.href = "./index.html"
    backButton.className = "back-button"
    backButton.innerText = "Back to menu"
    wrapper.appendChild(backButton);

    this.node = document.querySelector(".game");
    this.node.classList.add(`game--mode-${this.root._mode.name}`)

    this._Bar.render(".bar-row");
    this._Pins.render(".bar-row");
    this._Lockpick.render(".bar-row");
    this._Attempts.render();
    this._Coins.render();
    if (this.root.isMobile) {
      this._MobileUnlockBtn.render();
    } else {
      this._UnlockLabel = new UnlockLabel().render(".bar-row");
    }
  }

  barFailure() {
    this._Bar.node.classList.add("bar--failure");
    this._Lockpick.node.classList.add("failure");
    setTimeout(() => {
      this._Bar.node.classList.remove("bar--failure");
      this._Lockpick.node.classList.remove("failure");
    }, this.root.PAUSE_TIMEOUT - 150);
  }
}
