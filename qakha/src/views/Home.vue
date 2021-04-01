<template>
  <div class="home">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>
