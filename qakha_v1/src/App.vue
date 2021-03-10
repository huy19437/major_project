<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  // mounted() {
  //   const plugin = document.createElement("script");
  //   plugin.setAttribute("src", "./src/assets/asset_item/js/scrollup.js");
  //   plugin.async = true;
  //   document.head.appendChild(plugin);
  // },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
  line-height: 1.6rem;
  box-sizing: border-box;
}
</style>
