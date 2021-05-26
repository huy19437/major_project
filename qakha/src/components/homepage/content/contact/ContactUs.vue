<template>
  <div>
    <div class="card"></div>
    <section class="py-5">
      <div class="container">
        <h2 class="mb-5 text-center">{{ $t("contactUs.title") }}</h2>
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <h5>{{ $t("contactUs.discuss") }}</h5>
            <p class="mb-5 text-muted">
              {{ $t("contactUs.slogan") }}
            </p>
            <div>
              <div class="d-flex">
                <p class="text-muted">
                  <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                  256 Nguyen Van Linh.
                </p>
              </div>
              <div class="d-flex">
                <p class="text-muted">
                  <font-awesome-icon :icon="['fas', 'phone-alt']" />
                  +84 589 273 382
                </p>
              </div>
              <div class="d-flex">
                <p class="text-muted">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                  qakhadelivery@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <form name="contact">
              <input
                id="input-name-form-2"
                type="email"
                :placeholder="`${$t('contactUs.email')}`"
                class="form-control mb-3"
              />
              <input
                type="text"
                :placeholder="`${$t('contactUs.name')}`"
                class="form-control mb-3"
              />
              <textarea
                id="contact-message-2"
                rows="5"
                :placeholder="`${$t('contactUs.text')}`"
                class="form-control mb-3"
              ></textarea>
              <button type="submit" class="btn btn-primary btn-block">
                {{ $t("contactUs.submit") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  .text-center {
    &::after {
      display: none;
    }
  }
  .row {
    text-align: left !important;
  }
  .d-flex {
    .text-muted {
      svg {
        color: #000;
        margin-right: 5px;
      }
    }
  }
}
.btn.btn-primary.btn-block {
  background-color: #000000;
  letter-spacing: 0;
  border-radius: 0 0 0 0;
  border: 1px solid #25292e;
  &:hover {
    background-color: #f7941d;
    border: 1px solid currentColor;
  }
}
</style>