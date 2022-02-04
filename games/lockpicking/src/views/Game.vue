<template>
  <div class="game-page">
    <LockPicking />
  </div>
</template>

<script>
import LockPicking from "@/components/LockPicking";

export default {
  components: { LockPicking },
  setup() {},
};
</script>

<style>
.game-page {
  min-height: 100vh;
  background-color: #121d2b;
}
</style>
