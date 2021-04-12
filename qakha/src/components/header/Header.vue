<template>
  <div class="header-sticky">
    <header class="header shop">
      <!-- Topbar -->
      <div class="topbar">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-12 col-12">
              <!-- Top Left -->
              <div class="top-left">
                <ul class="list-main">
                  <li><i class="ti-headphone-alt"></i> 0589273382</li>
                  <li><i class="ti-email"></i> nguyenduchuy19437@gmail.com</li>
                </ul>
              </div>
              <!--/ End Top Left -->
            </div>
            <div class="col-lg-7 col-md-12 col-12">
              <!-- Top Right -->
              <div class="right-content">
                <ul class="list-main">
                  <li>
                    <i class="ti-location-pin"></i>
                    <button type="button" class="map-button">
                      <a href="#">Da Nang City</a>
                    </button>
                  </li>
                  <li>
                    <a href="" class="language-btn">
                      <img
                        src="@/assets/images/vn_flag.png"
                        alt=""
                        class="language-flag"
                      />
                    </a>
                    <a href="" class="language-btn">
                      <img
                        src="@/assets/images/us_flag.png"
                        alt=""
                        class="language-flag"
                      />
                    </a>
                  </li>
                  <li v-if="userName">
                    <i class="ti-user"></i>
                    <!-- <a href="profile">{{ userName }}</a> -->
                    <router-link to="/profile">{{ userName }}</router-link>
                  </li>
                  <li v-if="!userName">
                    <i class="ti-power-off"></i>
                    <!-- <a href="login">Login</a> -->
                    <router-link to="/login">Login</router-link>
                  </li>
                  <li v-else>
                    <i class="ti-power-off"></i>
                    <a style="cursor: pointer" @click.prevent="logoutFuction"
                      >Logout</a
                    >
                    <!-- <router-link @click.prevent="logoutFuction" to="/login"
                      >Logout</router-link
                    > -->
                  </li>
                </ul>
              </div>
              <!-- End Top Right -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Topbar -->
      <div class="middle-inner">
        <div class="container">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-12">
              <!-- Logo -->
              <div class="logo">
                <a href="/">
                  <img
                    src="@/assets/images/logo_qakha2.png"
                    alt="logo"
                    class="header-logo"
                  />
                </a>
              </div>
              <!--/ End Logo -->
            </div>
            <div class="col-lg-8 col-md-8 col-12">
              <div class="search-bar-top">
                <div class="search-bar">
                  <div
                    class="nice-select"
                    tabindex="0"
                    :class="{ open: isOpen }"
                    @click="isOpen = !isOpen"
                  >
                    <span class="current">All Category</span>
                    <ul class="list">
                      <li
                        data-value="All Category"
                        class="option selected focus"
                      >
                        All Category
                      </li>
                      <li data-value="watch" class="option">Foods</li>
                      <li data-value="mobile" class="option">Drinks</li>
                      <li data-value="kid’s item" class="option">Beverage</li>
                    </ul>
                  </div>
                  <form>
                    <input
                      name="search"
                      placeholder="Search Products Here....."
                      type="search"
                    />
                    <button class="btnn"><i class="ti-search"></i></button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-12">
              <div class="right-bar">
                <div v-if="userName" class="sinlge-bar shopping">
                  <a class="single-icon">
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                    <span v-if="getCartLocal" class="total-count">
                      {{ getCartLocal.length }}
                    </span>
                  </a>
                  <!-- Shopping Item -->
                  <div v-if="getShoppingStatus" class="shopping-item">
                    <div class="dropdown-cart-header">
                      <span>{{ numberOfItem }} Items</span>
                      <!-- <a href="cart">View Cart</a> -->
                      <router-link to="/cart">View Cart </router-link>
                    </div>
                    <ul class="shopping-list">
                      <li v-for="product in products" :key="product.id">
                        <a
                          @click="deleteProductInCart(product.id)"
                          class="remove"
                          title="Remove this item"
                          ><i class="fa fa-remove"></i
                        ></a>
                        <a class="cart-img" href="#"
                          ><img src="https://via.placeholder.com/70x70" alt="#"
                        /></a>
                        <h4>{{ product.name }}</h4>
                        <p class="quantity">
                          {{ product.quantity }}x -
                          <span class="amount">${{ product.price }} </span>
                        </p>
                      </li>
                    </ul>
                    <div class="bottom">
                      <div class="total">
                        <span>Total</span>
                        <span class="total-amount"
                          >${{ roundNumber(total) }}</span
                        >
                      </div>
                      <!-- <a href="checkout" class="btn animate">Checkout</a> -->
                      <router-link class="btn animate" to="/checkout"
                        >Checkout</router-link
                      >
                    </div>
                  </div>
                  <!--/ End Shopping Item -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Header Inner -->
      <div class="header-inner">
        <div class="container">
          <div class="cat-nav-head">
            <div class="row">
              <div class="col-lg-3">
                <div class="all-category">
                  <h3 class="cat-heading">
                    <i class="fa fa-bars" aria-hidden="true"></i>CATEGORIES
                  </h3>
                  <ul class="main-category" style="z-index: 100">
                    <li class="main-mega">
                      <a href="#"
                        >best selling
                        <i class="fa fa-angle-right" aria-hidden="true"></i
                      ></a>
                      <ul class="mega-menu">
                        <li class="single-menu">
                          <a href="#" class="title-link">Foods Kid's</a>
                          <div class="image">
                            <img
                              src="@/assets/images/logo_qakha2.png"
                              alt="#"
                            />
                          </div>
                          <div class="inner-link">
                            <a href="#">Milk</a>
                            <a href="#">powder</a>
                          </div>
                        </li>
                        <li class="single-menu">
                          <a href="#" class="title-link">Foods Men's</a>
                          <div class="image">
                            <img
                              src="@/assets/images/logo_qakha2.png"
                              alt="#"
                            />
                          </div>
                          <div class="inner-link">
                            <a href="#">Banh Mi</a>
                            <a href="#">Coffee</a>
                          </div>
                        </li>
                        <li class="single-menu">
                          <a href="#" class="title-link">Foods Women's</a>
                          <div class="image">
                            <img
                              src="@/assets/images/logo_qakha2.png"
                              alt="#"
                            />
                          </div>
                          <div class="inner-link">
                            <a href="#">Fruits</a>
                            <a href="#">Alcohol</a>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li><a href="#">hot sales</a></li>
                    <li><a href="#">top 100 offer</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <div class="menu-area">
                  <!-- Main Menu -->
                  <nav class="navbar navbar-expand-lg">
                    <div class="navbar-collapse">
                      <div class="nav-inner">
                        <ul class="nav main-menu menu navbar-nav">
                          <li>
                            <router-link to="/">Home</router-link>
                          </li>
                          <li>
                            <a href="#bestseller">Best seller</a>
                          </li>
                          <li><a href="#service">Service</a></li>
                          <li class="hasDropDown">
                            <a v-if="getShoppingStatus"
                              >Store<i class="ti-angle-down"></i
                            ></a>
                            <ul class="dropdown">
                              <li>
                                <router-link to="/cart">Cart</router-link>
                              </li>
                              <li>
                                <router-link to="/checkout"
                                  >Checkout</router-link
                                >
                              </li>
                            </ul>
                          </li>
                          <li><a href="#">Pages</a></li>
                          <li class="hasDropDown">
                            <a href="#">Blog<i class="ti-angle-down"></i></a>
                            <ul class="dropdown">
                              <li>
                                <a href="blog-single-sidebar.html">Our Blog</a>
                              </li>
                            </ul>
                          </li>
                          <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <!--/ End Main Menu -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/ End Header Inner -->
    </header>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "Header",
  data() {
    return {
      isOpen: false,
      isOpen2: false,
      isChanged: false,
      cart: [],
      products: [],
      idOfProducts: [],
      qtyOfProducts: [],
      numberOfItem: 0,
      total: 0,
    };
  },
  computed: {
    ...mapGetters({
      userName: "auth/getUserName",
      getCartLocal: "cart/getCartLocal",
      getPartnersLocal: "partner/getPartnersLocal",
      getShoppingStatus: "cart/getShoppingStatus",
    }),
    cartsChange() {
      return this.getCartLocal;
    },
  },
  methods: {
    ...mapActions({
      logoutFuction: "auth/logout",
      getUserInfoFromLocal: "auth/getUserInfoFromLocal",
      setCartsNull: "cart/setCartsNull",
      deleteCart: "cart/deleteCart",
    }),
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
            openToastMess("Product have been deleted", "success");
            this.getInfoProductInCart();
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    showProfile() {
      this.$router.push({ path: "/profile" });
    },
    getInfoProductInCart() {
      this.cart = this.getCartLocal;
      if (this.cart) {
        // console.log("hi");
        this.idOfProducts = this.cart.map((item) => item.product_id);
        this.qtyOfProducts = this.cart.map((item) => item.quantity);
        const prods = [];

        for (let i = 0; i < this.idOfProducts.length; i++) {
          this.getPartnersLocal.find((pl) =>
            pl.categories.find((cat) => {
              cat.products.find((obj) => {
                if (obj.id == this.idOfProducts[i]) {
                  obj.quantity = this.qtyOfProducts[i];
                  this.total += obj.price * obj.quantity;
                  prods.push({ ...obj });
                }
              });
            })
          );
        }
        this.products = prods;
        this.numberOfItem = this.products.length;
        // console.log(this.products);
      }
    },
    roundToTwo(x) {
      return (x = Math.round(parseFloat(x) * 1000) / 1000);
      // return +(Math.round(num + "e+2") + "e-2");
    },
    isRound(n, p) {
      let l = n.toString().split(".")[1].length;
      return p >= l;
    },
    roundNumber(n, p = 2) {
      if (Number.EPSILON === undefined) {
        Number.EPSILON = Math.pow(2, -52);
      }
      if (Number.isInteger === undefined) {
        Number.isInteger = function (value) {
          return (
            typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value
          );
        };
      }
      if (Number.isInteger(n) || this.isRound(n, p)) return n;
      let r = 0.5 * Number.EPSILON * n;
      let o = 1;
      while (p-- > 0) o *= 10;
      if (n < 0) o *= -1;
      return Math.round((n + r) * o) / o;
    },
  },
  created() {
    this.getUserInfoFromLocal();
    // this.getInfoProductInCart();
  },
  watch: {
    cartsChange() {
      this.getInfoProductInCart();
    },
  },
};
</script>

