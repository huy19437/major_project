<template>
  <div class="col-12">
    <div class="row">
      <div class="col-4">
        <div class="form-group dropdown">
          <label>Status</label>
          <DropDownStatus @selet-option="methodToRunOnSelect" />
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label>Delivery time</label>
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
      <div class="col-4" style="align-self: center">
        <div class="form-group">
          <label>Action</label>
          <div class="row">
            <div class="col-5">
              <button
                type="button"
                class="btn btn-primary"
                @click="searchOrderByParams()"
              >
                <span>Search</span>
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

    <Table :historyOrderData="orderHistoryData" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Table from "./Table";
import DropDownStatus from "./DropDownStatus";
import moment from "moment";
export default {
  name: "ContentCampaign",
  components: {
    DropDownStatus,
    Table,
  },
  computed: {
    ...mapGetters({
      getHistoryOrder: "order/getHistoryOrder",
    }),
  },
  data() {
    return {
      orderHistoryData: [],
      searchStatus: "",
      dateSearch: "",
      filterObj: {
        status: "",
        delivery_time: "",
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
      console.log(filter);
      this.orderHistoryData = this.orderHistoryData.filter((item) => {
        for (let key in filter) {
          //sort condition for status
          if (item[key].indexOf(" ") < 0) {
            if (item[key] != filter[key]) {
              return false;
            }
            //sort condition for delivery_time
          } else if (
            item[key].slice(0, item[key].indexOf(" ")) != filter[key]
          ) {
            return false;
          }
        }
        return true;
      });
      console.log(this.orderHistoryData);
    },
    setFilterObj() {
      this.filterObj.status = this.searchStatus;
      if (this.dateSearch) {
        this.filterObj.delivery_time = moment(this.dateSearch).format(
          "DD-MM-YYYY"
        );
      } else {
        this.filterObj.delivery_time = "";
      }
    },
    fetchOrderHistoryAgain() {
      this.dateSearch = "";
      this.getResult();
    },
    getResult() {
      this.historyOrders().then((res) => {
        this.orderHistoryData = this.getHistoryOrder;
      });
    },
  },
  created() {
    this.getResult();
  },
};
</script>
<style lang="scss">
.errorMessage {
  color: red;
  margin-bottom: 0;
  position: absolute;
  &.endDay {
    z-index: 1;
    width: 100%;
    top: 108px;
    right: 2px;
    font-size: 11px;
  }
  &.startDay {
    z-index: 1;
    width: 100%;
    top: 48px;
    right: 2px;
    font-size: 11px;
  }
}

.clear {
  clear: both;
}

.arrow-down {
  width: 13px;
  height: 30px;
  transform: rotate(0);
  transition: 0.5s all ease-in-out;
}

.isClick {
  transform: rotate(89deg);
  transition: 0.5s all ease-in-out;
}

.col-10 {
  background: #fff;
  border: 1px solid #d2cccc;
  .row {
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
    #example-date-input,
    #example-time-input {
      font-size: 0.7rem;
    }
    .col-2:nth-child(5) {
      display: flex;
      justify-content: space-between;
      .col-5 {
        padding: 0 0;
      }
      button {
        width: 100%;
        height: 36%;
        margin-top: 2px;
        font-size: 14px;
      }
      .btn-user-status {
        width: 92px;
        height: 30px;
        margin-bottom: 12px;
        background: #fff;
        color: #000;
        font-weight: 600;
      }
      input {
        overflow: hidden;
      }
    }

    .col-2 {
      .modal-dialog {
        .modal-header {
          button {
            font-size: 30px;
            margin-left: 0;
            width: 48px;
            margin-top: -16px;
            float: right;
            margin-right: 0;
          }
        }
        .modal-body {
          .card-header {
            h5 {
              display: flex;
            }
            button {
              width: 391px;
              padding: 6px 0;
              margin-right: 10px;
              text-align: left;
              &:focus {
                box-shadow: none;
                text-decoration: none;
              }
            }
          }
          .card {
            margin-bottom: 15px;
            .row {
              padding: 15px 10px;
              font-size: 12px;
              .col-3 {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              }
              .col-9 {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
              }
            }
          }
        }
        .modal-footer {
          flex-wrap: nowrap;
          button {
            width: 60px;
            height: 27px;
            font-size: 12px;
            line-height: 4px;
            font-weight: 600;
            &:nth-child(1) {
              background: #fff;
              color: #000;
            }
          }
        }
      }
      .btn-group {
        min-width: 30px !important;
        width: 100%;
      }
      .dropdown-toggle {
        width: 100%;
        height: 73%;
        &::after {
          display: none;
        }
      }
      .btn-create,
      .btn-search,
      .btn-undo {
        position: relative;
        transition: all 200ms ease;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        &:active {
          -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
          box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
          top: 4px;
        }
      }
    }
  }
  .form-group {
    text-align: left;
    label {
      margin-bottom: 0;
    }
    button {
      border: none;
      background: #fff;
      color: #000;
      border-bottom: 1px solid #ccc;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
    }
  }

  nav {
    .pagination {
      li {
        a {
          border: none;
          font-size: 15px;
        }
      }
    }
  }
  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dropdown-status {
  width: 100% !important;
  margin: 0;
}

.pagination-custom {
  font-size: 12px;
  float: right;
}
.notice-mess {
  .alert-mess-success {
    position: absolute;
    line-height: 42%;
    top: 174px;
    right: 16px;
    width: 79%;
    border-radius: 2px;
  }
}

.dropdown-toggle {
  min-width: 50px !important;
  .caret {
    right: 10px;
  }
}

@media (max-width: 990px) {
  .col-10 {
    max-width: 100% !important;
    flex: 1 !important;
    .row {
      .col-2:nth-child(5) {
        button {
          width: 100%;
          height: 36%;
          margin-top: 3px;
          font-size: 10px;
        }
        .btn-user-status {
          width: 92px;
          height: 30px;
          margin-bottom: 12px;
          background: #fff;
          color: #000;
          font-weight: 600;
        }
        input {
          overflow: hidden;
        }
      }
    }
  }
}

@media only screen and (min-width: 990px) {
  .col-10 {
    .row {
      .col-2:nth-child(5) {
        button {
          width: 100%;
          height: 36%;
          margin-top: 3px;
          font-size: 13px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1176px) {
  .notice-mess {
    .alert-mess-success {
      line-height: 11%;
      top: 147px;
    }
  }
}

@media only screen and (max-width: 710px) {
  .notice-mess {
    .alert-mess-success {
      top: 196px;
    }
  }
}
</style>