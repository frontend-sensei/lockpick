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
          areaSize: 30,
        }),
      ],
      [
        2,
        new Level({
          id: 2,
          steps: 2,
          areaSize: 15,
        }),
      ],
      [
        3,
        new Level({
          id: 3,
          steps: 3,
          areaSize: 5,
        }),
      ],
    ];

    this.levels = new Map(levels);
    console.log(this.levels);

    return this;
  }
}
