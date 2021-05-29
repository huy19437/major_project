<template>
  <div id="footer">
    <footer class="footer">
      <!-- Footer Top -->
      <div class="footer-top section">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer about">
                <div class="logo">
                  <a href="/">
                    <img
                      style="margin: 0"
                      src="@/assets/dtu_logo.png"
                      alt="#"
                    />
                  </a>
                </div>
                <p class="text">
                  {{ $t("footer.session1.appname") }}
                  <br />
                  {{ $t("footer.session1.desc") }}
                </p>
                <p class="call">
                  {{ $t("footer.session1.contact") }}
                  <span>
                    <a href="tel:+84 589 273 382">+84 589 273 382</a>
                  </span>
                </p>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-2 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer links">
                <h4>{{ $t("footer.session2.title") }}</h4>
                <ul class="footer-list-info">
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session2.aboutUs") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session2.Faq") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session2.termsAndConditions") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session2.ContactUs") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session2.help") }}
                    </a>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-2 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer links">
                <h4>{{ $t("footer.session3.title") }}</h4>
                <ul class="footer-list-info">
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session3.paymentMethods") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session3.moneyBack") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session3.returns") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session3.shipping") }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {{ $t("footer.session3.privacy") }}
                    </a>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer social">
                <h4>{{ $t("footer.session4.title") }}</h4>
                <!-- Single Widget -->
                <div class="contact">
                  <ul class="footer-list-info">
                    <li>256 Nguyen Van Linh</li>
                    <li>Da Nang, Viet Nam</li>
                    <li>qakhadelivery@gmail.com</li>
                    <li>+84 589 273 382</li>
                  </ul>
                </div>
                <!-- End Single Widget -->
                <ul class="footer-list-social">
                  <li>
                    <a
                      title="facebook"
                      href="https://www.facebook.com/me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      ><i class="ti-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a title="twitter" href="javascript:void(0)"
                      ><i class="ti-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a title="flickr" href="javascript:void(0)"
                      ><i class="ti-flickr"></i
                    ></a>
                  </li>
                  <li>
                    <a title="instagram" href="javascript:void(0)"
                      ><i class="ti-instagram"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Footer Top -->
      <div class="copyright">
        <div class="container">
          <div class="inner">
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="left">
                  <p>
                    Copyright © 2021
                    <a href="https://www.facebook.com/me/" target="_blank"
                      >QakhaDelivery</a
                    >
                    - All Rights Reserved.
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-12">
                <div class="right">
                  <img
                    class="payment-icon"
                    src="@/assets/asset_item/images/payments.png"
                    alt="#"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- <ScrollUp :scroll-duration="1000" /> -->
    <!-- <a id="scrollUp" href="#top" style="position: fixed; z-index: 2147483647"
      ><span><i class="fa fa-angle-up"></i></span
    ></a> -->
  </div>
</template>

<script>
// import ScrollUp from "vue-scroll-up";
export default {
  name: "Footer",
  components: {
    // ScrollUp,
  },
};
</script>

<style lang="scss">
.footer {
  color: #fff;
  font-weight: 400;
  padding: 0;
  margin: 0;
  color: #424646;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
}

.footer-list-social,
.footer-list-info {
  padding: 0;
}

.copyright {
  .right {
    .payment-icon {
      margin: 0 0;
      display: inline;
      width: 100%;
    }
  }
}
</style>