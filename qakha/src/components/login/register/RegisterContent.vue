<template>
  <div id="signup" v-bind:style="{ display: status ? 'block' : 'none' }">
    <form @submit.prevent="register($event)" @input="reFillRegister">
      <div>
        <div v-if="registerError" class="alert alert-danger" role="alert">
          {{ registerError }}
        </div>
      </div>
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
          <p class="errorMessage" v-if="!$v.userSignup.phone_number.required">
            Phone number is required
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.phone_number.numeric"
          >
            Phone number is numeric
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.phone_number.minLength"
          >
            Phone number must be at least 10 characters
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.phone_number.maxLength"
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
          <p class="errorMessage" v-else-if="!$v.userSignup.email.email">
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
          <p class="errorMessage" v-else-if="!$v.userSignup.password.minLength">
            Password must be at least 8 characters
          </p>
          <p class="errorMessage" v-else-if="!$v.userSignup.password.maxLength">
            Password must be at least 20 characters
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.password.validPassword"
          >
            Password must have 1 uppercase, 1 lowercase, 1 number characters
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
            v-else-if="!$v.userSignup.password_confirmation.minLength"
          >
            passwordConfirmation must be at least 8 characters
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.password_confirmation.maxLength"
          >
            passwordConfirmation must be at least 20 characters
          </p>
          <p
            class="errorMessage"
            v-else-if="!$v.userSignup.password_confirmation.sameAsPassword"
          >
            passwordConfirmation not match
          </p>
        </div>
      </div>
      <button
        class="button button-block"
        :disabled="$v.userSignup.$invalid || isDisabled"
      >
        Sign up
      </button>
      <Spinner :loading="isLoading" />
      <div class="row register-orther">
        <div class="col-6 formgroup">
          <p class="partner-signup">
            <router-link to="/register-partner">Become a partner</router-link>
          </p>
        </div>
        <div class="col-6 formgroup">
          <p class="driver-signup">
            <router-link to="/register-driver">Become a driver</router-link>
          </p>
        </div>
      </div>
    </form>
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
                    type="email"
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
                <Spinner :loading="isLoading" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/spinner/Spinner";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { validPassword } from "../../../services/validation/validPassword";
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
      isLogin: false,
      registerSucess: "",
      isLoading: false,
      isDisabled: false,
      activeCode: "",
      userSignup: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        type_user: 1,
      },
    };
  },
  validations: {
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
        minLength: minLength(6),
        maxLength: maxLength(20),
        validPassword,
      },
      password_confirmation: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
        sameAsPassword: sameAs("password"),
      },
    },
    activeCode: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      registerError: "auth/getRegisterError",
    }),
  },
  methods: {
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    ...mapActions({
      registerFuction: "auth/register",
    }),
    ...mapMutations({
      setRegisterError: "auth/setRegisterError",
    }),
    register() {
      this.isLoading = true;
      this.isDisabled = true;
      if (this.registerError == null) {
        this.$v.userSignup.$touch();
        if (!this.$v.userSignup.$invalid) {
          this.registerFuction(this.$data.userSignup)
            .then((response) => {
              if (response) {
                this.registerSucess = "Sign up success!";
                this.clearInput();
                this.$emit("register-success", this.registerSucess);
                $("#enterActiveCodeModal").modal("show");
              }
            })
            .finally(() => {
              this.isLoading = false;
              this.isDisabled = false;
            });
        }
        return true;
      }
    },
    handleSubmit() {
      this.isLoading = true;
      this.$v.activeCode.$touch();
      if (!this.$v.activeCode.$invalid) {
        this.forgotPassword(this.$data.activeCode)
          .then((res) => {
            openToastMess(res, "success");
            console.log(res);
            $("#enterActiveCodeModal").modal("hide");
          })
          .catch((err) => {
            openToastMess(err, "error");
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    reFillRegister() {
      this.setRegisterError(null);
    },
    clearInput() {
      this.$v.userSignup.$reset();
      this.userSignup.name = "";
      this.userSignup.email = "";
      this.userSignup.phone_number = "";
      this.userSignup.password = "";
      this.userSignup.password_confirmation = "";
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
  p[class="partner-signup"],
  p[class="driver-signup"] {
    padding-top: 20px;
    margin-bottom: 0;
    margin-top: 14px;
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
    position: relative;
    transition: all 200ms ease;
    &:active {
      -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      top: 4px;
    }
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

.register-orther {
  font-size: 2rem;
}
</style>