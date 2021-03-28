<template>
  <div class="wrapper">
    <div class="inner">
      <form @submit.prevent="handleSubmit">
        <div>
          <div v-if="errMess" class="alert alert-danger" role="alert">
            {{ errMess.toString() }}
          </div>
        </div>
        <h3>Reset Password</h3>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            :class="$v.userReset.password.$error ? 'is-invalid' : ''"
            placeholder="New Password"
            v-model="userReset.password"
            @blur="$v.userReset.password.$touch()"
          />
          <div v-if="$v.userReset.password.$error">
            <p class="errorMessage" v-if="!$v.userReset.password.required">
              New Password is required
            </p>
          </div>
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            :class="$v.userReset.token.$error ? 'is-invalid' : ''"
            placeholder="Code"
            v-model="userReset.token"
            @blur="$v.userReset.token.$touch()"
          />
          <div v-if="$v.userReset.token.$error">
            <p class="errorMessage" v-if="!$v.userReset.token.required">
              OTP code is required
            </p>
          </div>
        </div>

        <button class="btn btn-primary btn-block btn-forgot">Submit</button>
        <Spinner :loading="isLoading" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import Spinner from "@/components/spinner/Spinner";
export default {
  name: "ResetPass",
  components: { Spinner },
  data() {
    return {
      errMess: "",
      isLoading: false,
      userReset: {
        password: "",
        token: "",
      },
    };
  },
  validations: {
    userReset: {
      token: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      resetPassword: "auth/resetPassword",
    }),
    handleSubmit() {
      this.isLoading = true;
      this.$v.userReset.$touch();
      if (!this.$v.userReset.$invalid) {
        this.resetPassword(this.$data.userReset)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            this.errMess = err;
            setTimeout(() => {
              this.toggleErrMessage();
            }, 3000);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    toggleErrMessage() {
      this.errMess = "";
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