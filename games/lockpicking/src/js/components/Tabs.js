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
    this.tabKeys = Object.keys(this.options.tabs);
  }

  getHTML() {
    return `
        ${this.getInputs()}
      <div class="tabs">
        ${this.getLabels()}
      </div>
      <div class="tabs__content">
        ${this.getContent()}
      </div>
    `;
  }

  getTabsStyles() {
    return `${this.getLabelStyles()}${this.getContentStyles()}`;
  }

  getLabelStyles() {
    const getLabelSelector = (index) => {
      return `.tabs__radio:nth-child(${index}):checked ~ .tabs .tabs__label:nth-child(${index}),`;
    };
    const rules = "{color: #07a0af;border-bottom: 2px solid #07a0af;}";
    return this.getStyles(getLabelSelector, rules);
  }

  getContentStyles() {
    const getContentSelector = (index) => {
      return `.tabs__radio:nth-child(${index}):checked ~ .tabs__content .tabs-content__element:nth-child(${index}),`;
    };
    const rules = "{display: block;}";
    return this.getStyles(getContentSelector, rules);
  }

  getStyles(getSelector, rules) {
    let CSS = "";
    this.tabKeys.forEach((tabKey, index) => {
      CSS += getSelector(index + 1);
    });
    CSS = CSS.slice(0, -1);
    CSS += rules;
    return CSS;
  }

  renderTabStyles() {
    const style = document.createElement("style");
    style.innerHTML = this.getTabsStyles();
    document.head.appendChild(style);
  }

  getInputs() {
    let HTML = "";
    this.tabKeys.forEach((tabKey) => {
      HTML += `<input type="radio" id="${this.options.tabs[tabKey].id}" name="tabs-radio" class="tabs__radio visually-hidden" />`;
    });
    return HTML;
  }

  getLabels() {
    let HTML = "";
    this.tabKeys.forEach((tabKey) => {
      HTML += `<label for="${this.options.tabs[tabKey].id}" class="tabs__label">${this.options.tabs[tabKey].name}</label>`;
    });
    return HTML;
  }

  getContent() {
    let HTML = "";
    this.tabKeys.forEach((tabKey) => {
      HTML += `
      <div class="tabs-content__element"> 
        ${this.options.tabs[tabKey].content}
      </div>`;
    });
    return HTML;
  }

  generateTabsUniqueId() {
    this.tabKeys.forEach((tabKey) => {
      this.options.tabs[tabKey].id = uniqueId();
    });
  }

  render(selector) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) {
      throw new Error(`element with ${selector} not found`);
    }
    this.generateTabsUniqueId();
    this.renderTabStyles();
    const tabsEl = document.createElement("div");
    tabsEl.className = "tabs-wrapper";
    tabsEl.id = uniqueId();
    tabsEl.innerHTML = this.getHTML();
    parentNode.prepend(tabsEl);
    this.node = document.getElementById(tabsEl.id);
  }
}
