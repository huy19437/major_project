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
          status: "No Active",
        },
        {
          status: "Active",
        },
      ],
      object: {
        status: "Active",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      let orderStt = payload.status === "Active" ? 1 : 0;
      this.$emit("selet-option", orderStt);
    },
  },
};
</script>

<style>
</style>