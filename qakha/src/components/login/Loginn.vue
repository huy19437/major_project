<template>
  <div class="login">
    <div class="form">
      <div class="row back-btn">
        <button class="btn btn-lg">
          <router-link to="/">{{ $t("login.back") }}</router-link>
        </button>
      </div>
      <div v-if="registerSucess" class="alert alert-success" role="alert">
        <!-- {{ registerSucess }} -->
        Sign up successfully!
        <br />
        <!-- Click Sign in to Login -->
        <button
          @click="registerSucess = false"
          type="button"
          class="close close-successmess-btn"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ul class="tab-group">
        <li
          class="tab"
          :class="{ active: isLogin }"
          @click="(isLogin = !isLogin), toggleStyleDisplay()"
        >
          <a href="#signup">{{ $t("login.way.signup") }}</a>
        </li>
        <li
          class="tab"
          :class="{ active: !isLogin }"
          @click="(isLogin = !isLogin), toggleStyleDisplay()"
        >
          <a href="#login">{{ $t("login.way.signin") }}</a>
        </li>
      </ul>
      <div class="tab-content">
        <LoginContent :status="status" />
        <RegisterContent
          :status="status"
          @register-success="showSuccesMessage"
          @active-account-success="showLoginForm"
        />
      </div>
      <!-- tab-content -->
    </div>
    <!-- /form -->
  </div>
</template>

<script>
import LoginContent from "./login/LoginContent";
import RegisterContent from "./register/RegisterContent";
export default {
  name: "Loginn",
  components: {
    LoginContent,
    RegisterContent,
  },
  data() {
    return {
      isLogin: false,
      status: false,
      registerSucess: false,
    };
  },
  methods: {
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    toggleSuccesMessage: function () {
      this.registerSucess = false;
    },
    showSuccesMessage(registerSucess) {
      // console.log("hi");
      this.registerSucess = !this.registerSucess;
      setTimeout(this.toggleSuccesMessage, 4000);
    },
    showLoginForm() {
      this.status = !this.status;
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
  .close-successmess-btn {
    position: absolute;
    right: 4px;
    top: 1px;
    font-size: 35px;
  }
  .back-btn {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: transparent;
      padding-bottom: 0;
      a {
        color: #000000;
        font-size: 15px;
      }
    }
  }
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
</style>