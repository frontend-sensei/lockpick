import { uniqueId } from "../utils/uniqueId.js";
import { isFunction } from "../utils/isFunction.js";

/**
 * Creates a new Popupgst
 * @param {Object} options
 * @class Popup
 */
export class Popup {
  constructor(options) {
    this.id = uniqueId("popup-");
    this.node = null;
    this.options = options;
    this.ANIMATION_DURATION = 500;

    this.onCreated = () => {};
    if (isFunction(options.onCreated)) {
      this.onCreated = options.onCreated;
    }
  }

  getHTML() {
    return `
    <div class="popup">
      <div class="popup-content">${this.options.html}</div>
    </div>
    `;
  }

  render() {
    const popupEl = document.createElement("div");
    popupEl.style.setProperty(
      "--transition-duration",
      `${this.ANIMATION_DURATION / 1000}s`
    );
    popupEl.className = "popup-wrapper";
    popupEl.id = this.id;
    popupEl.innerHTML = this.getHTML();
    document.body.appendChild(popupEl);
    this.node = document.getElementById(popupEl.id);
    setTimeout(() => this.node.classList.add("show"));

    this.addListeners();
    this.onCreated();
    return this;
  }

  addListeners() {
    this.addButtonListeners();
    this.addCloseListener();
    this.addHideListener();
  }

  getSelector(selector) {
    return `#${this.id} ${selector}`;
  }

  addButtonListeners() {
    const listeners = this.options.listeners || {};
    Object.entries(listeners).forEach((listenerData) => {
      const [id, listener] = listenerData;
      const el = document.querySelector(this.getSelector(`#${id}`));
      console.log(el);
      if (!el) {
        console.error(`Element with id: "${id} not found"`);
        return;
      }
      el.addEventListener("click", listener);
    });
  }

  addHideListener() {
    const hideBtn = document.querySelector(this.getSelector("[data-hide-btn]"));
    if (!hideBtn) {
      return;
    }
    hideBtn.addEventListener("click", this.hide.bind(this));
  }

  addCloseListener() {
    const closeBtn = document.querySelector(
      this.getSelector("[data-close-btn]")
    );
    if (!closeBtn) {
      return;
    }
    closeBtn.addEventListener("click", this.close.bind(this));
  }

  show() {
    this.node.classList.add("show");
    return this;
  }

  hide() {
    this.node.classList.remove("show");
    return this;
  }

  close() {
    this.node.classList.remove("show");
    setTimeout(() => this.node.remove(), this.ANIMATION_DURATION);
    return this;
  }
}
