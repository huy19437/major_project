<template>
  <div id="bestseller" class="container">
    <div class="row">
      <div class="col-md-12 carousel-section">
        <h2>
          {{ $t("carousel.bestSeller") }} <b>{{ $t("carousel.products") }}</b>
        </h2>
        <div
          id="myCarousel"
          class="carousel slide"
          data-ride="carousel"
          data-interval="3000"
        >
          <!-- Carousel indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <!-- Wrapper for carousel items -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div
                  v-for="product in firstRowOfTrendProducts"
                  :key="product.id"
                  class="col-sm-3"
                >
                  <div class="thumb-wrapper">
                    <div class="img-box">
                      <router-link
                        :to="{
                          name: 'ProductDetail',
                          params: { slug: product.id },
                        }"
                      >
                        <img
                          :src="`${product.image.url}`"
                          class="img-fluid"
                          alt=""
                        />
                      </router-link>
                    </div>
                    <div class="thumb-content">
                      <h4>
                        <router-link
                          :to="{
                            name: 'ProductDetail',
                            params: { slug: product.id },
                          }"
                        >
                          {{ product.name }}
                        </router-link>
                      </h4>
                      <p class="item-price">
                        <span>{{ product.price | formatVND }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="home-product-item__favourite">
                    <span>
                      {{ $t("listProducts.quantity_sold") }}
                    </span>
                    <span class="qty-number"> {{ product.quantity_sold }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-for="trend in restOfTrendProducts"
              :key="trend.id"
              class="carousel-item"
            >
              <div class="row">
                <div
                  v-for="product in trend"
                  :key="product.id"
                  class="col-sm-3"
                >
                  <div class="thumb-wrapper">
                    <div class="img-box">
                      <router-link
                        :to="{
                          name: 'ProductDetail',
                          params: { slug: product.id },
                        }"
                      >
                        <img
                          :src="`${product.image.url}`"
                          class="img-fluid"
                          alt=""
                        />
                      </router-link>
                    </div>
                    <div class="thumb-content">
                      <h4>
                        <router-link
                          :to="{
                            name: 'ProductDetail',
                            params: { slug: product.id },
                          }"
                        >
                          {{ product.name }}
                        </router-link>
                      </h4>
                      <p class="item-price">
                        <span>{{ product.price | formatVND }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="home-product-item__favourite">
                    <span>
                      {{ $t("listProducts.quantity_sold") }}
                    </span>
                    <span class="qty-number"> {{ product.quantity_sold }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel controls -->
          <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
            <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control-next" href="#myCarousel" data-slide="next">
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _, { map } from "underscore";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "Carousel",
  data() {
    return {
      partner: {},
      categories: [],
      partnersFromSer: [],
      trendProducts: [],
      slug: this.$route.params.slug,
      firstRowOfTrendProducts: [],
      restOfTrendProducts: [],
    };
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
    }),
  },
  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
      getPartners: "partner/getPartners",
    }),
    addToCart(id) {
      this.partner = this.getPartnersLocal.find((pl) =>
        pl.categories.find((cat) => cat.products.find((obj) => obj.id == id))
      );
      this.partnerId = this.partner.id;
      let params = {
        product_id: id,
        partner_id: this.partner.id,
        quantity: 1,
      };
      // console.log(params);
      this.addProductToCart(params);
    },
    setTrendingProducts() {
      this.trendProducts = [];
      var productsHasTrend = [];
      var tmp = [];
      var index = 0;
      this.partnersFromSer.filter((pl) =>
        // this.getPartnersLocal.filter((pl) =>
        pl.categories.filter((cat) =>
          cat.products.filter((product) => {
            // if (product.quantity_sold > 10) {
            productsHasTrend.push(product);
            // }
          })
        )
      );

      // productsHasTrend
      //   .sort(function (a, b) {
      //     return a.quantity_sold - b.quantity_sold;
      //   })
      //   .reverse();

      var sortedObjs = _.sortBy(productsHasTrend, "quantity_sold")
        .reverse()
        .slice(0, 40);
      // var sortedObjs = productsHasTrend.slice(0, 20);
      sortedObjs = sortedObjs.filter(
        (item) => !item.status.includes("disabled")
      );

      for (let j = 0; j < Math.ceil(sortedObjs.length / 4); j++) {
        for (let i = 0; i < 4; i++) {
          if (index == sortedObjs.length) break;
          tmp.push(sortedObjs[index]);
          index++;
        }
        this.trendProducts.push(tmp);
        tmp = [];
      }
      this.subTrendProductsArray();
    },
    subTrendProductsArray() {
      this.firstRowOfTrendProducts = this.trendProducts[0];
      this.restOfTrendProducts = this.trendProducts.slice(1);
    },
    getPartnersFromSer() {
      this.getPartners()
        .then((res) => {
          // console.log("call here");
          this.partnersFromSer = this.getPartnersLocal;
          this.setTrendingProducts();
        })
        .catch((err) => {
          // console.log(err);
          openToastMess(err, "error");
        });
    },
  },
  created() {
    // this.setTrendingProducts();
    this.getPartnersFromSer();
  },
};
</script>

