<template>
  <div>
    <!-- <MainContent />
    <Carousel />
    <ShopService />
    <NewLetter /> -->
    <router-view />
  </div>
</template>

<script>
// import Carousel from "@/components/homepage/content/carousel/Carousel";
// import ShopService from "@/components/homepage/content/shopService/ShopService";
// import NewLetter from "@/components/homepage/content/newLetter/NewLetter";
import MainContent from "@/components/homepage/content/MainContent";
export default {
  components: {
    // Carousel,
    // ShopService,
    // NewLetter,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>