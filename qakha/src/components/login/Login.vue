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
          <p>
            <a href="" class="btn btn-block btn-outline-info">
              <font-awesome-icon :icon="['fab', 'google']" /><span
                class="login-option-icon"
                >Login via Google</span
              ></a
            >
            <a href="" class="btn btn-block btn-outline-primary">
              <font-awesome-icon :icon="['fab', 'facebook']" /><span
                class="login-option-icon"
                >Login via facebook</span
              ></a
            >
          </p>
          <br />
          <!-- <form @submit.prevent="register" @change="reFillRegister"> -->
          <form @submit.prevent="register">
            <div>
              <div v-if="loginError" class="alert alert-danger" role="alert">
                {{ loginError }}
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
                placeholder="User Name*"
                v-model="userSignup.username"
                @blur="$v.userSignup.username.$touch()"
              />
              <div v-if="$v.userSignup.username.$error">
                <p class="errorMessage" v-if="!$v.userSignup.username.required">
                  Username is required
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

            <button class="button button-block">Sign up</button>
          </form>
        </div>

        <div id="login" v-bind:style="{ display: status ? 'none' : 'block' }">
          <h1>Welcome Back!</h1>

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
        username: "",
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
    userSignup: {
      username: {
        required,
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
    },
  },
  computed: {
    ...mapGetters({
      loginError: "auth/getLoginError",
      // registerError: "auth/registerError",
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
      // setRegisterError: "auth/setRegisterError",
    }),
    authenticate() {
      if (this.loginError == null) {
        this.$v.userLogin.$touch();
        if (!this.$v.userLogin.$invalid) {
          // this.loginFuction(this.$data.userLogin);
          console.log(this.$data.userLogin);
        }
        return true;
      }
    },
    register() {
      // if (this.registerError == null) {
      this.$v.userSignup.$touch();
      if (!this.$v.userSignup.$invalid) {
        // this.registerFuction(this.$data.userSignup);
        console.log(this.$data.userSignup);
      }
      return true;
      // }
    },
    reFillLogin() {
      this.setLoginError(null);
    },
    // reFillRegister() {
    //   // this.setRegisterError(null);
    // },
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

a {
  text-decoration: none;
  color: $main;
  transition: 0.5s ease;
  &:hover {
    color: $main-dark;
  }
}

.form {
  background: rgba($form-bg, 0.9);
  padding: 40px;
  max-width: 600px;
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
        background: #f7941d;
        color: #fff;
      }
    }
  }
  form {
    div {
      input {
        border-radius: 10px;
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
</style>