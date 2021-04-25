<template>
  <div id="login" v-bind:style="{ display: status ? 'none' : 'block' }">
    <form @submit.prevent="authenticate" @input="reFillLogin">
      <div>
        <div v-if="loginError" class="alert alert-danger" role="alert">
          {{ loginError }}
        </div>
      </div>
      <div class="field-wrap">
        <input
          type="email"
          required
          autocomplete="off"
          placeholder="Email*"
          v-model="userLogin.email"
          @blur="$v.userLogin.email.$touch()"
          class="form-control"
          :class="$v.userLogin.email.$error ? 'is-invalid' : ''"
        />
        <div v-if="$v.userLogin.email.$error">
          <p class="errorMessage" v-if="!$v.userLogin.email.required">
            Email is required
          </p>
          <p class="errorMessage" v-if="!$v.userLogin.email.email">
            Email is invalid
          </p>
        </div>
      </div>

      <div class="field-wrap show-password">
        <input
          required
          autocomplete="off"
          v-model="userLogin.password"
          @blur="$v.userLogin.password.$touch()"
          :placeholder="`${$t('login.password')}*`"
          class="form-control"
          :type="[showPassword ? 'text' : 'password']"
          :class="$v.userLogin.password.$error ? 'is-invalid' : ''"
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
        <div v-if="$v.userLogin.password.$error">
          <p class="errorMessage" v-if="!$v.userLogin.password.required">
            Password is required
          </p>
          <p class="errorMessage" v-if="!$v.userLogin.password.minLength">
            Password must be at least 8 characters
          </p>
          <p class="errorMessage" v-if="!$v.userLogin.password.maxLength">
            Password must be at least 20 characters
          </p>
        </div>
      </div>

      <p class="forgot">
        <a href="forgot">{{ $t("login.forgotPassword") }}</a>
      </p>

      <button
        class="button button-block"
        :disabled="
          $v.userLogin.$invalid || isDisabled || loginError == null
            ? false
            : true
        "
      >
        {{ $t("login.login") }}
      </button>
      <Spinner :loading="isLoading" />

      <!-- <p class="text-center">Login with your social media account</p>
      <div class="text-center social-btn">
        <a href="#" class="btn btn-secondary"
          ><i class="fa fa-facebook"></i>&nbsp; Facebook</a
        >
        <a href="#" class="btn btn-danger"
          ><i class="fa fa-google"></i>&nbsp; Google</a
        >
      </div> -->
    </form>
    <div v-if="!active_account">
      <div class="or-seperator"><i>***</i></div>
      <button
        data-toggle="modal"
        data-target="#enterActiveCodeModal"
        class="button button-block"
      >
        {{ $t("login.active") }}
      </button>
    </div>
    <div
      class="modal fade"
      data-backdrop="true"
      data-keyboard="true"
      id="enterActiveCodeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="inner">
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    :class="$v.activeCode.$error ? 'is-invalid' : ''"
                    placeholder="Enter Active Code Here"
                    v-model="activeCode"
                    @blur="$v.activeCode.$touch()"
                  />
                  <div v-if="$v.activeCode.$error">
                    <p class="errorMessage" v-if="!$v.activeCode.required">
                      Active code is required
                    </p>
                  </div>
                </div>
                <button class="btn btn-primary btn-block btn-forgot">
                  Submit
                </button>
                <Spinner :loading="isLoading2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Spinner from "@/components/spinner/Spinner";
