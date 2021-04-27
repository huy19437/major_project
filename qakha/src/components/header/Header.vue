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
                  <li><i class="ti-headphone-alt"></i>+84 589 273 382</li>
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
                    <span>
                      {{ userCurrentAddress.locality }},
                      {{ userCurrentAddress.city }},
                      {{ userCurrentAddress.countryName }}
                    </span>
                  </li>
                  <li>
                    <a
                      v-for="entry in languages"
                      :key="entry.title"
                      class="language-btn"
                      @click="changeLocale(entry.language)"
                    >
                      <!-- <img
                        src="@/assets/images/vn_flag.png"
                        alt=""
                        class="language-flag"
                      /> -->
                      <flag :iso="entry.flag" v-bind:squared="false" />
                      {{ entry.title }}
                    </a>
                    <!-- <a v-for="entry in languages" :key="entry.title" class="language-btn">
                      <img
                        src="@/assets/images/us_flag.png"
                        alt=""
                        class="language-flag"
                      />
                    </a> -->
                  </li>
                  <li v-if="userName">
                    <i class="ti-user"></i>
                    <!-- <a href="profile">{{ userName }}</a> -->
                    <router-link to="/profile">
                      {{ nameOfUser || userName }}
                    </router-link>
                  </li>
                  <li v-if="!userName">
                    <i class="ti-power-off"></i>
                    <!-- <a href="login">Login</a> -->
                    <router-link to="/login">{{
                      $t("header.login")
                    }}</router-link>
                  </li>
                  <li v-else>
                    <i class="ti-power-off"></i>
                    <a style="cursor: pointer" @click.prevent="logout">{{
                      $t("header.logout")
                    }}</a>
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
                    <span class="current">
                      {{ selectedTypeRestaurant || "ALL" }}
                    </span>
                    <ul class="list">
                      <li
                        v-for="item in restaurantsType"
                        :key="item.id"
                        class="option"
                        @click="
                          () => {
                            selectedTypeRestaurant = item;
                          }
                        "
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                  <div class="search-products">
                    <div class="search-input">
                      <input
                        type="text"
                        class="header__search-input"
                        :placeholder="`${$t('header.searchProducts')}`"
                        v-model="searchByName"
                      />
                      <div class="header__search-history">
                        <h3 class="header__search-history-heading">
                          {{ $t("header.listOfProducts") }}
                        </h3>
                        <ul
                          v-if="getPartnersLocal"
                          class="header__search-history-list"
                        >
                          <li
                            v-for="product in filteredProductByName"
                            :key="product.id"
                            class="header__search-history-item"
                          >
                            <img
                              class="product-img"
                              :src="`${product.image.url}`"
                              @mousedown="gotoProduct(product.id)"
                            />
                            <h4 class="product-title">
                              <a @mousedown="gotoProduct(product.id)">
                                {{ product.name }}
                              </a>
                              <span class="product-price">
                                {{ product.price }}đ
                              </span>
                            </h4>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="btn-search">
                      <div class="search-icon">
                        <i class="ti-search"></i>
                      </div>
                    </div>
                  </div>
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
                      <span
                        >{{ numberOfItem }}
                        {{ $t("header.middleInner.item") }}</span
                      >
                      <!-- <a href="cart">View Cart</a> -->
                      <a @click="gotoCart()"
                        >{{ $t("header.middleInner.cart") }}
                      </a>
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
                          ><img
                            :src="`${product.image.url}`"
                            alt="product image"
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
                        <span>{{ $t("header.middleInner.total") }}</span>
                        <span class="total-amount"
                          >{{ roundNumber(total) }} VNĐ</span
                        >
                      </div>
                      <!-- <a href="checkout" class="btn animate">Checkout</a> -->
                      <a class="btn btn-right" @click="gotoCheckout()">
                        {{ $t("header.middleInner.checkout") }}
                      </a>
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
              <!-- <div class="col-lg-3">
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
              </div> -->
              <div class="col-lg-12">
                <div class="menu-area">
                  <!-- Main Menu -->
                  <nav class="navbar navbar-expand-lg">
                    <div class="navbar-collapse">
                      <div class="nav-inner">
                        <ul class="nav main-menu menu navbar-nav">
                          <li>
                            <router-link to="/">
                              {{ $t("header.headerInner.home") }}
                            </router-link>
                          </li>
                          <li>
                            <a href="/#bestseller">{{
                              $t("header.headerInner.bestSeller")
                            }}</a>
                          </li>
                          <li>
                            <a href="/#service">{{
                              $t("header.headerInner.service")
                            }}</a>
                          </li>
                          <li class="hasDropDown">
                            <a v-if="getShoppingStatus"
                              >{{ $t("header.headerInner.store.title")
                              }}<i class="ti-angle-down"></i
                            ></a>
                            <ul class="dropdown">
                              <li>
                                <a @click="gotoCart()"
                                  >{{ $t("header.headerInner.store.cart") }}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <!-- <li><a href="#">Pages</a></li> -->
                          <li class="hasDropDown">
                            <a
                              >{{ $t("header.headerInner.mart.title")
                              }}<i class="ti-angle-down"></i
                            ></a>
                            <ul class="dropdown">
                              <li>
                                <a href="/">{{
                                  $t("header.headerInner.mart.ourMart")
                                }}</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="/#footer">{{
                              $t("header.headerInner.contact")
                            }}</a>
                          </li>
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
import i18n from "@/plugins/i18n";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "Header",
  data() {
    return {
      languages: [
        { flag: "us", language: "en", title: "US" },
        { flag: "vn", language: "vi", title: "VN" },
      ],
      isOpen: false,
      isOpen2: false,
      isChanged: false,
      cart: [],
      products: [],
      partnerIdForSlug: 0,
      partnerData: [],
      idOfProducts: [],
      qtyOfProducts: [],
      numberOfItem: 0,
      total: 0,
      nameOfUser: "",
      selectedTypeRestaurant: "ALL",
      searchByName: "",
      userCurrentAddress: "",
      restaurantsType: [
        "ALL",
        "VEGE",
        "RICEBOX",
        "STREETFOOD",
        "SUSHI",
        "DRINK",
      ],
      restaurantsTypeObject: {
        ALL: "",
        VEGE: 1,
        RICEBOX: 2,
        STREETFOOD: 3,
        SUSHI: 4,
        DRINK: 5,
      },
    };
  },
  computed: {
    ...mapGetters({
      userName: "auth/getUserName",
      getUser: "auth/getUser",
      getCartLocal: "cart/getCartLocal",
      getPartnersLocal: "partner/getPartnersLocal",
      getShoppingStatus: "cart/getShoppingStatus",
    }),
    cartsChange() {
      return this.getCartLocal;
    },
    userChange() {
      return this.getUser;
    },
    filteredPartner() {
      return this.partnerData.filter((partner) => {
        return (partner.type_id || "")
          .toString()
          .includes(this.restaurantsTypeObject[this.selectedTypeRestaurant]);
      });
    },
    getProductsFromPartner() {
      let categoryFromPartner = this.filteredPartner.reduce(
        (accumulator, currentValue) => {
          let arrayTmp = currentValue.categories;
          return [...accumulator, ...arrayTmp];
        },
        []
      );
      return categoryFromPartner.reduce((accumulator, currentValue) => {
        let arrayTmp2 = currentValue.products;
        return [...accumulator, ...arrayTmp2];
      }, []);
    },
    filteredProductByName() {
      return this.getProductsFromPartner.filter((product) => {
        return (this.xoa_dau(product.name) || "")
          .toLowerCase()
          .includes(this.xoa_dau(this.searchByName).toLowerCase());
      });
    },
    getPartnersLocalChange() {
      return this.getPartnersLocal;
    },
  },
  methods: {
    ...mapActions({
      logoutFuction: "auth/logout",
      getUserInfoFromLocal: "auth/getUserInfoFromLocal",
      setCartsNull: "cart/setCartsNull",
      deleteCart: "cart/deleteCart",
      getUserCurrentAddress: "address/getUserCurrentAddress",
    }),
    ...mapMutations({
      setSubTotal: "order/setSubTotal",
    }),
    changeLocale(locale) {
      i18n.locale = locale;
    },
    logout() {
      this.logoutFuction();
    },
    deleteProductInCart(id) {
      this.partner = this.getPartnersLocal.find((pl) =>
        pl.categories.find((cat) => cat.products.find((obj) => obj.id == id))
      );
      let params = {
        product_id: id,
        partner_id: this.partner.id,
      };
      // console.log(params);
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
      // console.log(this.cart);
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
                  // this.total += obj.price * obj.quantity;
                  prods.push({ ...obj });
                }
              });
            })
          );
        }
        this.products = prods;
        this.numberOfItem = this.products.length;
        this.total = this.getSubTotal(this.products);
        this.setSubTotal(this.roundToTwo(this.total));
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
    getSubTotal(array) {
      return array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
    },
    getNameFromUserObj(data) {
      if (data) {
        if (data.name != null && typeof data.name == "string") {
          if (data.name.lastIndexOf(" ") > 0) {
            let tmp = data.name.trim();
            this.nameOfUser = tmp.slice(tmp.lastIndexOf(" "));
          } else {
            this.nameOfUser = data.name.trim();
          }
        } else {
          this.nameOfUser = data.name;
        }
      } else if (data === null) {
        this.nameOfUser = null;
      }
    },
    gePartnerDataFromPartner() {
      this.partnerData = this.getPartnersLocal || [];
      // console.log(this.partnerData);
    },
    xoa_dau(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str;
    },
    getPartnerIdForCart() {
      this.partnerIdForSlug = this.getCartLocal[0].partner_id;
      // console.log(this.partnerIdForSlug);
    },
    gotoCart() {
      this.partnerIdForSlug = this.getCartLocal[0].partner_id;
      this.$router.push({
        name: "Cart",
        params: { slug: this.partnerIdForSlug || 0 },
      });
    },
    gotoCheckout() {
      this.partnerIdForSlug = this.getCartLocal[0].partner_id;
      this.$router.push({
        name: "Checkout",
        params: { slug: this.partnerIdForSlug || 0 },
      });
    },
    gotoProduct(id) {
      console.log(id);
      this.$router.push({
        name: "ProductDetail",
        params: { slug: id },
      });
    },
    getUserLocation() {
      let coordinatesObj = {};
      let options = {
        enableHighAccuracy: Boolean, //defaults to false
        timeout: 3000, //defaults to Infinity
        maximumAge: 0, //defaults to 0
      };
      this.$getLocation(options).then((coordinates) => {
        // console.log(coordinates);
        coordinatesObj = coordinates;
      });

      let params = {
        latitude: coordinatesObj.lat,
        longitude: coordinatesObj.lng,
        localityLanguage: "vn",
      };
      this.getUserCurrentAddress(params).then((res) => {
        // console.log(res);
        this.userCurrentAddress = res;
      });
    },
  },
  created() {
    // this.getPartnerIdForCart();
    this.getUserInfoFromLocal();
    this.gePartnerDataFromPartner();
    this.getUserLocation();
    // console.log(this.userName);
    // this.getInfoProductInCart();
  },
  watch: {
    cartsChange() {
      this.getInfoProductInCart();
    },
    userChange() {
      this.getNameFromUserObj(this.getUser);
    },
    getPartnersLocalChange() {
      this.gePartnerDataFromPartner();
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
  .navbar-nav {
    margin: 0 auto;
    li {
      a {
        &:focus {
          background-color: #f9af57;
        }
      }
    }
  }
}

.navbar {
  margin-bottom: 0 !important;
}

/* Search History */
.header__search-history {
  position: absolute;
  text-align: left;
  top: calc(100% + 2px);
  left: -14px;
  width: calc(100% + 55px);
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 5px rgb(185, 182, 182);
  display: none;
  // overflow: hidden;
  z-index: 10;
}

.header__search-history-heading {
  margin: 6px 12px;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgb(173, 173, 173);
}

.header__search-history-list {
  padding-left: 0;
  list-style: none;
  margin: 6px 0 0;
  max-height: 50vh;
  overflow-y: auto;
}

.header__search-history-item {
  height: 90px;
  padding: 0 12px;
  display: flex;
  &:hover {
    background-color: #eee7e7;
  }
  .product-img {
    width: 40%;
    object-fit: cover;
    padding-left: 0;
    cursor: pointer;
  }
  .product-title {
    font-weight: 700;
    a {
      display: -webkit-box !important;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-decoration: none;
      font-size: 1.4rem;
      line-height: 38px;
      color: #000;
      display: block;
      cursor: pointer;
      &:hover {
        color: #f7941d !important;
      }
    }
    .product-price {
      font-size: 1.3rem;
      color: #f7941d;
    }
  }
}

.header__search-input:focus ~ .header__search-history {
  display: block !important;
}

.header__search-input:focus {
  outline: none;
  border: none;
}

.header.shop {
  .logo {
    margin: 6px 0 0 !important;
    padding-left: 50px;
  }

  .search-bar-top {
    margin-left: 15%;
    .search-bar {
      .search-products {
        display: flex;
        justify-content: space-evenly;
        .search-input {
          position: relative;
        }
        .search-icon {
          height: 48px;
          padding-top: 4px;
        }
      }
    }
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
      .shopping-item {
        .dropdown-cart-header {
          display: flex;
          justify-content: space-between;
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
    justify-content: space-between;
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
  cursor: pointer;
}

// .language-btn:nth-child(1)::after {
//   content: " | ";
//   display: block;
//   position: absolute;
//   top: -4px;
//   right: -4.1px;
// }

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