<template>
  <div class="single-product">
    <div class="product-img">
      <router-link
        :to="{
          name: 'ProductDetail',
          params: { slug: product.id },
        }"
      >
        <img class="default-img" :src="`${product.image.url}`" alt="#" />
        <img class="hover-img" :src="`${product.image.url}`" alt="#" />
        <!-- <span class="new"
          >{{ $t("listProducts.quantity_sold") }}:
          {{ product.quantity_sold }}</span
        > -->
      </router-link>
      <div class="button-head">
        <div class="product-action">
          <InputOrderHover
            @inc="
              (value) => {
                numberOfProductToAdd = value;
              }
            "
            @dec="
              (value) => {
                numberOfProductToAdd = value;
              }
            "
            :numberOfProductToAdd="numberOfProductToAdd"
          />
        </div>
        <div class="product-action-2">
          <a
            :class="{
              diabledPointer: checkCondition(partnerStatus, product.qty),
            }"
            title="Add to cart"
            @click="addToCart(product)"
          >
            <font-awesome-icon :icon="['fas', 'cart-plus']" />
            <div class="add-icon">
              {{ $t("listProducts.addToCart") }}
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="home-product-item__favourite">
      <span>
        {{ $t("listProducts.quantity_sold") }}
      </span>
      <span class="qty-number">
        {{ product.quantity_sold }}
      </span>
    </div>
    <div class="product-content">
      <h3>
        <router-link
          :to="{
            name: 'ProductDetail',
            params: { slug: product.id },
          }"
        >
          {{ product.name }} ({{ product.qty }})
        </router-link>
        <!-- <a href="product-details">{{ product.name }}</a> -->
      </h3>
      <div class="product-price">
        <span>{{ product.price | formatVND }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { openToastMess } from "@/services/toastMessage";
import { mapGetters, mapActions } from "vuex";
import InputOrderHover from "./InputOrderHover";
export default {
  props: {
    product: {
      type: Object,
    },
    partnerStatus: {
      type: String,
    },
  },
  data() {
    return {
      numberOfProductToAdd: 1,
      slug: this.$route.params.slug,
    };
  },
  components: {
    InputOrderHover,
  },
  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
      nowRoute: "auth/nowRoute",
    }),
    // formatVND(number) {
    //   return number.toLocaleString("vi-VN", {
    //     style: "currency",
    //     currency: "VND",
    //   });
    // },
    checkCondition(partnerStatus, productQty) {
      if (partnerStatus !== "open") {
        return true;
      } else if (productQty === 0) {
        return true;
      } else {
        return false;
      }
    },
    addToCart(product) {
      if (product.qty !== 0) {
        console.log("2");
        let token = localStorage.getItem("token");
        if (token) {
          let params = {
            product_id: product.id,
            partner_id: this.slug,
            quantity: this.numberOfProductToAdd,
          };
          // console.log(params);
          this.addProductToCart(params)
            .then((res) => {
              if (res) {
                openToastMess("Product have been added to Cart", "success");
              }
            })
            .catch((error) => {
              openToastMess(error, "error");
            });
        } else {
          this.nowRoute(this.$route.path);
          this.$router.push({ path: "/login" });
        }
      } else {
        openToastMess("out of stock, please choose another one", "warning");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.single-product .product-img a span.new {
  right: 5px;
  top: 5px;
}

.home-product-item__favourite {
  position: absolute;
  z-index: 1;
  top: 79px;
  left: 11px;
  color: #f6931d;
  background-color: currentColor;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.6rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 5px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    border-right: 4px solid currentColor;
    border-bottom: 4px solid transparent;
    filter: brightness(60%);
  }
  span {
    color: #fff;
    letter-spacing: 1px;
  }
  .qty-number {
    font-size: 1.9rem;
    font-weight: 600;
    color: #000;
  }
}
</style>