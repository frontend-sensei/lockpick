/**
 * Creates a new GameBarUI
 * @class GameBarUI
 */
export class GameBarUI {
  constructor() {
    this.inertvalId = null;
  }

  getHTML() {
    return `
      <div class="bar__area"></div>
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
          movementDirection = "top";
          return;
        }
        translateY += 15;
      } else if (movementDirection === "top") {
        if (translateY <= minTranslateY) {
          movementDirection = "bottom";
        }
        translateY -= 15;
      }
      barPointer.style.transform = `translateY(${translateY}px)`;
    }, 20);
  }

  stopPointer() {
    this.inertvalId = clearInterval(this.inertvalId);
  }
}
