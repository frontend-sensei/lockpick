import { uniqueId } from "../utils/uniqueId.js";

export class NavigationLayer {
  constructor() {
    this.node = null;
    this.ANIMATION_DURATION = 1000;
  }

  render() {
    const layerEl = document.createElement("div");
    layerEl.style.setProperty(
      "--app-navigation-layer-transition-duration",
      `${this.ANIMATION_DURATION / 1000}s`
    );
    layerEl.className = "navigation-layer";
    layerEl.id = uniqueId();
    document.body.appendChild(layerEl);
    this.node = document.getElementById(layerEl.id);
    setTimeout(() => this.remove());
  }

  remove(resolve) {
    this.node.classList.add("hidden");
    setTimeout(() => this.node.remove, this.ANIMATION_DURATION);
  }
}
