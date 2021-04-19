<template>
  <dropdown
    :options="arrayOfObjects"
    :selected="object"
    v-on:updateOption="methodToRunOnSelect"
    class="dropdown-status"
  ></dropdown>
</template>

<script>
import dropdown from "./Dropdown";
export default {
  name: "DropDownStatus",
  components: {
    dropdown,
  },
  data() {
    return {
      arrayOfObjects: [
        {
          status: "Shipping",
        },
        {
          status: "Completed",
        },
        {
          status: "All",
        },
      ],
      object: {
        status: "All",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      let orderStt = payload.status === "completed" ? "completed" : "shipping";
      if (payload.status === "All") {
        orderStt = "";
      }
      if (payload.status === "Completed") {
        orderStt = "completed";
      }
      if (payload.status === "Shipping") {
        orderStt = "shipping";
      }
      this.$emit("selet-option", orderStt);
    },
  },
};
</script>

<style>
</style>