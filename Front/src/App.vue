<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Main/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Main from './components/Main.vue';

export default defineComponent({
  name: 'App',
  components: {
    Main
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  height: 100%;
  // background: #f0f0f0;
  // margin-top: 60px;
}
// body {
//   margin: 0;
//   height: 100%;
// }
</style>
