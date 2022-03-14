import { uniqueId } from "../../utils/uniqueId.js";

export class MobileUnlockBtn {
  constructor(root) {
    this.root = root;
    this.node = null;
  }

  render() {
    const element = document.createElement("button");
    element.className = "mobile-unlock-btn";
    element.id = uniqueId();
    this.root._ui.node.appendChild(element);
    this.node = document.getElementById(element.id);
  }
}
