export class MobileListeners {
  constructor(listener, node) {
    this.listener = listener;
    this.node = node;
  }

  register() {
    this.node.addEventListener("click", this.listener);
  }

  remove() {
    this.node.removeEventListener("click", this.listener);
  }
}
