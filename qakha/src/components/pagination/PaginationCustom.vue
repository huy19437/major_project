<template>
  <div v-if="totalPages() > 0" class="pagination-wrapper">
    <span
      v-if="showPreviousLink()"
      class="pagination-btn"
      v-on:click="updatePage(currentPage - 1)"
    >
      <font-awesome-icon :icon="['fas', 'caret-left']" />
    </span>
    {{ currentPage + 1 }} of {{ totalPages() }}
    <span
      v-if="showNextLink()"
      class="pagination-btn"
      v-on:click="updatePage(currentPage + 1)"
    >
      <font-awesome-icon :icon="['fas', 'caret-right']" />
    </span>
  </div>
</template>

<script>
export default {
  name: "PaginationCustom",
  props: ["paginationData", "currentPage", "pageSize"],
  methods: {
    updatePage(pageNumber) {
      this.$emit("page:update", pageNumber);
    },
    totalPages() {
      if (this.paginationData)
        return Math.ceil(this.paginationData.length / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage == 0 ? false : true;
    },
    showNextLink() {
      return this.currentPage == this.totalPages() - 1 ? false : true;
    },
  },
};
</script>
<style lang="scss">
.pagination-wrapper {
  margin-bottom: 12px;
  .pagination-btn {
    cursor: pointer;
    position: relative;
    padding: 5px 12px;
    margin: 0 12px;
    border-radius: 10px;
    transition: all 200ms ease;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 6px 7px;
    &:active {
      -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      top: 7px;
    }
  }
}
</style>