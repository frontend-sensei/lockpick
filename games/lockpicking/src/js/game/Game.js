import { GameUI } from "./GameUI.js";
import { GameService } from "./GameService.js";
import { GameTimer } from "./GameTimer.js";

const vendors = {
  _UIClass: GameUI,
  _TimerClass: GameTimer,
};

/**
 * Creates a new Game
 * @class Game
 */
export class Game {
  constructor(options) {
    return new GameService(options, vendors);
  }
}
