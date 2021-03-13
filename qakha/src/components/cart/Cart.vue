<template>
  <div class="cart">
    <Header />
    <CartConent />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartConent from "@/components/cart/content/CartContent";
export default {
  name: "cart",
  components: {
    Header,
    CartConent,
    Footer,
  },
};
</script>

<style>
</style>