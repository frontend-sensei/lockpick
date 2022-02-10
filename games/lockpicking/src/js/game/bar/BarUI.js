/**
 * Creates a new BarUI
 * @class BarUI
 */
export class BarUI {
  constructor(root) {
    this.root = root;
    console.log(this.root);
    this.inertvalId = null;
    this.areaHeight = this.root.level.areaHeight;
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
  }

  movePointer() {
    const barPointer = document.querySelector(".bar__pointer");
    const barHeight = 100;
    const barPointerHeight = 10;
    const maxTranslateY = barHeight - barPointerHeight;
    const minTranslateY = 0;

    let translateY = 0;

    let movementDirection = "bottom";

    this.inertvalId = setInterval(() => {
      if (movementDirection === "bottom") {
        if (translateY >= maxTranslateY) {
          this.translateY = maxTranslateY;
          movementDirection = "top";
          return;
        }
        translateY += 10;
      } else if (movementDirection === "top") {
        if (translateY <= minTranslateY) {
          this.translateY = minTranslateY;
          movementDirection = "bottom";
          return;
        }
        translateY -= 10;
      }
      barPointer.style.transform = `translateY(${translateY}px)`;
    }, 20);
  }

  stopPointer() {
    this.inertvalId = clearInterval(this.inertvalId);
  }
}
