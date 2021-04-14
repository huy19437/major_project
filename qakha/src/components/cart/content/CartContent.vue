<template>
  <div class="shopping-cart section">
    <div
      v-if="getCartLocal.length == 0 ? true : false"
      class="alert alert-warning"
      role="alert"
    >
      Go back and push products into the cart!
    </div>
    <div v-else class="container">
      <div class="row">
        <div class="col-12">
          <!-- Shopping Summery -->
          <table class="table shopping-summery">
            <thead>
              <tr class="main-hading">
                <th>PRODUCT</th>
                <th>NAME AND DESCRIPTION</th>
                <th class="text-center">UNIT PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center">DELETE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="image" data-title="No">
                  <img src="https://via.placeholder.com/100x100" alt="#" />
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
                      Subtotal<span>{{ roundToTwo(subTotal) }} VNĐ</span>
                    </li>
                    <li class="last"></li>
                  </ul>
                  <div class="button5">
                    <router-link
                      class="btn btn-right"
                      :to="{
                        name: 'Checkout',
                        params: { slug: slug },
                      }"
                    >
                      Checkout
                    </router-link>
                    <a href="/" class="btn btn-right">Continue shopping</a>
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
      updateCart: "cart/updateCart",
      deleteCart: "cart/deleteCart",
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
      console.log(params);
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
    getSubTotal(array) {
      return array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
    },
  },
  created() {
    this.getResult();
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
  -webkit-line-clamp: 2;
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