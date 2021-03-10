<template>
  <div>
    <ListProducts />
    <Carousel />
    <ShopService />
    <NewLetter />
    <Footer />
  </div>
</template>

<script>
import Carousel from "@/components/homepage/content/carousel/Carousel";
import ListProducts from "@/components/homepage/content/listProducts/ListProducts";
import ShopService from "@/components/homepage/content/shopService/ShopService";
import NewLetter from "@/components/homepage/content/newLetter/NewLetter";
import Footer from "@/components/homepage/content/footer/Footer";
export default {
  components: {
    ListProducts,
    Carousel,
    ShopService,
    NewLetter,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>