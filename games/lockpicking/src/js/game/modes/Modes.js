import { StandardMode } from "./Standard.js";
import { TimerMode } from "./Timer.js";
import { HardcoreMode } from "./Hardcore.js";

export const MODES_DICTIONARY = {
  STANDARD: "standard",
  TIMER: "timer",
  HARDCORE: "hardcore",
}

/**
 * Works with game modes. Create new instances relying on modes' dictionary.
 */
export class Modes {
  constructor(root) {
    this.root = root;
    this.MODES = {
      [MODES_DICTIONARY.STANDARD]: StandardMode,
      [MODES_DICTIONARY.TIMER]: TimerMode,
      [MODES_DICTIONARY.HARDCORE]: HardcoreMode
    };
  }

  /**
   * Create mode instance from existing modes dictionary
   * @public
   * @param name
   * @returns Mode instance
   */
  initMode(name) {
    if(!this.MODES[name]) {
      throw new Error(`Mode with name ${name} doesn't exist`)
    }
    return new this.MODES[name](this.root);
  }
}