<style lang="scss">
.header-sticky {
  position: sticky;
  top: -158px;
  z-index: 100;
}
.top-left .list-main {
  padding-left: 0;
  float: left;
}

.topbar .list-main {
  margin-bottom: 0;
}

.header-inner {
  .cat-heading {
    margin-bottom: 0;
    margin-top: 0;
  }
  .main-category {
    padding-left: 0;
    display: none;
    a {
      text-align: left;
    }
  }

  .all-category:hover {
    .main-category {
      display: block;
    }
  }
}

.navbar {
  margin-bottom: 0 !important;
}

.header.shop {
  .logo {
    margin: 6px 0 0 !important;
    padding-left: 50px;
  }

  .search-bar-top {
    margin-left: 15%;
  }

  .right-bar {
    display: flex !important;
    align-items: center;
    top: 20px !important;
    .nice-select {
      border-right: none;
    }
    .nice-select::after {
      right: 39px;
    }
    .list {
      border: none;
    }
    .sinlge-bar {
      .single-icon {
        svg {
          font-size: 30px;
        }
        .total-count {
          top: -16px !important;
        }
      }
    }
  }

  .nav {
    li {
      &.active {
        a {
          height: 64px;
        }
      }
      a {
        color: #fff;
        text-transform: capitalize;
        font-size: 15px;
        padding: 20px 15px;
        font-weight: 500;
        display: block;
        position: relative;
        transition: all 0.4s ease;
        &:hover {
          background-color: #333333 !important;
          color: #f7941d !important;
          font-size: 22px;
        }
      }
      &:hover {
        .dropdown {
          margin-top: 4px;
        }
      }
    }
  }

  .nav-inner {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .dropdown {
      margin-right: 188px;
      list-style: none;
    }

    .hasDropDown {
      a {
        text-align: left;
      }
    }
  }
}

.middle-inner .logo .header-logo {
  width: 153px;
  height: 50px;
}

.right-content .map-button {
  background-color: #fff;
  color: #000;
  border: none;
  font-size: 1.2rem;
}

.shopping-list {
  max-height: 40vh;
  overflow-y: auto;
}

.language-flag {
  width: 25%;
}

.language-btn {
  position: relative;
}

.language-btn:nth-child(1)::after {
  content: " | ";
  display: block;
  position: absolute;
  top: -4px;
  right: -4.1px;
}

@media (max-width: 1199px) {
  .header-inner {
    height: 59px;
  }
  .header.shop .all-category h3 {
    padding: 18px 25px !important;
    font-size: 18px !important;
  }
}

@media (max-width: 991px) {
  .header.shop {
    .logo {
      margin: 6px 0 0 !important;
      padding-left: 0;
    }
  }
}
</style>