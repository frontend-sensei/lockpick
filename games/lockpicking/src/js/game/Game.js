import { GameUI } from "./GameUI";
import { GameService } from "./GameService";

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
