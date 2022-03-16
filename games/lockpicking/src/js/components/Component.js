import { uniqueId } from "../utils/uniqueId.js";
import { isObjectEmpty } from "../utils/isObjectEmpty.js";

export class Component {
  constructor(options = {}) {
    this.name = this.constructor.name;
    this.el = null;
    this.id = uniqueId();
    this.props = options.props || {};
    this.components = options.components || {};
    this.parentNode = options.parentNode || {};
  }

  render() {
    this.isComponentDeclarationExists();
    this.renderSelf();
    this.renderComponents();
  }

  isComponentDeclarationExists() {
    console.log("Component", this.name, this.parentNode.childNodes);
  }

  renderSelf() {
    this.el = document.createElement("div");
    this.el.innerHTML = this.html();

    const htmlElements = [...this.el.childNodes].filter(
      (node) => node instanceof HTMLElement
    );

    if (htmlElements.length > 1) {
      [...this.el.childNodes].forEach((el) => {
        this.parentNode.appendChild(el);
      });
    } else {
      this.el = htmlElements[0];
      this.el.dataset.id = this.id;
      this.parentNode.appendChild(this.el);
      this.el = document.querySelector(`[data-id="${this.id}"]`);
    }
  }

  renderComponents() {
    if (isObjectEmpty(this.components)) {
      return;
    }

    const comments = {};
    for (const node of this.el.childNodes) {
      if (node instanceof Comment) {
        comments[node.nodeValue.trim()] = node;
      }
    }

    for (const componentName in this.components) {
      this.renderComponent(this.components[componentName], comments);
    }
  }

  renderComponent(component, comments) {
    const replacableNode = comments[component.name];
    replacableNode.replaceWith(component);
  }
}
