/**
 * Creates a new BarUI
 * @class BarUI
 */
export class BarUI {
  constructor(root) {
    this.root = root;
    this.node = null;
    this.areaNode = null;
    this.pointerNode = null;
    this.inertvalId = null;
    this.areaHeight = this.root.level.areaHeight;
    this.translateY = 0;
    this.movementDirection = "bottom";
  }

  getHTML() {
    const areaHeight = this.areaHeight;
    return `
      <div class="bar__area" style="--height:${areaHeight}%"></div>
      <div class="bar__pointer"></div>
    `;
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = this.getHTML();
    element.className = "bar";
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`GameBarUI: selector - "${selector}" not found`);
    }

    wrapper.appendChild(element);

    this.node = document.querySelector(".bar");
    this.areaNode = document.querySelector(".bar__area");
    this.pointerNode = document.querySelector(".bar__pointer");
  }

  movePointer() {
    const movementSpeed = 6;
    const barHeight = 100;
    const barPointerHeight = 10;
    const maxTranslateY = barHeight - barPointerHeight;
    const minTranslateY = 0;

    this.inertvalId = setInterval(() => {
      if (this.movementDirection === "bottom") {
        if (this.translateY >= maxTranslateY) {
          this.translateY = maxTranslateY;
          this.movementDirection = "top";
          return;
        }
        this.translateY += movementSpeed;
      } else if (this.movementDirection === "top") {
        if (this.translateY <= minTranslateY) {
          this.translateY = minTranslateY;
          this.movementDirection = "bottom";
          return;
        }
        this.translateY -= movementSpeed;
      }
      this.pointerNode.style.transform = `translateY(${this.translateY}px)`;
    }, 16);
  }

  stopPointer() {
    this.inertvalId = clearInterval(this.inertvalId);
  }
}
