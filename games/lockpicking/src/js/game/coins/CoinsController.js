import { Observable } from "../../utils/observable.js";
import { CoinLabel } from "./CoinLabel.js";

/**
 * @constructor
 * @param {Object} coinsData - The coins data from mode with fresh values which updates in real time.
 */
export class CoinsController {
  constructor(root) {
    this.root = root;
    this.coins = new Observable(root._progress.getCoins());
    this.coinsData = root._mode._coinSettings
  }

  updateCoins() {
    const { coinsForVictory, comboCoins } = this.coinsData
    const newValue = this.coins.value + coinsForVictory + comboCoins
    this.coins.set(newValue)
  }

  saveCoins() {
    this.root._progress.setCoins(this.coins.value);
  }

  showLabel() {
    const { coinsForVictory, comboCoins } = this.coinsData
    const coins = coinsForVictory + comboCoins
    new CoinLabel({
      content: `+ ${coins} Coins`
    }).render()
  }

  earnCoins() {
    this.updateCoins()
    this.showLabel()
    this.saveCoins()
  }
}
