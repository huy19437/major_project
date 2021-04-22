<template>
  <div class="container">
    <div
      v-if="getPartnersLocal.length == 0 ? true : false"
      class="alert alert-warning"
      role="alert"
    >
      Go to the Home page and choose one Restaurant!
    </div>
    <div class="clearfix vi-header">
      <h3 class="vi-left-title pull-left">
        {{ partner.name }} -
        {{ getAveragePoint }}
        <span class="fa fa-star checked avg-point"></span>
      </h3>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="section-title">
          <h2>Categories List</h2>
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
                  @click="getProductsByCategory(category.id, category.name)"
                  >{{ category.name }}</a
                >
              </li>
            </ul>
            <!--/ End Tab Nav -->
          </div>
          <div class="tab-content" id="myTabContent">
            <div id="nz-div-4">
              <h3 class="product-list-title">
                <span>Products List</span>
              </h3>
            </div>
            <!-- Start Single Tab -->
            <div
              v-for="category in categories"
              :key="category.id"
              class="tab-pane fade"
              :class="{ 'active show': isActive(`${category.name}`) }"
              :id="`${category.name}`"
              role="tabpanel"
            >
              <div class="tab-single">
                <div class="row">
                  <div
                    v-for="product in visibleProducts"
                    :key="product.id"
                    class="col-xl-3 col-lg-4 col-md-4 col-12"
                  >
                    <div class="single-product">
                      <div class="product-img">
                        <router-link
                          :to="{
                            name: 'ProductDetail',
                            params: { slug: product.id },
                          }"
                        >
                          <img
                            class="default-img"
                            :src="`${product.image.url}`"
                            alt="#"
                          />
                          <img
                            class="hover-img"
                            :src="`${product.image.url}`"
                            alt="#"
                          />
                          <!-- <span class="new">New</span>
                          <span class="price-dec">30% Off</span>
                          <span class="out-of-stock">Hot</span> -->
                        </router-link>
                        <div class="button-head">
                          <div class="product-action">
                            <a
                              data-toggle="modal"
                              data-target="#exampleModal"
                              title="Quick View"
                              href="#"
                              ><i class="ti-eye"></i><span>Quick View</span></a
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
                            <a
                              :class="{
                                diabledPointer:
                                  partnerStatus === 'open' ? false : true,
                              }"
                              title="Add to cart"
                              @click="addToCart(product.id)"
                              >Add to cart</a
                            >
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
                  </div>
                </div>
              </div>
            </div>
            <!--/ End Single Tab -->
          </div>
        </div>
      </div>
    </div>
    <div class="row pagination-custom">
      <PaginationCustom
        :paginationData="listProducts"
        @page:update="updatePage"
        :currentPage="currentPage"
        :pageSize="pageSize"
      />
    </div>

    <!-- <Carousel /> -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "ListProducts",
  components: {
    PaginationCustom,
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 8,
      categories: [],
      cateId: null,
      slug: this.$route.params.slug,
      activeItem: "",
      partner: {},
      partnerStatus: "",
    };
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
      getNowRoute: "auth/getNowRoute",
      getAveragePoint: "feedback/getAveragePoint",
      getFeedbacksStatus: "feedback/getFeedbacksStatus",
    }),
    listProducts() {
      let tmp = [];
      tmp = this.categories.find((category) => {
        return category.id === this.cateId;
      });
      if (tmp) return tmp.products;
    },
    visibleProducts() {
      return this.listProducts.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    },
    categoriesDataOnChange() {
      return this.categories;
    },
  },
  methods: {
    ...mapActions({
      setShoppingStatus: "cart/setShoppingStatus",
      getCart: "cart/getCart",
      addProductToCart: "cart/addProductToCart",
      nowRoute: "auth/nowRoute",
      partnerId: "partner/partnerId",
      showFeedback: "feedback/showFeedback",
      Feedbacks: "feedback/Feedbacks",
    }),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    addToCart(id) {
      let token = localStorage.getItem("token");
      if (token) {
        let params = {
          product_id: id,
          partner_id: this.slug,
          quantity: 1,
        };
        console.log(params);
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
    getProductsByCategory(cateId, menuItem) {
      this.activeItem = menuItem;
      this.cateId = cateId;
    },
    getFeedBackToShow() {
      if (this.getFeedbacksStatus) {
        // console.log("this.getFeedbacksStatus " + this.getFeedbacksStatus);
        let params = {
          partner_id: this.$route.params.slug,
        };
        // console.log(params);
        this.Feedbacks(params)
          .then((res) => {
            // console.log("hi");
            // console.log(res);
          })
          .catch((error) => {
            openToastMess(error, "error");
          });
      }
    },
    getResult() {
      this.setShoppingStatus(true);
      this.showFeedback(true);
      this.partner = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      this.partnerStatus = this.partner.status;
      let token = localStorage.getItem("token");
      console.log(this.partnerStatus);
      if (token && this.partnerStatus === "open") {
        let params = {
          partner_id: this.slug,
        };
        this.getCart(params)
          .then((res) => {})
          .catch((error) => {
            if (typeof error == "object") {
              openToastMess(error.toString(), "error");
            } else {
              openToastMess(error, "error");
            }
          });
      }
      this.getFeedBackToShow();
      console.log(this.partner);
      this.partnerId(this.partner.id);
      if (this.getPartnersLocal.find((obj) => obj.id == this.slug)) {
        this.categories = this.getPartnersLocal.find(
          (obj) => obj.id == this.slug
        ).categories;
      }
      if (this.categories) {
        if (this.categories.length > 0) {
          this.cateId = this.categories[0].id;
          this.activeItem = this.categories[0].name;
        }
      }
    },
  },
  created() {
    this.getResult();
  },
  watch: {
    categoriesDataOnChange() {
      this.currentPage = 0;
    },
  },
};
</script>

<style lang="scss">
.container {
  .row {
    &.pagination-custom {
      display: contents;
      padding-top: 33px;
    }
    .pagination-wrapper {
      margin-top: 20px;
    }
  }
}
.single-product {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  border: 1px solid #eeeeee;
  border-radius: 7px;
  .product-content {
    padding: 0 20px 20px;
    margin-top: -13px !important;
    h3 {
      a {
        color: #000;
        font-weight: 600 !important;
        font-size: 1.5rem !important;
        color: #000;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        &:hover {
          color: #f7941d;
          text-decoration: none;
        }
      }
    }
    .product-price {
      color: #86bd57;
    }
  }
  &:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
}
.product-img {
  img {
    display: block;
    max-height: 161px;
    height: auto;
    object-fit: cover;
  }
  padding: 12px 12px;
  .product-action {
    margin-right: 12px !important;
  }
  .product-action-2 {
    margin-left: 12px !important;
  }
}

