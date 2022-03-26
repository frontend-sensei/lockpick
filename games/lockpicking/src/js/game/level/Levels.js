/**
 * Creates Levels class
 * @class Levels
 */
export class Levels {
  constructor(levels = []) {
    this.levels = new Map(levels);
  }

  /**
   * Returns level by id
   * @param {number} id
   * @returns {object} Level
   * @public
   */
  get(levelId) {
    return this.levels.get(levelId);
  }

  /**
   * @public
   * @param {number} levelId
   * @returns {boolean} Whether has next level
   */
  isLastLevel(levelId) {
    const nextLevelId = levelId + 1;
    const hasNextLevel = this.levels.has(nextLevelId);
    return !hasNextLevel;
  }
}
