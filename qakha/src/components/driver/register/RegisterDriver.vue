<template>
  <div class="container driver-signup">
    <div class="row back-btn">
      <button class="btn btn-lg">
        <router-link to="/login">Back to login</router-link>
      </button>
    </div>
    <h1 class="well title">Driver Registration</h1>
    <div class="row register-form">
      <div class="col-lg-12 well">
        <div class="row">
          <form
            @submit.prevent="handleSubmit"
            @input="reFillRegister"
            class="col-12"
          >
            <div class="col-12">
              <div class="row">
                <div class="col-12 form-group">
                  <label>Driver Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter First Name Here.."
                    class="form-control"
                    v-model="form.name"
                    @blur="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p class="errorMessage" v-if="!$v.form.name.required">
                      Name is required
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    placeholder="Enter Phone Number Here.."
                    class="form-control"
                    v-model="form.phone_number"
                    @blur="$v.form.phone_number.$touch()"
                  />
                  <div v-if="$v.form.phone_number.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.form.phone_number.required"
                    >
                      Phone number is required
                    </p>
                    <p
                      class="errorMessage"
                      v-if="!$v.form.phone_number.minLength"
                    >
                      Phone number minimum is 10 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-if="!$v.form.phone_number.maxLength"
                    >
                      Phone number maximum is 10 characters
                    </p>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address Here.."
                    class="form-control"
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                  />
                  <div v-if="$v.form.email.$error">
                    <p class="errorMessage" v-if="!$v.form.email.required">
                      Email is required
                    </p>
                    <p class="errorMessage" v-if="!$v.form.email.email">
                      Email is invalid
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="Enter Password Here.."
                    class="form-control"
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                  />
                  <div v-if="$v.form.password.$error">
                    <p class="errorMessage" v-if="!$v.form.password.required">
                      Password is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password.minLength"
                    >
                      Password is minimum is 6 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password.maxLength"
                    >
                      Password is maximum is 20 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password.validPassword"
                    >
                      Password is invalid
                    </p>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <label>Password confirmation</label>
                  <input
                    type="text"
                    placeholder="Enter Password Confirm Here.."
                    class="form-control"
                    v-model="form.password_confirmation"
                    @blur="$v.form.password_confirmation.$touch()"
                  />
                  <div v-if="$v.form.password_confirmation.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.form.password_confirmation.required"
                    >
                      passwordConfirmation is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password_confirmation.minLength"
                    >
                      passwordConfirmation is minimum is 6 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password_confirmation.maxLength"
                    >
                      passwordConfirmation is maximum is 20 characters
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.password_confirmation.sameAsPassword"
                    >
                      passwordConfirmation not match
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 form-group">
                  <label>ID Card Number</label>
                  <input
                    type="number"
                    placeholder="Enter ID Card Number Here..."
                    class="form-control"
                    v-model="form.id_card"
                    @blur="$v.form.id_card.$touch()"
                  />
                  <div v-if="$v.form.id_card.$error">
                    <p class="errorMessage" v-if="!$v.form.id_card.required">
                      Id card Number is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.id_card.validIdCard"
                    >
                      Id card Number is invalid
                    </p>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <label>License Plate</label>
                  <input
                    type="text"
                    placeholder="Enter License Plate Here..."
                    class="form-control"
                    v-model="form.license_plate"
                    @blur="$v.form.license_plate.$touch()"
                  />
                  <div v-if="$v.form.license_plate.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.form.license_plate.required"
                    >
                      License plate is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.license_plate.validLicensePlate"
                    >
                      License plate is invalid
                    </p>
                  </div>
                </div>
              </div>
              <div class="row image-section">
                <div class="col-6 form-group">
                  <div v-show="showProgress">
                    <progress-bar :options="options" :value="progress" />
                  </div>
                  <section v-if="results && results.secure_url">
                    <label>Image Uploaded</label>
                    <img :src="results.secure_url" :alt="results.public_id" />
                  </section>
                </div>
                <div class="col-6 form-group image-upload">
                  <label>Driver's Avatar</label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/png, image/jpeg"
                    @change="handleFileChange($event)"
                  />
                </div>
              </div>
              <!-- <div class="row">
                <div class="col-6 form-group">
                  <label>ID Card Number</label>
                  <input
                    type="number"
                    placeholder="Enter ID Card Number Here..."
                    class="form-control"
                    v-model="form.id_card"
                    @blur="$v.form.id_card.$touch()"
                  />
                  <div v-if="$v.form.id_card.$error">
                    <p class="errorMessage" v-if="!$v.form.id_card.required">
                      Id card Number is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.id_card.validIdCard"
                    >
                      Id card Number is invalid
                    </p>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <label>License Plate</label>
                  <input
                    type="text"
                    placeholder="Enter License Plate Here..."
                    class="form-control"
                    v-model="form.license_plate"
                    @blur="$v.form.license_plate.$touch()"
                  />
                  <div v-if="$v.form.license_plate.$error">
                    <p
                      class="errorMessage"
                      v-if="!$v.form.license_plate.required"
                    >
                      License plate is required
                    </p>
                    <p
                      class="errorMessage"
                      v-else-if="!$v.form.license_plate.validLicensePlate"
                    >
                      License plate is invalid
                    </p>
                  </div>
                </div>
              </div> -->
              <div class="row">
                <button
                  class="btn btn-lg btn-info"
                  :disabled="
                    $v.form.$invalid ||
                    isDisabled ||
                    filesSelected < 1 ||
                    registerErr
                  "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <Spinner :loading="isLoading" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      id="activePartnerModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="inner">
              <form @submit.prevent="handleSubmitActivePartner">
                <div class="form-group">
                  <input
                    type="text"
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
                <Spinner :loading="isLoading4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { validPassword } from "../../../services/validation/validPassword";
