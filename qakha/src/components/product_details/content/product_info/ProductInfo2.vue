<template>
  <div class="container">
    <div class="card">
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img src="http://placekitten.com/400/252" />
              </div>
            </div>
          </div>
          <div class="details col-md-6">
            <h3 class="product-title">{{ products.name }}</h3>
            <div class="rating">
              <div class="stars">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>
              <span class="review-no">41 reviews</span>
            </div>
            <p class="product-description">
              {{ products.description }}
            </p>
            <h4 class="price">
              current price: <span>${{ products.price }}</span>
            </h4>
            <h5 class="sold">
              sold:
              <span class="quantity_sold">{{ products.quantity_sold }}</span>
            </h5>
            <div class="qty">
              <div class="input-group">
                <div class="button minus">
                  <button
                    type="button"
                    class="btn btn-primary btn-number"
                    @click="dec"
                    :disabled="numberProductInCart < 2"
                  >
                    <i class="ti-minus"></i>
                  </button>
                </div>
                <input
                  disabled
                  type="text"
                  class="input-number"
                  :value="`${numberProductInCart}`"
                />
                <div class="button plus">
                  <button
                    type="button"
                    class="btn btn-primary btn-number"
                    @click="inc"
                    :disabled="numberProductInCart > 9"
                  >
                    <i class="ti-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="action">
              <button
                class="add-to-cart btn btn-default"
                type="button"
                style="margin-right: 5px"
                @click="addToCart"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductInfo2",
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
    }),
  },
  data() {
    return {
      products: {},
      partner: {},
      partnerId: 0,
      slug: this.$route.params.slug,
      numberProductInCart: 1,
    };
  },
  methods: {
    ...mapActions({
      setShoppingStatus: "cart/setShoppingStatus",
      addProductToCart: "cart/addProductToCart",
      nowRoute: "auth/nowRoute",
    }),
    inc() {
      this.numberProductInCart++;
    },
    dec() {
      this.numberProductInCart--;
    },
    addToCart() {
      let token = localStorage.getItem("token");
      if (token) {
        let params = {
          product_id: this.products.id,
          partner_id: this.partner.id,
          quantity: this.numberProductInCart,
        };
        this.addProductToCart(params)
          .then((res) => {
            if (res) {
              this.openToast("Product have been added to Cart", "success");
            }
          })
          .catch((error) => {
            this.openToast(error, "error");
          });
      } else {
        this.nowRoute(this.$route.path);
        this.$router.push({ path: "/login" });
      }
    },
    getResult() {
      this.setShoppingStatus(true);
      this.getPartnersLocal.find((obj) =>
        obj.categories.find((obj) => {
          obj.products.find((obj) => {
            if (obj.id == this.slug) {
              this.products = { ...obj };
            }
          });
        })
      );
      this.partner = this.getPartnersLocal.find((pl) =>
        pl.categories.find((cat) =>
          cat.products.find((obj) => obj.id == this.slug)
        )
      );
      this.partnerId = this.partner.id;
    },
    openToast(message, type) {
      this.$toast.open({
        message: message,
        type: type,
        duration: 5000,
        dismissible: true,
        position: "top-left",
      });
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style scoped lang="scss">
.container {
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

.action {
  button {
    a {
      color: #fff;
    }
  }
}

.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.tab-content {
  overflow: hidden;
  margin-top: 0;
}
.tab-content img {
  width: 100%;
  -webkit-animation-name: opacity;
  animation-name: opacity;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.card {
  margin: 50px 0;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}
.wrapper {
  height: 100%;
  align-items: top;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  align-items: flex-start;
  .product-description {
    text-align: left;
  }
  .price {
    font-size: 1.8rem;
    color: #000;
  }
}

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.product-title,
.price,
.sold,
.colors,
.qty {
  text-transform: UPPERCASE;
  font-weight: bold;
}

.checked,
.price span {
  color: #ff9f1a;
}

.product-title,
.rating,
.product-description,
.price,
.vote,
.sold,
.qty {
  margin-bottom: 15px;
}

.product-title {
  margin-top: 0;
}
.qty .input-group {
  display: flex;
  button {
    background-color: #f7941d;
    border-color: #f7941d;
  }
  input {
    text-align: center;
    width: 70px;
  }
}

.quantity_sold {
  margin-right: 10px;
}
.quantity_sold:first-of-type {
  margin-left: 40px;
}

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px;
}
.color:first-of-type {
  margin-left: 20px;
}

.add-to-cart,
.like {
  background: #ff9f1a;
  padding: 1.2em 1.5em;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
}
.add-to-cart:hover,
.like:hover {
  background: #b36800;
  color: #fff;
}

.not-available {
  text-align: center;
  line-height: 2em;
}
.not-available:before {
  font-family: fontawesome;
  content: "\f00d";
  color: #fff;
}

.orange {
  background: #ff9f1a;
}

.green {
  background: #85ad00;
}

.blue {
  background: #0076ad;
}

.tooltip-inner {
  padding: 1.3em;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>