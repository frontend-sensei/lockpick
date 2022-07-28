import { uniqueId } from "../../utils/uniqueId.js";

export class Coins {
  constructor(root) {
    this.root = root;
  }

  getHTML() {
    return `<div class="coins__count"></div>`;
  }

  render() {
    const node = document.createElement("div");
    node.classList = "coins";
    node.id = uniqueId();
    node.innerHTML = this.getHTML();
    this.root._ui.node.appendChild(node);
    this.node = document.getElementById(node.id);
    this.nodeCoinsCount = this.node.querySelector(".coins__count");
    this.root.coins.subscribe(this.updateCoinsCount.bind(this));
  }

  updateCoinsCount(count) {
    this.nodeCoinsCount.innerHTML = count;
  }
}
