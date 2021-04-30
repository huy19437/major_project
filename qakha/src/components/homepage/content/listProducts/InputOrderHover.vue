<template>
  <div>
    <a>
      <button
        class="btn-minus"
        @click="dec"
        :disabled="numberOfProductToAdd < 2"
      >
        <i class="ti-minus"></i>
      </button>
    </a>
    <a>
      <p>{{ numberOfProductToAdd }}</p>
    </a>
    <a>
      <button class="btn-plus" @click="inc">
        <i class="ti-plus"></i>
      </button>
    </a>
  </div>
</template>

<script>
export default {
  name: "InputOrderHover",
  props: {
    numberOfProductToAdd: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    inc() {
      this.$emit("inc", this.numberOfProductToAdd + 1);
    },
    dec() {
      this.$emit("dec", this.numberOfProductToAdd - 1);
    },
  },
};
</script>

<style>
</style>