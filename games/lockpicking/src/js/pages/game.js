import { Game } from "../game/Game.js";
import { NavigationLayer } from "../components/NavigationLayer.js";

const navigationLayer = new NavigationLayer();
navigationLayer.render();

const game = new Game();
game.start();
