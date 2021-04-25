<template>
  <div class="wrapper">
    <div class="inner">
      <form @submit.prevent="handleSubmit">
        <div>
          <div v-if="errMess" class="alert alert-danger" role="alert">
            {{ errMess }}
          </div>
        </div>
        <h3>{{ $t("forgotPassword.title") }}</h3>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            :class="$v.userForgot.email.$error ? 'is-invalid' : ''"
            placeholder="Email"
            v-model="userForgot.email"
            @blur="$v.userForgot.email.$touch()"
          />
          <div v-if="$v.userForgot.email.$error">
            <p class="errorMessage" v-if="!$v.userForgot.email.required">
              Email is required
            </p>
            <p class="errorMessage" v-if="!$v.userForgot.email.email">
              Email is invalid
            </p>
          </div>
        </div>

        <button class="btn btn-primary btn-block btn-forgot">
          {{ $t("forgotPassword.submit") }}
        </button>
        <Spinner :loading="isLoading" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import Spinner from "@/components/spinner/Spinner";
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "ForgotPassword",
  components: { Spinner },
  data() {
    return {
      errMess: "",
      isLoading: false,
      userForgot: {
        email: "",
      },
    };
  },
  validations: {
    userForgot: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    ...mapActions({
      forgotPassword: "auth/forgotPassword",
    }),
    handleSubmit() {
      this.isLoading = true;
      this.$v.userForgot.$touch();
      if (!this.$v.userForgot.$invalid) {
        this.forgotPassword(this.$data.userForgot)
          .then((res) => {
            openToastMess(res, "success");
            // console.log(res);
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
  margin-bottom: 0;
  position: absolute;
}
</style>