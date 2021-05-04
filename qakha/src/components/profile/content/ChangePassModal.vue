<template>
  <div
    class="modal fade"
    id="changePassModal"
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
                <h3>{{ $t("userProfile.changePassWord.title") }}</h3>
                <div class="form-group show-password">
                  <input
                    :type="[showPassword ? 'text' : 'password']"
                    class="form-control"
                    :class="
                      $v.userNewPass.current_password.$error ? 'is-invalid' : ''
                    "
                    :placeholder="`${$t(
                      'userProfile.changePassWord.placeholder.currentPassword'
                    )}`"
                    v-model="userNewPass.current_password"
                    @blur="$v.userNewPass.current_password.$touch()"
                  />
                  <div class="input-group-append">
                    <span @click="showPassword = !showPassword">
                      <i
                        class="fa"
                        :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <div v-if="$v.userNewPass.current_password.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.userNewPass.current_password.required"
                    >
                      Current password is required
                    </p>
                  </div>
                </div>

                <div class="form-group show-password">
                  <input
                    :type="[showPassword2 ? 'text' : 'password']"
                    class="form-control"
                    :class="$v.userNewPass.password.$error ? 'is-invalid' : ''"
                    :placeholder="`${$t(
                      'userProfile.changePassWord.placeholder.newPassword'
                    )}`"
                    v-model="userNewPass.password"
                    @blur="$v.userNewPass.password.$touch()"
                  />
                  <div class="input-group-append">
                    <span @click="showPassword2 = !showPassword2">
                      <i
                        class="fa"
                        :class="[showPassword2 ? 'fa-eye' : 'fa-eye-slash']"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <div v-if="$v.userNewPass.password.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.userNewPass.password.required"
                    >
                      New password is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.userNewPass.password.minLength"
                    >
                      Password is minimum is 6 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.userNewPass.password.maxLength"
                    >
                      Password is maximum is 20 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.userNewPass.password.validPassword"
                    >
                      Password is invalid
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    :class="
                      $v.userNewPass.password_confirmation.$error
                        ? 'is-invalid'
                        : ''
                    "
                    :placeholder="`${$t(
                      'userProfile.changePassWord.placeholder.passwordConfirmation'
                    )}`"
                    v-model="userNewPass.password_confirmation"
                    @blur="$v.userNewPass.password_confirmation.$touch()"
                  />
                  <div v-if="$v.userNewPass.password_confirmation.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.userNewPass.password_confirmation.required"
                    >
                      Password confirmation is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="
                        !$v.userNewPass.password_confirmation.sameAsPassword
                      "
                    >
                      Password confirmation not match
                    </p>
                  </div>
                </div>

                <button
                  class="btn btn-primary btn-block btn-forgot"
                  :disabled="$v.userNewPass.$invalid || isDisabled"
                >
                  {{ $t("userProfile.changePassWord.submit") }}
                </button>
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
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { validPassword } from "@/services/validation/validPassword";
import Spinner from "@/components/spinner/Spinner";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  name: "ChangePassModal",
  components: { Spinner },
  data() {
    return {
      errMess: "",
      showPassword: false,
      showPassword2: false,
      isLoading: false,
      isDisabled: false,
      userNewPass: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  validations: {
    userNewPass: {
      current_password: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
        validPassword,
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    ...mapActions({
      changePassWord: "user/changePassWord",
    }),
    handleSubmit() {
      this.isLoading = true;
      this.isDisabled = true;
      this.$v.userNewPass.$touch();
      if (!this.$v.userNewPass.$invalid) {
        // console.log(this.$data.userNewPass);

        this.changePassWord(this.$data.userNewPass)
          .then((res) => {
            openToastMess("Change Password Successfully!", "success");
            // console.log(res);
            this.clearInput();
            $("#changePassModal").modal("hide");
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
      this.$v.userNewPass.$reset();
      this.userNewPass.current_password = "";
      this.userNewPass.password = "";
      this.userNewPass.password_confirmation = "";
    },
    toggleErrMessage() {
      this.errMess = "";
    },
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  height: 29vh;
  align-items: center;
  .inner {
    background: #fff;
    border-radius: 10px !important;
    padding: 40px;
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
</style>