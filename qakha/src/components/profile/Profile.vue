<template>
  <div class="profile">
    <Header />
    <UserInfo />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UserInfo from "@/components/profile/content/UserInfo";
export default {
  name: "profile",
  components: {
    Header,
    UserInfo,
    Footer,
  },
};
</script>

<style>
</style>