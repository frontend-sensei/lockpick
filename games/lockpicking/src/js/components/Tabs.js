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
      <div class="tabs-wrapper">
        <input type="radio" id="standart" name="tabs-radio" class="tabs__radio visually-hidden" checked/>
        <input type="radio" id="hard" name="tabs-radio" class="tabs__radio visually-hidden" />
        <input type="radio" id="time" name="tabs-radio" class="tabs__radio visually-hidden" />
        <div class="tabs">
          <label class="tabs__label" for="standart">Standart</label>
          <label class="tabs__label" for="hard">Hardcore</label>
          <label class="tabs__label" for="time">Time</label>
        </div>
        <div class="tabs__content">
          <div class="tabs-content__element tabs-content__element--standart">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
          </div> 
          <div class="tabs-content__element tabs-content__element--hard">
            <div class="alock"></div>
            <div class="alock"></div>
            <div class="alock"></div>
            <div class="alock"></div>
            <div class="alock"></div>
            <div class="alock"></div>
          </div> 
          <div class="tabs-content__element tabs-content__element--time">
            <div class="vlock"></div>
            <div class="vlock"></div>
            <div class="vlock"></div>
            <div class="vlock"></div>
            <div class="vlock"></div>
            <div class="vlock"></div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const tabsEl = document.createElement("div");
    tabsEl.className = "tabs-wrapper";
    tabsEl.id = uniqueId();
    tabsEl.innerHTML = this.getHTML();
    document.body.appendChild(tabsEl);
    console.dir(document);
    this.node = document.getElementById(tabsEl.id);

    return this;
  }
}
