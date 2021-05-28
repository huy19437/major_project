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
            <form name="contact" @submit.prevent="handleSubmit">
              <div class="input-area">
                <input
                  id="input-name-form-2"
                  type="email"
                  :placeholder="`${$t('contactUs.email')}`"
                  class="form-control mb-3"
                  v-model="contactUs.email"
                  @blur="$v.contactUs.email.$touch()"
                />

                <div v-if="$v.contactUs.email.$error">
                  <p class="errorMessage" v-if="!$v.contactUs.email.required">
                    Email required
                  </p>
                  <p class="errorMessage" v-if="!$v.contactUs.email.email">
                    Email is invalid
                  </p>
                </div>
              </div>
              <div class="input-area">
                <input
                  type="text"
                  :placeholder="`${$t('contactUs.name')}`"
                  class="form-control mb-3"
                  v-model="contactUs.name"
                  @blur="$v.contactUs.name.$touch()"
                />
                <div v-if="$v.contactUs.name.$error">
                  <p class="errorMessage" v-if="!$v.contactUs.name.required">
                    Name is required
                  </p>
                </div>
              </div>
              <div class="input-area">
                <textarea
                  id="contact-message-2"
                  rows="3"
                  :placeholder="`${$t('contactUs.text')}`"
                  class="form-control mb-3"
                  v-model="contactUs.content"
                  @blur="$v.contactUs.content.$touch()"
                ></textarea>
                <div v-if="$v.contactUs.content.$error">
                  <p class="errorMessage" v-if="!$v.contactUs.content.required">
                    Please write something
                  </p>
                </div>
              </div>
              <button
                class="btn btn-primary btn-block"
                :disabled="$v.contactUs.$invalid"
              >
                {{ $t("contactUs.submit") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <div
      class="modal fade"
      id="loadModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loadMeLabel"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div class="loader"></div>
            <div clas="loader-txt">Waiting...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  data() {
    return {
      contactUs: {
        email: "",
        name: "",
        content: "",
      },
    };
  },
  validations: {
    contactUs: {
      email: {
        required,
        email,
      },
      name: { required },
      content: { required },
    },
  },
  methods: {
    ...mapActions({
      contact: "feedback/contactUs",
    }),
    handleSubmit() {
      this.$v.contactUs.$touch();
      if (!this.$v.contactUs.$invalid) {
        $("#loadModal").modal("show");
        this.contact(this.$data.contactUs)
          .then((res) => {
            openToastMess(res, "success");
            this.clearInput();
          })
          .catch((err) => {
            openToastMess(err, "error");
          })
          .finally(() => {
            $("#loadModal").modal("hide");
          });
      }
    },
    clearInput() {
      this.$v.contactUs.$reset();
      this.contactUs.email = "";
      this.contactUs.name = "";
      this.contactUs.content = "";
    },
  },
};
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

.input-area {
  margin-bottom: 20px;
  .form-control {
    margin-bottom: 0 !important;
  }
}
</style>