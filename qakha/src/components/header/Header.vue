<template>
  <div class="header-sticky">
    <header class="header shop">
      <!-- Topbar -->
      <div class="topbar hide-on-mobile-tablet">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-12 col-12">
              <!-- Top Left -->
              <div class="top-left">
                <ul class="list-main">
                  <li><i class="ti-headphone-alt"></i>+84 589 273 382</li>
                  <li><i class="ti-email"></i>qakhadelivery@gmail.com</li>
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
              <div>
                <label
                  for="nav__mobile-input"
                  class="nav__bars-btn"
                  style="margin-bottom: 10px"
                >
                  <font-awesome-icon :icon="['fas', 'list']" />
                </label>
              </div>
              <!-- Logo -->
              <div class="logo hidden-on-tablet">
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

            <input
              type="checkbox"
              hidden
              class="nav__input"
              name=""
              id="nav__mobile-input"
            />

            <label for="nav__mobile-input" class="nav__overlay"></label>

            <nav class="nav__mobile">
              <div v-if="userObj.image" class="nav__mobile-heading">
                <img
                  :src="`${userObj.image.url}`"
                  alt=""
                  class="nav__mobile-img"
                />
                <h3 class="nav__mobile-name" v-if="userName">
                  <router-link to="/profile">
                    {{ nameOfUser || userName }}
                  </router-link>
                </h3>
                <label for="nav__mobile-input" class="nav__mobile-close">
                  <i class="ti-close"></i>
                </label>
              </div>
              <ul class="nav__mobile-list">
                <li class="nav__mobile-item">
                  <div class="content">
                    <a
                      v-for="entry in languages"
                      :key="entry.title"
                      class="language-btn"
                      @click="changeLocale(entry.language)"
                    >
                      <flag :iso="entry.flag" v-bind:squared="false" />
                      {{ entry.title }}
                    </a>
                  </div>
                </li>
                <li class="nav__mobile-item" v-if="!userName">
                  <div class="content">
                    <router-link to="/login">{{
                      $t("header.login")
                    }}</router-link>
                  </div>
                </li>
                <li class="nav__mobile-item" v-else>
                  <div class="content">
                    <a style="cursor: pointer" @click.prevent="logout">{{
                      $t("header.logout")
                    }}</a>
                  </div>
                </li>
              </ul>
            </nav>

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
                                {{ product.price | formatVND }}
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
                <div
                  v-if="userName"
                  class="sinlge-bar shopping"
                  :class="{
                    diabledPointer: getShoppingStatus ? false : true,
                  }"
                >
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
                      <a @click="gotoCart()" style="cursor: pointer">
                        {{ $t("header.middleInner.cart") }}
                      </a>
                    </div>
                    <ul class="shopping-list">
                      <li v-for="product in products" :key="product.id">
                        <a
                          @click="deleteProductInCart(product.id)"
                          class="remove"
                          title="Remove this item"
                          style="cursor: pointer"
                          ><i class="fa fa-remove"></i
                        ></a>
                        <a class="cart-img" href="#"
                          ><img
                            :src="`${product.image.url}`"
                            alt="product image"
                        /></a>
                        <h4>{{ product.name }}</h4>
                        <p class="quantity">
                          <span class="quantity-product">
                            {{ product.quantity }}x
                          </span>
                          <span class="amount">
                            {{ product.price | formatVND }}
                          </span>
                        </p>
                      </li>
                    </ul>
                    <div class="bottom">
                      <div class="total">
                        <span>{{ $t("header.middleInner.total") }}</span>
                        <span class="total-amount">
                          {{ roundNumber(total) | formatVND }}
                        </span>
                      </div>
                      <!-- <a href="checkout" class="btn animate">Checkout</a> -->
                      <a
                        :disabled="!isHaveItemInCart"
                        class="btn btn-right"
                        @click="gotoCheckout()"
                      >
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
                          <li class="hasDropDown" style="cursor: default">
                            <a v-if="getShoppingStatus">
                              {{ $t("header.headerInner.store.title") }}
                              <i class="ti-angle-down"></i>
                            </a>
                            <ul class="dropdown">
                              <li>
                                <a @click="gotoCart()"
                                  >{{ $t("header.headerInner.store.cart") }}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <!-- <li><a href="#">Pages</a></li> -->
                          <li class="hasDropDown" style="cursor: default">
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
      isHaveItemInCart: false,
      products: [],
      partnerIdForSlug: 0,
      partnerData: [],
      idOfProducts: [],
      qtyOfProducts: [],
      numberOfItem: 0,
      total: 0,
      nameOfUser: "",
      userObj: {},
      selectedTypeRestaurant: "ALL",
      searchByName: "",
      userCurrentAddress: "",
      coordinatesObj: {},
      partnerStatus: "",
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
          .includes(this.xoa_dau(this.searchByName.trim()).toLowerCase());
      });
    },
    getPartnersLocalChange() {
      return this.getPartnersLocal;
    },
    getShoppingStatusChange() {
      return this.getShoppingStatus;
    },
  },
  methods: {
    ...mapActions({
      logoutFuction: "auth/logout",
      showUser: "auth/showUser",
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
      this.products = [];
      this.numberOfItem = 0;
      this.total = 0;
      this.isHaveItemInCart = false;
      this.setSubTotal(0);

      this.cart = this.getCartLocal;
      if (this.cart !== null && this.cart !== undefined) {
        if (this.cart.length > 0) {
          this.isHaveItemInCart = true;
        } else {
          this.isHaveItemInCart = false;
        }
      }
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
      if (this.getCartLocal) {
        if (this.getCartLocal.length != 0) {
          let partnerObj = this.getPartnersLocal.find(
            (obj) => obj.id == this.getCartLocal[0].partner_id
          );
          this.partnerStatus = partnerObj.status;
          if (this.partnerStatus === "open") {
            this.partnerIdForSlug = this.getCartLocal[0].partner_id;
            this.$router.push({
              name: "Cart",
              params: { slug: this.partnerIdForSlug || 0 },
            });
          } else {
            openToastMess("Food store is close", "warning");
          }
        } else {
          openToastMess("Nothing in Cart!!!", "warning");
        }
      } else {
        openToastMess("Nothing in Cart!!!", "warning");
      }
    },
    gotoCheckout() {
      let partnerObj = this.getPartnersLocal.find(
        (obj) => obj.id == this.getCartLocal[0].partner_id
      );
      this.partnerStatus = partnerObj.status;
      if (this.partnerStatus === "open") {
        this.partnerIdForSlug = this.getCartLocal[0].partner_id;
        this.$router.push({
          name: "Checkout",
          params: { slug: this.partnerIdForSlug || 0 },
        });
      } else {
        openToastMess("Food store is close", "warning");
      }
    },
    gotoProduct(id) {
      if (this.$route.params.slug != id) {
        this.$router.push({
          name: "ProductDetail",
          params: { slug: id },
        });
      }
    },
    getUserLocation() {
      let options = {
        enableHighAccuracy: Boolean, //defaults to false
        timeout: 3000, //defaults to Infinity
        maximumAge: 0, //defaults to 0
      };
      this.$getLocation(options).then((coordinates) => {
        this.coordinatesObj = coordinates;
        let params = {
          latitude: this.coordinatesObj.lat,
          longitude: this.coordinatesObj.lng,
          localityLanguage: "vn",
        };
        this.getUserAddress(params);
      });
    },
    getUserAddress(params) {
      // console.log(params);
      this.getUserCurrentAddress(params).then((res) => {
        console.log(res);
        this.userCurrentAddress = res;
      });
    },
    setCartsNullIfPartnerClose() {
      if (this.getCartLocal) {
        if (this.getCartLocal.length != 0) {
          var partnerObj = this.getPartnersLocal.find(
            (obj) => obj.id == this.getCartLocal[0].partner_id
          );
          if (partnerObj.status === "close") {
            this.setCartsNull();
            this.getInfoProductInCart();
          }
        }
      }
      // var partnerObj = this.getPartnersLocal.find(
      //   (obj) => obj.id == this.$route.params.slug
      // );
      // if (partnerObj.status === "close") {
      //   this.setCartsNull();
      //   this.getInfoProductInCart();
      // }
    },
  },
  created() {
    this.getUserLocation();
    this.getUserInfoFromLocal();
    this.gePartnerDataFromPartner();
    if (this.userName) {
      this.showUser()
        .then((res) => {
          this.userObj = res;
          console.log(this.userObj.image);
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    }
    // this.getPartnerIdForCart();
    // console.log(this.userName);
    // this.getInfoProductInCart();
  },
  watch: {
    getShoppingStatusChange() {
      if (this.getShoppingStatus) {
        this.setCartsNullIfPartnerClose();
      }
    },
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
@import "@/assets/style/_mixins.scss";
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
    padding: 0 12px 12px 0;
    cursor: pointer;
    display: inline;
    margin: 0 0;
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
    width: 206px;
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
      .option {
        justify-content: center;
      }
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
        .bottom {
          .btn-right {
            @include buttonStyle();
          }
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
  .middle-inner {
    padding: 13px 0 !important;
  }
}

.middle-inner .logo .header-logo {
  width: 100%;
  // height: 50px;
  max-width: 140% !important;
  cursor: pointer;
  object-fit: contain;
}

.right-content .map-button {
  background-color: #fff;
  color: #000;
  border: none;
  font-size: 1.2rem;
}

.header {
  .shopping-list {
    max-height: 40vh;
    overflow-y: auto;
    .cart-img {
      img {
        object-fit: cover;
        margin-bottom: 0;
      }
    }
    .quantity {
      line-height: 22px;
      font-size: 13px;
      padding-bottom: 0px !important;
      margin: 0 0 -3px !important;
      .quantity-product {
        font-weight: 600;
      }
      .amount {
        color: #f7941d;
        font-weight: 600;
      }
    }
  }
}

.language-flag {
  width: 25%;
}

.language-btn {
  position: relative;
  cursor: pointer;
}

@media (max-width: 1199px) {
  .header-sticky {
    top: -93px;
  }
  .header-inner {
    height: 59px;
  }
  .header.shop .all-category h3 {
    padding: 18px 25px !important;
    font-size: 18px !important;
  }
}

.diabledPointer {
  pointer-events: none;
  cursor: default;
  color: #ccc !important;
}

.nice-select {
  .option {
    justify-content: center;
  }
  .list {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;
  }
}

.nav__bars-btn {
  width: 28px;
  height: 28px;
  color: #000;
  display: none;
}

.nav__input:checked ~ .nav__overlay {
  display: block;
}

.nav__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  z-index: 3;
}

.nav__mobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 100%;
  background-color: #fff;
  transform: translateX(-100%);
  opacity: 0;
  transition: transform linear 0.2s, opav linear 0.2s;
  z-index: 3;
}

.nav__mobile-link {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px 0;
  font-size: 1.4rem;
}

.nav__mobile-close {
  font-size: 1.4rem;
  color: #666;
  position: absolute;
  top: 2px;
  right: 3px;
  font-size: 2rem;
  cursor: pointer;
  margin-bottom: 0;
}

.nav__input:checked ~ .nav__mobile {
  transform: translateX(0%);
  opacity: 1;
}

.nav__mobile-heading {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid rgb(207, 203, 203);
}

.nav__mobile-img {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  border-radius: 50%;
  margin: 0;
}

.nav__mobile-name {
  font-size: 1.6rem;
  margin: 20px;
  a {
    color: #000;
    font-weight: 700;
  }
}

.nav__mobile-list {
  padding-right: 70px;
  list-style: none;
  margin-top: 24px;
  text-align: left;
  font-size: 1.5rem !important;
}

.nav__mobile-item {
  position: relative;
  margin-bottom: 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  font-weight: 700;
  .content {
    a,
    span {
      color: #000;
    }
  }
}

.nav__mobile-item:first-child::before {
  display: none;
}

.nav__mobile-link {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 500;
  padding: 16px 0;
  text-transform: uppercase;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .middle-inner {
    .col-lg-2.col-md-2.col-12:nth-child(1) {
      margin-bottom: 9px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        border-top: 1px solid #e1e1e1;
      }
    }
  }
}

@media (max-width: 487px) {
  .vi-left-title:after {
    display: none;
  }
}

@media (max-width: 991px) {
  .header.shop {
    .logo {
      margin: 6px 0 0 !important;
      padding-left: 0;
    }
    .middle-inner {
      padding: 9px 0 !important;
    }
  }
}

@media only screen and (max-width: 1199px) {
  .topbar {
    .container {
      .row {
        .col-lg-5.col-md-12.col-12,
        .col-lg-7.col-md-12.col-12 {
          display: flex;
          justify-content: center;
        }
        .col-lg-7.col-md-12.col-12 {
          .right-content {
            .list-main {
              padding: 0;
            }
          }
        }
      }
    }
  }
  .middle-inner {
    .container {
      .row {
        margin-bottom: 6px;
        .col-lg-2.col-md-2.col-12 {
          &:nth-child(1) {
            display: flex;
            align-items: flex-end;
          }
          .logo.hidden-on-tablet {
            display: none !important;
          }
        }
      }
    }
  }

  .nav__bars-btn {
    display: block;
    cursor: pointer;
    svg {
      font-size: 4rem;
    }
  }

  .hide-on-mobile-tablet {
    display: none;
  }
}

@media only screen and (min-width: 1200px) {
  .nav__overlay,
  .nav__mobile {
    display: none !important;
  }
}
</style>