<template>
  <div class="content">
      <h1>Excalibur</h1>
      <h3>god I wish I picked an easier name to spell</h3>
  </div>
  <World></World>
</template>

<script setup>
import World from './world/World.vue'
</script>


<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.content {
  background-color: #f6f6f6;
  border-radius: 32px;
  aspect-ratio: 1;
  padding: 48px;
  text-align: center;

  width: 10%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.content h1,h3 {
  margin: 16px;
}
</style>