import { Component } from "./Component.js";
import { TestComponent1 } from "./test-component-1.js";

export class App extends Component {
  constructor() {
    const options = {
      components: {
        "test-component-1": TestComponent1,
      },
    };
    super(options);
  }

  render(selector = "") {
    this.findParentNode(selector);
    super.render();
  }

  findParentNode(selector) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) {
      throw new Error(`Parent node with selector ${selector} is not found`);
    }
    this.parentNode = parentNode;
  }

  html() {
    return `
    <div>
      <div>Self</div>
      <!-- test-component-1 -->
      <!-- test-component-2 -->
    </div>
    `;
  }
}
