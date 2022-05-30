import { Level } from "./Level.js";
import { getRandomInt } from "../../utils/randomInt.js";

/**
 * Creates fixed instances of the Levels with different properties
 * @class LevelBuilder
 */
export class LevelBuilder {
  constructor() {
    this.levels = [];
  }

  /**
   * Build levels
   * @public
   */
  build() {
    this.levels = [
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

    return this.levels;
  }

  buildForTimerMode() {
    const LEVELS_COUNT = 5000;
    for (let index = 1; index < LEVELS_COUNT; index++) {
      // split to functions
      this.levels.push(
        [
          index,
          new Level({
            id: index,
            steps: getRandomInt(2, 7),
            areaHeight: getRandomInt(5, 30),
          })
        ]
      )
    }
    return this.levels
  }
}
