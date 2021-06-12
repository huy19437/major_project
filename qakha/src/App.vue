<template>
  <div id="app">
    <router-view />
    <ScrollTopArrow></ScrollTopArrow>
    <!-- <ScrollUp :scroll-duration="1000" /> -->
  </div>
</template>

<script>
import ScrollUp from "vue-scroll-up";
import ScrollTopArrow from "@/components/scroll_to_top/ScrollTopArrow";
export default {
  name: "App",
  components: {
    ScrollUp,
    ScrollTopArrow,
  },
};
</script>


<style>
::-ms-reveal {
  display: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
