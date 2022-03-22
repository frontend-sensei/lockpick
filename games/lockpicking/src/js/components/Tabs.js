import { uniqueId } from "../utils/uniqueId.js";

/**
 * Creates a new Tabs
 * @class Tabs
 */

export class Tabs {
  constructor(options) {
    this.node = null;
    this.options = options;
    this.id = "";
  }

  getHTML() {
    return `
      <div class="tabs">
       
      </div>
      <div class="tabs__content">
        
      </div>
    `;
  }

  addElement(element, radioSelector, tabsSelector, contentSelector) {
    const parentNode = document.querySelector(radioSelector);
    const tabLabelNode = document.querySelector(tabsSelector);
    const contentNode = document.querySelector(contentSelector);
    console.log(element);
    if (!element) {
      throw new Error("no element");
    }
    const radioTabEl = document.createElement(element.tab);
    const labelTabEl = document.createElement(element.content);
    const contentTabEl = document.createElement("div");

    radioTabEl.className = "tabs__radio visually-hidden";
    radioTabEl.setAttribute("type", "radio");
    radioTabEl.setAttribute("name", "tabs-radio");
    radioTabEl.id = uniqueId();
    parentNode.prepend(radioTabEl);

    labelTabEl.className = "tabs__label";
    labelTabEl.setAttribute("for", radioTabEl.id);
    labelTabEl.innerHTML = element.name;
    tabLabelNode.prepend(labelTabEl);

    contentTabEl.className = "tabs-content__element";
    contentTabEl.innerHTML = `<div class="block"></div>`;
    contentNode.appendChild(contentTabEl);

    this.node = document.getElementById(radioTabEl.id);
  }

  render(selector) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) {
      throw new Error(`element with ${selector} not found`);
    }
    const tabsEl = document.createElement("div");
    tabsEl.className = "tabs-wrapper";
    tabsEl.id = uniqueId();
    tabsEl.innerHTML = this.getHTML();
    parentNode.prepend(tabsEl);
    this.node = document.getElementById(tabsEl.id);
  }
}
