import { Game } from "../game/Game.js";
import { NavigationLayer } from "../components/NavigationLayer.js";
import { detectAppHeight } from "../utils/detectAppHeight.js";

detectAppHeight();

const navigationLayer = new NavigationLayer();
navigationLayer.render();

const game = new Game();
game.start();
