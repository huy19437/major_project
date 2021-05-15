<template>
  <!-- <div v-if="loading" class="lds-dual-ring"></div> -->
  <div v-if="loading" class="spinner-3"></div>
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
  /* border-color: rgb(78, 78, 78) transparent rgb(78, 78, 78) transparent; */
  border-color: #ff8b00 #ccc #ccc #ccc;
  animation: lds-dual-ring 1.2s linear infinite;
}

.spinner-3 {
  margin: 0 auto;
  margin-top: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #ff8b00);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
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