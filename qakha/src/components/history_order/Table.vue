<template>
  <div>
    <table class="table">
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
      </colgroup>
      <thead>
        <tr class="table-active">
          <th scope="col">STT</th>
          <th scope="col">Order code/type</th>
          <th scope="col">Time</th>
          <th scope="col">Place</th>
          <th scope="col">Driver</th>
          <th scope="col">Total amount</th>
          <th scope="col">Status</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody style="text-align: left">
        <tr v-for="item in visibleHistoryOrderData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.type_checkout }}</td>
          <td>
            Order time:
            {{ item.created_at }}<br />
            Delivery time:
            {{ item.delivery_time }}
          </td>
          <td>
            <span class="partner-name">{{ item.partner.name }}</span>
            <br />
            {{ item.address }}
          </td>
          <td>{{ item.driver.name }}</td>
          <td>{{ item.total }}</td>
          <td>
            <span :class="`order-status-${item.status}`">
              {{ item.status }}
            </span>
          </td>
          <td @click="viewOrderDetail(item.id)">
            <a
              class="order-detail"
              data-toggle="modal"
              data-target="#staticBackdrop"
              >View Order Detail</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationCustom
      :paginationData="historyOrderData"
      @page:update="updatePage"
      :currentPage="currentPage"
      :pageSize="pageSize"
    />
    <OrderDetailModal :totalOfOrder="totalOfOrder" :partnerName="partnerName" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PaginationCustom from "@/components/pagination/PaginationCustom.vue";
import OrderDetailModal from "./modal/OrderDetailModal";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  name: "Table",
  props: {
    historyOrderData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PaginationCustom,
    OrderDetailModal,
  },
  computed: {
    ...mapGetters({
      getOrderDetails: "order/getOrderDetails",
    }),
    visibleHistoryOrderData() {
      return this.historyOrderData.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    },
    historyOrderDataOnChange() {
      return this.historyOrderData;
    },
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 2,
      totalOfOrder: 0,
      partnerName: "",
    };
  },
  methods: {
    ...mapActions({
      orderDetails: "order/orderDetails",
    }),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    viewOrderDetail(id) {
      let params = {
        order_id: id,
      };
      this.orderDetails(params).then((response) => {
        this.totalOfOrder = response.order.total;
        this.partnerName = response.order.partner.name;
        console.log(response);
      });
    },
  },
  watch: {
    historyOrderDataOnChange() {
      this.currentPage = 0;
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

.order-status-completed {
  background: #00db48;
  padding: 4px;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
}
.order-status-shipping {
  background: #f7941d;
  padding: 4px;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
}
.order-detail {
  color: #428bca !important;
  cursor: pointer;
}
.partner-name {
  font-weight: 700;
}
</style>