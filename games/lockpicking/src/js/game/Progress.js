/**
 * Creates instance that can be used to save, restore and display progress
 * @class Progress
 */
export class Progress {
  constructor() {
    this.progress = {
      level: {},
    };
    this.storageKey = "progress";
  }

  save(level) {
    this.progress.level = level;
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  restore() {
    this.progress = JSON.parse(localStorage.getItem(this.storageKey));
  }

  clearProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify({}));
  }
}