.section-title {
  padding: 50px 0 10px;
  h2 {
    &::after {
      display: none;
    }
  }
}

.tab-content {
  margin-top: 84px;
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
    margin-top: -85px;
    font-weight: 600;
    // overflow: hidden;
    // &:hover {
    //   overflow-x: scroll;
    // }
    li {
      a {
        transition: all 0.4s ease;
        color: #000;
      }
      a.active,
      &:hover a {
        background: transparent;
        color: #f7941d;
        border-color: transparent;
        font-size: 18px;
      }
    }
    .nav-item {
      margin-bottom: 0;
    }
  }
}

/* Partner Title */
.vi-header {
  border-bottom: solid 1px #c35355;
  padding-top: 10%;
}
.vi-left-title {
  width: auto;
  background: #c35355;
  color: #fff;
  padding: 3px 10px;
  position: relative;
  margin: 0;
}
.pull-left {
  float: left;
}
.pull-left {
  margin-left: 0 !important;
}
.vi-left-title a {
  color: #fff;
}
.vi-left-title:after {
  border: 16px solid transparent;
  border-left-color: #c35355;
  border-bottom-color: #c35355;
  position: absolute;
  top: 0;
  left: 100%;
  content: "";
}

/* Product list title */

#nz-div-4 h3.product-list-title :after {
  content: "";
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-left: 20px solid #ea3a3c;
  border-bottom: 0px solid transparent;
  border-right: 0 solid transparent;
  position: absolute;
  top: 0px;
  right: -20px;
}

#nz-div-4 h3.product-list-title :before {
  content: "";
  width: 0;
  height: 0;
  border-width: 40px 20px 0px 0px;
  border-style: solid;
  border-color: transparent;
  border-right-color: #ea3a3c;
  position: absolute;
  top: 0px;
  left: -20px;
}

#nz-div-4 h3.product-list-title span {
  background: #ea3a3c;
  padding: 10px 20px 8px 20px;
  color: white;
  position: relative;
  display: inline-block;
  margin: 0;
}

#nz-div-4 h3.product-list-title {
  text-align: center;
  margin: 45px 0;
  border-bottom: 2px solid #ea3a3c;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
}
.avg-point {
  color: yellow;
}

.diabledPointer {
  pointer-events: none;
  color: #ccc !important;
}
</style>