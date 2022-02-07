import { Game } from "../js/game/Game.js";

test("Game add listeners on start", () => {
  const game = new Game();
  jest.spyOn(game, "addListeners");

  game.start();

  expect(game.addListeners).toHaveBeenCalled();
});

test("Game remove listeners on stop", () => {
  const game = new Game();
  jest.spyOn(game, "removeListeners");

  game.stop();

  expect(game.removeListeners).toHaveBeenCalled();
});
