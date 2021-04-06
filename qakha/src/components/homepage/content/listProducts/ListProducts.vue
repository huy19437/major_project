<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="section-title">
          <h2>Category List</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="product-info">
          <div class="nav-main">
            <!-- Tab Nav -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li
                v-for="category in categories"
                :key="category.id"
                class="nav-item"
              >
                <a
                  class="nav-link"
                  data-toggle="tab"
                  :href="`${category.name}`"
                  role="tab"
                  @click="getProductsByCategory(category.id)"
                  >{{ category.name }}</a
                >
              </li>
            </ul>
            <!--/ End Tab Nav -->
          </div>
          <div class="tab-content" id="myTabContent">
            <!-- Start Single Tab -->
            <div
              v-for="category in categories"
              :key="category.id"
              class="tab-pane fade show active"
              :id="`${category.name}`"
              role="tabpanel"
            >
              <div class="tab-single">
                <div class="row">
                  <div
                    v-for="product in listProducts"
                    :key="product.id"
                    class="col-xl-3 col-lg-4 col-md-4 col-12"
                  >
                    <div class="single-product">
                      <div class="product-img">
                        <router-link to="/product-details">
                          <img
                            class="default-img"
                            src="../../../../assets/logo.png"
                            alt="#"
                          />
                          <img
                            class="hover-img"
                            src="../../../../assets/logo.png"
                            alt="#"
                          />
                          <span class="new">New</span>
                          <span class="price-dec">30% Off</span>
                          <span class="out-of-stock">Hot</span>
                        </router-link>
                        <div class="button-head">
                          <div class="product-action">
                            <a
                              data-toggle="modal"
                              data-target="#exampleModal"
                              title="Quick View"
                              href="#"
                              ><i class="ti-eye"></i><span>Quick Shop</span></a
                            >
                            <a title="Wishlist" href="#"
                              ><i class="ti-heart"></i
                              ><span>Add to Wishlist</span></a
                            >
                            <a title="Compare" href="#"
                              ><i class="ti-bar-chart-alt"></i
                              ><span>Add to Compare</span></a
                            >
                          </div>
                          <div class="product-action-2">
                            <a title="Add to cart" href="#">Add to cart</a>
                          </div>
                        </div>
                      </div>
                      <div class="product-content">
                        <h3>
                          <a href="product-details">{{ product.name }}</a>
                        </h3>
                        <div class="product-price">
                          <span>{{ product.price }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ End Single Tab -->
          </div>
        </div>
      </div>
    </div>

    <!-- <Carousel /> -->
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "ListProducts",
  data() {
    return {
      categories: [],
      cateId: null,
      slug: this.$route.params.slug,
    };
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
    }),
    listProducts() {
      return this.categories.find((category) => {
        return category.id === this.cateId;
      }).products;
    },
  },
  methods: {
    getProductsByCategory(cateId) {
      this.cateId = cateId;
    },
    getResult() {
      if (this.getPartnersLocal.find((obj) => obj.id == this.slug)) {
        this.categories = this.getPartnersLocal.find(
          (obj) => obj.id == this.slug
        ).categories;
      }
      if (this.categories) {
        if (this.categories.length > 0) {
          this.cateId = this.categories[0].id;
        }
      }
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style lang="scss">
/* -------------------------------------------------------------- Box Product -------------------------------------------------------------- */

.section-title {
  padding: 50px 0 10px;
}
.box-product-outer {
  margin-bottom: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.box-product-outer:hover {
  outline: 1px solid #aaa;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}

.tab-content {
  margin-top: 84px;
  .box-product-outer {
    margin-bottom: 0;
  }
}

.box-product-slider-outer {
  padding: 10px;
}

.box-product {
  .img-wrapper {
    position: relative;
    overflow: hidden;
    margin-bottom: 8px;
    .tags {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      overflow: visible;
      width: auto;
      height: auto;
      margin: 0;
      padding: 0;
      vertical-align: inherit;
      border-width: 0;
      background-color: transparent;
      direction: rtl;
    }
    .tags-left {
      left: 0;
      direction: ltr;
    }
  }
  .img-wrapper > :first-child {
    position: relative;
    display: block;
  }
  .img-wrapper > a > img {
    width: 100%;
  }
  h6 {
    a {
      line-height: 1.4;
      color: #000;
      font-weight: 530;
    }
  }
}

.box-product .img-wrapper .tags > .label-tags {
  display: table;
  margin: 1px 0 0 0;
  text-align: left;
  opacity: 0.92;
  filter: alpha(opacity=92);
  direction: ltr;
}

.box-product .img-wrapper .tags > .label-tags:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}

.box-product .img-wrapper .tags > .label-tags a:hover {
  text-decoration: none;
}

.box-product .img-wrapper > .option {
  position: absolute;
  top: auto;
  right: 0;
  bottom: -30px;
  left: 0;
  width: auto;
  height: 28px;
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.55);
}

.box-product .img-wrapper .option > a {
  font-size: 18px;
  font-weight: normal;
  display: inline-block;
  padding: 0 4px;
  color: #fff;
}

.box-product .img-wrapper:hover > .option {
  top: auto;
  bottom: 0;
}

.price {
  margin-bottom: 5px;
  color: #f44336;
  font-size: 0.9rem;
  .price-down {
    margin-left: 5px;
    padding: 2px 5px;
    color: #fff;
    background: #f44336;
  }
}

.price > div {
  font-size: 1.2rem;
}

.price-old {
  position: relative;
  display: inline-block;
  margin-right: 7px;
  color: #666;
}

.price-old:before {
  position: absolute;
  width: 100%;
  height: 60%;
  content: "";
  border-bottom: 1px solid #666;
}

.rating {
  i {
    color: #fc0;
    font-size: 0.9rem;
  }
  a {
    font-size: 0.9rem;
  }
}

.product-sorting-bar {
  border: 1px solid #e5e5e5;
}

.product-info {
  .nav {
    flex-wrap: nowrap;
  }
  .nav-tabs {
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: center;
    padding: 0 160px !important;
    border: none;
    font-size: 1.2rem;
    margin-top: -48px;
    font-weight: 600;
    overflow: hidden;
    &:hover {
      overflow-x: scroll;
    }
    li {
      a {
        color: #000;
      }
    }
    .nav-item {
      margin-bottom: 0;
    }
    .nav-link {
      margin-bottom: 0;
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
}

.product-info .nav-tabs li a.active,
.product-info .nav-tabs li:hover a {
  background: #f7941d;
  color: #fff;
  border-color: transparent;
}
</style>