<template>
  <div class="home-page">
    <video
      class="video-background"
      :src="require('@/assets/video/bg.mp4')"
      loop
      muted
      autoplay
    ></video>
    <h1>Game name</h1>
    <h2>Hello player!</h2>
    <p>In this game you can try yourself as lockpicker.</p>
    <h4>How to play:</h4>
    <p>
      Just press space in the right moment. You have limited time for lock pick.
    </p>
    <p>Are you ready?</p>
    <button @click="goToGamePage">play</button>
  </div>
</template>

<script>
import useGoToRoute from "@/composables/useGoToRoute";

export default {
  name: "Home",
  setup() {
    const { goToRoute } = useGoToRoute();
    const goToGamePage = () => goToRoute("game");

    return {
      goToGamePage,
    };
  },
};
</script>

<style>
.home-page {
  color: #fff;
}
.video-background {
  z-index: -1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
