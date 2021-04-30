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
              diabledPointer: partnerStatus === 'open' ? false : true,
            }"
            title="Add to cart"
            @click="addToCart(product)"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
    <div class="product-content">
      <h3>
        <router-link
          :to="{
            name: 'ProductDetail',
            params: { slug: product.id },
          }"
        >
          {{ product.name }}
        </router-link>
        <!-- <a href="product-details">{{ product.name }}</a> -->
      </h3>
      <div class="product-price">
        <span>{{ product.price }} VNĐ</span>
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
    addToCart(product) {
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
    },
  },
};
</script>

<style>
</style>