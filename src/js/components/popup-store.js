import { Popup } from "./Popup.js";

export class PopupStore {
  constructor(progress) {
    this._progress = progress
    return new Popup({
      html: this.getHTML(),
      listeners: {
        useSteel: this.handleUse.bind(this, 'steel'),
        useSilver: this.handleUse.bind(this, 'silver'),
        useGold: this.handleUse.bind(this, 'gold'),
        buySilver: this.handleBuy.bind(this, 'silver', 1000),
        buyGold: this.handleBuy.bind(this, 'gold', 2000),
      },
    })
  }

  getHTML() {
    const { pinlocks } = this._progress.progress.inventory
    const bought = pinlocks.has
    const currentPinlock = pinlocks.current
    return `
    <h2 class="popup-headline">Store</h2>
    <div class="popup-store-content">
      <h3>Picklocks</h3>
      <div class="popup-store-picklock-row">
        <div class="popup-store-picklock-column">
            <h4>Steel</h4>
            <img src="src/assets/images/picklocks/steel.png" alt="Steel picklock">
            <p>500 coins</p>
            <button class="popup-button" disabled>Bought</button>
            <button class="popup-button" id="useSteel" ${this.isNeedDisableUseBtn(currentPinlock, 'steel')}>
              ${this.getUseButtonText(currentPinlock, 'steel')}
            </button>
        </div>
        <div class="popup-store-picklock-column">
            <h4>Silver</h4>
            <img src="src/assets/images/picklocks/silver.png" alt="Silver picklock">
            <p>1000 coins</p>
            <button class="popup-button" id="buySilver" ${this.isNeedDisableBuyBtn(bought, 'silver')}>
              ${this.getBuyButtonText(bought, 'silver')}
            </button>
            <button class="popup-button" id="useSilver" ${this.isNeedDisableUseBtn(currentPinlock, 'silver')}>
              ${this.getUseButtonText(currentPinlock, 'silver')}
            </button>
        </div>
        <div class="popup-store-picklock-column">
            <h4>Gold</h4>
            <img src="src/assets/images/picklocks/gold.png" alt="Gold picklock">
            <p>2000 coins</p>
            <button class="popup-button" id="buyGold" ${this.isNeedDisableBuyBtn(bought, 'gold')}>
              ${this.getBuyButtonText(bought, 'gold')}
            </button>
            <button class="popup-button" id="useGold" ${this.isNeedDisableUseBtn(currentPinlock, 'gold')}>
              ${this.getUseButtonText(currentPinlock, 'gold')}
            </button>
        </div>
      </div>
    </div>
    <div class="popup-buttons">
      <button class="popup-button" data-hide-btn>Ok</button>
    </div>
    `
  }

  isNeedDisableBuyBtn(bought, name) {
    return bought.includes(name) ? "disabled" : ""
  }

  getBuyButtonText(bought, name) {
    return bought.includes(name) ? 'Bought' : "Buy"
  }

  isNeedDisableUseBtn(current, name) {
    return current === name ? "disabled" : ""
  }

  getUseButtonText(current, name) {
    return current === name ? 'Using' : "Use"
  }

  handleUse(name) {
    if(!this._progress.progress.inventory.pinlocks.has.includes(name)) {
      return alert("You don't have this item")
    }
    this.unsetPrevious()
    this.setNew(name)
  }

  unsetPrevious() {
    const currentPinlock = this._progress.progress.inventory.pinlocks.current
    const btn = document.querySelector(`#use${this.capitalizeFirstLetter(currentPinlock)}`)
    btn.removeAttribute('disabled')
    btn.innerText = 'Use'
  }

  setNew(name) {
    this._progress.progress.inventory.pinlocks.current = name
    this._progress.save()
    const btn = document.querySelector(`#use${this.capitalizeFirstLetter(name)}`)
    btn.setAttribute('disabled', 'disabled')
    btn.innerText = 'Using'
  }

  handleBuy(name, cost) {
    const { coins } = this._progress.progress
    const isEnough = (Number(coins) - Number(cost)) >= 0
    if(!isEnough) {
      return alert("Coins not enough")
    }
    this._progress.progress.coins -= cost
    this._progress.progress.inventory.pinlocks.has.push(name)
    this._progress.save()
    const btn = document.querySelector(`#buy${this.capitalizeFirstLetter(name)}`)
    btn.setAttribute('disabled', 'disabled')
    btn.innerText = 'Bought'
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
