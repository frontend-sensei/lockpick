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
    const LEVELS_COUNT = 10;

    // Need to create separate object with all constant values to sharing it between other objects
    const MIN_STEPS = 2
    const MAX_STEPS = 7
    const MAX_AREA_HEIGHT = 30
    const MIN_AREA_HEIGHT = 3

    for (let index = 1; index < LEVELS_COUNT; index++) {
      const getSteps = () => {
        const stepValue = ((MAX_STEPS - MIN_STEPS) / LEVELS_COUNT) * index
        const NEXT_AFTER_MIN_STEP = MIN_STEPS + 1
        const minSteps = Math.round(MIN_STEPS + stepValue)
        const maxSteps = Math.round(NEXT_AFTER_MIN_STEP + stepValue)
        return getRandomInt(minSteps, maxSteps)
      }

      const getAreaHeight = () => {
        const stepValue = ((MAX_AREA_HEIGHT - MIN_AREA_HEIGHT) / LEVELS_COUNT) * index
        return MAX_AREA_HEIGHT - stepValue
      }

      // split to functions
      this.levels.push(
        [
          index,
          new Level({
            id: index,
            steps: getSteps(),
            areaHeight: getAreaHeight(),
            pointerMovingSpeed: getRandomInt(5, 30)
          })
        ]
      )
    }
    return this.levels
  }
}
