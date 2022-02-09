/**
 * Creates a new GameBarUI
 * @class GameBarUI
 */
export class GameBarUI {
  constructor(root) {
    this.root = root;
    this.inertvalId = null;
    this.areaHeight = this.root.level.areaSize;
  }

  getHTML() {
    const areaHeight = this.areaHeight;
    return `
        <div class="bar__body">
          <div class="bar-body__side bar-body__side-bottom"></div>
          <div class="bar-body__side bar-body__side-top"></div>
          <div class="bar-body__side bar-body__side-front"></div>
          <div class="bar-body__side bar-body__side-back"></div>
          <div class="bar-body__side bar-body__side-left"></div>
          <div class="bar-body__side bar-body__side-right"></div>
        </div>
        <div class="bar__area">
          <div class="bar-area__side bar-area__side-bottom"></div>
          <div class="bar-area__side bar-area__side-top"></div>
          <div class="bar-area__side bar-area__side-front"></div>
          <div class="bar-area__side bar-area__side-back"></div>
          <div class="bar-area__side bar-area__side-left"></div>
          <div class="bar-area__side bar-area__side-right"></div>
        </div>
        <div class="bar__pointer">
          <div class="bar-pointer__side bar-pointer__side-bottom"></div>
          <div class="bar-pointer__side bar-pointer__side-top"></div>
          
          <div class="bar-pointer__side bar-pointer__side-left"></div>
          <div class="bar-pointer__side bar-pointer__side-right"></div>
        </div>

      
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