import { openToastMess } from "@/services/toastMessage";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
import $ from "jquery";
export default {
  props: {
    status: {
      type: Boolean,
    },
  },
  components: { Spinner },
  data() {
    return {
      active_account: true,
      activeCode: "",
      showPassword: false,
      isLogin: false,
      // status: false,
      registerSucess: "",
      errMess: "",
      isLoading: false,
      isLoading2: false,
      isDisabled: false,
      userLogin: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    userLogin: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
    },
    activeCode: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      loginError: "auth/getLoginError",
      getLoading: "auth/getLoading",
      getNowRoute: "auth/getNowRoute",
    }),
  },
  methods: {
    ...mapActions({
      loginFuction: "auth/login",
      activeAccount: "auth/activeAccount",
    }),
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    ...mapMutations({
      setLoginError: "auth/setLoginError",
    }),
    authenticate(event) {
      this.isLoading = true;
      this.isDisabled = true;
      if (this.loginError == null) {
        this.$v.userLogin.$touch();
        if (!this.$v.userLogin.$invalid) {
          this.loginFuction(this.$data.userLogin)
            .then((res) => {
              console.log(this.getNowRoute);
              if (this.getNowRoute) {
                // console.log(this.getNowRoute);
                window.location.href =
                  "http://localhost:8080" + this.getNowRoute;
              } else {
                this.$router.push({ path: "/" });
              }
              // console.log(res);
            })
            .catch((err) => {
              this.errMess = err.message;
              if (err.active_account === false) {
                this.active_account = false;
              }
              setTimeout(() => {
                this.toggleErrMessage();
              }, 3000);
            })
            .finally(() => {
              this.isLoading = false;
              this.isDisabled = false;
            });
          event.target.reset();
        }
        return true;
      }
    },
    toggleErrMessage() {
      this.errMess = "";
    },
    reFillLogin() {
      this.setLoginError(null);
    },
    handleSubmit() {
      // $("#enterActiveCodeModal").modal("hide");

      this.isLoading2 = true;
      this.$v.activeCode.$touch();
      if (!this.$v.activeCode.$invalid) {
        let params = {
          code_activate: this.$data.activeCode,
        };
        this.activeAccount(params)
          .then((res) => {
            this.active_account = true;
            $("#enterActiveCodeModal").modal("hide");
            this.reFillLogin();
            openToastMess(res, "success");
            console.log(res);
          })
          .catch((err) => {
            openToastMess(err, "error");
          })
          .finally(() => {
            this.isLoading2 = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
$body-bg: #c1bdba;
$form-bg: #fff;
$white: #000000;

$main: #f7941d;
$main-light: lighten($main, 5%);
$main-dark: darken($main, 5%);

$gray-light: #a0b3b0;
$gray: #ddd;

$thin: 300;
$normal: 400;
$bold: 600;
$br: 4px;

*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  background: $body-bg;
  font-family: "Titillium Web", sans-serif;
}
.login {
  display: flex;
  height: 100vh;
  align-items: center;
  input {
    font-size: 16px;
    padding: 18px 10px;
    background-color: #fff;
  }
}
.form-control {
  color: #000 !important;
}

a {
  text-decoration: none;
  color: $main;
  transition: 0.5s ease;
  &:hover {
    color: $main-dark;
  }
}

.form {
  background: #dfe0df;
  padding: 40px;
  width: 500px;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  p {
    a {
      padding: 15px 0;
      background: rgba(160, 179, 176, 0.25);
      border-radius: 10px;
      .login-option-icon {
        margin-left: 30px;
      }
      &:hover {
        background-color: #f7941d;
        border: 1px solid #f7941d;
        color: #fff;
        outline: none;
      }
    }
  }
  p[class="forgot"] {
    a {
      background: none;
      &:hover {
        border: none;
        color: #fff;
      }
    }
  }
  form {
    div {
      input {
        border-radius: 10px;
        color: #000;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }
    }
  }
  button {
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    &:hover {
      background: rgb(228, 186, 95);
    }
  }
}

label {
  position: absolute;
  transform: translateY(6px);
  left: 13px;
  color: rgba($white, 0.5);
  transition: all 0.25s ease;
  -webkit-backface-visibility: hidden;
  pointer-events: none;
  font-size: 15px;
  top: 3px;
  .req {
    margin: 2px;
    color: $main;
  }
}

label.active {
  transform: translateY(50px);
  left: 2px;
  font-size: 14px;
  .req {
    opacity: 0;
  }
}

label.highlight {
  color: $white;
}

input,
textarea {
  font-size: 22px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid $gray-light;
  color: $white;
  border-radius: 0;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  &:focus {
    outline: 0;
    border-color: $main;
  }
}

textarea {
  border: 2px solid $gray-light;
  resize: vertical;
}

.field-wrap {
  position: relative;
  margin-bottom: 40px;
  &.show-password {
    position: relative;
    .input-group-append {
      position: absolute;
      right: 7%;
      top: 31%;
      font-size: 1.7rem;
    }
  }
}

.button {
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 15px 0;
  font-size: 2rem;
  font-weight: $bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: $main;
  color: $white;
  transition: all 0.5s ease;
  -webkit-appearance: none;
  position: relative;
  transition: all 200ms ease;
  &:active {
    -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    top: 4px;
  }
  &:hover,
  &:focus {
    background: $main-dark;
  }
}

.button-block {
  display: block;
  width: 100%;
}

.forgot {
  margin-top: -20px;
  text-align: right;
}

.errorMessage {
  color: red;
}

// ======== FORGOT================================
.or-seperator {
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid #ccc;
}
.or-seperator i {
  padding: 0 10px;
  background: #dfe0df;
  position: relative;
  top: -11px;
  z-index: 1;
}
.social-btn {
  display: flex;
  justify-content: space-around;
  .btn {
    border: none;
    margin: 10px 3px 0;
    opacity: 1;
    padding: 15px 0;
    font-size: 2rem;
    font-weight: 600;
    width: 200px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
}
.social-btn .btn:hover {
  opacity: 0.5;
}
.social-btn .btn-secondary,
.social-btn .btn-secondary:active {
  background: #0d8cf0 !important;
  border: 1px solid #0d8cf0;
  color: #fff;
  position: relative;
  transition: all 200ms ease;
  &:active {
    -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    top: 4px;
  }
}
.social-btn .btn-danger,
.social-btn .btn-danger:active {
  background: #e94235 !important;
  border: 1px solid #e94235;
  color: #ffff;
  position: relative;
  transition: all 200ms ease;
  &:active {
    -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    top: 4px;
  }
}

#show-password {
  box-shadow: none;
  height: auto;
  display: inline-block;
  width: auto;
  margin-right: 4px;
}
</style>