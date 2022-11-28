<template>
  <div class="main">
    <World></World>
  </div>
  <Footer/>
</template>

<script setup>
import World from './components/World.vue';
import Footer from './components/Footer.vue';
</script>

<style>
body {
  margin: 0;
  font-family: var(--font-family);
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  flex-grow: 1;
  padding: 0.5em;
}
</style>