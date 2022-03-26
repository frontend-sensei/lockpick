export class DesktopListeners {
  constructor(listener) {
    this.listener = listener;
  }

  register() {
    window.addEventListener("keydown", this.listener);
  }

  remove() {
    window.removeEventListener("keydown", this.listener);
  }
}
