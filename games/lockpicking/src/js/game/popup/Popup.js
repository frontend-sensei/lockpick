import { uniqueId } from "../../utils/uniqueId.js";

/**
 * Creates a new Popup
 * @class Popup
 */
export class Popup {
  constructor(root, options) {
    this.root = root;
    this.node = null;
    this.options = options;
  }

  getHTML() {
    const { headline, reloadBtnText } = this.options;
    return `
    <div class="popup">
      <div class="popup-content">
        <h2 class="popup-headline">${headline}</h2>
        <button class="popup-button" id="backToHome">back to home</button>
        <button class="popup-button" id="reloadPage">${reloadBtnText}</button>
      </div>
    </div>
    `;
  }

  render() {
    const popupEl = document.createElement("div");
    popupEl.classList = "popup-wrapper";
    popupEl.id = uniqueId();
    popupEl.innerHTML = this.getHTML();
    this.root._ui.node.appendChild(popupEl);
    this.node = document.getElementById(popupEl.id);

    document
      .getElementById("backToHome")
      .addEventListener("click", this.backToHomeHandler);
    document
      .getElementById("reloadPage")
      .addEventListener("click", this.reloadPage);
  }

  backToHomeHandler() {
    location.href = "/";
  }

  reloadPage() {
    location.reload();
  }
}
