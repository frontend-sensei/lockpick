import { Level } from "./Level.js";

/**
 * Creates fixed instances of the Levels with different properties
 * @class LevelBuilder
 */
export class LevelBuilder {
  constructor() {
    this.levels = new Map();
  }

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
          steps: 3,
          areaHeight: 5,
        }),
      ],
    ];

    this.levels = new Map(levels);

    return this;
  }
}
