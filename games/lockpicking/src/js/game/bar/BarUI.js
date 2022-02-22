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
    this.movementDirection = "bottom";
  }

  getHTML() {
    const areaHeight = this.areaHeight;
    return `
          <div class="bar-body__side bar-body__side-back"></div>
          <div class="bar-body__side bar-body__side-front"></div>
          <div class="bar-body__side bar-body__side-top"></div>
          <div class="bar-body__side bar-body__side-bottom"></div>
          <div class="bar-body__side bar-body__side-left"></div>
          <div class="bar-body__side bar-body__side-right"></div>
            <div class="bar__area">
              <div class="bar-area__side bar-area__side-back">
                <div class="bar-area-extra__side bar-area-extra__side-back"></div>
              </div>
              <div class="bar-area__side bar-area__side-front">
                <div class="bar-area-extra__side bar-area-extra__side-front"></div>
              </div>
              <div class="bar-area__side bar-area__side-left">
                <div class="bar-area-extra__side bar-area-extra__side-left"></div>
              </div>
              <div class="bar-area__side bar-area__side-right">
                <div class="bar-area-extra__side bar-area-extra__side-right"></div>
              </div>
            </div>
            <div class="bar__pointer">
              <div class="bar-pointer__side bar-pointer__side-back"></div>
              <div class="bar-pointer__side bar-pointer__side-front"></div>
          
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
      this.barPointerNode.style.transform = `translateY(${this.translateY}px)`;
    }, 16);
  }

  stopPointer() {
    this.inertvalId = clearInterval(this.inertvalId);
  }
}
