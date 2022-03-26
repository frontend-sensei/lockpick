import { Level } from "./Level.js";

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
}
