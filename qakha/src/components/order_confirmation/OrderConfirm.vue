<template>
  <body
    style="
      height: 100% !important;
      margin: 0 !important;
      padding: 35px !important;
      width: 100% !important;
    "
    bgcolor="#eeeeee"
  >
    <div
      v-if="getOrderDetails.length == 0 ? true : false"
      class="alert alert-warning"
      role="alert"
      style="text-align: center"
    >
      {{ $t("orderConfirm.alert") }}
    </div>
    <table v-else border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="background-color: #eeeeee" bgcolor="#eeeeee">
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="font-size: 0; padding: 35px; background-color: #f7941d"
                bgcolor="#F44336"
              >
                <div
                  style="
                    display: inline-block;
                    max-width: 50%;
                    min-width: 100px;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    align="left"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 300px"
                  >
                    <tr>
                      <td
                        align="left"
                        valign="top"
                        style="
                          font-family: Open Sans, Helvetica, Arial, sans-serif;
                          font-size: 36px;
                          font-weight: 800;
                          line-height: 48px;
                        "
                        class="mobile-center"
                      >
                        <h1
                          style="
                            font-size: 36px;
                            font-weight: 800;
                            margin: 0;
                            color: #ffffff;
                          "
                        >
                          QAKHA Delivery
                        </h1>
                      </td>
                    </tr>
                  </table>
                </div>
                <div
                  style="
                    display: inline-block;
                    max-width: 50%;
                    min-width: 100px;
                    vertical-align: top;
                    width: 100%;
                  "
                  class="mobile-hide"
                >
                  <table
                    align="left"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 300px"
                  >
                    <tr>
                      <td
                        align="right"
                        valign="top"
                        style="
                          font-family: Open Sans, Helvetica, Arial, sans-serif;
                          font-size: 48px;
                          font-weight: 400;
                          line-height: 48px;
                        "
                      >
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          align="right"
                        >
                          <tr>
                            <td
                              style="
                                font-family: Open Sans, Helvetica, Arial,
                                  sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                              "
                            >
                              <p
                                style="
                                  font-size: 18px;
                                  font-weight: 400;
                                  margin: 0;
                                  color: #ffffff;
                                "
                              >
                                <a
                                  href="/"
                                  style="color: #ffffff; text-decoration: none"
                                  >{{
                                    $t("orderConfirm.restaurants")
                                  }}
                                  &nbsp;</a
                                >
                              </p>
                            </td>
                            <td
                              style="
                                font-family: Open Sans, Helvetica, Arial,
                                  sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                              "
                            >
                              <a
                                href="/"
                                style="color: #ffffff; text-decoration: none"
                              >
                                <!-- <img
                                  src="https://img.icons8.com/color/48/000000/small-business.png"
                                  width="27"
                                  height="23"
                                  style="display: block; border: 0px"
                                /> -->
                                <font-awesome-icon
                                  width="40"
                                  height="40"
                                  style="
                                    display: block;
                                    border: 0px;
                                    margin: 0 0 4px 4px;
                                  "
                                  :icon="['fas', 'store']"
                                />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="padding: 35px 35px 20px 35px; background-color: #ffffff"
                bgcolor="#ffffff"
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      align="center"
                      style="
                        font-family: Open Sans, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        padding-top: 25px;
                      "
                    >
                      <img
                        src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png"
                        width="125"
                        height="120"
                        style="display: block; border: 0px"
                      /><br />
                      <h2
                        class="title"
                        style="
                          font-size: 30px;
                          font-weight: 800;
                          line-height: 36px;
                          color: #333333;
                          margin: 0;
                        "
                      >
                        {{ $t("orderConfirm.thanks") }}
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      style="
                        font-family: Open Sans, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        padding-top: 10px;
                      "
                    >
                      <p
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          line-height: 24px;
                          color: #777777;
                        "
                      ></p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding-top: 20px">
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            width="75%"
                            align="left"
                            bgcolor="#eeeeee"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                            "
                          >
                            {{ $t("orderConfirm.yourOrder") }}
                          </td>
                          <td
                            width="25%"
                            align="left"
                            bgcolor="#eeeeee"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                            "
                          ></td>
                        </tr>
                        <tr v-for="product in products" :key="product.id">
                          <td
                            width="75%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 15px 10px 5px 10px;
                            "
                          >
                            <img
                              class="product-img"
                              :src="`${product.image.url}`"
                            />
                            {{ product.name }}
                          </td>
                          <td
                            width="25%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 15px 10px 5px 10px;
                            "
                          >
                            {{ product.price }} VNĐ
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding-top: 20px">
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            width="75%"
                            align="left"
                            bgcolor="#eeeeee"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                            "
                          >
                            {{ $t("orderConfirm.orderConfirm") }}
                          </td>
                          <td
                            width="25%"
                            align="left"
                            bgcolor="#eeeeee"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                            "
                          ></td>
                        </tr>
                        <tr>
                          <td
                            width="75%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 15px 10px 5px 10px;
                            "
                          >
                            {{ $t("orderConfirm.purchaseItem") }} ({{
                              getOrderDetails.length
                            }})
                          </td>
                          <td
                            width="25%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 15px 10px 5px 10px;
                            "
                          >
                            {{ getOrder.subtotal }} VNĐ
                          </td>
                        </tr>
                        <tr>
                          <td
                            width="75%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 5px 10px;
                            "
                          >
                            {{ $t("orderConfirm.shippingFee") }}
                          </td>
                          <td
                            width="25%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              padding: 5px 10px;
                            "
                          >
                            {{ getOrder.shipping_fee }} VNĐ
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding-top: 20px">
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            width="75%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                              border-top: 3px solid #eeeeee;
                              border-bottom: 3px solid #eeeeee;
                            "
                          >
                            {{ $t("orderConfirm.total") }}
                          </td>
                          <td
                            width="25%"
                            align="left"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 800;
                              line-height: 24px;
                              padding: 10px;
                              border-top: 3px solid #eeeeee;
                              border-bottom: 3px solid #eeeeee;
                            "
                          >
                            {{ getOrder.total }} VNĐ
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                align="center"
                height="100%"
                valign="top"
                width="100%"
                style="padding: 0 35px 35px 35px; background-color: #ffffff"
                bgcolor="#ffffff"
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 660px"
                >
                  <tr>
                    <td align="center" valign="top" style="font-size: 0">
                      <div
                        style="
                          display: inline-block;
                          max-width: 50%;
                          min-width: 240px;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <table
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="max-width: 300px"
                        >
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              style="
                                font-family: Open Sans, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 24px;
                              "
                            >
                              <p style="font-weight: 800">
                                {{ $t("orderConfirm.address") }}
                              </p>
                              <p>
                                {{ getOrder.address.split(",")[0] }}
                                <br />
                                {{ getOrder.address.split(",")[1] }}
                                <br />
                                {{ getOrder.address.split(",")[2] }}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div
                        style="
                          display: inline-block;
                          max-width: 50%;
                          min-width: 240px;
                          vertical-align: top;
                          width: 100%;
                        "
                      >
                        <table
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="max-width: 300px"
                        >
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              style="
                                font-family: Open Sans, Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                line-height: 24px;
                              "
                            >
                              <p style="font-weight: 800">
                                {{ $t("orderConfirm.date") }}
                              </p>
                              <p>{{ getOrder.created_at }}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "OrderConfirm",
  data() {
    return { products: [], slug: this.$route.params.slug };
  },
  computed: {
    ...mapGetters({
      getOrder: "order/getOrder",
      getOrderDetails: "order/getOrderDetails",
      getPartnersLocal: "partner/getPartnersLocal",
    }),
  },
  methods: {
    ...mapActions({
      getCart: "cart/getCart",
      setShoppingStatus: "cart/setShoppingStatus",
    }),
    showOrder() {
      // console.log(this.getOrder);
      // console.log(this.getOrderDetails);
    },
    getInfoProduct() {
      if (this.getOrderDetails) {
        this.idOfProducts = this.getOrderDetails.map((item) => item.product_id);
        const prods = [];

        for (let i = 0; i < this.idOfProducts.length; i++) {
          this.getPartnersLocal.find((pl) =>
            pl.categories.find((cat) => {
              cat.products.find((obj) => {
                if (obj.id == this.idOfProducts[i]) {
                  prods.push({ ...obj });
                }
              });
            })
          );
        }
        this.products = prods;
      }
    },
    getCartAfterOrder() {
      this.setShoppingStatus(false);
      let token = localStorage.getItem("token");
      if (token) {
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
  },
  created() {
    this.showOrder();
    this.getInfoProduct();
    this.getCartAfterOrder();
  },
};
</script>

<style scoped lang="scss">
.title::after {
  display: none;
}
body,
table,
td,
a {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

table,
td {
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}

img {
  -ms-interpolation-mode: bicubic;
}

img {
  border: 0;
  height: auto;
  line-height: 100%;
  outline: none;
  text-decoration: none;
}

table {
  border-collapse: collapse !important;
}

body {
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
}

a[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
  font-size: inherit !important;
  font-family: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
}

@media screen and (max-width: 480px) {
  .mobile-hide {
    display: none !important;
  }

  .mobile-center {
    text-align: center !important;
  }
}

div[style*="margin: 16px 0;"] {
  margin: 0 !important;
}

.product-img {
  margin: 0;
  display: inline-block;
}
</style>