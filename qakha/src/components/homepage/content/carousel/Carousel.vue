<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 carousel-section">
        <h2>Trending <b>Products</b></h2>
        <div
          id="myCarousel"
          class="carousel slide"
          data-ride="carousel"
          data-interval="0"
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
                      <img
                        src="@/assets/img/qr_code.png"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="thumb-content">
                      <h4>{{ product.name }}</h4>
                      <p class="item-price">
                        <span>${{ product.price }}</span>
                      </p>
                      <a @click="addToCart(product.id)" class="btn btn-primary"
                        >Add to Cart</a
                      >
                    </div>
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
                      <img
                        src="@/assets/img/qr_code.png"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="thumb-content">
                      <h4>{{ product.name }}</h4>
                      <p class="item-price">
                        <span>${{ product.price }}</span>
                      </p>
                      <a @click="addToCart(product.id)" class="btn btn-primary"
                        >Add to Cart</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel controls -->
          <a
            class="carousel-control-prev"
            href="#myCarousel"
            data-slide="prev"
            style="width: 3%"
          >
            <i class="fa fa-angle-left"></i>
          </a>
          <a
            class="carousel-control-next"
            href="#myCarousel"
            data-slide="next"
            style="width: 3%"
          >
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Carousel",
  data() {
    return {
      partner: {},
      categories: [],
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
      console.log(params);
      // this.addProductToCart(params);
    },
    setTrendingProducts() {
      var productsHasTrend = [];
      var tmp = [];
      var index = 0;
      this.getPartnersLocal.filter((partner) =>
        partner.categories.filter((cat) =>
          cat.products.filter((product) => {
            if (product.quantity_sold > 7) {
              productsHasTrend.push(product);
            }
          })
        )
      );
      for (let j = 0; j < Math.ceil(productsHasTrend.length / 4); j++) {
        for (let i = 0; i < 4; i++) {
          if (index == productsHasTrend.length) break;
          tmp.push(productsHasTrend[index]);
          index++;
        }
        this.trendProducts.push(tmp);
        tmp = [];
      }
      productsHasTrend = [];
      this.subTrendProductsArray();
    },
    subTrendProductsArray() {
      this.firstRowOfTrendProducts = this.trendProducts[0];
      this.restOfTrendProducts = this.trendProducts.slice(1);
    },
    getResult() {
      this.setTrendingProducts();
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style lang="scss">
.carousel-section {
  padding: 50px 0;
}

.carousel-control-next .carousel-control-prev {
  width: 3%;
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
// h2 b {
//   color: #ffc000;
//   font-weight: 500;
// }
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
      i {
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    .thumb-wrapper {
      text-align: center;
    }
    .thumb-content {
      padding: 15px;
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
// .carousel .carousel-item {
//   min-height: 330px;
//   text-align: center;
//   overflow: hidden;
// }
// .carousel .carousel-item .img-box {
//   height: 160px;
//   width: 100%;
//   position: relative;
// }
// .carousel .carousel-item img {
//   max-width: 100%;
//   max-height: 100%;
//   display: inline-block;
//   position: absolute;
//   bottom: 0;
//   margin: 0 auto;
//   left: 0;
//   right: 0;
// }
// .carousel .carousel-item h4 {
//   font-size: 18px;
//   margin: 10px 0;
// }
// .carousel .carousel-item .btn {
//   color: #333;
//   border-radius: 0;
//   font-size: 11px;
//   text-transform: uppercase;
//   font-weight: bold;
//   background: none;
//   border: 1px solid #ccc;
//   padding: 5px 10px;
//   margin-top: 5px;
//   line-height: 16px;
// }
// .carousel .carousel-item .btn i {
//   font-size: 14px;
//   font-weight: bold;
//   margin-left: 5px;
// }
// .carousel .thumb-wrapper {
//   text-align: center;
// }
// .carousel .thumb-content {
//   padding: 15px;
// }

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
// .carousel .item-price {
//   font-size: 13px;
//   padding: 2px 0;
// }
// .carousel .item-price strike {
//   color: #999;
//   margin-right: 5px;
// }
// .carousel .item-price span {
//   color: #86bd57;
//   font-size: 110%;
// }
// .carousel .carousel-indicators {
//   bottom: -50px;
// }
.carousel-indicators li,
.carousel-indicators li.active {
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  border-color: transparent;
  border: none;
}

// .carousel-indicators li {
//   background: rgba(0, 0, 0, 0.2);
// }
// .carousel-indicators li.active {
//   background: rgba(0, 0, 0, 0.6);
// }
.star-rating {
  li {
    padding: 0;
  }
  i {
    font-size: 14px;
    color: #ffc000;
  }
}
// .star-rating li {
//   padding: 0;
// }
// .star-rating i {
//   font-size: 14px;
//   color: #ffc000;
// }
</style>