/**
 * @jest-environment jsdom
 */
import { Game } from "../js/game/Game.js";

test("Game render UI", () => {
  const game = new Game();

  expect(!!document.querySelector(".game")).toBe(true);
});
