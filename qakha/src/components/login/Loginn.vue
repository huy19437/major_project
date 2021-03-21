<template>
  <div class="login">
    <div class="form">
      <div
        id="successSignup"
        ref="successSignup"
        v-show="elementVisible"
        v-if="registerSucess"
        class="alert alert-success"
        role="alert"
      >
        {{ registerSucess }}
        <br />
        Click Sign in to Login
      </div>
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
          <a href="#login">Sign In</a>
        </li>
      </ul>
      <div class="tab-content">
        <LoginContent :status="status" />
        <RegisterContent
          :status="status"
          @register-success="showSuccesMessage"
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
      registerSucess: "",
      elementVisible: true,
    };
  },
  methods: {
    toggleStyleDisplay: function () {
      this.status = !this.status;
    },
    showSuccesMessage(registerSucess) {
      this.registerSucess = registerSucess;
      setTimeout(function () {
        this.$refs["successSignup"].fadeOut("fast");
      }, 3000);
      // setTimeout(() => (this.elementVisible = false), 3000);
      // this.elementVisible = true;
      // this.registerSucess = "";
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
// .form-control {
//   color: #000 !important;
// }

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
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  // p {
  //   a {
  //     padding: 15px 0;
  //     background: rgba(160, 179, 176, 0.25);
  //     border-radius: 10px;
  //     .login-option-icon {
  //       margin-left: 30px;
  //     }
  //     &:hover {
  //       background-color: #f7941d;
  //       border: 1px solid #f7941d;
  //       color: #fff;
  //       outline: none;
  //     }
  //   }
  // }
  // p[class="forgot"] {
  //   a {
  //     background: none;
  //     &:hover {
  //       border: none;
  //       color: #fff;
  //     }
  //   }
  // }
  // form {
  //   div {
  //     input {
  //       border-radius: 10px;
  //       color: #000;
  //       box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
  //         rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  //     }
  //   }
  // }
  // button {
  //   border-radius: 10px;
  //   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
  //     rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  //   &:hover {
  //     background: rgb(228, 186, 95);
  //   }
  // }
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

// .top-row {
//   &:after {
//     content: "";
//     display: table;
//     clear: both;
//   }

//   > div {
//     float: left;
//     width: 48%;
//     margin-right: 4%;
//     &:last-child {
//       margin: 0;
//     }
//   }
// }

// .button {
//   border: 0;
//   outline: none;
//   border-radius: 0;
//   padding: 15px 0;
//   font-size: 2rem;
//   font-weight: $bold;
//   text-transform: uppercase;
//   letter-spacing: 0.1em;
//   background: $main;
//   color: $white;
//   transition: all 0.5s ease;
//   -webkit-appearance: none;
//   &:hover,
//   &:focus {
//     background: $main-dark;
//   }
// }

// .button-block {
//   display: block;
//   width: 100%;
// }

// .forgot {
//   margin-top: -20px;
//   text-align: right;
// }

// .errorMessage {
//   color: red;
// }

// ======== FORGOT================================
// .or-seperator {
//   margin-top: 20px;
//   text-align: center;
//   border-top: 1px solid #ccc;
// }
// .or-seperator i {
//   padding: 0 10px;
//   background: #dfe0df;
//   position: relative;
//   top: -11px;
//   z-index: 1;
// }
// .social-btn {
//   display: flex;
//   justify-content: space-around;
//   .btn {
//     border: none;
//     margin: 10px 3px 0;
//     opacity: 1;
//     padding: 15px 0;
//     font-size: 2rem;
//     font-weight: 600;
//     width: 200px;
//     box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
//       rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
//   }
// }
// .social-btn .btn:hover {
//   opacity: 0.5;
// }
// .social-btn .btn-secondary,
// .social-btn .btn-secondary:active {
//   background: #0d8cf0 !important;
//   border: 1px solid #0d8cf0;
//   color: #fff;
// }
// .social-btn .btn-danger,
// .social-btn .btn-danger:active {
//   background: #e94235 !important;
//   border: 1px solid #e94235;
//   color: #ffff;
// }
</style>