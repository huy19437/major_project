<template>
  <div class="wrapper">
    <div class="inner">
      <form @submit.prevent="handleSubmit">
        <h3>Forgot Password</h3>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            :class="$v.email.$error ? 'is-invalid' : ''"
            placeholder="Email"
            v-model="email"
            @blur="$v.email.$touch()"
          />
          <div v-if="$v.email.$error">
            <p class="errorMessage" v-if="!$v.email.required">
              Email is required
            </p>
            <p class="errorMessage" v-if="!$v.email.email">Email is invalid</p>
          </div>
        </div>

        <button class="btn btn-primary btn-block btn-forgot">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "ForgotPassword",
  data() {
    return { email: "" };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    async handleSubmit() {
      //   const response = await axios.post("/forgot", {
      //     email: this.email,
      //   });
      //   console.log(response);
      console.log(this.email);
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  height: 100vh;
  align-items: center;
  .inner {
    background: #dfe0df;
    border-radius: 10px !important;
    padding: 40px;
    width: 500px;
    margin: 40px auto;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgb(255 255 255 / 30%);
    .form-group {
      .form-control {
        &:focus {
          outline: none;
          border-color: #f28809;
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
}
</style>