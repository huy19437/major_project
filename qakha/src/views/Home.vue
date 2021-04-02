<template>
  <div class="home">
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
export default {
  name: "Home",
  components: {
    Carousel,
    ShopService,
    NewLetter,
  },
};
</script>
