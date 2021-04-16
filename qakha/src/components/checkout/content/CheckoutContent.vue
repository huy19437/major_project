<template>
  <section class="shop checkout section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12">
          <div class="checkout-form">
            <h3>Make Your Checkout Here</h3>
            <p>Deliver to</p>
            <!-- Form -->
            <form class="form" method="post" action="#">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Name<span>*</span></label>
                    <input
                      type="text"
                      placeholder="Enter Name Here.."
                      required
                      v-model="user.name"
                      @blur="$v.user.name.$touch()"
                    />
                    <div v-if="$v.user.name.$error">
                      <p class="errorMessage" v-if="!$v.user.name.required">
                        Name is required
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Email<span>*</span></label>
                    <input
                      type="email"
                      placeholder="Enter Email Here..."
                      required
                      v-model="user.email"
                    />
                    <!-- <div v-if="$v.user.email.$error">
                      <p class="errorMessage" v-if="!$v.user.email.required">
                        Email is required
                      </p>
                    </div> -->
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Phone Number<span>*</span></label>
                    <input
                      type="number"
                      placeholder="Enter Phone number Here.."
                      required
                      v-model="user.phone_number"
                      @blur="$v.user.phone_number.$touch()"
                    />
                    <div v-if="$v.user.phone_number.$error">
                      <p
                        class="errorMessage"
                        v-if="!$v.user.phone_number.required"
                      >
                        Phone number is required
                      </p>
                      <p
                        class="errorMessage"
                        v-else-if="!$v.user.phone_number.minLength"
                      >
                        Phone number must be at least 10 characters
                      </p>
                      <p
                        class="errorMessage"
                        v-else-if="!$v.user.phone_number.maxLength"
                      >
                        Phone number max is 10 characters
                      </p>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Address<span>*</span></label>
                    <input
                      type="text"
                      placeholder="Enter Address Here.."
                      required
                      v-model="user.address"
                      @blur="$v.user.address.$touch()"
                    />
                    <div v-if="$v.user.address.$error">
                      <p class="errorMessage" v-if="!$v.user.address.required">
                        Address is required
                      </p>
                    </div>
                  </div>
                </div> -->
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Address</label>
                    <div
                      class="nice-select"
                      tabindex="0"
                      :class="{ open: isOpen3 }"
                      @click="isOpen3 = !isOpen3"
                    >
                      <span class="current">{{ user.address }}</span>
                      <ul class="list">
                        <li
                          v-for="item in getUserAddress"
                          :key="item.id"
                          class="option"
                          @click="
                            () => {
                              user.address = item.name;
                              changeAddress(item);
                            }
                          "
                        >
                          {{ item.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Voucher</label>
                    <div
                      class="nice-select"
                      tabindex="0"
                      :class="{ open: isOpen2 }"
                      @click="isOpen2 = !isOpen2"
                    >
                      <span class="current">{{ voucher.code }}</span>
                      <ul class="list">
                        <li
                          v-for="item in getVouchersLocal"
                          :key="item.id"
                          class="option"
                          @click="() => (voucher = item)"
                        >
                          {{ item.code }}
                        </li>
                      </ul>
                    </div>
                    <div class="button btn-voucher-group">
                      <a @click="applyVoucher" class="btn btn-apply">Apply</a>
                      <a @click="cancelVoucher" class="btn btn-cancel">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>Delivery time</label>
                    <input
                      type="time"
                      id="timeOpen"
                      class="form-control"
                      step="900"
                      v-model="user.delivery_time"
                      @blur="$v.user.delivery_time.$touch()"
                      @input="errMess = false"
                    />
                    <div v-if="$v.user.delivery_time.$error">
                      <p
                        class="errorMessage"
                        v-if="!$v.user.delivery_time.required"
                      >
                        Delivery time is required
                      </p>
                    </div>
                    <div v-if="errMess">
                      <p class="errorMessage">
                        Time open must be before Time close
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <!--/ End Form -->
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="order-details">
            <!-- Order Widget -->
            <div class="single-widget">
              <h2 class="order-details-title">CART TOTALS</h2>
              <div class="content">
                <ul>
                  <li>
                    Sub Total<span>{{ subTotal }} VNĐ</span>
                  </li>
                  <li>
                    (+) Shipping<span>{{ shipping_fee }} VNĐ</span>
                  </li>
                  <li class="last">
                    Total<span>{{ subTotal + shipping_fee }} VNĐ</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--/ End Order Widget -->
            <!-- Order Widget -->
            <div class="single-widget">
              <h2 class="order-details-title">Payments</h2>
              <div class="content">
                <div class="checkbox">
                  <input type="radio" name="checkout" value="COD" /> Cash On
                  Delivery<br />
                  <input type="radio" name="checkout" value="PAYPAL" />
                  Pay Pal<br />
                </div>
              </div>
            </div>
            <!--/ End Order Widget -->
            <!-- Payment Method Widget -->
            <div class="single-widget payement">
              <div class="content">
                <img src="@/assets/images/payment-method3.png" alt="#" />
              </div>
            </div>
            <!--/ End Payment Method Widget -->
            <!-- Button Widget -->
            <div class="single-widget get-button">
              <div class="content">
                <div class="button">
                  <a @click="proceedToCheckout" class="btn"
                    >proceed to checkout</a
                  >
                </div>
              </div>
            </div>
            <!--/ End Button Widget -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import GoogleMap from "@/components/googlemap/GoogleMap";
import moment from "moment";
export default {
  name: "CheckoutContent",
  components: { GoogleMap },
  data() {
    return {
      errMess: false,
      slug: this.$route.params.slug,
      shipping_fee: 0,
      subTotal: 0,
      voucher: {},
      isOpen2: false,
      isOpen3: false,
      partnerOpenTime: moment().format("HH:mm"),
      partnerCloseTime: moment().format("HH:mm"),
      user: {
        name: "",
        // email: "",
        phone_number: "",
        address: "",
        delivery_time: "",
        // longitude: "",
        // latitude: "",
      },
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone_number: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      address: {
        required,
      },
      delivery_time: {
        required,
      },
      // longitude: {
      //   required,
      // },
      // latitude: {
      //   required,
      // },
    },
  },
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
      getSubtotal: "order/getSubtotal",
      getVouchersLocal: "voucher/getVouchersLocal",
      getUserAddress: "auth/getUserAddress",
      getPartnersLocal: "partner/getPartnersLocal",
    }),
    delivery_time() {
      return this.user.delivery_time;
    },
  },
  methods: {
    ...mapActions({
      userObj: "auth/user",
      getDistance: "order/getDistanceForShip",
      createOrder: "order/createOrder",
      applyVouchers: "voucher/applyVouchers",
      cancelVouchers: "voucher/cancelVouchers",
      getVouchersFlPartner: "voucher/getVouchersFlPartner",
    }),
    changeAddress(address) {
      let addressUserForCalcDistance = {
        partner_id: this.slug,
        latitude: address.latitude,
        longitude: address.longitude,
      };
      this.getDistance(addressUserForCalcDistance)
        .then((res) => {
          this.shipping_fee = res.shipping_fee;
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    applyVoucher() {
      let params = {
        code: this.voucher.code,
        partner_id: this.slug,
      };
      this.applyVouchers(params)
        .then((res) => {
          this.subTotal = res;
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    cancelVoucher() {
      let params = {
        voucher_id: this.voucher.id,
        partner_id: this.slug,
      };
      this.cancelVouchers(params)
        .then((res) => {
          this.subTotal = res;
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    proceedToCheckout() {
      // if (!this.$v.user.longitude.required || !this.$v.user.latitude.required) {
      //   openToastMess("Please choose delivery location", "error");
      // } else {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        let params = {
          name: this.user.name,
          phone_number: this.user.phone_number,
          address: this.user.address,
          delivery_time:
            moment().format("YYYY-MM-DD") + " " + this.user.delivery_time,
          partner_id: this.slug,
          shipping_fee: this.shipping_fee,
          type_checkout: "cash",
        };
        console.log(params);
        // this.createOrder(params)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((error) => {
        //     openToastMess(error, "error");
        //   });
      }
      console.log(this.$data.user);
      // }
    },
    getLocationPartner(location) {
      this.$data.user.longitude = location.lng;
      this.$data.user.latitude = location.lat;
    },
    getShipDistance() {
      let addressUserForCalcDistance = {
        partner_id: this.slug,
        latitude: this.getUser.addresses[0].latitude,
        longitude: this.getUser.addresses[0].longitude,
      };
      this.getDistance(addressUserForCalcDistance)
        .then((res) => {
          this.shipping_fee = res.shipping_fee;
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    getUserInfo() {
      this.user.name = this.getUser.name;
      this.user.email = this.getUser.email;
      this.user.phone_number = this.getUser.phone_number;
      // this.user.address = this.getUser.addresses[0].name;
    },
    getPartnersTime() {
      let obj = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      console.log(obj.time_close);
    },
    getResult() {
      console.log(this.getSubtotal);
      this.subTotal = this.getSubtotal;
      this.user.address = this.getUser.addresses[0].name;
      this.getUserInfo();
      this.getShipDistance();
      // let addressUserForCalcDistance = {
      //   partner_id: this.slug,
      //   latitude: this.getUser.addresses[0].latitude,
      //   longitude: this.getUser.addresses[0].longitude,
      // };
      // this.getShipDistance(addressUserForCalcDistance);
    },
  },
  created() {
    this.userObj();
    this.getVouchersFlPartner({ partner_id: this.slug });
    this.getResult();
    this.getPartnersTime();
  },
  watch: {
    delivery_time() {
      // this.errMess = true;
    },
  },
};
</script>

<style lang="scss">
.form-group {
  .errorMessage {
    color: red !important;
    margin-bottom: 0 !important;
    position: absolute;
    margin-top: 0 !important;
  }
}
.shop.checkout.section {
  text-align: left;
  .checkout-form {
    h3 {
      font-size: 3rem;
      font-weight: 600;
    }
  }
  .order-details {
    .order-details-title {
      text-align: left;
    }
  }
  .content {
    ul {
      padding-left: 0;
    }
    img {
      max-width: 100%;
    }
  }
  .checkbox {
    label {
      margin-left: 0;
    }
  }
}

.row.user-address {
  padding: 0 15px;
  .google-map {
    width: 100%;
    .pac-target-input {
      border-radius: unset;
      border-radius: 3px;
      border-radius: 0px;
      color: #333 !important;
      border: none;
      background: #f6f7fb;
    }
    button {
      border-radius: unset;
      text-align: center;
      text-transform: uppercase;
      color: #fff;
    }
  }
}

.shop.checkout .single-widget.get-button .btn {
  line-height: 33px !important;
}

.btn-apply,
.btn-cancel {
  line-height: 19px;
  text-align: center;
  border-radius: unset !important;
  text-transform: uppercase;
  color: #fff !important;
  margin-right: 20px;
}

.current {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>