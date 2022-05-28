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
   * @public
   */
  save(level) {
    const levelId = level.data.id;

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
