<template>
  <ScrollTopComponent>
    <a class="btn btn-light">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </a>
  </ScrollTopComponent>
</template>

<script>
import ScrollTopComponent from "./ScrollTopComponent";
export default {
  components: {
    ScrollTopComponent,
  },
};
</script>

<style scoped lang="scss">
.btn {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.55);
  padding-top: 13px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  &.btn-light {
    z-index: 99;
    height: 48px;
    position: fixed;
    border: rgba(0, 0, 0, 0.658);
    background-color: rgba(0, 0, 0, 0.658);
    color: #fff;
    border-radius: 100px;
    right: 10px;
    bottom: 100px;
    cursor: pointer;
    outline: 0;
    svg {
      animation: 2s top infinite;
    }
  }
}
</style>