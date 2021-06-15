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
          status: "All",
        },
        {
          status: "Completed",
        },
        {
          status: "Shipping",
        },
        {
          status: "Canceled",
        },
      ],
      object: {
        status: "All",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      // let orderStt = payload.status === "completed" ? "completed" : "shipping";
      let orderStt = "";
      if (payload.status === "All") {
        orderStt = "";
      }
      if (payload.status === "Completed") {
        orderStt = "completed";
      }
      if (payload.status === "Shipping") {
        orderStt = "shipping";
      }
      if (payload.status === "Canceled") {
        orderStt = "canceled";
      }
      this.$emit("selet-option", orderStt);
    },
  },
};
</script>

<style>
</style>