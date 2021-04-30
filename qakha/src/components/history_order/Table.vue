<template>
  <div>
    <table class="table">
      <colgroup>
        <col style="width: 5%" />
        <col style="width: 3%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 7%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
      </colgroup>
      <thead>
        <tr class="table-active">
          <th scope="col">STT</th>
          <th scope="col">{{ $t("historyOrders.table.type") }}</th>
          <th scope="col">{{ $t("historyOrders.table.time") }}</th>
          <th scope="col">{{ $t("historyOrders.table.place") }}</th>
          <th scope="col">{{ $t("historyOrders.table.driver") }}</th>
          <th scope="col">{{ $t("historyOrders.table.totalAmount") }}</th>
          <th scope="col">{{ $t("historyOrders.table.status") }}</th>
          <th scope="col">{{ $t("historyOrders.table.detail") }}</th>
        </tr>
      </thead>
      <tbody style="text-align: left">
        <tr v-for="item in visibleHistoryOrderData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.type_checkout }}</td>
          <td>
            {{ $t("historyOrders.table.body.orderTime") }}:
            {{ item.created_at }}
          </td>
          <td>
            <span class="partner-name">{{ item.partner.name }}</span>
            <br />
            {{ item.address }}
          </td>
          <td>
            {{ item.driver.name }} <br />
            <a
              class="rate-driver"
              :class="{
                diabledPointer:
                  item.status === 'shipping'
                    ? true
                    : false || item.rate_status === 'rated'
                    ? true
                    : false,
              }"
              @click="getDataForFeedback(item)"
              >{{ item.rate_status }}</a
            >
          </td>
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
              >{{ $t("historyOrders.table.body.viewOrderDetail") }}</a
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
    <FeedBackModal :dataForFeedback="dataForFeedback" />
    <FeedBackPartnerModal :dataForFeedback="dataForFeedback" />
    <div
      class="modal fade"
      id="loadBeforeFeedbackDriver"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loadMeLabel"
    >
      <div
        style="height: 100vh; margin: 166px"
        class="modal-dialog modal-sm"
        role="document"
      >
        <div id="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PaginationCustom from "@/components/pagination/PaginationCustom.vue";
import OrderDetailModal from "./modal/OrderDetailModal";
import FeedBackModal from "./modal/FeedBackModal";
import FeedBackPartnerModal from "./modal/FeedBackPartnerModal";
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
    FeedBackModal,
    FeedBackPartnerModal,
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
      dataForFeedback: {},
      rate_status: "",
    };
  },
  methods: {
    ...mapActions({
      orderDetails: "order/orderDetails",
      checkFeedbackDriver: "feedback/checkFeedbackDriver",
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
        // console.log(response);
      });
    },
    getDataForFeedback(order) {
      console.log(order);
      let params = {
        order_id: order.id,
        driver_id: order.driver_id,
        partner_id: order.partner_id,
        driver_name: order.driver.name,
        partner_name: order.partner.name,
        partner_image: order.partner.image,
        driver_image: order.driver.image,
      };
      this.dataForFeedback = params;
      let checkFeedbackDriver = {
        order_id: order.id,
      };
      $("#loadMe").modal("show");

      this.checkFeedbackDriver(checkFeedbackDriver)
        .then((res) => {
          console.log(res);
          if (res.rated_driver) {
            $("#feedBackPartnerModal").modal("show");
          } else {
            $("#feedBackModal").modal("show");
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          $("#loadMe").modal("hide");
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
.rate-driver {
  font-weight: 700 !important;
  color: #0288d1 !important;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
}

.diabledPointer {
  pointer-events: none;
  color: #ccc !important;
}
</style>