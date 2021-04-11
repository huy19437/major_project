<template>
  <div class="qty">
    <div class="input-group">
      <div class="button minus">
        <button
          type="button"
          class="btn btn-primary btn-number"
          @click="dec"
          :disabled="quantity < 2"
        >
          <i class="ti-minus"></i>
        </button>
      </div>
      <input disabled type="text" class="input-number" :value="`${quantity}`" />
      <div class="button plus">
        <button
          type="button"
          class="btn btn-primary btn-number"
          @click="inc"
          :disabled="quantity > 9"
        >
          <i class="ti-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputOrder",
  props: {
    quantity: {
      type: Number,
    },
  },
  methods: {
    inc() {
      this.$emit("inc", this.quantity + 1);
    },
    dec() {
      this.$emit("dec", this.quantity - 1);
    },
  },
};
</script>

<style>
</style>