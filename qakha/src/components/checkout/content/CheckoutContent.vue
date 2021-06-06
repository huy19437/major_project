<template>
  <section class="shop checkout section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12">
          <div class="checkout-form">
            <h3>{{ $t("checkout.title") }}</h3>
            <p>{{ $t("checkout.deliveryTo") }}</p>
            <!-- Form -->
            <form class="form" method="post" action="#">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group">
                    <label>{{ $t("checkout.name") }}<span>*</span></label>
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
                    <label>{{ $t("checkout.email") }}<span>*</span></label>
                    <input
                      type="email"
                      placeholder="Enter Email Here..."
                      required
                      disabled
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
                    <label>{{ $t("checkout.phone") }}<span>*</span></label>
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
                    <label
                      style="display: flex; justify-content: space-between"
                    >
                      {{ $t("checkout.address") }}
                      <router-link to="/edit-address">
                        <font-awesome-icon :icon="['fas', 'edit']" />
                      </router-link>
                    </label>
                    <div
                      class="nice-select"
                      tabindex="0"
                      :class="{ open: isOpen3 }"
                      @click="isOpen3 = !isOpen3"
                    >
                      <span class="current">
                        {{ user.address.name }}
                        <!-- <router-link to="/edit-address">
                          <font-awesome-icon :icon="['fas', 'edit']" />
                        </router-link> -->
                      </span>
                      <ul class="list">
                        <li
                          v-for="item in getAddressLocal"
                          :key="item.id"
                          class="option"
                          @click="
                            () => {
                              user.address = item;
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
                    <label>{{ $t("checkout.voucher") }}</label>
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
                          :class="{
                            disabled: compareConditionOfVoucher(
                              compareSubtotal(subTotal, item.condition),
                              item.usage_limit == 0,
                              compareDistance(
                                distance,
                                item.distance_condition
                              ),
                              compareDateExpired(item.expiry_date, dateNow)
                            ),
                          }"
                        >
                          <span
                            class="voucher-code"
                            :class="{
                              disabled: compareConditionOfVoucher(
                                compareSubtotal(subTotal, item.condition),
                                item.usage_limit == 0,
                                compareDistance(
                                  distance,
                                  item.distance_condition
                                ),
                                compareDateExpired(item.expiry_date, dateNow)
                              ),
                            }"
                            >{{ item.code }}</span
                          >
                          <div class="constraint-voucher">
                            <div
                              class="description"
                              :class="{
                                disabled: compareConditionOfVoucher(
                                  compareSubtotal(subTotal, item.condition),
                                  item.usage_limit == 0,
                                  compareDistance(
                                    distance,
                                    item.distance_condition
                                  ),
                                  compareDateExpired(item.expiry_date, dateNow)
                                ),
                              }"
                            >
                              {{ item.description ? item.description : "" }}
                            </div>
                            <div
                              v-if="item.condition"
                              class="condition"
                              :class="{
                                disabled: compareConditionOfVoucher(
                                  compareSubtotal(subTotal, item.condition),
                                  item.usage_limit == 0,
                                  compareDistance(
                                    distance,
                                    item.distance_condition
                                  ),
                                  compareDateExpired(item.expiry_date, dateNow)
                                ),
                              }"
                            >
                              For order from
                              <span>{{ item.condition }}đ up</span>
                            </div>
                            <div
                              class="expiry-date"
                              :class="{
                                disabled: compareConditionOfVoucher(
                                  compareSubtotal(subTotal, item.condition),
                                  item.usage_limit == 0,
                                  compareDistance(
                                    distance,
                                    item.distance_condition
                                  ),
                                  compareDateExpired(item.expiry_date, dateNow)
                                ),
                              }"
                            >
                              Expiration date:
                              {{ item.expiry_date }}
                            </div>
                            <div
                              class="usage-limit"
                              :class="{
                                disabled: compareConditionOfVoucher(
                                  compareSubtotal(subTotal, item.condition),
                                  item.usage_limit == 0,
                                  compareDistance(
                                    distance,
                                    item.distance_condition
                                  ),
                                  compareDateExpired(item.expiry_date, dateNow)
                                ),
                              }"
                            >
                              Usage limit:{{ item.usage_limit }}
                            </div>
                            <div
                              v-if="item.distance_condition"
                              class="distance-condition"
                              :class="{
                                disabled: compareConditionOfVoucher(
                                  compareSubtotal(subTotal, item.condition),
                                  item.usage_limit == 0,
                                  compareDistance(
                                    distance,
                                    item.distance_condition
                                  ),
                                  compareDateExpired(item.expiry_date, dateNow)
                                ),
                              }"
                            >
                              Distance condition:{{ item.distance_condition }}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="button btn-voucher-group">
                      <a
                        :disabled="voucher.code ? false : true"
                        @click="applyVoucher"
                        class="btn btn-apply"
                        >{{ $t("checkout.button.apply") }}</a
                      >
                      <a
                        :disabled="voucher.code ? false : true"
                        @click="cancelVoucher"
                        class="btn btn-cancel"
                      >
                        {{ $t("checkout.button.cancel") }}
                      </a>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-lg-6 col-md-6 col-12">
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
                        {{ errMessage }}
                      </p>
                    </div>
                  </div>
                </div> -->
              </div>
            </form>
            <!--/ End Form -->
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="order-details">
            <!-- Order Widget -->
            <div class="single-widget">
              <h2 class="order-details-title">
                {{ $t("checkout.fee") }}
              </h2>
              <div class="content">
                <ul>
                  <li>
                    {{ $t("checkout.cart.subTotal")
                    }}<span>{{ subTotal | formatVND }}</span>
                  </li>
                  <li>
                    (+) {{ $t("checkout.cart.shipping") }}({{
                      distance
                    }}km)<span>{{ shipping_fee | formatVND }}</span>
                  </li>
                  <li>
                    (-) {{ $t("checkout.cart.discount")
                    }}<span>{{ discount | formatVND }}</span>
                  </li>
                  <li class="last">
                    {{ $t("checkout.cart.total")
                    }}<span>{{
                      (subTotal + shipping_fee - discount) | formatVND
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--/ End Order Widget -->
            <!-- Order Widget -->
            <div class="single-widget">
              <h2 class="order-details-title">
                {{ $t("checkout.cart.payments") }}
              </h2>
              <div class="content">
                <div class="checkbox">
                  <div class="cod-payment">
                    <input
                      type="radio"
                      id="cod"
                      v-model="user.type_checkout"
                      name="checkout"
                      value="cash"
                    />
                    <label for="cod">
                      {{ $t("checkout.cart.cod") }}
                    </label>
                  </div>
                  <!-- {{ $t("checkout.cart.cod") }} -->
                  <!-- <br /> -->
                  <div class="coin-payment">
                    <input
                      type="radio"
                      id="coin"
                      v-model="user.type_checkout"
                      name="checkout"
                      value="coins"
                    />
                    <label for="coin">
                      {{ $t("checkout.cart.coins") }}: {{ getCoinsUser }}
                    </label>
                  </div>
                  <!-- {{ $t("checkout.cart.coins") }}: {{ getCoinsUser }} -->
                  <!-- <br /> -->
                  <div>{{ user.type_checkout }}</div>
                </div>
              </div>
            </div>
            <!--/ End Order Widget -->
            <!-- Payment Method Widget -->
            <!-- <div class="single-widget payement">
              <div class="content">
                <img src="@/assets/images/payment-method3.png" alt="#" />
              </div>
            </div> -->
            <!--/ End Payment Method Widget -->
            <!-- Button Widget -->
            <div class="single-widget get-button">
              <div class="content">
                <div class="button">
                  <a
                    :disabled="$v.user.$invalid || isDisabled"
                    @click="proceedToCheckout"
                    class="btn"
                    >{{ $t("checkout.cart.proceedToCheckout") }}</a
                  >
                </div>
              </div>
            </div>
            <!--/ End Button Widget -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="loadMe"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loadMeLabel"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div class="loader"></div>
            <div clas="loader-txt">
              <p>{{ $t("checkout.modal.title") }}</p>
            </div>
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
import $ from "jquery";
export default {
  name: "CheckoutContent",
  components: { GoogleMap },
  data() {
    return {
      errMess: false,
      cart: [],
      products: [],
      qtyOfProducts: [],
      isDisabled: false,
      errMessage: "",
      slug: this.$route.params.slug,
      shipping_fee: 0,
      subTotal: 0,
      voucher: {},
      voucherObjFromSer: {},
      isOpen2: false,
      isOpen3: false,
      distance: 0,
      distanceTest: 4,
      discount: 0,
      partnerStatus: "",
      subTotalTest: 500000,
      testDate: [
        {
          id: 1,
          code: "FSDN",
          discount: 15000.0,
          condition: 60000.0,
          distance_condition: 3,
          status: "effective",
          expiry_date: "30-07-2021 00:00",
          usage_limit: 10,
          description: "Code 15k off, min order 60k",
          partner_id: 1,
          created_at: "2021-05-22T21:20:38.235+07:00",
          updated_at: "2021-05-22T21:20:38.235+07:00",
        },
        {
          id: 2,
          code: "ALLFREE",
          discount: 15000.0,
          condition: 40000.0,
          distance_condition: null,
          status: "effective",
          expiry_date: "30-08-2021 00:00",
          usage_limit: 20,
          description: "Code 15k off, min order 40k",
          partner_id: 1,
          created_at: "2021-05-22T21:20:38.249+07:00",
          updated_at: "2021-05-22T21:20:38.249+07:00",
        },
        {
          id: 3,
          code: "FREESHIP",
          discount: 15000.0,
          condition: null,
          distance_condition: 3.0,
          status: "effective",
          expiry_date: "30-08-2021 00:00",
          usage_limit: 20,
          description: "Freeship within 3km",
          partner_id: 1,
          created_at: "2021-05-22T21:20:38.266+07:00",
          updated_at: "2021-05-22T21:20:38.266+07:00",
        },
        {
          id: 4,
          code: "DEAL20K",
          discount: 20000.0,
          condition: 80000.0,
          distance_condition: 3.0,
          status: "effective",
          expiry_date: "30-07-2021 00:00",
          usage_limit: 20,
          description:
            "Hóa đơn từ 80000 trong phạm vi 3km sẽ được giảm giá 20000 cho mọi hình thức thanh toán.",
          partner_id: 1,
          created_at: "2021-05-24T23:32:33.361+07:00",
          updated_at: "2021-05-24T23:35:11.675+07:00",
        },
      ],
      dateNow: moment(new Date()).format("DD-MM-YYYY HH:mm"),
      // partnerOpenTime: moment().format("HH:mm"),
      // partnerCloseTime: moment().format("HH:mm"),
      user: {
        name: "",
        phone_number: "",
        address: {},
        type_checkout: "",
      },
    };
  },
  validations: {
    user: {
      name: {
        required,
      },
      // email: {
      //   required,
      //   email,
      // },
      phone_number: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      address: {
        required,
      },
      // delivery_time: {
      //   required,
      // },
      type_checkout: {
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
      // getUserAddress: "auth/getUserAddress",
      getPartnersLocal: "partner/getPartnersLocal",
      getAddressLocal: "address/getAddressLocal",
      getCoinsUser: "order/getCoinsUser",
      getCartLocal: "cart/getCartLocal",
    }),
    // deliveryTime() {
    //   return this.user.delivery_time;
    // },
    cartLocalChange() {
      return this.getCartLocal;
    },
  },
  methods: {
    ...mapActions({
      userObj: "auth/user",
      showUser: "auth/showUser",
      getPartners: "partner/getPartners",
      getDistance: "order/getDistanceForShip",
      createOrder: "order/createOrder",
      applyVouchers: "voucher/applyVouchers",
      cancelVouchers: "voucher/cancelVouchers",
      getVouchersFlPartner: "voucher/getVouchersFlPartner",
      getAddress: "address/getAddress",
      coinsUsers: "order/coinsUsers",
      getCart: "cart/getCart",
      setShoppingStatus: "cart/setShoppingStatus",
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
          this.distance = res.distance;
          res.distance > 15
            ? (this.isDisabled = true)
            : (this.isDisabled = false);
          if (this.isDisabled) {
            openToastMess("Your location is so far from food store", "error");
          }
        })
        .catch((error) => {
          this.isDisabled = false;
          openToastMess(error, "error");
        });
    },
    compareSubtotal(a, b) {
      if (b === null || b === undefined) return false;
      if (a >= b) {
        return false;
      } else if (a < b) {
        return true;
      }
      return false;
    },
    compareDistance(a, b) {
      if (b === null || b === undefined) return false;
      if (a > b) {
        return true;
      } else if (a <= b) {
        return false;
      }
      return false;
    },
    compareDateExpired(a, b) {
      let tmp = false;
      var dateOfA = a.split(" ")[0];
      var dateOfB = b.split(" ")[0];
      var hourOfA = a.split(" ")[1];
      var hourOfB = b.split(" ")[1];
      var minuteOfA = hourOfA.slice(3, 5);
      var minuteOfB = hourOfB.slice(3, 5);
      var dayOfA = dateOfA.slice(0, dateOfA.indexOf("-"));
      var dayOfB = dateOfB.slice(0, dateOfB.indexOf("-"));
      var monthOfA = dateOfA.slice(3, 5);
      var monthOfB = dateOfB.slice(3, 5);
      var yearOfA = dateOfA.slice(6);
      var yearOfB = dateOfB.slice(6);
      var d1 = new Date(yearOfA, monthOfA.replace(/^0+/, ""), dayOfA);
      var d2 = new Date(yearOfB, monthOfB.replace(/^0+/, ""), dayOfB);
      if (d1.getTime() === d2.getTime()) {
        if (hourOfA === hourOfB) {
          if (minuteOfA === minuteOfB) {
            tmp = false;
          } else if (minuteOfA > minuteOfB) {
            tmp = false;
          } else {
            tmp = true;
          }
        } else if (hourOfA > hourOfB) {
          tmp = false;
        } else {
          tmp = true;
        }
      } else if (d1.getTime() > d2.getTime()) {
        tmp = false;
      } else {
        tmp = true;
      }
      return tmp;
    },
    compareConditionOfVoucher(a, b, c, d) {
      // a: sutt
      // b: use limit
      // c: distance
      // d: date expired
      // console.log("a: " + a);
      // console.log("b: " + b);
      // console.log("c: " + c);
      // console.log("d: " + d);
      //nếu ngày hết hạn bé hơn ngày hiện tại

      // if (d === true) {
      //   console.log(0);
      //   return true;
      // } else {
      //   //nếu lượt sử dụng bằng 0
      //   if (b === true) {
      //     return true;
      //   } else {
      //     if (a === false && c === false) {
      //       console.log(3);
      //       return false;
      //     } else if (a === true && c === true) {
      //       console.log(2);
      //       return true;
      //     } else if (a === false || c === false) {
      //       console.log(1);
      //       if (a === true) {
      //         console.log(1.1);
      //         return true;
      //       }
      //       if (c === true) {
      //         console.log(1.2);
      //         return true;
      //       }
      //     }

      //   }
      // }
      // return false;
      // return d === true ? true : false;

      return d === true
        ? true
        : b === true
        ? true
        : a === false && c === false
        ? false
        : a === true && c === true
        ? true
        : a === false || c === false
        ? a === true
          ? true
          : c === true
          ? true
          : false
        : false;
    },
    applyVoucher() {
      let params = {
        code: this.voucher.code,
        partner_id: this.slug,
      };
      this.isDisabled = true;
      if (this.voucher.distance_condition !== null)
        params.distance = this.distance;
      this.applyVouchers(params)
        .then((res) => {
          openToastMess("Apply Voucher Successfully!", "success");
          this.subTotal = res.subtotal;
          this.discount = res.voucher.discount;
          this.voucherObjFromSer = res;
          // console.log(this.voucherObjFromSer);
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.isDisabled = false;
          this.getVouchersFlPartner({ partner_id: this.slug }).then((res) => {
            // console.log(res);
          });
        });
    },
    cancelVoucher() {
      let params = {
        voucher_id: this.voucher.id,
        partner_id: this.slug,
      };
      this.isDisabled = true;
      this.cancelVouchers(params)
        .then((res) => {
          // console.log(res);
          openToastMess("Cancel Voucher Successfully!", "success");
          this.subTotal = res.subtotal;
          this.discount = 0;
          this.voucherObjFromSer = {};
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.isDisabled = false;
          this.getVouchersFlPartner({ partner_id: this.slug }).then((res) => {
            // console.log(res);
          });
        });
    },
    proceedToCheckout() {
      // if (!this.$v.user.longitude.required || !this.$v.user.latitude.required) {
      //   openToastMess("Please choose delivery location", "error");
      // } else {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid && !this.errMess) {
        let params = {
          name: this.user.name,
          phone_number: this.user.phone_number,
          address: this.user.address.name,
          partner_id: this.slug,
          shipping_fee: this.shipping_fee,
          type_checkout: this.user.type_checkout,
          longitude: this.user.address.longitude,
          latitude: this.user.address.latitude,
        };
        if (this.voucherObjFromSer.hasOwnProperty("voucher")) {
          params.discount = this.voucherObjFromSer.voucher.discount;
          params.voucher_id = this.voucherObjFromSer.voucher.id;
        }
        // console.log(params);
        if (this.distance <= 15) {
          $("#loadMe").modal("show");
          this.getPartners()
            .then((res) => {
              let partnerObj = this.getPartnersLocal.find(
                (obj) => obj.id == this.slug
              );
              this.partnerStatus = partnerObj.status;
              if (this.partnerStatus === "open") {
                this.createOrder(params)
                  .then((res) => {
                    $("#loadMe").modal("hide");
                    openToastMess("Order created", "success", "bottom-left");
                    this.$router.push({
                      name: "OrderConfirm",
                      params: { slug: this.slug },
                    });
                    // console.log(res);
                  })
                  .catch((error) => {
                    $("#loadMe").modal("hide");
                    openToastMess(error, "error", "bottom-left");
                  });
              } else {
                $("#loadMe").modal("hide");
                openToastMess("Food store is Close", "warning", "bottom-left");
              }
            })
            .catch((error) => {
              $("#loadMe").modal("hide");
              openToastMess(error, "error", "bottom-left");
            });
        } else {
          this.isDisabled = true;
          openToastMess(
            "Your location is so far from food store",
            "error",
            "bottom-left"
          );
        }
      }
      // }
    },
    // getLocationPartner(location) {
    //   this.$data.user.longitude = location.lng;
    //   this.$data.user.latitude = location.lat;
    // },
    getShipDistance() {
      let addressUserForCalcDistance = {
        partner_id: this.slug,
        latitude: this.getAddressLocal[0].latitude,
        longitude: this.getAddressLocal[0].longitude,
      };
      this.getDistance(addressUserForCalcDistance)
        .then((res) => {
          this.shipping_fee = res.shipping_fee;
          this.distance = res.distance;
          res.distance > 15
            ? (this.isDisabled = true)
            : (this.isDisabled = false);
          if (this.isDisabled) {
            openToastMess("Your location is so far from food store", "error");
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    getUserInfo() {
      this.user.name = this.getUser.name;
      this.user.email = this.getUser.email;
      this.user.phone_number = this.getUser.phone_number;
    },
    compare(a, b) {
      return isFinite((a = this.convert(a).valueOf())) &&
        isFinite((b = this.convert(b).valueOf()))
        ? (a > b) - (a < b)
        : NaN;
    },
    inRange(d, start, end) {
      return isFinite((d = this.convert(d).valueOf())) &&
        isFinite((start = this.convert(start).valueOf())) &&
        isFinite((end = this.convert(end).valueOf()))
        ? start <= d && d <= end
        : NaN;
    },
    convert(d) {
      return d.constructor === Date
        ? d
        : d.constructor === Array
        ? new Date(d[0], d[1], d[2])
        : d.constructor === Number
        ? new Date(d)
        : d.constructor === String
        ? new Date(d)
        : typeof d === "object"
        ? new Date(d.year, d.month, d.date)
        : typeof d === "string"
        ? new Date(d)
        : NaN;
    },
    // validateDeliveryTime(delivery_time) {
    //   let partnerObj = this.getPartnersLocal.find((obj) => obj.id == this.slug);

    //   let time_close = partnerObj.time_close.slice(
    //     0,
    //     partnerObj.time_close.lastIndexOf(":")
    //   );
    //   let time_open = partnerObj.time_open.slice(
    //     0,
    //     partnerObj.time_open.lastIndexOf(":")
    //   );

    //   // console.log(time_open + "===" + time_close);
    //   let hourOfDeliveryTime = delivery_time.slice(
    //     0,
    //     delivery_time.indexOf(":")
    //   );
    //   let hourOfPartnerOpenTime = partnerObj.time_open.slice(
    //     0,
    //     partnerObj.time_open.indexOf(":")
    //   );
    //   if (hourOfDeliveryTime === hourOfPartnerOpenTime) {
    //     let minuteDeliveryTime = delivery_time.slice(
    //       delivery_time.indexOf(":") + 1
    //     );
    //     let minutePartnerOpenTime = time_open.slice(time_open.indexOf(":") + 1);
    //     if (minuteDeliveryTime - minutePartnerOpenTime < 20) {
    //       this.errMess = true;
    //       this.errMessage = `Delivery time must be after time open at least 20'. Time open is ${time_open}`;
    //     }
    //   }

    //   if (delivery_time < time_open) {
    //     this.errMess = true;
    //     this.errMessage = "Delivery time must be after time open";
    //   }
    //   if (delivery_time > time_close) {
    //     this.errMess = true;
    //     this.errMessage = "Delivery time must be before time close";
    //   }
    // },
    getCartContent() {
      let partnerObj = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      this.partnerStatus = partnerObj.status;
      let token = localStorage.getItem("token");
      if (token && this.partnerStatus === "open") {
        let params = {
          partner_id: this.slug,
        };
        this.getCart(params)
          .then((res) => {
            // console.log(res);
            this.subTotal = res.total_price_cart;
          })
          .catch((error) => {
            if (typeof error == "object") {
              openToastMess(error.toString(), "error");
            } else {
              openToastMess(error, "error");
            }
          });
      }
    },
    getResult() {
      this.subTotal = this.getSubtotal;
      if (this.getAddressLocal.length == 0) {
        openToastMess("User have no address", "warning");
      } else {
        this.user.address = this.getAddressLocal[0];
        this.getShipDistance();
      }
      this.getUserInfo();
    },
    getProductsInCart() {
      this.cart = this.getCartLocal;
      let idOfProducts = this.cart.map((item) => item.product_id);
      this.qtyOfProducts = this.cart.map((item) => item.quantity);
      const prods = [];

      for (let i = 0; i < idOfProducts.length; i++) {
        this.getPartnersLocal.find((pl) =>
          pl.categories.find((cat) => {
            cat.products.find((obj) => {
              if (obj.id == idOfProducts[i]) {
                obj.quantity = this.qtyOfProducts[i];
                // this.subTotal += obj.price * obj.quantity;
                prods.push({ ...obj });
              }
            });
          })
        );
      }
      this.products = prods;
      this.subTotal = this.getSubTotal(this.products);
    },
    getSubTotal(array) {
      return array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
    },
  },
  created() {
    this.setShoppingStatus(true);
    this.getAddress().then((res) => {
      // this.userObj();
      this.showUser();
      this.getVouchersFlPartner({ partner_id: this.slug });
      if (
        this.getSubtotal === 0 ||
        this.getSubtotal === null ||
        this.getSubtotal === undefined ||
        this.getSubtotal < 0
      )
        this.getCartContent();
      this.getResult();
      this.coinsUsers();
    });
  },
  watch: {
    cartLocalChange() {
      this.getProductsInCart();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_mixins.scss";
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
      margin-bottom: 4px !important;
      font-size: 1.8rem !important;
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
  @include buttonStyle();
}

.btn-apply,
.btn-cancel {
  line-height: 19px;
  text-align: center;
  border-radius: unset !important;
  text-transform: uppercase;
  color: #fff !important;
  margin-right: 20px;
  @include buttonStyle();
}

.current {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

/** SPINNER CREATION **/

.loader {
  position: relative;
  text-align: center;
  margin: 15px auto 35px auto;
  z-index: 9999;
  display: block;
  width: 80px;
  height: 80px;
  border: 10px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

/** MODAL STYLING **/

.modal-content {
  top: 30vh;
  border-radius: 0px;
  box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.7);
}

.modal-backdrop.show {
  opacity: 0.75;
}

.loader-txt {
  p {
    font-size: 13px;
    color: #666;
    small {
      font-size: 11.5px;
      color: #999;
    }
  }
}

.shop.checkout .single-widget .checkbox label::before,
.shop.checkout .single-widget .checkbox label::after {
  display: none;
}

.coin-payment,
.cod-payment {
  display: flex;
  margin-bottom: 10px;
  input {
    margin: 0 !important;
  }
  label {
    padding-left: 10px !important;
  }
}

.order-details-title::after {
  display: none;
}

.disabled {
  pointer-events: none;
  color: #ccc !important;
  cursor: default;
}

.shop.checkout .nice-select .list {
  padding-top: 17px;
  overflow: auto !important;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  li {
    border-bottom: 1px solid #ccc;
  }
}

.nice-select .option {
  display: flex;
  margin: 5px 12px 25px 12px;
  overflow: hidden;
  // border: 1px solid #ccc;
  padding: 0 !important;
  border-radius: 5px !important;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  span {
    padding: 4px 10px 4px 0;
  }
  .voucher-code {
    align-self: center;
    font-weight: 700;
    color: #f79c2d;
    position: relative;
    padding: 10px;
    word-wrap: break-word;
    // width: 73px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      overflow: visible;
      width: 150px;
    }
  }
  .constraint-voucher {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-style: italic;
    font-size: 1.5rem;
    line-height: 1rem;
    padding: 10px 10px 0 0;
    overflow-x: scroll;
    div {
      margin-bottom: 10px;
    }
    .condition {
      color: #03c312;
    }
    .description {
      color: #f79c2d;
    }
    .expiry-date {
      color: red;
    }
    .usage-limit {
      color: blue;
    }
    .distance-condition {
      color: purple;
    }
  }

  .constraint-voucher::-webkit-scrollbar {
    height: 12px;
    // background-color: #eff1f5;
  }

  .constraint-voucher::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }

  .constraint-voucher::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #515769;
    border: 2px solid #eff1f5;
  }
}
</style>