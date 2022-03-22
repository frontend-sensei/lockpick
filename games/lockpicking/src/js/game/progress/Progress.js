/**
 * Creates Progress that can be used to save, restore and display progress
 * @class Progress
 */
export class Progress {
  constructor() {
    this.progress = {
      completedLevels: {},
      nextLevel: {
        id: 1,
      },
      gameCompleted: false,
    };
    this.storageKey = "progress";
  }

  /**
   * @public
   */
  save(level) {
    const levelId = level.data.id;
    this.progress.completedLevels[levelId] = level.data;

    const nextLevelId = level.isLastLevel ? levelId : levelId + 1;
    this.progress.nextLevel.id = nextLevelId;

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
}
