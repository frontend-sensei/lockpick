import { MODES_DICTIONARY } from "../modes/Modes.js";

/**
 * Creates Progress that can be used to save, restore and display progress
 * @class Progress
 */
export class Progress {
  constructor() {
    this.progress = {
      mode: MODES_DICTIONARY.TIMER,
      completedLevels: {},
      nextLevel: {
        id: 1,
      },
    };
    this.storageKey = "progress";
  }

  /**
   * @public
   */
  save(level) {
    const levelId = level.data.id;
    this.progress.completedLevels[levelId] = level.data;

    this.progress.nextLevel.id = level.isLastLevel ? levelId : levelId + 1;

    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));

    return this;
  }

  /**
   * @public
   */
  restore() {
    const result = JSON.parse(localStorage.getItem(this.storageKey)) || {};
    if (Object.keys(result).length !== 0) {
      this.progress = result;
    }

    return this;
  }

  /**
   * @public
   */
  clear() {
    localStorage.setItem(this.storageKey, JSON.stringify({}));

    return this;
  }

  /**
   * @public
   * @return current game mode name
   */
  getCurrentMode() {
    return this.progress.mode
  }
}
