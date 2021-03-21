<template>
  <div class="login">
    <div class="form">
      <ul class="tab-group">
        <li
          class="tab"
          :class="{ active: isLogin }"
          @click="(isLogin = !isLogin), toggleStyleDisplay()"
        >
          <a href="#signup">Sign Up</a>
        </li>
        <li
          class="tab"
          :class="{ active: !isLogin }"
          @click="(isLogin = !isLogin), toggleStyleDisplay()"
        >
          <a href="#login">Log In</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="signup" v-bind:style="{ display: status ? 'block' : 'none' }">
          <form @submit.prevent="register" @change="reFillRegister">
            <!-- <form @submit.prevent="register"> -->
            <div>
              <div v-if="registerError" class="alert alert-danger" role="alert">
                {{ registerError }}
              </div>
            </div>
            <!-- <div class="top-row">
              <div class="field-wrap">
                <input
                  type="text"
                  required
                  autocomplete="off"
                  placeholder="First Name*"
                />
              </div>

              <div class="field-wrap">
                <input
                  type="text"
                  required
                  autocomplete="off"
                  placeholder="Last Name*"
                />
              </div>
            </div> -->
            <div class="field-wrap">
              <input
                type="text"
                required
                autocomplete="off"
                v-model="userSignup.name"
                @blur="$v.userSignup.name.$touch()"
                placeholder="User Name*"
                class="form-control"
                :class="$v.userSignup.name.$error ? 'is-invalid' : ''"
              />
              <div v-if="$v.userSignup.name.$error">
                <p class="errorMessage" v-if="!$v.userSignup.name.required">
                  Name is required
                </p>
              </div>
            </div>

            <div class="field-wrap">
              <input
                type="text"
                required
                autocomplete="off"
                v-model="userSignup.phone_number"
                @blur="$v.userSignup.phone_number.$touch()"
                placeholder="Phone number*"
                class="form-control"
                :class="$v.userSignup.phone_number.$error ? 'is-invalid' : ''"
              />
              <div v-if="$v.userSignup.phone_number.$error">
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.phone_number.required"
                >
                  Phone number is required
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.phone_number.numeric"
                >
                  Phone number is numeric
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.phone_number.minLength"
                >
                  Phone number must be at least 10 characters
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.phone_number.maxLength"
                >
                  Phone number max is 10 characters
                </p>
              </div>
            </div>

            <div class="field-wrap">
              <input
                type="email"
                required
                autocomplete="off"
                v-model="userSignup.email"
                @blur="$v.userSignup.email.$touch()"
                placeholder="Email*"
                class="form-control"
                :class="$v.userSignup.email.$error ? 'is-invalid' : ''"
              />
              <div v-if="$v.userSignup.email.$error">
                <p class="errorMessage" v-if="!$v.userSignup.email.required">
                  Email is required
                </p>
                <p class="errorMessage" v-if="!$v.userSignup.email.email">
                  Email is invalid
                </p>
              </div>
            </div>

            <div class="field-wrap">
              <input
                required
                autocomplete="off"
                v-model="userSignup.password"
                @blur="$v.userSignup.password.$touch()"
                placeholder="Password*"
                class="form-control"
                :class="$v.userSignup.password.$error ? 'is-invalid' : ''"
              />
              <div v-if="$v.userSignup.password.$error">
                <p class="errorMessage" v-if="!$v.userSignup.password.required">
                  Password is required
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password.minLength"
                >
                  Password must be at least 8 characters
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password.maxLength"
                >
                  Password must be at least 20 characters
                </p>
              </div>
            </div>

            <div class="field-wrap">
              <input
                required
                autocomplete="off"
                v-model="userSignup.password_confirmation"
                @blur="$v.userSignup.password_confirmation.$touch()"
                placeholder="password confirmation*"
                class="form-control"
                :class="
                  $v.userSignup.password_confirmation.$error ? 'is-invalid' : ''
                "
              />
              <div v-if="$v.userSignup.password_confirmation.$error">
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password_confirmation.required"
                >
                  passwordConfirmation is required
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password_confirmation.minLength"
                >
                  passwordConfirmation must be at least 8 characters
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password_confirmation.maxLength"
                >
                  passwordConfirmation must be at least 20 characters
                </p>
                <p
                  class="errorMessage"
                  v-if="!$v.userSignup.password_confirmation.sameAsPassword"
                >
                  passwordConfirmation not match
                </p>
              </div>
            </div>
            <button class="button button-block">Sign up</button>
          </form>
        </div>

        <div id="login" v-bind:style="{ display: status ? 'none' : 'block' }">
          <form @submit.prevent="authenticate" @change="reFillLogin">
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

            <div class="field-wrap">
              <input
                required
                autocomplete="off"
                v-model="userLogin.password"
                @blur="$v.userLogin.password.$touch()"
                placeholder="Password*"
                class="form-control"
                :class="$v.userLogin.password.$error ? 'is-invalid' : ''"
              />
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

            <p class="forgot"><a href="#">Forgot Password?</a></p>

            <button class="button button-block">Log In</button>

            <hr size="5px" />
            <div class="or-seperator"><i>or</i></div>
            <p class="text-center">Login with your social media account</p>
            <div class="text-center social-btn">
              <a href="#" class="btn btn-secondary"
                ><i class="fa fa-facebook"></i>&nbsp; Facebook</a
              >
              <a href="#" class="btn btn-danger"
                ><i class="fa fa-google"></i>&nbsp; Google</a
              >
            </div>
          </form>
        </div>
      </div>
      <!-- tab-content -->
    </div>
    <!-- /form -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      isLogin: false,
      status: false,
      userLogin: {
        email: "",
        password: "",
      },
      userSignup: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
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
    userSignup: {
      name: {
        required,
      },
      phone_number: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
      password_confirmation: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  computed: {
    ...mapGetters({
      loginError: "auth/getLoginError",
      registerError: "auth/getRegisterError",
    }),
  },
  methods: {
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    ...mapActions({
      loginFuction: "auth/login",
      registerFuction: "auth/register",
    }),
    ...mapMutations({
      setLoginError: "auth/setLoginError",
      setRegisterError: "auth/setRegisterError",
    }),
    authenticate(event) {
      if (this.loginError == null) {
        this.$v.userLogin.$touch();
        if (!this.$v.userLogin.$invalid) {
          this.loginFuction(this.$data.userLogin);
          // console.log(this.$data.userLogin);
          event.target.reset();
        }
        return true;
      }
    },
    register(event) {
      if (this.registerError == null) {
        this.$v.userSignup.$touch();
        if (!this.$v.userSignup.$invalid) {
          this.registerFuction(this.$data.userSignup);
          console.log(this.$data.userSignup);
          event.target.reset();
          this.$data.status = !status;
        }
        return true;
      }
    },
    reFillLogin() {
      this.setLoginError(null);
    },
    reFillRegister() {
      this.setRegisterError(null);
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
  // max-width: 600px;
  width: 500px;
  margin: 40px auto;
  border-radius: $br;
  box-shadow: 0 4px 10px 4px rgba($form-bg, 0.3);
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
    }
  }
  form {
    div {
      input {
        border-radius: 10px;
        color: #000;
      }
    }
  }
  button {
    border-radius: 10px;
    &:hover {
      background: rgb(228, 186, 95);
    }
  }
}

