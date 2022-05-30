export class Bar {
  constructor(root) {
    const MAX_SPEED = 35
    this.root = root;
    this.node = null;
    this.areaNode = null;
    this.pointerNode = null;
    this.barLength = 700;
    this.areaHeight = this.root.level.areaHeight;
    this.pointerLength = 25;
    this.translateY = 0;
    this.movementDirection = "bottom";
    this.movementSpeed = this.root.level.movementSpeed < MAX_SPEED ? this.root.level.movementSpeed : MAX_SPEED;
    this.needStop = true;
  }

  getHTML() {
    return `
    <div class="bar">
      <div class="bar-body__side bar-body__side-back"></div>
      <div class="bar-body__side bar-body__side-front"></div>
      <div class="bar-body__side bar-body__side-left"></div>
      <div class="bar-body__side bar-body__side-right"></div>
      <div class="bar-body__side bar-body__side-top"></div>
      <div class="bar-body__side bar-body__side-bottom"></div>
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
    </div>
    `;
  }

  render(selector) {
    const element = document.createElement("div");
    element.innerHTML = this.getHTML();
    element.className = "bar-wrapper";
    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`GameBarUI: selector - "${selector}" not found`);
    }

    wrapper.appendChild(element);

    this.node = document.querySelector(".bar-wrapper");
    this.areaNode = document.querySelector(".bar__area");
    this.pointerNode = document.querySelector(".bar__pointer");

    this.node.style.setProperty("--body-length", `${this.barLength}px`);
    this.node.style.setProperty("--area-length-percents", this.areaHeight);
    this.node.style.setProperty("--pointer-length", `${this.pointerLength}px`);

    this.calcHeightForTouchDevice();
  }

  calcHeightForTouchDevice() {
    if (!this.root.isMobile) {
      return;
    }

    setTimeout(() => {
      let lockpickHeight = 0;
      if (window.innerWidth < 768) {
        lockpickHeight = document.querySelector(".lockpick").clientHeight;
      }

      const barStyles = getComputedStyle(this.node.parentNode);
      const marginsY =
        +barStyles.marginTop.split("px")[0] +
        +barStyles.marginBottom.split("px")[0];

      const viewportHeight = window.innerHeight;
      const additionalOffset = 20;
      const height =
        viewportHeight - lockpickHeight - marginsY - additionalOffset;

      this.barLength = height;
      this.node.style.setProperty("--body-length", `${this.barLength}px`);
    });
  }

  movePointer() {
    this.needStop = false;
    requestAnimationFrame(() => {
      this.animatePointer(this)
    })
  }

  animatePointer(root) {
    if(root.needStop) {
      return;
    }

    const minTranslateY = 0;
    const maxTranslateY = root.barLength - root.pointerLength;
    const movementSpeed = root.movementSpeed;

    if (root.movementDirection === "bottom") {
      if (root.translateY + movementSpeed >= maxTranslateY) {
        root.translateY = maxTranslateY;
        root.movementDirection = "top";
      }
      if(root.translateY + movementSpeed <= maxTranslateY) {
        root.translateY += movementSpeed;
      }
    } else if (root.movementDirection === "top") {
      if (root.translateY - movementSpeed <= minTranslateY) {
        root.translateY = minTranslateY;
        root.movementDirection = "bottom";
      }
      if(root.translateY - movementSpeed >= minTranslateY) {
        root.translateY -= movementSpeed;
      }
    }

    root.pointerNode.style.transform = `translateY(${root.translateY}px)`;

    requestAnimationFrame(() => root.animatePointer(root));
  }

  stopPointer() {
    this.needStop = true;
  }
}
