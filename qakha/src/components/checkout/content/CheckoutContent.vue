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
                      @blur="$v.user.email.$touch()"
                    />
                    <div v-if="$v.user.email.$error">
                      <p class="errorMessage" v-if="!$v.user.email.required">
                        Email is required
                      </p>
                    </div>
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
                <div class="col-lg-6 col-md-6 col-12">
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
                </div>
              </div>
            </form>
            <!--/ End Form -->
          </div>
          <div class="row user-address">
            <GoogleMap @get-location-partner="getLocationPartner" />
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="order-details">
            <!-- Order Widget -->
            <div class="single-widget">
              <h2 class="order-details-title">CART TOTALS</h2>
              <div class="content">
                <ul>
                  <li>Sub Total<span>$330.00</span></li>
                  <li>(+) Shipping<span>$10.00</span></li>
                  <li class="last">Total<span>$340.00</span></li>
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
                  <a @click="checkout" class="btn">proceed to checkout</a>
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
import { mapGetters } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import GoogleMap from "@/components/googlemap/GoogleMap";
export default {
  name: "CheckoutContent",
  components: { GoogleMap },
  data() {
    return {
      country: "Vietnam",
      city: "Đà Nẵng",
      user: {
        name: "",
        email: "",
        phone_number: "",
        address: "",
        longitude: "",
        latitude: "",
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
      longitude: {
        required,
      },
      latitude: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters({
      countriesLocal: "checkout/countriesLocal",
      citiesLocal: "checkout/citiesLocal",
    }),
  },
  methods: {
    checkout() {
      if (!this.$v.user.longitude.required || !this.$v.user.latitude.required) {
        openToastMess("Please choose delivery location", "error");
      } else {
        this.$v.user.$touch();
        console.log(this.$data.user);
      }
    },
    getLocationPartner(location) {
      this.$data.user.longitude = location.lng;
      this.$data.user.latitude = location.lat;
    },
    chooseCountry(name) {
      this.country = name;
    },
    chooseCity(name) {
      this.city = name;
    },
    // openToast(message, type) {
    //   this.$toast.open({
    //     message: message,
    //     type: type,
    //     duration: 5000,
    //     dismissible: true,
    //     position: "top-left",
    //   });
    // },
  },
  created() {
    // this.getResult();
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
</style>