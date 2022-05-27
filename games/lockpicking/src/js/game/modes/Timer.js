import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";
import { GameOverPopup } from "../popups/GameOverPopup.js";
import { Timer } from "../timer/Timer.js";
import { Levels } from "../level/Levels.js";
import { LevelBuilder } from "../level/LevelBuilder.js";
import { UI } from "../UI.js";

export class TimerMode {
  constructor(root) {
    this.root = root;
    this.attempts = new Observable(3);
    this._levels = new Levels(new LevelBuilder().buildForTimerMode());
    this._timer = new Timer({
      onStopCallback: this.onDefeat.bind(this),
      timer: 10000,
    }).render(".game-page");
    this.PAUSE_TIMEOUT = 1000
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
    this.root.level = this._levels.get(this.root.level.id + 1)

    // rerender
    this.root._listeners.remove();
    this.root._ui.node.remove();
    this.root._ui = new UI(this.root);
    this.root.render();

    this.root.pinsUnlocked = 0;

    setTimeout(() => {
      this._timer.start();
      this.root._listeners.register();
      this.root._ui._Bar.movePointer();
      this.root._ui._Lockpick.animate();
    }, this.PAUSE_TIMEOUT);
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
  }
}
