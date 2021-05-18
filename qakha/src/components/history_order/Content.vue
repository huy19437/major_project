<template>
  <div class="col-12">
    <div class="row">
      <div class="col-4">
        <div class="form-group">
          <label>{{ $t("historyOrders.content.status") }}</label>
          <DropDownStatus @selet-option="methodToRunOnSelect" />
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label>{{ $t("historyOrders.content.orderTime") }}</label>
          <input
            type="date"
            name="bday"
            max="3000-12-31"
            min="1000-01-01"
            class="form-control"
            v-model="dateSearch"
          />
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label>{{ $t("historyOrders.content.action") }}</label>
          <div class="row">
            <div class="col-5">
              <button
                type="button"
                class="btn btn-primary"
                @click="searchOrderByParams()"
              >
                <span>{{ $t("historyOrders.content.search") }}</span>
              </button>
            </div>
            <div class="col-5">
              <button
                type="button"
                class="btn btn-primary"
                title="Reload History Order"
                @click="fetchOrderHistoryAgain()"
              >
                <span
                  ><span><font-awesome-icon :icon="['fas', 'undo']" /></span
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading">
      <Spinner :loading="isLoading" />
    </div>
    <div v-else-if="!isLoading">
      <Table :historyOrderData="orderHistoryData" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Table from "./Table";
import DropDownStatus from "./DropDownStatus";
import Spinner from "@/components/spinner/Spinner";
import moment from "moment";
export default {
  name: "ContentCampaign",
  components: {
    DropDownStatus,
    Table,
    Spinner,
  },
  computed: {
    ...mapGetters({
      getHistoryOrder: "order/getHistoryOrder",
    }),
  },
  data() {
    return {
      isLoading: false,
      orderHistoryData: [],
      searchStatus: "",
      dateSearch: "",
      filterObj: {
        status: "",
        created_at: "",
        end_date: "",
      },
    };
  },
  methods: {
    ...mapActions({
      historyOrders: "order/historyOrders",
    }),
    methodToRunOnSelect(payload) {
      this.searchStatus = payload;
    },
    searchOrderByParams() {
      this.orderHistoryData = this.getHistoryOrder;
      this.setFilterObj();

      //filter props has value of filterObj
      Object.keys(this.filterObj).forEach((key) => {
        if (this.filterObj[key] === "") delete this.filterObj[key];
      });

      var filter = this.filterObj;
      // console.log(filter);
      this.orderHistoryData = this.orderHistoryData.filter((item) => {
        for (let key in filter) {
          //sort condition for status
          if (item[key].indexOf(" ") < 0) {
            if (item[key] != filter[key]) {
              return false;
            }
            //sort condition for created_at
          } else if (
            item[key].slice(0, item[key].indexOf(" ")) != filter[key]
          ) {
            return false;
          }
        }
        return true;
      });
      // console.log(this.orderHistoryData);
    },
    setFilterObj() {
      this.filterObj.status = this.searchStatus;
      if (this.dateSearch) {
        this.filterObj.created_at = moment(this.dateSearch).format(
          "DD-MM-YYYY"
        );
      } else {
        this.filterObj.created_at = "";
      }
    },
    fetchOrderHistoryAgain() {
      this.dateSearch = "";
      this.getResult();
    },
    getResult() {
      this.isLoading = true;

      this.historyOrders()
        .then((res) => {
          this.orderHistoryData = this.getHistoryOrder;
          // console.log(this.orderHistoryData);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getResult();
  },
};
</script>
<style lang="scss">
@import "@/assets/style/_mixins.scss";
.dropdown-status {
  width: 100% !important;
  margin: 0;
}

.col-12 {
  .col-4 {
    .form-group {
      .row {
        .col-5 {
          button {
            @include buttonStyle();
            background-color: #000;
            border-color: #000;
            border-radius: 0;
            &:hover {
              background-color: #f7941d;
              border-color: #f7941d;
            }
            &:focus {
              box-shadow: none;
            }
          }
        }
      }
    }
  }
}

.pagination-custom {
  font-size: 12px;
  float: right;
}

.dropdown-toggle {
  min-width: 50px !important;
  .caret {
    right: 10px;
  }
}

@media (max-width: 990px) {
}

@media only screen and (min-width: 990px) {
}

@media only screen and (min-width: 1176px) {
}

@media only screen and (max-width: 710px) {
}
</style>