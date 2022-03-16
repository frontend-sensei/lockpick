import { uniqueId } from "../utils/uniqueId.js";

export class Component {
  constructor(options = {}) {
    this.componentName = this.constructor.name;
    this.el = null;
    this.id = uniqueId();
    this.props = options.props || {};
    this.components = {};
    this.parentNode = options.parentNode || {};
  }

  render() {
    this.isComponentDeclarationExists();
    this.renderSelf();
    // this.renderComponents();
  }

  isComponentDeclarationExists() {
    console.log("Component", this.componentName, this.parentNode.childNodes);
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
}
