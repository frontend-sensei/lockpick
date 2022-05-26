import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";
import { GameWonPopup } from "../popups/GameWonPopup.js";
import { GameOverPopup } from "../popups/GameOverPopup.js";
import { Timer } from "../timer/Timer.js";

export class TimerMode {
  constructor(root) {
    this.root = root;
    this.attempts = new Observable(3);
    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 2000,
    });
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

  onWon() {
    this.root._listeners.remove();

    const isLastLevel = this.root._levels.isLastLevel(this.root.level.id);
    const levelToSave = {
      data: this.root.level,
    };
    if (isLastLevel) {
      levelToSave.isLastLevel = true;
    }
    this.root._progress.save(levelToSave);

    new GameWonPopup().render();
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
}
