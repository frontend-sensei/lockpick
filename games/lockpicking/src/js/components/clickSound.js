const audio = new Audio("../../assets/sounds/click_sound.wav");
audio.volume = 0.1;
document.addEventListener("click", () => {
  audio.play();
});
