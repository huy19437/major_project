<template>
  <div
    class="modal fade"
    id="changeEmailModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="wrapper">
            <div class="inner">
              <form @submit.prevent="handleSubmit">
                <div>
                  <div v-if="errMess" class="alert alert-danger" role="alert">
                    {{ errMess.toString() }}
                  </div>
                </div>
                <h3>{{ $t("userProfile.changeEmail.title") }}</h3>
                <div v-if="!codeActive" class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    :class="$v.new_email.$error ? 'is-invalid' : ''"
                    :placeholder="`${$t(
                      'userProfile.changeEmail.placeholder.newEmail'
                    )}`"
                    v-model="new_email"
                    @blur="$v.new_email.$touch()"
                  />

                  <div v-if="$v.new_email.$error">
                    <p class="errorMessage" v-if="!$v.new_email.required">
                      Email is required
                    </p>
                    <p class="errorMessage" v-if="!$v.new_email.email">
                      Email is invalid
                    </p>
                    <p class="errorMessage" v-if="!$v.new_email.notSameAsEmail">
                      Email is same as current email
                    </p>
                  </div>
                </div>

                <div v-if="codeActive" class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    :class="$v.code_active.$error ? 'is-invalid' : ''"
                    :placeholder="`${$t(
                      'userProfile.changeEmail.placeholder.code'
                    )}`"
                    v-model="code_active"
                    @blur="$v.code_active.$touch()"
                  />

                  <div v-if="$v.code_active.$error">
                    <p class="errorMessage" v-if="!$v.code_active.required">
                      code is required
                    </p>
                  </div>
                </div>

                <div v-if="codeActive" class="form-group">
                  <button
                    type="button"
                    class="btn-fetch-code"
                    :disabled="counting"
                    @click="startCountdown"
                  >
                    <vue-countdown
                      v-if="counting"
                      :time="30 * 1000"
                      @end="onCountdownEnd"
                      v-slot="{ totalSeconds }"
                    >
                      Fetch again
                      {{ totalSeconds }}
                      later</vue-countdown
                    >
                    <span v-else>Fetch Active Code</span>
                  </button>
                </div>

                <button
                  v-if="!codeActive"
                  class="btn btn-primary btn-block btn-forgot"
                  :disabled="$v.new_email.$invalid || isDisabled"
                >
                  {{ $t("userProfile.changePassWord.submit") }}
                </button>
                <a
                  v-if="codeActive"
                  class="btn btn-primary btn-block btn-forgot"
                  :disabled="$v.code_active.$invalid || isDisabled"
                  @click="verifyEmail"
                >
                  {{ $t("userProfile.changePassWord.submit") }}
                </a>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <Spinner :loading="isLoading" />
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            :disabled="isDisabled"
            @click="catchCloseModal"
          >
            {{ $t("userProfile.changePassWord.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email, sameAs, not } from "vuelidate/lib/validators";
import Spinner from "@/components/spinner/Spinner";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  name: "ChangePassModal",
  props: {
    userDataFromSer: {
      type: Object,
    },
  },
  components: { Spinner },
  data() {
    return {
      counting: false,
      errMess: "",
      showPassword: false,
      showPassword2: false,
      isLoading: false,
      isDisabled: false,
      codeActive: false,
      current_email: "",
      new_email: "",
      code_active: "",
    };
  },
  computed: {
    userDataFromSerChange() {
      return this.userDataFromSer;
    },
  },
  validations: {
    current_email: {},
    new_email: {
      required,
      email,
      notSameAsEmail: not(sameAs("current_email")),
    },
    code_active: {
      required,
    },
  },
  methods: {
    ...mapActions({
      updateUser: "auth/updateUser",
      changeEmail: "user/changeEmail",
      showUser: "auth/showUser",
      resendActiveCodeChangeEmail: "auth/resendActiveCodeChangeEmail",
    }),
    startCountdown: function () {
      this.counting = true;
      let params = {
        new_email: this.new_email,
      };
      this.resendActiveCodeChangeEmail(params)
        .then((res) => {
          openToastMess(res, "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    onCountdownEnd: function () {
      this.counting = false;
    },
    handleSubmit() {
      this.isLoading = true;
      this.isDisabled = true;
      this.$v.new_email.$touch();
      if (!this.$v.new_email.$invalid) {
        let params = {
          email: this.new_email,
        };
        this.updateUser(params)
          .then((res) => {
            this.codeActive = !this.codeActive;
            this.counting = true;
            // console.log(res);
            openToastMess("Get verification code in your Email!", "success");
          })
          .catch((err) => {
            this.errMess = err;
            setTimeout(() => {
              this.toggleErrMessage();
            }, 3000);
          })
          .finally(() => {
            this.isLoading = false;
            this.isDisabled = false;
          });
      }
    },
    verifyEmail() {
      this.isLoading = true;
      this.isDisabled = true;
      this.$v.code_active.$touch();
      if (!this.$v.code_active.$invalid) {
        let params = {
          new_email: this.new_email,
          code_activate: this.code_active,
        };
        // console.log(params);
        this.changeEmail(params)
          .then((res) => {
            this.codeActive = !this.codeActive;
            $("#changeEmailModal").modal("hide");
            openToastMess("Change Email Successfully!", "success");
            this.clearInput();
            this.$emit("emailChanged");
          })
          .catch((err) => {
            this.errMess = err;
            setTimeout(() => {
              this.toggleErrMessage();
            }, 3000);
          })
          .finally(() => {
            this.isLoading = false;
            this.isDisabled = false;
          });
      }
    },
    clearInput() {
      this.$v.$reset();
      this.new_email = "";
      this.code_active = "";
    },
    catchCloseModal() {
      this.$v.$reset();
    },
    toggleErrMessage() {
      this.errMess = "";
    },
  },
  watch: {
    userDataFromSerChange() {
      this.current_email = this.userDataFromSer.email;
      // console.log(this.current_email);
    },
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  height: 20vh;
  align-items: center;
  .inner {
    background: #fff;
    border-radius: 10px !important;
    padding: 0 40px !important;
    width: 500px;
    margin: 0 !important;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgb(255 255 255 / 30%);
    h3 {
      margin-top: 0;
    }
    .form-group {
      margin-bottom: 20px;
      .form-control {
        &:focus {
          outline: none;
          border-color: #f28809;
        }
      }
      &.show-password {
        position: relative;
        .input-group-append {
          position: absolute;
          right: 7%;
          top: 17%;
          font-size: 1.7rem;
        }
      }
    }
  }
}

.btn-forgot {
  background: #f28809 !important;
  outline: none;
  border: 1px solid #f28809 !important;
  &:hover {
    background-color: #dbb78b !important;
    border: 1px solid #dbb78b !important;
    color: #fff !important;
    outline: none !important;
  }
}

.errorMessage {
  color: red;
  color: red;
  margin-bottom: 0;
  position: absolute;
}

.btn-fetch-code {
  background-color: transparent;
  border: none;
  box-shadow: none !important;
  margin-bottom: 7px;
}
</style>