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
        {
          "id": 1,
          "steps": 3,
          "areaHeight": 29.73,
          "pointerMovingSpeed": 5.25
        }
      ],
      [
        2,
        {
          "id": 2,
          "steps": 3,
          "areaHeight": 29.46,
          "pointerMovingSpeed": 5.5
        }
      ],
      [
        3,
        {
          "id": 3,
          "steps": 2,
          "areaHeight": 29.19,
          "pointerMovingSpeed": 5.75
        }
      ],
      [
        4,
        {
          "id": 4,
          "steps": 3,
          "areaHeight": 28.92,
          "pointerMovingSpeed": 6
        }
      ],
      [
        5,
        {
          "id": 5,
          "steps": 3,
          "areaHeight": 28.65,
          "pointerMovingSpeed": 6.25
        }
      ],
      [
        6,
        {
          "id": 6,
          "steps": 2,
          "areaHeight": 28.38,
          "pointerMovingSpeed": 6.5
        }
      ],
      [
        7,
        {
          "id": 7,
          "steps": 3,
          "areaHeight": 28.11,
          "pointerMovingSpeed": 6.75
        }
      ],
      [
        8,
        {
          "id": 8,
          "steps": 3,
          "areaHeight": 27.84,
          "pointerMovingSpeed": 7
        }
      ],
      [
        9,
        {
          "id": 9,
          "steps": 2,
          "areaHeight": 27.57,
          "pointerMovingSpeed": 7.25
        }
      ],
      [
        10,
        {
          "id": 10,
          "steps": 3,
          "areaHeight": 27.3,
          "pointerMovingSpeed": 7.5
        }
      ],
      [
        11,
        {
          "id": 11,
          "steps": 4,
          "areaHeight": 27.03,
          "pointerMovingSpeed": 7.75
        }
      ],
      [
        12,
        {
          "id": 12,
          "steps": 3,
          "areaHeight": 26.759999999999998,
          "pointerMovingSpeed": 8
        }
      ],
      [
        13,
        {
          "id": 13,
          "steps": 4,
          "areaHeight": 26.49,
          "pointerMovingSpeed": 8.25
        }
      ],
      [
        14,
        {
          "id": 14,
          "steps": 4,
          "areaHeight": 26.22,
          "pointerMovingSpeed": 8.5
        }
      ],
      [
        15,
        {
          "id": 15,
          "steps": 3,
          "areaHeight": 25.95,
          "pointerMovingSpeed": 8.75
        }
      ],
      [
        16,
        {
          "id": 16,
          "steps": 3,
          "areaHeight": 25.68,
          "pointerMovingSpeed": 9
        }
      ],
      [
        17,
        {
          "id": 17,
          "steps": 4,
          "areaHeight": 25.41,
          "pointerMovingSpeed": 9.25
        }
      ],
      [
        18,
        {
          "id": 18,
          "steps": 4,
          "areaHeight": 25.14,
          "pointerMovingSpeed": 9.5
        }
      ],
      [
        19,
        {
          "id": 19,
          "steps": 3,
          "areaHeight": 24.869999999999997,
          "pointerMovingSpeed": 9.75
        }
      ],
      [
        20,
        {
          "id": 20,
          "steps": 3,
          "areaHeight": 24.6,
          "pointerMovingSpeed": 10
        }
      ],
      [
        21,
        {
          "id": 21,
          "steps": 3,
          "areaHeight": 24.33,
          "pointerMovingSpeed": 10.25
        }
      ],
      [
        22,
        {
          "id": 22,
          "steps": 4,
          "areaHeight": 24.06,
          "pointerMovingSpeed": 10.5
        }
      ],
      [
        23,
        {
          "id": 23,
          "steps": 3,
          "areaHeight": 23.79,
          "pointerMovingSpeed": 10.75
        }
      ],
      [
        24,
        {
          "id": 24,
          "steps": 3,
          "areaHeight": 23.52,
          "pointerMovingSpeed": 11
        }
      ],
      [
        25,
        {
          "id": 25,
          "steps": 3,
          "areaHeight": 23.25,
          "pointerMovingSpeed": 11.25
        }
      ],
      [
        26,
        {
          "id": 26,
          "steps": 3,
          "areaHeight": 22.98,
          "pointerMovingSpeed": 11.5
        }
      ],
      [
        27,
        {
          "id": 27,
          "steps": 3,
          "areaHeight": 22.71,
          "pointerMovingSpeed": 11.75
        }
      ],
      [
        28,
        {
          "id": 28,
          "steps": 4,
          "areaHeight": 22.439999999999998,
          "pointerMovingSpeed": 12
        }
      ],
      [
        29,
        {
          "id": 29,
          "steps": 4,
          "areaHeight": 22.17,
          "pointerMovingSpeed": 12.25
        }
      ],
      [
        30,
        {
          "id": 30,
          "steps": 4,
          "areaHeight": 21.9,
          "pointerMovingSpeed": 12.5
        }
      ],
      [
        31,
        {
          "id": 31,
          "steps": 4,
          "areaHeight": 21.63,
          "pointerMovingSpeed": 12.75
        }
      ],
      [
        32,
        {
          "id": 32,
          "steps": 5,
          "areaHeight": 21.36,
          "pointerMovingSpeed": 13
        }
      ],
      [
        33,
        {
          "id": 33,
          "steps": 5,
          "areaHeight": 21.09,
          "pointerMovingSpeed": 13.25
        }
      ],
      [
        34,
        {
          "id": 34,
          "steps": 4,
          "areaHeight": 20.82,
          "pointerMovingSpeed": 13.5
        }
      ],
      [
        35,
        {
          "id": 35,
          "steps": 4,
          "areaHeight": 20.549999999999997,
          "pointerMovingSpeed": 13.75
        }
      ],
      [
        36,
        {
          "id": 36,
          "steps": 4,
          "areaHeight": 20.28,
          "pointerMovingSpeed": 14
        }
      ],
      [
        37,
        {
          "id": 37,
          "steps": 5,
          "areaHeight": 20.009999999999998,
          "pointerMovingSpeed": 14.25
        }
      ],
      [
        38,
        {
          "id": 38,
          "steps": 5,
          "areaHeight": 19.74,
          "pointerMovingSpeed": 14.5
        }
      ],
      [
        39,
        {
          "id": 39,
          "steps": 4,
          "areaHeight": 19.47,
          "pointerMovingSpeed": 14.75
        }
      ],
      [
        40,
        {
          "id": 40,
          "steps": 5,
          "areaHeight": 19.2,
          "pointerMovingSpeed": 15
        }
      ],
      [
        41,
        {
          "id": 41,
          "steps": 5,
          "areaHeight": 18.93,
          "pointerMovingSpeed": 15.25
        }
      ],
      [
        42,
        {
          "id": 42,
          "steps": 5,
          "areaHeight": 18.66,
          "pointerMovingSpeed": 15.5
        }
      ],
      [
        43,
        {
          "id": 43,
          "steps": 5,
          "areaHeight": 18.39,
          "pointerMovingSpeed": 15.75
        }
      ],
      [
        44,
        {
          "id": 44,
          "steps": 5,
          "areaHeight": 18.119999999999997,
          "pointerMovingSpeed": 16
        }
      ],
      [
        45,
        {
          "id": 45,
          "steps": 5,
          "areaHeight": 17.85,
          "pointerMovingSpeed": 16.25
        }
      ],
      [
        46,
        {
          "id": 46,
          "steps": 4,
          "areaHeight": 17.58,
          "pointerMovingSpeed": 16.5
        }
      ],
      [
        47,
        {
          "id": 47,
          "steps": 5,
          "areaHeight": 17.31,
          "pointerMovingSpeed": 16.75
        }
      ],
      [
        48,
        {
          "id": 48,
          "steps": 4,
          "areaHeight": 17.04,
          "pointerMovingSpeed": 17
        }
      ],
      [
        49,
        {
          "id": 49,
          "steps": 5,
          "areaHeight": 16.77,
          "pointerMovingSpeed": 17.25
        }
      ],
      [
        50,
        {
          "id": 50,
          "steps": 5,
          "areaHeight": 16.5,
          "pointerMovingSpeed": 17.5
        }
      ],
      [
        51,
        {
          "id": 51,
          "steps": 5,
          "areaHeight": 16.229999999999997,
          "pointerMovingSpeed": 17.75
        }
      ],
      [
        52,
        {
          "id": 52,
          "steps": 5,
          "areaHeight": 15.959999999999999,
          "pointerMovingSpeed": 18
        }
      ],
      [
        53,
        {
          "id": 53,
          "steps": 5,
          "areaHeight": 15.69,
          "pointerMovingSpeed": 18.25
        }
      ],
      [
        54,
        {
          "id": 54,
          "steps": 6,
          "areaHeight": 15.419999999999998,
          "pointerMovingSpeed": 18.5
        }
      ],
      [
        55,
        {
          "id": 55,
          "steps": 5,
          "areaHeight": 15.149999999999999,
          "pointerMovingSpeed": 18.75
        }
      ],
      [
        56,
        {
          "id": 56,
          "steps": 5,
          "areaHeight": 14.879999999999999,
          "pointerMovingSpeed": 19
        }
      ],
      [
        57,
        {
          "id": 57,
          "steps": 6,
          "areaHeight": 14.61,
          "pointerMovingSpeed": 19.25
        }
      ],
      [
        58,
        {
          "id": 58,
          "steps": 6,
          "areaHeight": 14.34,
          "pointerMovingSpeed": 19.5
        }
      ],
      [
        59,
        {
          "id": 59,
          "steps": 6,
          "areaHeight": 14.069999999999999,
          "pointerMovingSpeed": 19.75
        }
      ],
      [
        60,
        {
          "id": 60,
          "steps": 5,
          "areaHeight": 13.799999999999997,
          "pointerMovingSpeed": 20
        }
      ],
      [
        61,
        {
          "id": 61,
          "steps": 5,
          "areaHeight": 13.529999999999998,
          "pointerMovingSpeed": 20.25
        }
      ],
      [
        62,
        {
          "id": 62,
          "steps": 6,
          "areaHeight": 13.259999999999998,
          "pointerMovingSpeed": 20.5
        }
      ],
      [
        63,
        {
          "id": 63,
          "steps": 5,
          "areaHeight": 12.989999999999998,
          "pointerMovingSpeed": 20.75
        }
      ],
      [
        64,
        {
          "id": 64,
          "steps": 6,
          "areaHeight": 12.719999999999999,
          "pointerMovingSpeed": 21
        }
      ],
      [
        65,
        {
          "id": 65,
          "steps": 6,
          "areaHeight": 12.45,
          "pointerMovingSpeed": 21.25
        }
      ],
      [
        66,
        {
          "id": 66,
          "steps": 6,
          "areaHeight": 12.18,
          "pointerMovingSpeed": 21.5
        }
      ],
      [
        67,
        {
          "id": 67,
          "steps": 5,
          "areaHeight": 11.91,
          "pointerMovingSpeed": 21.75
        }
      ],
      [
        68,
        {
          "id": 68,
          "steps": 5,
          "areaHeight": 11.64,
          "pointerMovingSpeed": 22
        }
      ],
      [
        69,
        {
          "id": 69,
          "steps": 6,
          "areaHeight": 11.369999999999997,
          "pointerMovingSpeed": 22.25
        }
      ],
      [
        70,
        {
          "id": 70,
          "steps": 7,
          "areaHeight": 11.099999999999998,
          "pointerMovingSpeed": 22.5
        }
      ],
      [
        71,
        {
          "id": 71,
          "steps": 7,
          "areaHeight": 10.829999999999998,
          "pointerMovingSpeed": 22.75
        }
      ],
      [
        72,
        {
          "id": 72,
          "steps": 6,
          "areaHeight": 10.559999999999999,
          "pointerMovingSpeed": 23
        }
      ],
      [
        73,
        {
          "id": 73,
          "steps": 7,
          "areaHeight": 10.29,
          "pointerMovingSpeed": 23.25
        }
      ],
      [
        74,
        {
          "id": 74,
          "steps": 6,
          "areaHeight": 10.02,
          "pointerMovingSpeed": 23.5
        }
      ],
      [
        75,
        {
          "id": 75,
          "steps": 7,
          "areaHeight": 9.75,
          "pointerMovingSpeed": 23.75
        }
      ],
      [
        76,
        {
          "id": 76,
          "steps": 7,
          "areaHeight": 9.479999999999997,
          "pointerMovingSpeed": 24
        }
      ],
      [
        77,
        {
          "id": 77,
          "steps": 6,
          "areaHeight": 9.209999999999997,
          "pointerMovingSpeed": 24.25
        }
      ],
      [
        78,
        {
          "id": 78,
          "steps": 6,
          "areaHeight": 8.939999999999998,
          "pointerMovingSpeed": 24.5
        }
      ],
      [
        79,
        {
          "id": 79,
          "steps": 7,
          "areaHeight": 8.669999999999998,
          "pointerMovingSpeed": 24.75
        }
      ],
      [
        80,
        {
          "id": 80,
          "steps": 7,
          "areaHeight": 8.399999999999999,
          "pointerMovingSpeed": 25
        }
      ],
      [
        81,
        {
          "id": 81,
          "steps": 6,
          "areaHeight": 8.129999999999999,
          "pointerMovingSpeed": 25.25
        }
      ],
      [
        82,
        {
          "id": 82,
          "steps": 6,
          "areaHeight": 7.859999999999999,
          "pointerMovingSpeed": 25.5
        }
      ],
      [
        83,
        {
          "id": 83,
          "steps": 6,
          "areaHeight": 7.59,
          "pointerMovingSpeed": 25.75
        }
      ],
      [
        84,
        {
          "id": 84,
          "steps": 7,
          "areaHeight": 7.32,
          "pointerMovingSpeed": 26
        }
      ],
      [
        85,
        {
          "id": 85,
          "steps": 6,
          "areaHeight": 7.049999999999997,
          "pointerMovingSpeed": 26.25
        }
      ],
      [
        86,
        {
          "id": 86,
          "steps": 7,
          "areaHeight": 6.779999999999998,
          "pointerMovingSpeed": 26.5
        }
      ],
      [
        87,
        {
          "id": 87,
          "steps": 6,
          "areaHeight": 6.509999999999998,
          "pointerMovingSpeed": 26.75
        }
      ],
      [
        88,
        {
          "id": 88,
          "steps": 6,
          "areaHeight": 6.239999999999998,
          "pointerMovingSpeed": 27
        }
      ],
      [
        89,
        {
          "id": 89,
          "steps": 7,
          "areaHeight": 5.969999999999999,
          "pointerMovingSpeed": 27.25
        }
      ],
      [
        90,
        {
          "id": 90,
          "steps": 7,
          "areaHeight": 5.699999999999999,
          "pointerMovingSpeed": 27.5
        }
      ],
      [
        91,
        {
          "id": 91,
          "steps": 7,
          "areaHeight": 5.43,
          "pointerMovingSpeed": 27.75
        }
      ],
      [
        92,
        {
          "id": 92,
          "steps": 8,
          "areaHeight": 5.159999999999997,
          "pointerMovingSpeed": 28
        }
      ],
      [
        93,
        {
          "id": 93,
          "steps": 7,
          "areaHeight": 4.889999999999997,
          "pointerMovingSpeed": 28.25
        }
      ],
      [
        94,
        {
          "id": 94,
          "steps": 7,
          "areaHeight": 4.619999999999997,
          "pointerMovingSpeed": 28.5
        }
      ],
      [
        95,
        {
          "id": 95,
          "steps": 7,
          "areaHeight": 4.349999999999998,
          "pointerMovingSpeed": 28.75
        }
      ],
      [
        96,
        {
          "id": 96,
          "steps": 8,
          "areaHeight": 4.079999999999998,
          "pointerMovingSpeed": 29
        }
      ],
      [
        97,
        {
          "id": 97,
          "steps": 8,
          "areaHeight": 3.8099999999999987,
          "pointerMovingSpeed": 29.25
        }
      ],
      [
        98,
        {
          "id": 98,
          "steps": 8,
          "areaHeight": 3.539999999999999,
          "pointerMovingSpeed": 29.5
        }
      ],
      [
        99,
        {
          "id": 99,
          "steps": 8,
          "areaHeight": 3.2699999999999996,
          "pointerMovingSpeed": 29.75
        }
      ],
      [
        100,
        {
          "id": 100,
          "steps": 8,
          "areaHeight": 3,
          "pointerMovingSpeed": 30
        }
      ]
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

  buildForHardcoreMode() {
    const LEVELS_COUNT = 1000;
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
