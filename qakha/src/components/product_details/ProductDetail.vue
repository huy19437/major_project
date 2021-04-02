<template>
  <div class="productDetail">
    <ProductContent />
  </div>
</template>

<script>
import ProductContent from "@/components/product_details/content/ProductContent";

export default {
  name: "productDetail",
  components: {
    ProductContent,
  },
};
</script>
