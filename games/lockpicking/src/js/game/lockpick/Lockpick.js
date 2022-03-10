import { uniqueId } from "../../utils/uniqueId.js";
import { getRandomInt } from "../../utils/randomInt.js";

export class Lockpick {
  constructor() {
    this.node = null;
    this.pinHeight = 0;
    this.currentPin = 1;
    this.currentPinNode = null;
    this.keyHoleNode = null;
    this.currentTranslateY = null;
    this.MIN_TRANSLATE_Y = 5;
  }

  render(selector = ".bar-row") {
    const el = document.createElement("div");
    el.className = "lockpick";
    el.id = uniqueId();
    el.innerHTML = this.getHTML();

    const previousNode = document.querySelector(selector);
    if (!previousNode) {
      throw new Error(`Selector - "${selector}" not found`);
    }
    previousNode.after(el);

    this.node = document.getElementById(el.id);

    this.pinHeight = this.getPinHeight();

    this.keyHoleNode = document.querySelector(".lockpick__keyhole");

    this.setRandomTranslateY();
    this.setPicklockAngle();

    const pinNode = document.querySelector(".lockpick__pin");
    const lockpickNode = document.querySelector(".lockpick");
    lockpickNode.style.setProperty("--pin-height", `${pinNode.clientHeight}px`);

    this.animate();

    return this;
  }

  getHTML() {
    return `
    <div class="lockpick__row">
      <div class="lockpick__col"></div>
      ${this.renderPinColumns(3)}
    </div>
    <div class="lockpick__keyhole" style="--current-translateY:25px">
      <img class="lockpick__picklock" src="./assets/images/Picklock.png">
    </div>
    `;
  }

  renderPinColumns(count) {
    let HTML = "";
    for (var i = 0; i < count; i++) HTML += this.getPinColumnsHTML();
    return HTML;
  }

  getPinColumnsHTML() {
    return `
    <div class="lockpick__col lockpick__pin-col">
      <div class="lockpick__pins">
        <div class="lockpick__pin lockpick__locking-pin"></div>
        <div class="lockpick__pin lockpick__code-pin"></div>
      </div>
    </div>
    <div class="lockpick__col"></div>
    `;
  }

  setRandomTranslateY() {
    const nodes = document.querySelectorAll(".lockpick__pin-col");
    [...nodes].forEach((node) =>
      node.style.setProperty("--translateY", `${this.getRandomTranslateY()}px`)
    );

    this.currentTranslateY = getComputedStyle(nodes[nodes.length - 1])
      .getPropertyValue("--translateY")
      .split("px")[0];
    this.keyHoleNode.style.setProperty(
      "--current-translateY",
      `${this.currentTranslateY}px`
    );
  }

  setPicklockAngle() {
    setTimeout(() => {
      const picklockNode = document.querySelector(".lockpick__picklock");
      const heightSlideOut =
        getComputedStyle(picklockNode).getPropertyValue("top").split("px")[0] -
        (this.pinHeight -
          this.currentTranslateY -
          this.currentTranslateY -
          this.currentTranslateY -
          picklockNode.clientHeight);
      const angleSlideOut = (picklockNode.clientWidth / heightSlideOut) * -1;
      this.keyHoleNode.style.setProperty(
        "--angle-slide-out",
        `${angleSlideOut}deg`
      );

      const heightSlideIn =
        getComputedStyle(picklockNode).getPropertyValue("top").split("px")[0] -
        this.pinHeight +
        20;
      const angleSlideIn = (picklockNode.clientWidth / heightSlideIn) * -1;
      this.keyHoleNode.style.setProperty(
        "--angle-slide-in",
        `${angleSlideIn}deg`
      );
    }, 100);
  }

  getRandomTranslateY() {
    return getRandomInt(this.MIN_TRANSLATE_Y + 5, this.pinHeight);
  }

  getPinHeight() {
    const BORDER_RADIUS_HEIGHT = 3;
    const pinNode = document.querySelector(".lockpick__pin");
    if (!pinNode) {
      throw new Error("Pin node not found");
    }
    return pinNode.clientHeight;
  }

  animate() {
    const pinNodes = document.querySelectorAll(".lockpick__pin-col");
    this.currentPinNode = pinNodes[pinNodes.length - this.currentPin];
    this.currentPinNode.classList.add("animate");
  }

  stopAnimate() {
    this.currentPinNode.classList.remove("animate");
  }
}
