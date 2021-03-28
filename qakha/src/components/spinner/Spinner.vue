<template>
  <div v-if="loading" class="lds-dual-ring"></div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 59px;
  height: 59px;
  margin-top: 20px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 43px;
  height: 43px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(78, 78, 78);
  border-color: rgb(78, 78, 78) transparent rgb(78, 78, 78) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>