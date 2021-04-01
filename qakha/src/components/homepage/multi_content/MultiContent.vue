<template>
  <div>
    <router-view />
    <Carousel />
    <ShopService />
    <NewLetter />
  </div>
</template>

<script>
import Carousel from "@/components/homepage/content/carousel/Carousel";
import ShopService from "@/components/homepage/content/shopService/ShopService";
import NewLetter from "@/components/homepage/content/newLetter/NewLetter";
import MainContent from "@/components/homepage/content/MainContent";
export default {
  components: {
    Carousel,
    ShopService,
    NewLetter,
    MainContent,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>