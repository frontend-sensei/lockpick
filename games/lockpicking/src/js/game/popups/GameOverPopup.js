import { Popup } from "../../components/Popup.js";

export class GameOverPopup {
  constructor() {
    const options = {
      html: this.html(),
      listeners: {
        backToHome: this.backToHomeHandler,
        reloadPage: this.reloadPage,
      },
    };
    return new Popup(options);
  }

  html() {
    return `<h2 class="popup-headline">Game over :(</h2>
    <button class="popup-button" id="backToHome">back to home</button>
    <button class="popup-button" id="reloadPage">Retry</button>`;
  }

  backToHomeHandler() {
    location.href = "/";
  }

  reloadPage() {
    location.reload();
  }
}
