import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";
import { GameWonPopup } from "../popups/GameWonPopup.js";
import { GameOverPopup } from "../popups/GameOverPopup.js";
import { MODES_DICTIONARY } from "./Modes.js";
import { Levels } from "../level/Levels.js";
import { LevelBuilder } from "../level/LevelBuilder.js";
import { UI } from "../UI.js";
import { uniqueId } from "../../utils/uniqueId.js";
import { CoinsSettings } from "../coins/CoinsSettings.js";
import { CoinLabel } from "../coins/CoinLabel.js";

export class HardcoreMode {
  constructor(root) {
    this.DEFAULT_ATTEMPTS = 1
    this._coinSettings = new CoinsSettings({
      coinsForVictory: 1,
      comboCoins: 0
    })
    this.wonInARow = 0;

    this.root = root;
    this.name = MODES_DICTIONARY.HARDCORE;
    this.attempts = new Observable(this.DEFAULT_ATTEMPTS);
    this._levels = new Levels(new LevelBuilder().buildForHardcoreMode());
    this.level = this._levels.get(1);

    this.PAUSE_TIMEOUT = 500
    this.score = {
      id: uniqueId(),
      openedLocks: 0,
      openedPins: 0,
    }
  }

  earnCoins() {
    this.increaseEarningCoins()
    this.root._coins.earnCoins()
  }

  increaseEarningCoins() {
    this.wonInARow += 1;

    const combo_step = 5
    const isNeedApplyCombo = this.wonInARow % combo_step
    if(isNeedApplyCombo) {
      return
    }
    this._coinSettings.comboCoins += 2
    new CoinLabel({
      content: `Combo: + ${this._coinSettings.comboCoins} Coins`
    }).render()
  }

  async start() {
    await new Countdown(this.root).start();
    this.root._listeners.register();
    this.root._ui._Bar.movePointer();
    this.root._ui._Lockpick.animate();
  }

  stop() {
    this.root._listeners.remove();
    this.root._ui._Bar.stopPointer();
    this.root._ui._Lockpick.stopAnimate();
  }

  onDefeat() {
    this.root._listeners.remove();
    this.root._ui._Bar.stopPointer();
    new GameOverPopup().render();
  }

  async onWon() {
    this.root._listeners.remove();

    this.earnCoins()
    this.increaseOpenedLocks()
    this.saveProgress()

    const isLastLevel = this._levels.isLastLevel(this.root.level.id);
    if (isLastLevel) {
      new GameWonPopup().render();
      return
    }

    const nextLevel = this._levels.getNextLevel(this.level)
    this.level = nextLevel
    this.root.level = nextLevel

    await this.hideGame()
    this.rerenderGame()
    this.showGame()

    setTimeout(() => {
      this.root._listeners.register();
      this.root.continue();
    }, this.PAUSE_TIMEOUT);
  }

  async hideGame() {
    return new Promise((resolve) => {
      this.root._ui.node.classList.remove('game--hidden', 'game--rerender-showing')
      this.root._ui.node.classList.add('game--rerender-hiding')
      setTimeout(resolve, 500)
    })
  }

  showGame() {
    this.root._ui.node.classList.add('game--hidden')
    this.root._ui.node.style.setProperty('--rerender-showing-duration', '.5s')
    requestAnimationFrame(() => this.root._ui.node.classList.add('game--rerender-showing'))
  }

  rerenderGame() {
    this.root._ui.node.remove();
    this.root._ui = new UI(this.root);
    this.root.render();
    this.root.pinsUnlocked = 0;
  }

  saveProgress() {
    this.root._progress.setHardcoreModeLevelScore(this.score)
  }

  correctPositionHandler() {
    this.increaseOpenedPins()
  }

  increaseOpenedPins() {
    this.score.openedPins += 1;
  }

  increaseOpenedLocks() {
    this.score.openedLocks += 1;
  }
}
