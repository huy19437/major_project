<template>
  <div class="container">
    <div
      v-if="getPartnersLocal.length == 0 ? true : false"
      class="alert alert-warning"
      role="alert"
    >
      Go to the Home page and choose one Restaurant!
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
            <div class="row">
              <div class="col-12">
                <div class="section-title product-list">
                  <h2>Products List</h2>
                </div>
              </div>
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
                          <span>${{ product.price }}</span>
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
    <div class="row">
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
    };
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
      getNowRoute: "auth/getNowRoute",
      userName: "auth/getUserName",
    }),
    listProducts() {
      let tmp = [];
      tmp = this.categories.find((category) => {
        return category.id === this.cateId;
      });
      console.log(tmp.products);
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
    getProductsByCategory(cateId, menuItem) {
      this.activeItem = menuItem;
      this.cateId = cateId;
    },
    getResult() {
      this.setShoppingStatus(true);
      if (this.userName) {
        let params = {
          partner_id: this.slug,
        };
        this.getCart(params);
      }
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
  watch: {
    categoriesDataOnChange() {
      this.currentPage = 0;
    },
  },
};
</script>

<style lang="scss">
.container {
  .row:nth-child(3) {
    display: flex;
    justify-content: center;
    padding-top: 33px;
  }
}
.single-product {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  border: 1px solid #eeeeee;
  border-radius: 7px;
  .product-content {
    padding: 0 20px 20px;
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
    max-height: 129px;
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
  &.product-list {
    h2 {
      font-size: 24px;
      &::after {
        content: "";
        width: 67px;
        position: absolute;
        margin: 0 auto;
        height: 4px;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        right: 0;
        bottom: -20px;
      }
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