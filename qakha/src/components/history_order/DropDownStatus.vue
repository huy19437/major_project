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
          status: "shipping",
        },
        {
          status: "completed",
        },
      ],
      object: {
        status: "completed",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      let orderStt = payload.status === "completed" ? "completed" : "shipping";
      this.$emit("selet-option", orderStt);
    },
  },
};
</script>

<style>
</style>