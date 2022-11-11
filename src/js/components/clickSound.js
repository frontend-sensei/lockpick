const audio = new Audio("src/assets/sounds/click.mp3");
audio.volume = 0.1;
document.addEventListener("click", () => {
  audio.play();
});
