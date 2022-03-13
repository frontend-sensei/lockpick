const audio = new Audio("../../assets/sounds/click_sound.wav");
document.addEventListener("click", () => {
  audio.play();
});
