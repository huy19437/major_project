<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-backdrop="true"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ $t("historyOrders.orderDetailsModal.title") }}
            <span v-if="partnerName" class="partner-name">
              {{ partnerName }}
            </span>
          </h5>
          <h5 v-if="totalOfOrder" class="modal-title" id="staticBackdropLabel">
            <span>
              {{ $t("historyOrders.orderDetailsModal.fee") }}:
              {{ Math.ceil(getOrderDetailsHistory.order.shipping_fee) }}đ
            </span>
            <br v-if="getOrderDetailsHistory.order.discount" />
            <span v-if="getOrderDetailsHistory.order.discount">
              {{ $t("historyOrders.orderDetailsModal.discount") }}:
              {{ getOrderDetailsHistory.order.discount }}đ
            </span>
            <br />
            <span class="total-order">Total: {{ totalOfOrder }}đ</span>
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <!-- Shopping Summery -->
              <table class="table shopping-summery">
                <thead>
                  <tr class="main-hading">
                    <th>
                      {{ $t("historyOrders.orderDetailsModal.table.member") }}
                    </th>
                    <th>
                      {{ $t("historyOrders.orderDetailsModal.table.dish") }}
                    </th>
                    <th>
                      {{ $t("historyOrders.orderDetailsModal.table.quantity") }}
                    </th>
                    <th>
                      {{ $t("historyOrders.orderDetailsModal.table.price") }}
                    </th>
                    <!-- <th>Fee</th> -->
                    <!-- <th>Discount</th> -->
                    <th>
                      {{ $t("historyOrders.orderDetailsModal.table.total") }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="getOrderDetailsHistory">
                  <tr
                    v-for="order in getOrderDetailsHistory.order_details"
                    :key="order.id"
                  >
                    <td>{{ getOrderDetailsHistory.order.name }}</td>
                    <td>{{ order.product.name }}</td>
                    <td>{{ order.quantity }}</td>
                    <td>{{ order.price }}</td>
                    <!-- <td>
                      {{ Math.ceil(getOrderDetailsHistory.order.shipping_fee) }}
                    </td> -->
                    <!-- <td>{{ getOrderDetailsHistory.order.discount }}</td> -->
                    <td>
                      {{ order.quantity * order.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--/ End Shopping Summery -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            {{ $t("historyOrders.feedbackModal.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    totalOfOrder: {
      type: Number,
    },
    partnerName: {
      type: String,
    },
  },
  data() {
    return {
      total: 0,
    };
  },
  computed: {
    ...mapGetters({
      getOrderDetailsHistory: "order/getOrderDetailsHistory",
    }),
  },
  methods: {
    getResult() {
      // console.log(this.getOrderDetailsHistory);
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style scoped lang="scss">
.modal-dialog {
  width: 1140px !important;
  max-width: 1140px !important;
}

.modal-footer {
  justify-content: center;
  button {
    background-color: #000;
    &:hover {
      background-color: #f7941d;
      border-color: #f7941d;
      color: #fff;
    }
  }
}
.total-order {
  color: red;
  font-weight: 700;
}
.partner-name {
  font-weight: 700;
  text-transform: uppercase;
}

.modal-title {
  text-align: left;
}
</style>