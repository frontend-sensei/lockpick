import { GameUI } from "./GameUI.js";
import { GameService } from "./GameService.js";

const vendors = {
  _uiClass: GameUI,
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