import { validIdCard } from "../../../services/validation/validIdCard";
import { validLicensePlate } from "../../../services/validation/validLicensePlate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";

export default {
  name: "RegisterPartner",
  components: { Spinner, ProgressBar },
  data() {
    const progressBarOptions = {
      text: {
        shadowColor: "black",
        fontSize: 14,
        fontFamily: "Helvetica",
        dynamicPosition: true,
      },
      progress: {
        color: "#E8C401",
        backgroundColor: "#000000",
      },
      layout: {
        height: 35,
        width: 140,
        type: "line",
        progressPadding: 0,
        verticalTextAlign: 63,
      },
    };
    return {
      registerErr: false,
      isLoading: false,
      isLoading4: false,
      isDisabled: false,
      results: null,
      file: null,
      filesSelected: 0,
      cloudName: "qakhadelivery",
      preset: "vue_upload",
      progress: 0,
      showProgress: false,
      options: progressBarOptions,
      fileContents: null,
      formData: null,
      activeCode: "",
      form: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        id_card: "",
        license_plate: "",
        type_user: 2,
        image: "",
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone_number: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      password_confirmation: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
        sameAsPassword: sameAs("password"),
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
      id_card: {
        required,
        validIdCard,
      },
      license_plate: {
        required,
        validLicensePlate,
      },
    },
    activeCode: {
      required,
    },
  },
  computed: {},
  methods: {
    ...mapActions({
      registerDriver: "auth/registerDriver",
      activeAccountDriver: "auth/activeAccountDriver",
    }),
    ...mapMutations({
      setRegisterError: "auth/setRegisterError",
    }),
    async handleSubmit(event) {
      console.log(this.registerErr);
      await this.upload()
        .then((res) => {
          this.isLoading = true;
          if (this.registerErr == false) {
            this.$v.form.$touch();
            if (!this.$v.form.$invalid) {
              this.registerDriver(this.$data.form)
                .then((response) => {
                  $("#activePartnerModal").modal("show");

                  if (response) {
                    openToastMess("Sign up successfully", "success");
                    // event.target.reset();
                    this.clearInput();
                  }
                })
                .catch((err) => {
                  this.registerErr = true;
                  openToastMess(err, "error");
                })
                .finally(() => {
                  this.isLoading = false;
                  this.isDisabled = false;
                });
              console.log(event.target.value);
            }
          }
        })
        .catch((err) => {
          openToastMess(err, "error");
        });
    },
    handleSubmitActivePartner() {
      this.isLoading4 = true;
      this.$v.activeCode.$touch();
      if (!this.$v.activeCode.$invalid) {
        let params = {
          code_activate: this.$data.activeCode,
        };
        this.activeAccountDriver(params)
          .then((res) => {
            $("#activePartnerModal").modal("hide");
            openToastMess(res, "success");
            console.log(res);
          })
          .catch((err) => {
            openToastMess(err, "error");
          })
          .finally(() => {
            this.isLoading4 = false;
          });
      }
    },
    reFillRegister() {
      this.registerErr = false;
    },
    handleFileChange: function (event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    prepareFormData: function () {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.fileContents);
    },
    upload: function () {
      return new Promise((res, rej) => {
        this.isDisabled = true;
        if (this.preset.length < 1 || this.cloudName.length < 1) {
          openToastMess(
            "You must enter a cloud name and preset to upload",
            "error"
          );
          return;
        }
        console.log("upload", this.file.name);
        let reader = new FileReader();
        // attach listener to be called when data from file
        reader.addEventListener(
          "load",
          function () {
            this.fileContents = reader.result;
            this.prepareFormData();
            let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
            let requestObj = {
              url: cloudinaryUploadURL,
              method: "POST",
              data: this.formData,
              onUploadProgress: function (progressEvent) {
                console.log("progress", progressEvent);
                this.progress = Math.round(
                  (progressEvent.loaded * 100.0) / progressEvent.total
                );
                console.log(this.progress);
                //bind "this" to access vue state during callback
              }.bind(this),
            };
            //show progress bar at beginning of post
            this.showProgress = true;
            axios(requestObj)
              .then((response) => {
                this.results = response.data;
                this.form.image = this.results.secure_url;
                console.log(this.form.image);
                console.log(this.results);
                console.log("public_id", this.results.public_id);
                res();
              })
              .catch((error) => {
                console.log(this.error);
                rej(error);
              })
              .finally(() => {
                setTimeout(
                  function () {
                    this.showProgress = false;
                  }.bind(this),
                  1000
                );
              });
          }.bind(this),
          false
        );
        // call for file read if there is a file
        if (this.file && this.file.name) {
          reader.readAsDataURL(this.file);
        }
      });
    },
    clearInput() {
      this.$v.form.$reset();
      this.form.name = "";
      this.form.email = "";
      this.form.phone_number = "";
      this.form.password_confirmation = "";
      this.form.password = "";
      this.form.address = "";
      this.form.image = "";
      this.form.id_card = "";
      this.form.license_plate = "";
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
$button-color: #f7941d;
.container.driver-signup {
  position: relative;
  margin-top: 5%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  select.form-control:not([size]):not([multiple]) {
    height: calc(2.25rem + 18px);
    border-radius: 10px;
    box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
      rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  }
  .col-6.form-group {
    margin-bottom: 0;
  }
  .register-form {
    padding-left: 19px;
    padding-right: 19px;
  }
  .title {
    background-color: $button-color;
    border: 5px solid #f5f5f5;
    margin-top: 0;
    border-radius: 10px;
  }
  form {
    position: relative;
    input,
    textarea {
      border-radius: 10px;
      box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
        rgb(0 0 0 / 30%) 0px 1px 3px -1px;
      font-size: 16px;
      padding: 18px 10px;
      background-color: #fff;
      width: 100%;
      height: 43%;
    }
    .col-12 {
      div {
        text-align: left;
      }
      .row.image-section {
        margin-bottom: 4rem;
      }
    }
    .err-mess {
      position: absolute;
      z-index: 100;
      right: -45%;
      top: -3%;
      font-size: 15px;
      font-weight: 700;
      width: 476px;
    }
  }
  .success-mess {
    margin-bottom: 0;
    background-color: rgb(156, 241, 163);
    border-color: transparent;
    font-size: 15px;
    font-weight: 700;
    color: #468847;
    position: absolute;
    z-index: 100;
    top: 13%;
    width: 52%;
    right: 24%;
  }
}

.back-btn {
  display: flex;
  justify-content: flex-start;
  button {
    background-color: #fff;
    padding-bottom: 0;
    a {
      color: #000000;
    }
  }
}

.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

.btn-info {
  width: 100%;
  background-color: $button-color;
  border-color: $button-color;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: relative;
  transition: all 200ms ease;
  &:active {
    -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000 !important;
    top: 4px;
    background-color: $button-color !important;
    border-color: rgb(245, 223, 124) !important;
  }
  &:hover {
    background-color: rgb(245, 223, 124);
    border-color: rgb(245, 223, 124);
  }
  &:focus {
    color: #ffffff;
    background-color: $button-color;
    border-color: $button-color;
  }
}

.loader {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;
}

/* Customize container */
@media (min-width: 768px) {
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
}
</style>