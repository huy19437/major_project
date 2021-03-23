<template>
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

      <p class="forgot"><a href="forgot">Forgot Password?</a></p>

      <button class="button button-block" :disabled="$v.userLogin.$invalid">
        Log In
      </button>
      <Spinner :loading="isLoading" />

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
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Spinner from "@/components/spinner/Spinner";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
export default {
  props: {
    status: {
      type: Boolean,
    },
  },
  components: { Spinner },
  data() {
    return {
      isLogin: false,
      // status: false,
      registerSucess: "",
      isLoading: false,
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
  },
  computed: {
    ...mapGetters({
      loginError: "auth/getLoginError",
      getLoading: "auth/getLoading",
    }),
  },
  methods: {
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    ...mapActions({
      loginFuction: "auth/login",
    }),
    ...mapMutations({
      setLoginError: "auth/setLoginError",
    }),
    authenticate(event) {
      this.isLoading = true;
      if (this.loginError == null) {
        this.$v.userLogin.$touch();
        if (!this.$v.userLogin.$invalid) {
          this.loginFuction(this.$data.userLogin)
            .then(() => {
              console.log("huy");
            })
            .catch(() => {})
            .finally(() => {
              this.isLoading = false;
            });
          event.target.reset();
        }
        return true;
      }
    },
    reFillLogin() {
      this.setLoginError(null);
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
}
.social-btn .btn-danger,
.social-btn .btn-danger:active {
  background: #e94235 !important;
  border: 1px solid #e94235;
  color: #ffff;
}
</style>