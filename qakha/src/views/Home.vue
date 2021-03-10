<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Header />
    <Content />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from "@/components/homepage/header/Header";
import Content from "@/components/homepage/content/Content";

export default {
  name: "Home",
  components: {
    Header,
    Content,
  },
};
</script>
