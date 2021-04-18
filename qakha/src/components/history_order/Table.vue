<template>
  <div>
    <table class="table">
      <thead>
        <tr class="table-active">
          <th scope="col">Campaign ID</th>
          <th scope="col">Campaign name</th>
          <th scope="col">Overall budget</th>
          <th scope="col">Currently used amount</th>
          <th scope="col">Currently usage rate</th>
          <th scope="col">Start date</th>
          <th scope="col">End date</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
      </tbody>
    </table>
    <PaginationCustom
      :paginationData="''"
      @page:update="updatePage"
      :currentPage="currentPage"
      :pageSize="pageSize"
    />
  </div>
</template>

<script>
import PaginationCustom from "@/components/pagination/PaginationCustom.vue";
export default {
  name: "Table",
  data() {
    return {
      currentPage: 0,
      pageSize: 8,
    };
  },
  components: {
    PaginationCustom,
  },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>

<style lang="scss">
.col-10 {
  background: #fff;
  border: 1px solid #d2cccc;

  .table {
    .table-active {
      th {
        font-size: 12px;
        font-weight: 500;
      }
    }
    .action-icon {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .edit-campaign,
      .delete-campaign {
        position: relative;
        transition: all 200ms ease;
        &:active {
          -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
          box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
          top: 4px;
        }
      }
    }
    .delete-campaign,
    .edit-campaign {
      color: #000;
    }
  }
}
</style>