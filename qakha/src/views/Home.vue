<template>
  <div class="home">
    <router-view />
    <Carousel />
    <FeedBack />
    <ShopService />
    <NewLetter />
  </div>
</template>

<script>
import Carousel from "@/components/homepage/content/carousel/Carousel";
import ShopService from "@/components/homepage/content/shopService/ShopService";
import NewLetter from "@/components/homepage/content/newLetter/NewLetter";
import FeedBack from "@/components/homepage/content/feedback/FeedBack";
export default {
  name: "Home",
  components: {
    Carousel,
    ShopService,
    NewLetter,
    FeedBack,
  },
};
</script>
