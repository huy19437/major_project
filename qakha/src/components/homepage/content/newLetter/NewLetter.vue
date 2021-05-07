<template>
  <div>
    <section class="shop-newsletter section">
      <div class="container">
        <div class="inner-top">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-12">
              <!-- Start Newsletter Inner -->
              <div class="inner">
                <h4>{{ $t("newsletter.title") }}</h4>
                <p>
                  {{ $t("newsletter.desc") }}
                </p>
                <form
                  action="mail/mail.php"
                  method="get"
                  target="_blank"
                  class="newsletter-inner"
                >
                  <input
                    name="EMAIL"
                    :placeholder="`${$t('newsletter.email')}`"
                    required=""
                    type="email"
                  />
                  <button class="btn" style="top: -1px">
                    {{ $t("newsletter.subscribe") }}
                  </button>
                </form>
              </div>
              <!-- End Newsletter Inner -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
.section {
  padding: 100px 0;
}

.shop-newsletter .newsletter-inner input {
  font-size: 16px;
}

@media only screen and (min-width: 991px) and (max-width: 1199px) {
  .shop-newsletter .newsletter-inner input {
    width: 380px !important;
  }
}
</style>