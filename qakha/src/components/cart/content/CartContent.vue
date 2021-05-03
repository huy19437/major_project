<template>
  <div class="shopping-cart section">
    <div
      v-if="getCartLocal.length == 0 ? true : false"
      class="alert alert-warning"
      role="alert"
    >
      {{ $t("cartContent.goBack") }}
    </div>
    <div v-else class="container">
      <div class="page-header">
        <h1>{{ partnerName }}</h1>
        <h4>{{ partnerAddress }}</h4>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- Shopping Summery -->
          <table class="table shopping-summery">
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 30%" />
              <col style="width: 10%" />
              <col style="width: 12%" />
              <col style="width: 20%" />
              <col style="width: 2%" />
            </colgroup>
            <thead>
              <tr class="main-hading">
                <th>{{ $t("cartContent.table.product") }}</th>
                <th>{{ $t("cartContent.table.desc") }}</th>
                <th class="text-center">
                  {{ $t("cartContent.table.unitPrice") }}
                </th>
                <th class="text-center">
                  {{ $t("cartContent.table.quantity") }}
                </th>
                <th class="text-center">{{ $t("cartContent.table.total") }}</th>
                <th class="text-center">
                  {{ $t("cartContent.table.delete") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="image" data-title="No">
                  <img :src="`${product.image.url}`" alt="#" />
                </td>
                <td class="product-des" data-title="Description">
                  <p class="product-name">{{ product.name }}</p>
                  <p class="product-des">
                    {{ product.description }}
                  </p>
                </td>
                <td class="price" data-title="Price">
                  <span>{{ product.price }} VNĐ</span>
                </td>
                <td class="qty" data-title="Qty">
                  <!-- Input Order -->
                  <InputOrder
                    @inc="
                      (value) => {
                        product.quantity = value;
                        updateProduct(product.id, product.quantity);
                      }
                    "
                    @dec="
                      (value) => {
                        product.quantity = value;
                        updateProduct(product.id, product.quantity);
                      }
                    "
                    :quantity="product.quantity"
                  />
                  <!--/ End Input Order -->
                </td>
                <td class="total-amount" data-title="Total">
                  <span>
                    {{ roundToTwo(product.price * product.quantity) }} VNĐ
                  </span>
                </td>
                <td class="action delete">
                  <a @click="deleteProductInCart(product.id)"
                    ><i class="ti-trash remove-icon"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
          <!--/ End Shopping Summery -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- Total Amount -->
          <div class="total-amount">
            <div class="row">
              <!-- <div class="col-lg-8 col-md-5 col-12">
                <div class="left">
                  <div class="coupon">
                    <form action="#" target="_blank" class="coupon-input">
                      <input name="Coupon" placeholder="Enter Your Voucher" />
                      <button class="btn">Apply</button>
                    </form>
                  </div>
                  <div class="checkbox">
                    <label class="checkbox-inline" for="2"
                      ><input name="news" id="2" type="checkbox" /> Shipping
                      (+10$)</label
                    >
                  </div>
                </div>
              </div> -->
              <div class="col-lg-4 col-md-7 col-12">
                <div class="right">
                  <ul>
                    <li>
                      {{ $t("cartContent.Subtotal")
                      }}<span>{{ roundToTwo(subTotal) }} VNĐ</span>
                    </li>
                    <li class="last"></li>
                  </ul>
                  <div class="button5">
                    <a
                      :disabled="!isHaveItemInCart"
                      class="btn btn-right"
                      @click="gotoCheckout()"
                    >
                      {{ $t("cartContent.Checkout") }}
                    </a>
                    <a href="/" class="btn btn-right">
                      {{ $t("cartContent.continueShipping") }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--/ End Total Amount -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import InputOrder from "../input_order/InputOrder";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "CartContent",
  components: { InputOrder },
  data() {
    return {
      cart: [],
      partner: {},
      products: [],
      qtyOfProducts: [],
      subTotal: 0,
      toTal: 0,
      slug: this.$route.params.slug,
      partnerStatus: "",
      isHaveItemInCart: false,
      partnerName: "",
      partnerAddress: "",
    };
  },
  computed: {
    ...mapGetters({
      getCartLocal: "cart/getCartLocal",
      getPartnerId: "partner/getPartnerId",
      getPartnersLocal: "partner/getPartnersLocal",
    }),
    cartLocalChange() {
      this.getCartLocal;
    },
  },
  methods: {
    ...mapActions({
      setShoppingStatus: "cart/setShoppingStatus",
      updateCart: "cart/updateCart",
      deleteCart: "cart/deleteCart",
      getCart: "cart/getCart",
    }),
    ...mapMutations({
      setSubTotal: "order/setSubTotal",
    }),
    updateProduct(id, quantity) {
      this.partner = this.getPartnersLocal.find((pl) =>
        pl.categories.find((cat) => cat.products.find((obj) => obj.id == id))
      );
      let params = {
        product_id: id,
        quantity: quantity,
        partner_id: this.partner.id,
      };
      // console.log(params);
      this.updateCart(params)
        .then((res) => {
          if (res) {
            this.getResult();
            openToastMess("Product have been updated", "success");
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    deleteProductInCart(id) {
      this.partner = this.getPartnersLocal.find((pl) =>
        pl.categories.find((cat) => cat.products.find((obj) => obj.id == id))
      );
      let params = {
        product_id: id,
        partner_id: this.partner.id,
      };
      this.deleteCart(params)
        .then((res) => {
          if (res) {
            this.getResult();
            openToastMess("Product have been deleted", "success");
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    },
    getResult() {
      this.cart = this.getCartLocal;
      if (this.cart != null && this.cart != undefined) {
        if (this.cart.length > 0) {
          this.isHaveItemInCart = true;
        } else {
          this.isHaveItemInCart = false;
        }
      }
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
      this.setSubTotal(this.roundToTwo(this.subTotal));
    },
    getCartContent() {
      let partnerObj = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      this.partnerName = partnerObj.name;
      this.partnerAddress = partnerObj.address;
      console.log(partnerObj);

      this.partnerStatus = partnerObj.status;
      let token = localStorage.getItem("token");
      if (token && this.partnerStatus === "open") {
        let params = {
          partner_id: this.slug,
        };
        this.getCart(params)
          .then((res) => {
            // console.log(res);
            this.getResult();
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
    gotoCheckout() {
      let params = {
        partner_id: this.slug,
      };
      this.getCart(params)
        .then((res) => {
          console.log(res);
          if (res.carts.length !== 0) {
            this.directToCheckout();
          }
          if (res.carts.length === 0) {
            this.getCartContent();
          }
        })
        .catch((error) => {
          if (typeof error == "object") {
            openToastMess(error.toString(), "error");
          } else {
            openToastMess(error, "error");
          }
        });
    },
    directToCheckout() {
      if (this.getCartLocal.length != 0) {
        this.$router.push({
          name: "Checkout",
          params: { slug: this.slug || 0 },
        });
      }
    },
    getSubTotal(array) {
      return array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
    },
  },
  created() {
    this.setShoppingStatus(false);
    this.getCartContent();
    // this.getResult();
  },
  watch: {
    cartLocalChange() {
      this.getResult();
    },
  },
};
</script>

<style scoped lang="scss">
.product-des {
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.image {
  img {
    object-fit: contain;
    width: 150px !important;
  }
}

.price {
  span {
    color: #000;
    font-size: 1.5rem;
  }
}

.remove-icon {
  color: #000;
}

.shopping-cart .total-amount {
  .row {
    justify-content: flex-end;
  }
}

.total-amount {
  .right {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .button5 {
    .btn-right {
      line-height: 31px !important;
    }
  }
  .left {
    .coupon {
      .coupon-input {
        display: flex;
      }
    }
  }
}
.action.delete {
  a {
    cursor: pointer;
  }
}
</style>