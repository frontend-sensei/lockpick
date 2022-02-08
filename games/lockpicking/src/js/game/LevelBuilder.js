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
          steps: 1,
          ariaSize: 30,
        }),
      ],
      [
        2,
        new Level({
          steps: 2,
          ariaSize: 15,
        }),
      ],
      [
        3,
        new Level({
          steps: 3,
          ariaSize: 5,
        }),
      ],
    ];

    this.levels = new Map(levels);
    console.log(this.levels);
  }
}
