import { Observable } from "../../utils/observable.js";
import { Countdown } from "../countdown/Countdown.js";

export class StandardMode {
  constructor(root) {
    this.root = root;
    this.attempts = new Observable(3)
  }

  async start() {
    await new Countdown(this.root).start();
    this.root._listeners.register();
    this.root._timer.start();
    this.root._ui._Bar.movePointer();
    this.root._ui._Lockpick.animate();
  }
}
