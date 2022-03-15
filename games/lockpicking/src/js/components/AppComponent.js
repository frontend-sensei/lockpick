import { Component } from "./Component.js";

export class App extends Component {
  constructor() {
    const options = {
      components: {},
    };
    super(options);
  }

  render(selector = "") {
    this.parentNodeSelector = selector;
    super.render();
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
