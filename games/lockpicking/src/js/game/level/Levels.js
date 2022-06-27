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
  get(id) {
    return this.levels.get(id);
  }

  /**
   * Returns next level by id
   * @param currentLevel
   * @return {unknown}
   */
  getNextLevel(currentLevel) {
    return this.levels.get(currentLevel.id + 1)
  }

  /**
   * @public
   * @param {number} levelId
   * @returns {boolean} Whether has next level
   */
  // TODO: Change argument to level object instead of passing levelId
  isLastLevel(levelId) {
    const nextLevelId = levelId + 1;
    const hasNextLevel = this.levels.has(nextLevelId);
    return !hasNextLevel;
  }
}
