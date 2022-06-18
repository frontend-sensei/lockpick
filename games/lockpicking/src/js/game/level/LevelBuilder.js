import { Level } from "./Level.js";
import { getRandomInt } from "../../utils/randomInt.js";
import { LEVEL } from "./options.js";

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
  buildForStandardMode() {
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
    const LEVELS_COUNT = 100;
    const MAX_AREA_HEIGHT = 10;
    const MAX_SPEED = 30;
    const MIN_SPEED = 5;
    const { MIN_STEPS, MAX_STEPS, MIN_AREA_HEIGHT } = LEVEL

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

      const getSpeed = () => {
        const stepValue = ((MAX_SPEED - MIN_SPEED) / LEVELS_COUNT) * index
        return MIN_SPEED + stepValue
      }

      this.levels.push(
        [
          index,
          new Level({
            id: index,
            steps: getSteps(),
            areaHeight: getAreaHeight(),
            pointerMovingSpeed: getSpeed()
          })
        ]
      )
    }
    return this.levels
  }
}
