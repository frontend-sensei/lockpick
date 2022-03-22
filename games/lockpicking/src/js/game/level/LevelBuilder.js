import { Level } from "./Level.js";

/**
 * Creates fixed instances of the Levels with different properties
 * @class LevelBuilder
 */
export class LevelBuilder {
  constructor() {
    this.levels = new Map();
  }

  /**
   * Build levels
   * @public
   */
  build() {
    const levels = [
      [
        1,
        new Level({
          id: 1,
          steps: 1,
          areaHeight: 30,
        }),
      ],
      [
        2,
        new Level({
          id: 2,
          steps: 2,
          areaHeight: 15,
        }),
      ],
      [
        3,
        new Level({
          id: 3,
          steps: 7,
          areaHeight: 5,
        }),
      ],
    ];

    this.levels = new Map(levels);

    return this;
  }

  /**
   * @public
   * @param {number} levelId
   * @returns {boolean} Whether has next level
   */
  isLastLevel(levelId) {
    const possibleNextLevelId = levelId + 1;
    const hasNextLevel = this.levels.has(possibleNextLevelId);
    return !hasNextLevel;
  }
}
