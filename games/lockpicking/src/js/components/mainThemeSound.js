const contoller = document.querySelector(".sound-controller");
const audio = new Audio("../../assets/sounds/main_theme.mp3");
const audioVolume = 0.1;
audio.loop = true;
audio.autoplay = true;
audio.volume = audioVolume;

const constraints = {
  audio: true,
};

navigator.mediaDevices.getUserMedia(constraints).then(() => {
  audio.play();
  contoller.classList.toggle("sound-controller--unmuted");
  contoller.classList.toggle("sound-controller--muted");
  contoller.addEventListener("click", () => {
    contoller.classList.toggle("sound-controller--unmuted");
    contoller.classList.toggle("sound-controller--muted");
    if (audio.volume) {
      audio.volume = 0;
      return;
    }
    audio.volume = audioVolume;
  });
});
