const audio = new Audio("../../assets/sounds/main_theme.mp3");
audio.loop = true;
audio.autoplay = true;
audio.volume = 0.1;

const constraints = {
  audio: true,
};

navigator.mediaDevices.getUserMedia(constraints).then(() => {
  audio.play();
});
