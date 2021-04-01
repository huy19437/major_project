<template>
  <div class="productDetail">
    <!-- <Header /> -->
    <ProductContent />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductContent from "@/components/product_details/content/ProductContent";

export default {
  name: "productDetail",
  components: {
    // Header,
    ProductContent,
    // Footer,
  },
};
</script>
