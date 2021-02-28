<template>
  <div id="home">
    <Navbar />
    <Todos />
    <StatusBar />
    <ProgressBar />
  </div>
</template>

<script>
import Todos from "@/components/Todos";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import ProgressBar from "@/components/ProgressBar";

export default {
  name: "HomePage",
  components: { Todos, Navbar, StatusBar, ProgressBar },
};
</script>

<style>
</style>
