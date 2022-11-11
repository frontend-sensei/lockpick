export class GameSounds {
  constructor() {
    this.unlocked = new Audio("src/assets/sounds/unlock.mp3");
    this.failed = new Audio("src/assets/sounds/fail.mp3");
    this.unlocked.volume = 0.05;
    this.failed.volume = 0.05;
  }

  playFailed() {
    this.failed.play();
  }

  playUnlocked() {
    this.unlocked.play();
  }
}
