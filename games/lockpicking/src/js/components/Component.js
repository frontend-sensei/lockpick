import { uniqueId } from "../utils/uniqueId.js";

export class Component {
  constructor(options = {}) {
    this.el = null;
    this.id = uniqueId();
    this.props = options.props || {};
    this.components = {};
    this.parentNode = options.parentNode || {};
    this.parentNodeSelector = `[data-id="${this.parentNode.id}"]`;
  }

  render() {
    this.findParentNode();
    this.renderSelf();
    // this.renderComponents();
  }

  findParentNode() {
    const parentNode = this.getParentNode();
    if (!parentNode) {
      throw new Error(
        `Element with selector ${this.parentNodeSelector} is not found`
      );
    }
    this.parentNode = parentNode;
  }

  getParentNode() {
    return document.querySelector(this.parentNodeSelector);
  }

  renderSelf() {
    this.el = document.createElement("div");
    this.el.innerHTML = this.html();
    this.el.dataset.id = this.id;

    this.parentNode.appendChild(this.el);
    this.el = document.querySelector(`[data-id="${this.id}"]`);
  }
}
