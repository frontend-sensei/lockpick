import { StandardMode } from "./Standard.js";
import { TimerMode } from "./Timer.js";

export const MODES_DICTIONARY = {
  STANDARD: "standard",
  TIMER: "timer",
}

/**
 * Works with game modes. Create new instances relying on modes' dictionary.
 */
export class Modes {
  constructor(root) {
    this.root = root;
    this.MODES = {
      [MODES_DICTIONARY.STANDARD]: StandardMode,
      [MODES_DICTIONARY.TIMER]: TimerMode
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