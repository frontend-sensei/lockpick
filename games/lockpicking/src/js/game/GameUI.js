export class GameUI {
  constructor() {}

  render() {
    const element = document.createElement("div");
    element.innerHTML = `<div class="game"></div>`;
    document.body.appendChild(element);
  }
}
