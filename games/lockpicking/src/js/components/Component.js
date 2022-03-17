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
    const node = this.createNode();

    // append to el or
    // replace node with component
    this.renderNode(node);

    this.el = document.querySelector(`[data-id="${this.id}"]`);
  }

  createNode() {
    const temporaryNode = document.createElement("div");
    temporaryNode.innerHTML = this.html();

    const htmlElements = [...temporaryNode.childNodes].filter(
      (childNode) => childNode instanceof HTMLElement // or comment. it can be other component as root
    );

    if (!htmlElements[0]) {
      console.warn("Element for rendering in the component not found");
      return;
    }

    const node = htmlElements[0];
    node.dataset.id = this.id;

    return node;
  }

  renderNode(node) {
    for (const childNode of this.parentNode.childNodes) {
      const isCommentNode = childNode instanceof Comment;
      const isTargetComment = childNode.nodeValue.trim() === this.name;
      if (isCommentNode && isTargetComment) {
        childNode.replaceWith(node);
      }
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
