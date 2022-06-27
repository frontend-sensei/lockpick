import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";
import { GameWonPopup } from "../popups/GameWonPopup.js";
import { GameOverPopup } from "../popups/GameOverPopup.js";
import { Timer } from "../timer/Timer.js";
import { MODES_DICTIONARY } from "./Modes.js";
import { Levels } from "../level/Levels.js";
import { LevelBuilder } from "../level/LevelBuilder.js";
import { uniqueId } from "../../utils/uniqueId.js";
import { UI } from "../UI.js";

export class StandardMode {
  constructor(root) {
    this.root = root;
    this.name = MODES_DICTIONARY.STANDARD;
    this.attempts = new Observable(3);
    this._levels = new Levels(new LevelBuilder().buildForStandardMode());
    this.level = this._levels.get(this.root._progress.getStandardModeCurrentLevelId());

    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 200000,
    });

    this.PAUSE_TIMEOUT = 500
    this.score = {
      id: this.root._progress.getStandardModeCurrentLevelId(),
      time: 0,
      openedLocks: 0,
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
    this.root._listeners.remove();

    this.increaseOpenedLocks()
    this.updateTotalTime()
    this.saveProgress()

    const isLastLevel = this._levels.isLastLevel(this.root.level.id);
    if (isLastLevel) {
      new GameWonPopup().render();
      return
    }

    const nextLevel = this._levels.getNextLevel(this.level)
    this.level = nextLevel
    this.root.level = nextLevel

    this.root._progress.setStandardModeCurrentLevelId(this.level.id)

    this.resetProgress()

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

  increaseOpenedLocks() {
    this.score.openedLocks += 1
  }

  resetProgress() {
    this.score = {
      id: this.level.id,
      time: 0,
      openedLocks: 0,
    }
  }

  saveProgress() {
    this.root._progress.setStandardModeLevelScore(this.score)
  }

  updateTotalTime() {
    this.score.time = this._timer.totalTime
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
    this._timer.increase(800)
  }
}
