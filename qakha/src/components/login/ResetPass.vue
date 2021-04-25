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
        <div class="form-group show-password">
          <input
            :type="[showPassword ? 'text' : 'password']"
            class="form-control"
            :class="$v.userReset.new_password.$error ? 'is-invalid' : ''"
            placeholder="New password"
            v-model="userReset.new_password"
            @blur="$v.userReset.new_password.$touch()"
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
          <div v-if="$v.userReset.new_password.$error">
            <p class="errorMessage" v-if="!$v.userReset.new_password.required">
              New password is required
            </p>
          </div>
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            :class="$v.userReset.verification_code.$error ? 'is-invalid' : ''"
            placeholder="Code"
            v-model="userReset.verification_code"
            @blur="$v.userReset.verification_code.$touch()"
          />
          <div v-if="$v.userReset.verification_code.$error">
            <p
              class="errorMessage"
              v-if="!$v.userReset.verification_code.required"
            >
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
import { openToastMess } from "@/services/toastMessage";
export default {
  name: "ResetPass",
  components: { Spinner },
  data() {
    return {
      errMess: "",
      showPassword: false,
      isLoading: false,
      userReset: {
        new_password: "",
        verification_code: "",
      },
    };
  },
  validations: {
    userReset: {
      verification_code: {
        required,
      },
      new_password: {
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