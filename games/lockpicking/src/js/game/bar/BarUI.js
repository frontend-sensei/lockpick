/**
 * Creates a new BarUI
 * @class BarUI
 */
export class BarUI {
  constructor(root) {
    this.root = root;
    this.barNode = null;
    this.barAreaNode = null;
    this.barPointerNode = null;
    this.inertvalId = null;
    this.areaHeight = this.root.level.areaHeight;
    this.translateY = 0;
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

    this.barNode = document.querySelector(".bar");
    this.barAreaNode = document.querySelector(".bar__area");
    this.barPointerNode = document.querySelector(".bar__pointer");
  }

  movePointer() {
    const movementSpeed = 6;
    const barHeight = 100;
    const barPointerHeight = 10;
    const maxTranslateY = barHeight - barPointerHeight;
    const minTranslateY = 0;

    let translateY = this.translateY;

    let movementDirection = "bottom";

    this.inertvalId = setInterval(() => {
      if (movementDirection === "bottom") {
        if (translateY >= maxTranslateY) {
          this.translateY = maxTranslateY;
          movementDirection = "top";
          return;
        }
        translateY += movementSpeed;
      } else if (movementDirection === "top") {
        if (translateY <= minTranslateY) {
          this.translateY = minTranslateY;
          movementDirection = "bottom";
          return;
        }
        translateY -= movementSpeed;
      }
      this.translateY = translateY;
      this.barPointerNode.style.transform = `translateY(${translateY}px)`;
    }, 16);
  }

  stopPointer() {
    this.inertvalId = clearInterval(this.inertvalId);
  }
}
