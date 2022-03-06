import { uniqueId } from "../../utils/uniqueId.js";

export class Lockpick {
  constructor() {
    this.node = null;
  }

  getHTML() {
    return `
    <div class="lockpick__row">
      <div class="lockpick__col"></div>
      <div class="lockpick__col lockpick__pin-col">
        <div class="lockpick__pins">
          <div class="lockpick__pin lockpick__locking-pin"></div>
          <div class="lockpick__pin lockpick__code-pin"></div>
        </div>
      </div>
      <div class="lockpick__col"></div>
      <div class="lockpick__col lockpick__pin-col"></div>
      <div class="lockpick__col"></div>
      <div class="lockpick__col lockpick__pin-col"></div>
      <div class="lockpick__col"></div>
    </div>
    <div class="lockpick__keyhole">
      <img class="lockpick__picklock" src="./assets/images/Picklock.png">
    </div>
    `;
  }

  render(selector = ".bar-row") {
    const el = document.createElement("div");
    el.className = "lockpick";
    el.id = uniqueId();
    el.innerHTML = this.getHTML();
    // el.style.setProperty("--pins-count", 3);

    const previousNode = document.querySelector(selector);
    if (!previousNode) {
      throw new Error(`Selector - "${selector}" not found`);
    }
    previousNode.after(el);

    this.node = document.getElementById(el.id);

    return this;
  }
}
