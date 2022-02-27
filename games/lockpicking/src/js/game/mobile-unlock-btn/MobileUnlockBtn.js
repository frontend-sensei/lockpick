import { uniqueId } from "../../utils/uniqueId.js";

export class MobileUnlockBtn {
  constructor(root) {
    this.root = root;
    this.node = null;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = `<button class="mobile-unlock-btn">Unlock pin</button>`;
    element.className = "mobile-unlock-btn-wrapper";
    element.id = uniqueId();
    this.root._ui.node.appendChild(element);
    this.node = document.getElementById(element.id);
  }
}
