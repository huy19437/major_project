<template>
  <div class="Checkout">
    <Header />
    <CheckoutContent />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CheckoutContent from "@/components/checkout/content/CheckoutContent";
export default {
  name: "checkout",
  components: {
    Header,
    CheckoutContent,
    Footer,
  },
};
</script>

<style>
</style>