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
        <span class="fa fa-star checked avg-point"></span> -
        {{ getNumberOfReviews }}
        <span style="color: rgb(0 253 31)">{{ $t("feedback.reviews") }}</span>
      </h3>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="section-title">
          <h2>{{ $t("listProducts.categoriesList") }}</h2>
        </div>
        <div class="nav-main">
          <!-- Tab Nav -->
          <ul
            class="nav nav-tabs mobile-category__list"
            id="myTab"
            role="tablist"
          >
            <li
              v-for="category in categories"
              :key="category.id"
              class="nav-item mobile-category__item"
            >
              <a
                class="mobile-category__link"
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
      </div>
    </div>
    <div class="row list-products">
      <div class="col-12">
        <div class="product-info">
          <div class="tab-content" id="myTabContent">
            <!-- <div id="nz-div-4">
              <h3 class="product-list-title">
                <span>{{ $t("listProducts.productsList") }}</span>
              </h3>
            </div> -->
            <h3 class="product-list-title">
              {{ $t("listProducts.productsList") }}
            </h3>
            <!-- Start Single Tab -->
            <div
              v-for="category in categories"
              :key="category.id"
              class="tab-pane fade"
              :class="{ 'active show': isActive(`${category.name}`) }"
              :id="`${category.name}`"
              role="tabpanel"
            >
              <div v-if="isRendered" class="tab-single">
                <div class="job-filter mb-4 d-sm-flex align-items-center">
                  <div class="job-shortby ml-sm-auto d-flex align-items-center">
                    <form class="form-inline">
                      <div class="form-group mb-0">
                        <label class="justify-content-start mr-2"
                          >{{ $t("listPartners.sortBy") }}:</label
                        >
                        <div class="short-by">
                          <select
                            class="
                              form-control
                              basic-select
                              select2-hidden-accessible
                            "
                            tabindex="-1"
                            aria-hidden="true"
                            style="height: calc(2.25rem + 12px)"
                            v-model="typeOfSort"
                            @change="getSortCondition()"
                          >
                            <option value="">
                              {{ $t("listProducts.sortBy.all") }}
                            </option>
                            <option value="1">
                              {{ $t("listProducts.sortBy.priceUp") }}
                            </option>
                            <option value="2">
                              {{ $t("listProducts.sortBy.priceDown") }}
                            </option>
                            <option value="3">
                              {{ $t("listProducts.sortBy.qtySold") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div
                    v-for="product in visibleProducts"
                    :key="product.id"
                    class="col-xl-3 col-lg-4 col-md-4 col-12"
                  >
                    <!-- <div class="single-product">
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
                          <div class="product-action">
                            <InputOrderHover
                              @inc="
                                (value) => {
                                  product.qty = value;
                                }
                              "
                              @dec="
                                (value) => {
                                  product.qty = value;
                                }
                              "
                            />
                          </div>
                          <div class="product-action-2">
                            <a
                              :class="{
                                diabledPointer:
                                  partnerStatus === 'open' ? false : true,
                              }"
                              title="Add to cart"
                              @click="addToCart(product)"
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
                        </h3>
                        <div class="product-price">
                          <span>{{ product.price }} VNĐ</span>
                        </div>
                      </div>
                    </div> -->
                    <SingleProduct
                      :product="product"
                      :partnerStatus="partnerStatus"
                    />
                  </div>
                </div>
              </div>
              <div v-if="!isRendered" class="row spinner-loading">
                <Spinner :loading="!isRendered" />
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
    <NotifyCloseModal />
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import { openToastMess } from "@/services/toastMessage";
import InputOrderHover from "./InputOrderHover";
import SingleProduct from "./SingleProduct";
import NotifyCloseModal from "@/components/notify_modal/NotifyCloseModal";
import Spinner from "@/components/spinner/Spinner";
import _, { map } from "underscore";
import $ from "jquery";
export default {
  name: "ListProducts",
  components: {
    PaginationCustom,
    InputOrderHover,
    SingleProduct,
    NotifyCloseModal,
    Spinner,
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
      typeOfSort: "",
      isRendered: false,
    };
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
      getIsLoading: "partner/getIsLoading",
      getNowRoute: "auth/getNowRoute",
      getAveragePoint: "feedback/getAveragePoint",
      getNumberOfReviews: "feedback/getNumberOfReviews",
      getFeedbacksStatus: "feedback/getFeedbacksStatus",
    }),
    listProducts() {
      // let tmp = [];
      // tmp = this.categories.find((category) => {
      //   return category.id === this.cateId;
      // });
      // console.log(tmp.products);
      // if (tmp) return tmp.products;
      return this.getSortCondition();
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
    partnersLocalOnChange() {
      return this.getPartnersLocal;
    },
    getIsLoadingOnChange() {
      return this.getIsLoading;
    },
  },
  methods: {
    ...mapActions({
      getPartners: "partner/getPartners",
      setShoppingStatus: "cart/setShoppingStatus",
      getCart: "cart/getCart",
      setCartsNull: "cart/setCartsNull",
      addProductToCart: "cart/addProductToCart",
      nowRoute: "auth/nowRoute",
      partnerId: "partner/partnerId",
      showFeedback: "feedback/showFeedback",
      Feedbacks: "feedback/Feedbacks",
    }),
    ...mapMutations({
      setIsLoading: "partner/setIsLoading",
    }),
    checkIsNotDisable(product) {
      return product.status.includes("disabled");
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    getSortCondition() {
      let tmp = [];
      tmp = this.categories.find((category) => {
        return category.id === this.cateId;
      });
      const typeSort = this.typeOfSort;
      tmp.products = tmp.products.filter((item) => {
        return !item.status.includes("disabled");
      });

      if (typeSort === "" || typeSort === null || typeSort === undefined) {
        if (tmp) return tmp.products;
      } else if (typeSort === "1") {
        let sortedObjs = _.sortBy(tmp.products, "price");
        return sortedObjs;
      } else if (typeSort === "2") {
        let sortedObjs2 = _.sortBy(tmp.products, "price");
        return sortedObjs2.reverse();
      } else if (typeSort === "3") {
        let sortedObjs3 = _.sortBy(tmp.products, "quantity_sold");
        return sortedObjs3.reverse();
      }
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    // addToCart(product) {
    //   console.log("1");
    //   let token = localStorage.getItem("token");
    //   if (token) {
    //     let params = {
    //       product_id: product.id,
    //       partner_id: this.slug,
    //       quantity: product.qty,
    //     };
    //     // console.log(params);
    //     this.addProductToCart(params)
    //       .then((res) => {
    //         if (res) {
    //           openToastMess("Product have been added to Cart", "success");
    //         }
    //       })
    //       .catch((error) => {
    //         openToastMess(error, "error");
    //       });
    //   } else {
    //     this.nowRoute(this.$route.path);
    //     this.$router.push({ path: "/login" });
    //   }
    // },
    getProductsByCategory(cateId, menuItem) {
      this.activeItem = menuItem;
      this.cateId = cateId;
    },
    getFeedBackToShow() {
      if (this.getFeedbacksStatus) {
        let params = {
          partner_id: this.$route.params.slug,
        };
        this.Feedbacks(params)
          .then((res) => {})
          .catch((error) => {
            openToastMess(error, "error");
          });
      }
    },
    getDataCartFromServe(partnerObj) {
      this.partnerStatus = partnerObj.status;
      let token = localStorage.getItem("token");
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
    },
    setQtyForProduct() {
      this.categories.find((cat) => {
        cat.products.find((obj) => {
          obj.qty = 0;
        });
      });
    },
    setCategoriesFromPartnerData(partnerObj) {
      if (partnerObj) {
        this.categories = partnerObj.categories;
        this.setQtyForProduct();
      }
      if (this.categories) {
        if (this.categories.length > 0) {
          this.cateId = this.categories[0].id;
          this.activeItem = this.categories[0].name;
        }
      }
    },
    getResult() {
      this.setShoppingStatus(true);
      this.showFeedback(true);
      this.partner = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      this.getDataCartFromServe(this.partner);
      this.getFeedBackToShow();
      this.partnerId(this.partner.id);
      this.setCategoriesFromPartnerData(this.partner);
    },
    checkPartnerIsClose() {
      var partnerObj = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      // console.log(partnerObj);
      if (partnerObj.status === "close") {
        openToastMess("Food store is close, Please come back later", "warning");
      }
    },
  },
  created() {
    this.getPartners().then((res) => {
      this.setIsLoading(Math.random());
    });
    this.checkPartnerIsClose();
    this.getResult();
  },
  watch: {
    categoriesDataOnChange() {
      this.currentPage = 0;
    },
    partnersLocalOnChange() {
      this.partner = this.getPartnersLocal.find((obj) => obj.id == this.slug);
      this.setCategoriesFromPartnerData(this.partner);
    },
    getIsLoadingOnChange() {
      this.isRendered = true;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_mixins.scss";

.container {
  .row {
    &.list-products {
      margin-top: 100px !important;
    }
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
  .product-img {
    // padding: 12px 12px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    img {
      display: block;
      max-height: 161px;
      height: auto;
      object-fit: cover;
    }
    .button-head {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      .product-action {
        margin-right: 12px !important;
        position: relative;
        .btn-plus,
        .btn-minus {
          background-color: transparent;
          border: none;
        }
      }
      .product-action-2 {
        @include buttonStyle();
        margin-left: 12px !important;
        position: relative;
        a {
          display: inline-flex;
          align-items: baseline;
          svg {
            font-size: 2rem;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .product-content {
    padding: 0 20px 20px;
    margin-top: -13px !important;
    text-align: left;
    h3 {
      margin-top: 20px;
      a {
        color: #000;
        font-weight: 600 !important;
        font-size: 1.8rem !important;
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
    .product-desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: 700;
      color: #989898;
    }
    .product-price {
      // color: #86bd57;
      span {
        font-weight: 700 !important;
        font-size: 20px !important;
        color: #f50000;
      }
    }
  }
  &:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
}

.section-title {
  padding: 50px 0 10px;
  position: relative;
  h2 {
    text-align: left !important;
    letter-spacing: 3px;
    font-weight: 600;
    &::after {
      display: none;
    }
  }
}

.nav-tabs {
  border-bottom: 0 !important;
}

.product-info {
  .nav {
    flex-wrap: wrap;
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
  padding-top: 5%;
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

.nav.nav-tabs.mobile-category__list {
  position: absolute;
  display: flex;
  list-style: none;
  padding-left: 0;
  max-width: 100%;
  // overflow: hidden;
  flex-wrap: nowrap;
  // &:hover {
  overflow-x: scroll;
  overflow-y: hidden;
  // }
  li {
    a {
      color: #000;
      text-align: left;
      padding-left: 0;
    }
    a.active,
    &:hover a {
      background: transparent;
      color: #f7941d;
      border-color: transparent;
    }
  }
}

.mobile-category__item {
  flex-shrink: 0;
  margin-right: 10px;
}

.mobile-category__link {
  --line-height: 2rem;
  text-decoration: none;
  color: #000;
  font-size: 1.4rem;
  line-height: var(--line-height);
  height: calc(var(--line-heighht) * 2);
  overflow: hidden;
  text-align: center;
  width: 110px;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  border-radius: 4px;
  font-weight: 300;
  user-select: none;
  -webkit-user-select: none;
  padding: 0 7px;
  font-weight: 700;
}

.nav.nav-tabs.mobile-category__list::-webkit-scrollbar {
  height: 12px;
  // background-color: #eff1f5;
}

.nav.nav-tabs.mobile-category__list::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

.nav.nav-tabs.mobile-category__list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #515769;
  border: 2px solid #eff1f5;
}
/* Product list title */
.product-list-title {
  text-align: center;
  padding-bottom: 0.5em;
  position: relative;
  font-size: 1.9em;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  &:after {
    content: "";
    background: #3399cc;
    height: 2px;
    width: 10%;
    position: absolute;
    bottom: 0%;
    left: 45%;
  }
}

// #nz-div-4 h3.product-list-title :after {
//   content: "";
//   width: 0;
//   height: 0;
//   border-top: 40px solid transparent;
//   border-left: 20px solid #ea3a3c;
//   border-bottom: 0px solid transparent;
//   border-right: 0 solid transparent;
//   position: absolute;
//   top: 0px;
//   right: -20px;
// }

// #nz-div-4 h3.product-list-title :before {
//   content: "";
//   width: 0;
//   height: 0;
//   border-width: 40px 20px 0px 0px;
//   border-style: solid;
//   border-color: transparent;
//   border-right-color: #ea3a3c;
//   position: absolute;
//   top: 0px;
//   left: -20px;
// }

// #nz-div-4 h3.product-list-title span {
//   background: #ea3a3c;
//   padding: 10px 20px 8px 20px;
//   color: white;
//   position: relative;
//   display: inline-block;
//   margin: 0;
//   letter-spacing: 2px;
// }

// #nz-div-4 h3.product-list-title {
//   text-align: center;
//   margin: 45px 0;
//   border-bottom: 2px solid #ea3a3c;
//   font-size: 16px;
//   line-height: 20px;
//   text-transform: uppercase;
// }
.avg-point {
  color: yellow;
}

.diabledPointer {
  pointer-events: none;
  cursor: default;
  color: #ccc !important;
}

@media (max-width: 991px) {
  .vi-left-title:after {
    display: none;
  }
  .add-icon {
    display: none;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .section-title {
    margin-bottom: 23px !important;
    margin-top: 50px !important;
    padding: 0 !important;
  }
}

@media only screen and (max-width: 1199px) {
  .nav.nav-tabs.mobile-category__list::-webkit-scrollbar {
    display: none;
  }
}
</style>