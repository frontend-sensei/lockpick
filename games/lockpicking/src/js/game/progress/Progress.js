/**
 * Creates instance that can be used to save, restore and display progress
 * @class Progress
 */
export class Progress {
  constructor() {
    this.progress = {
      level: {
        id: 1,
      },
    };
    this.storageKey = "progress";
  }

  save(level) {
    this.progress.level = level;
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));

    return this;
  }

  restore() {
    const result = JSON.parse(localStorage.getItem(this.storageKey));
    if (result) {
      this.progress = result;
    }

    return this;
  }

  clearProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify({}));

    return this;
  }
}
