import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";
import { GameOverPopup } from "../popups/GameOverPopup.js";
import { Timer } from "../timer/Timer.js";
import { Levels } from "../level/Levels.js";
import { LevelBuilder } from "../level/LevelBuilder.js";
import { UI } from "../UI.js";
import { uniqueId } from "../../utils/uniqueId.js";
import { MODES_DICTIONARY } from "./Modes.js";

export class TimerMode {
  constructor(root) {
    this.root = root;
    this.name = MODES_DICTIONARY.TIMER;
    this.attempts = new Observable(10000);
    this._levels = new Levels(new LevelBuilder().buildForTimerMode());
    this.level = this._levels.get(1);
    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 10000,
    }).render(".game-page");
    this.PAUSE_TIMEOUT = 500
    this.score = {
      id: uniqueId(),
      time: 0,
      openedLocks: 0,
      openedPins: 0,
    }
  }

  async start() {
    await new Countdown(this.root).start();
    this._timer.start();
    this.root._listeners.register();
    this.root._ui._Bar.movePointer();
    this.root._ui._Lockpick.animate();
  }

  stop() {
    this._timer.stop();
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
    // Need remove listeners immediately
    this.root._listeners.remove();

    this.increaseOpenedLocks();
    this.saveProgress()

    this.root.level = this._levels.get(this.root.level.id + 1)
    await this.hideGame()
    this.rerenderGame()
    this.showGame()

    setTimeout(() => {
      this.root._listeners.register();
      this.root.continue();
    }, this.PAUSE_TIMEOUT);
  }

  increaseOpenedPins() {
    this.score.openedPins += 1
  }

  increaseOpenedLocks() {
    this.score.openedLocks += 1
  }

  saveProgress() {
    this.root._progress.setTimerModeScore(this.score)
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

  continue() {
    this._timer.start();
  }

  isNeedReturn() {
    return this._timer.finished
  }

  beforePositionChecking() {
    this._timer.pause();
  }

  correctPositionHandler() {
    // Need save score
    this._timer.increase(1500)
    this.increaseOpenedPins()
  }
}