.tab-group {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  li {
    &:nth-child(1) {
      a {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
    }
    &:nth-child(2) {
      a {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    a {
      display: block;
      text-decoration: none;
      padding: 15px;
      background: rgba($gray-light, 0.25);
      color: $gray-light;
      font-size: 20px;
      float: left;
      width: 50%;
      text-align: center;
      cursor: pointer;
      transition: 0.5s ease;
      // border-radius: 10px;
      &:hover {
        background: $main-dark;
        color: $white;
      }
    }
  }
  .active a {
    background: $main;
    color: $white;
  }
}

.tab-content {
  div h1 {
    color: #000;
    padding-bottom: 26px;
    padding-top: 20px;
  }
}

h1 {
  text-align: center;
  color: $white;
  font-weight: $thin;
  margin: 0 0 40px;
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
}

.top-row {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  > div {
    float: left;
    width: 48%;
    margin-right: 4%;
    &:last-child {
      margin: 0;
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
  }
}
.social-btn .btn:hover {
  opacity: 0.9;
}
.social-btn .btn-secondary,
.social-btn .btn-secondary:active {
  background: #0d8cf0 !important;
  border: 1px solid #0d8cf0;
  color: #fff;
}
.social-btn .btn-danger,
.social-btn .btn-danger:active {
  background: #e94235 !important;
  border: 1px solid #e94235;
  color: #ffff;
}
</style>