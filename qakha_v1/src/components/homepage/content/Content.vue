<template>
  <div>
    <ListProducts />
    <Carousel />
  </div>
</template>

<script>
// import Container from "@/components/homepage/content/container/Container";
import ListProducts from "@/components/homepage/content/listProducts/ListProducts";
import Carousel from "@/components/homepage/content/carousel/Carousel";
export default {
  components: {
    ListProducts,
    Carousel,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>