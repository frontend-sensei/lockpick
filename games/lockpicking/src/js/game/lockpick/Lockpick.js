import { uniqueId } from "../../utils/uniqueId.js";
import { getRandomInt } from "../../utils/randomInt.js";

export class Lockpick {
  constructor(steps) {
    this.node = null;
    this.steps = steps;
    this.pinHeight = 0;
    this.currentPin = 1;
    this.keyHoleNode = null;
    this.currentPinNode = null;
    this.currentTranslateY = null;
    this.MIN_TRANSLATE_Y = 18;
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
    this.node.style.setProperty("--pin-height", `${this.pinHeight}px`);

    this.keyHoleNode = document.querySelector(".lockpick__keyhole");

    this.setRandomTranslateY();
    this.setPicklockAngle();
    this.setCurrentPin();

    return this;
  }

  getColHTML() {
    return `
    <div class="lockpick__col lockpick__rivet-col">
      <div class="lockpick__rivet lockpick__rivet--big"></div>
      <div class="lockpick__rivet lockpick__rivet--small"></div>
    </div>
    `;
  }

  getHTML() {
    return `
    <div class="lockpick__row">
      ${this.getColHTML()}
      ${this.renderPinColumns(this.steps)}
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
    ${this.getColHTML()}
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
      this.picklockNode = document.querySelector(".lockpick__picklock");
      const heightSlideOut =
        getComputedStyle(this.picklockNode)
          .getPropertyValue("top")
          .split("px")[0] -
        (this.pinHeight -
          this.currentTranslateY -
          this.currentTranslateY -
          this.currentTranslateY -
          this.picklockNode.clientHeight);
      const angleSlideOut =
        (this.picklockNode.clientWidth / heightSlideOut) * -1;
      this.keyHoleNode.style.setProperty(
        "--angle-slide-out",
        `${angleSlideOut}deg`
      );

      const heightSlideIn =
        getComputedStyle(this.picklockNode)
          .getPropertyValue("top")
          .split("px")[0] -
        this.pinHeight +
        20;
      const angleSlideIn = (this.picklockNode.clientWidth / heightSlideIn) * -1;
      this.keyHoleNode.style.setProperty(
        "--angle-slide-in",
        `${angleSlideIn}deg`
      );
    }, 100);
  }

  getRandomTranslateY() {
    return getRandomInt(this.MIN_TRANSLATE_Y, this.pinHeight - 5);
  }

  getPinHeight() {
    this.pinNode = document.querySelector(".lockpick__pin");
    if (!this.pinNode) {
      throw new Error("Pin node not found");
    }
    return this.pinNode.clientHeight;
  }

  increaseCurrentPin() {
    this.currentPin++;
    this.setCurrentPin();
  }

  setCurrentPin() {
    this.node.style.setProperty("--current-pin", this.currentPin);
  }

  animate() {
    const pinNodes = document.querySelectorAll(".lockpick__pin-col");
    this.currentPinNode = pinNodes[pinNodes.length - this.currentPin];
    this.currentPinNode.classList.add("animate");
    this.picklockNode.classList.add("animate");
  }

  setUnlocked() {
    this.currentPinNode.classList.add("unlocked");
  }

  stopAnimate() {
    if (this.currentPin !== this.steps) {
      this.increaseCurrentPin();
    }
    this.setUnlocked();
    this.currentPinNode.classList.remove("animate");
    this.picklockNode.classList.remove("animate");
  }
}
