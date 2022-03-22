const audio = new Audio("../../assets/sounds/main_theme.mp3");
const audioVolume = 0.1;
audio.loop = true;
audio.autoplay = true;
audio.volume = audioVolume;

const audioMuted = JSON.parse(localStorage.getItem("isMuted")) || false;
const contoller = document.querySelector(".sound-controller");
const constraints = {
  audio: true,
};

navigator.mediaDevices.getUserMedia(constraints).then(() => {
  audio.play();
  if (!audioMuted) {
    toggleContollerState();
  }
  if (audioMuted) {
    audio.volume = 0;
  }

  contoller.addEventListener("click", () => {
    localStorage.setItem("isMuted", !!audio.volume);
    toggleContollerState();
    if (audio.volume) {
      audio.volume = 0;
      return;
    }
    audio.volume = audioVolume;
  });
});

function toggleContollerState() {
  contoller.classList.toggle("sound-controller--unmuted");
  contoller.classList.toggle("sound-controller--muted");
}