<style lang="scss">
.carousel-section {
  padding: 50px 0;
}

.carousel-control-next,
.carousel-control-prev {
  width: 3% !important;
  background-color: #fff !important;
}
h2 {
  color: #000;
  font-size: 26px;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  margin: 80px 0 80px;
  font-weight: 600;
  b {
    color: #ffc000;
    font-weight: 500;
  }
}

h2::after {
  content: "";
  width: 100px;
  position: absolute;
  margin: 0 auto;
  height: 4px;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  right: 0;
  bottom: -20px;
}

.carousel {
  margin: 50px auto;
  padding: 0 70px;
  .carousel-item {
    min-height: 330px;
    text-align: center;
    overflow: hidden;
    padding: 0 3px;
    .img-box {
      height: 160px;
      width: 100%;
      position: relative;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      display: inline-block;
      position: absolute;
      bottom: 0;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
    h4 {
      font-size: 18px;
      margin: 10px 0;
    }
    .btn {
      color: #333;
      border-radius: 0;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: bold;
      background: none;
      border: 1px solid #ccc;
      padding: 5px 10px;
      margin-top: 5px;
      line-height: 16px;
      &:hover {
        background: #f7941d !important;
        border-color: #f7941d !important;
      }
      i {
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    .thumb-wrapper {
      text-align: center;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      border: 1px solid #eeeeee;
      border-radius: 10px;
      &:hover {
        -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
        box-shadow: rgb(50 50 93 / 25%) 0px 19px 10px -13px,
          rgb(0 0 0 / 30%) 0px 8px 16px -8px;
      }
    }
    .thumb-content {
      padding: 15px;
      h4 {
        a {
          color: #000;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          &:hover {
            text-decoration: none;
            color: #f7941d;
          }
        }
      }
    }
    .item-price {
      font-size: 13px;
      padding: 2px 0;
      strike {
        color: #999;
        margin-right: 5px;
      }
      span {
        color: #86bd57;
        font-size: 110%;
      }
    }
    .carousel-indicators {
      bottom: -50px;
      li {
        background: rgba(0, 0, 0, 0.2);
      }
      li.active {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.carousel .carousel-item .btn:hover,
.carousel .carousel-item .btn:focus {
  color: #fff;
  background: #000;
  border-color: #000;
  box-shadow: none;
}

.carousel-control-prev,
.carousel-control-next {
  height: 100px;
  width: 20px;
  background: none;
  margin: auto 0;
  background: rgba(0, 0, 0, 0.2);
}
.carousel-control-prev i,
.carousel-control-next i {
  font-size: 30px;
  position: absolute;
  top: 50%;
  display: inline-block;
  margin: -16px 0 0 0;
  z-index: 5;
  left: 0;
  right: 0;
  color: rgba(0, 0, 0, 0.8);
  text-shadow: none;
  font-weight: bold;
}
.carousel-control-prev i {
  margin-left: -3px;
}
.carousel-control-next i {
  margin-right: -3px;
}
.carousel-indicators li,
.carousel-indicators li.active {
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  border-color: transparent;
  border: none;
}

.star-rating {
  li {
    padding: 0;
  }
  i {
    font-size: 14px;
    color: #ffc000;
  }
}

.img-fluid {
  width: 100%;
  height: 100% !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
}

.home-product-item__favourite {
  position: absolute;
  z-index: 1;
  top: 13px;
  left: 11px;
  color: #b7b0b0;
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
    color: red;
  }
}
</style>