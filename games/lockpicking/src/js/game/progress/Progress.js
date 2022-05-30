import { MODES_DICTIONARY } from "../modes/Modes.js";

/**
 * Creates Progress that can be used to save, restore and display progress
 * @class Progress
 */
export class Progress {
  constructor() {
    this.progress = {
      mode: MODES_DICTIONARY.TIMER,
      scores: {
        modes: {
          [MODES_DICTIONARY.STANDARD]: {
            currentLevelId: 1,
            levels: {
              1: {
                time: 3000
              },
            }
          },
          [MODES_DICTIONARY.TIMER]: {
            scores: {},
            total: {},
          },
          [MODES_DICTIONARY.HARDCORE]: {
            records: {
              1: {
                time: 17394,
                openedLocks: 6,
                openedPins: 27,
              }
            },
            total: {
              time: 17394,
              openedLocks: 6,
              openedPins: 27,
            }
          }
        }
      },
      coins: 150,
      inventory: {
        "item.id": {
          name: "itemName"
        }
      }
    };
    this.storageKey = "progress";
  }

  /**
   * Saves all progress to the LocalStorage
   * @public
   */
  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    return this;
  }

  /**
   * Populate data from LocalStorage to the internal state
   * @public
   */
  restore() {
    try {
      const result = JSON.parse(localStorage.getItem(this.storageKey)) || {};
      if (Object.keys(result).length !== 0) {
        this.progress = result;
      }
    } catch (err) {
      console.error("progress restore failed", err)
    }

    return this;
  }

  /**
   * Delete all progress from the LocalStorage
   * @public
   */
  clear() {
    localStorage.setItem(this.storageKey, JSON.stringify({}));
    return this;
  }

  getCurrentMode() {
    return this.progress.mode
  }
  setCurrentMode(mode) {
    if(!MODES_DICTIONARY[mode]) {
      console.error(`Mode "${mode} not found!"`)
      return this
    }
    this.progress.mode = mode
    this.save()
    return this
  }

  getStandardMode() {
    return this.progress.scores.modes[MODES_DICTIONARY.STANDARD]
  }
  getStandardModeCurrentLevelId() {
    return this.getStandardMode().currentLevelId
  }
  setStandardModeCurrentLevelId(id) {
    this.getStandardMode().currentLevelId = id
    this.save()
    return this
  }
  getStandardModeLevels() {
    return this.getStandardMode().levels
  }
  getStandardModeLevel(id) {
    const level = this.getStandardMode().levels[id]
    if(!level) {
      console.error(`Level with id ${id} not found!`)
      return
    }
    return level
  }
  setStandardModeLevel(id, level) {
    this.getStandardMode().levels[id] = level
    this.save()
    return this
  }

  getTimerMode() {
    return this.progress.scores.modes[MODES_DICTIONARY.TIMER]
  }
  getTimerModeScore(id) {
    const score = this.getTimerMode().scores[id]
    if(!score) {
      return
    }
    return score
  }
  setTimerModeScore(score) {
    this.getTimerMode().scores[score.id] = score
    this.save()
    return this
  }
}
