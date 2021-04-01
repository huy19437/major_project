<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Header />
    <!-- <Content /> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Content from "@/components/homepage/Content";

export default {
  name: "Home",
  components: {
    Header,
    Content,
    Footer,
  },
};
</script>
