export class CoinLabel {
  constructor(options) {
    this.content = options.content || ""
  }

  render(selector = ".notifications-row") {
    const element = document.createElement("div");
    element.className = "coin-label"
    element.innerHTML = this.content

    const wrapper = document.querySelector(selector);
    if (!wrapper) {
      throw new Error(`CoinLabel: selector - "${selector}" not found`);
    }

    wrapper.prepend(element);
    const node = wrapper.querySelector(".coin-label")
    setTimeout(() => node.remove(), 2000)
  }
}
