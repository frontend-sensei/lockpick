export class DesktopListeners {
  constructor(listener) {
    this.listener = listener;
    this.registered = false;
  }

  register() {
    if(this.registered) {
      return
    }
    this.registered = true
    window.addEventListener("keydown", this.listener);
  }

  remove() {
    this.registered = false
    window.removeEventListener("keydown", this.listener);
  }
}
