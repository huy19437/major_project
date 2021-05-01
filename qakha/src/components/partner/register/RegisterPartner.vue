<template>
  <div class="container">
    <div class="row back-btn">
      <button class="btn btn-lg">
        <router-link to="/login">{{ $t("partner.buttons.back") }}</router-link>
      </button>
    </div>
    <h1 class="well title">{{ $t("partner.title") }}</h1>
    <div
      v-if="registerSucess"
      class="alert alert-success success-mess"
      role="alert"
    >
      Sign up successfully!
      <button
        @click="registerSucess = false"
        type="button"
        class="close close-successmess-btn"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row register-form">
      <div class="col-lg-6 well">
        <div class="row">
          <form
            @submit.prevent="handleSubmit"
            @input="reFillRegister"
            class="col-12"
          >
            <div>
              <div
                v-if="registerError"
                class="alert alert-danger err-mess"
                role="alert"
              >
                {{ registerError }}
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12 form-group">
                  <label>{{ $t("partner.name") }}</label>
                  <input
                    type="text"
                    required
                    :placeholder="`${$t('partner.placeholder.name')}`"
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
                <div class="col-12 formgroup">
                  <label>{{ $t("partner.address") }}</label>
                  <input
                    :placeholder="`${$t('partner.placeholder.address')}`"
                    rows="3"
                    required
                    class="form-control"
                    v-model="form.address"
                    @blur="$v.form.address.$touch()"
                  />
                  <div v-if="$v.form.address.$error">
                    <p class="errorMessage" v-if="!$v.form.address.required">
                      Address is required
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 formgroup">
                  <label>{{ $t("partner.phone") }}</label>
                  <input
                    type="number"
                    :placeholder="`${$t('driver.placeholder.phone')}`"
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
              </div>
              <div class="row">
                <div class="col-12 formgroup">
                  <label>{{ $t("partner.email") }}</label>
                  <input
                    type="email"
                    :placeholder="`${$t('partner.placeholder.email')}`"
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
                <div class="col-12 formgroup show-password">
                  <label>{{ $t("partner.password") }}</label>
                  <input
                    :type="[showPassword ? 'text' : 'password']"
                    :placeholder="`${$t('partner.placeholder.password')}`"
                    class="form-control"
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
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
              </div>
              <!-- <div class="row">
                <div class="col-12 formgroup">
                  <div v-show="showProgress">
                    <progress-bar :options="options" :value="progress" />
                  </div>
                  <section v-if="results && results.secure_url">
                    <label>Image Uploaded</label>
                    <img :src="results.secure_url" :alt="results.public_id" />
                  </section>
                </div>
              </div> -->
              <div v-if="!image" class="row">
                <div class="col-12 formgroup image-upload">
                  <label>{{ $t("partner.image") }}</label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/png, image/jpeg"
                    @change="handleFileChange($event)"
                  />
                </div>
              </div>
              <div v-if="image" class="row">
                <div class="col-12 formgroup image-upload">
                  <label>{{ $t("partner.image") }}</label>
                  <button class="btn btn-primary" @click="removeImage">
                    Remove image
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-4 form-group">
                  <label>{{ $t("partner.timeOpen") }}</label>
                  <input
                    type="time"
                    id="timeOpen"
                    class="form-control"
                    v-model="form.time_open"
                    @blur="$v.form.time_open.$touch()"
                    @input="errMess = false"
                  />
                  <div v-if="$v.form.time_open.$error">
                    <p class="errorMessage" v-if="!$v.form.time_open.required">
                      Time open is required
                    </p>
                  </div>
                  <div v-if="errMess">
                    <p class="errorMessage">
                      Time open must be before Time close
                    </p>
                  </div>
                </div>
                <div class="col-4 form-group">
                  <label>{{ $t("partner.timeClose") }}</label>
                  <input
                    type="time"
                    id="timeClose"
                    class="form-control"
                    v-model="form.time_close"
                    @blur="$v.form.time_close.$touch()"
                    @input="errMess = false"
                  />
                  <div v-if="$v.form.time_close.$error">
                    <p class="errorMessage" v-if="!$v.form.time_close.required">
                      Time close is required
                    </p>
                  </div>
                  <div v-if="errMess">
                    <p class="errorMessage">
                      Time close must be after Time open
                    </p>
                  </div>
                </div>
                <div class="col-4 form-group">
                  <label class="justify-content-start mr-2">{{
                    $t("partner.type")
                  }}</label>
                  <div class="short-by">
                    <select
                      class="form-control basic-select select2-hidden-accessible"
                      data-select2-id="1"
                      tabindex="-1"
                      aria-hidden="true"
                      @change="getTypePartner($event)"
                    >
                      <option value="1" data-select2-id="3">VEGE</option>
                      <option value="2">RICE BOX</option>
                      <option value="3">STREETFOOD</option>
                      <option value="4">SUSHI</option>
                      <option value="5">DRINK</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <button
                  class="btn btn-lg btn-info"
                  :disabled="
                    $v.form.$invalid ||
                    isDisabled ||
                    filesSelected < 1 ||
                    errMess
                  "
                >
                  {{ $t("partner.buttons.submitRegister") }}
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
      <div class="col-lg-6 well">
        <div class="row">
          <div class="row maps-section">
            <div class="col-12 formgroup">
              <GoogleMap @get-location-partner="getLocationPartner" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 formgroup">
            <div v-show="showProgress">
              <progress-bar :options="options" :value="progress" />
            </div>
            <section
              class="image-upload-section"
              v-if="image || (results && results.secure_url)"
            >
              <label>{{ $t("partner.imageUpload") }}</label>
              <img :src="image || results.secure_url" />
            </section>
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
                <button
                  class="btn btn-primary btn-block btn-forgot"
                  :disabled="$v.activeCode.$invalid"
                >
                  {{ $t("partner.buttons.submitCode") }}
                </button>
                <Spinner :loading="isLoading5" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="loadMe"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loadMeLabel"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { validPassword } from "../../../services/validation/validPassword";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import Spinner from "@/components/spinner/Spinner";
import GoogleMap from "@/components/googlemap/GoogleMap";
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  name: "RegisterPartner",
  components: { Spinner, GoogleMap, ProgressBar },
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
      image: "",
      showPassword: false,
      errMess: false,
      registerSucess: false,
      isLoading: false,
      isLoading5: false,
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
        address: "",
        time_open: "",
        time_close: "",
        type_user: 3,
        city_id: 1,
        latitude: "",
        longitude: "",
        image: "",
        type_id: 1,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      address: {
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
      time_open: {
        required,
      },
      time_close: {
        required,
      },
    },
    activeCode: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      registerError: "auth/getRegisterPartnerError",
    }),
    timeOpen() {
      return this.form.time_open;
    },
    timeClose() {
      return this.form.time_close;
    },
  },
  methods: {
    ...mapActions({
      registerPartner: "auth/registerPartner",
      activeAccountPartner: "auth/activeAccountPartner",
    }),
    ...mapMutations({
      setRegisterPartnerError: "auth/setRegisterPartnerError",
    }),
    async handleSubmit(event) {
      await this.upload()
        .then((res) => {
          // this.isLoading = true;
          $("#loadMe").modal("show");

          // this.isDisabled = true;
          if (this.registerError == null && !this.errMess) {
            this.$v.form.$touch();
            if (!this.$v.form.$invalid) {
              console.log(this.$data.form);
              this.registerPartner(this.$data.form)
                .then((response) => {
                  this.image = "";
                  $("#activePartnerModal").modal("show");
                  if (response) {
                    console.log(response);
                    this.registerSucess = true;
                    this.clearInput();
                    setTimeout(this.toggleSuccesMessage, 5000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  openToastMess(error, "error");
                })
                .finally(() => {
                  // this.isLoading = false;
                  $("#loadMe").modal("hide");

                  this.isDisabled = false;
                  // this.filesSelected = 0;
                });
              event.target.reset();
            }
          }
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
      // console.log(this.$data.form);
    },
    handleSubmitActivePartner() {
      this.isLoading5 = true;
      this.$v.activeCode.$touch();
      if (!this.$v.activeCode.$invalid) {
        let params = {
          code_activate: this.$data.activeCode,
        };
        this.activeAccountPartner(params)
          .then((res) => {
            $("#activePartnerModal").modal("hide");
            openToastMess(res, "success");
            console.log(res);
          })
          .catch((err) => {
            openToastMess(err, "error");
          })
          .finally(() => {
            this.isLoading5 = false;
          });
      }
    },
    getLocationPartner(location) {
      this.reFillRegister();
      this.$data.form.latitude = location.lat;
      this.$data.form.longitude = location.lng;
    },
    toggleSuccesMessage: function () {
      this.registerSucess = false;
    },
    reFillRegister() {
      this.setRegisterPartnerError(null);
    },
    handleFileChange: function (event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    prepareFormData: function () {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.fileContents);
    },
    upload: function () {
      return new Promise((res, rej) => {
        this.isDisabled = true;
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
                res(response);
              })
              .catch((error) => {
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
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = "";
    },
    clearInput() {
      this.$v.form.$reset();
      this.form.name = "";
      this.form.email = "";
      this.form.phone_number = "";
      this.form.password = "";
      this.form.address = "";
      this.form.image = "";
      this.activeCode = "";
    },
    getTypePartner(event) {
      this.form.type_id = event.target.value;
      console.log("type: " + this.form.type_id);
    },
  },
  watch: {
    timeOpen() {
      if (this.form.time_open >= this.form.time_close) {
        console.log(this.form.time_open + "====" + this.form.time_close);
        this.errMess = true;
      }
    },
    timeClose() {
      if (this.form.time_open >= this.form.time_close) {
        console.log(this.form.time_open + "====" + this.form.time_close);
        this.errMess = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$button-color: #f7941d;
.container {
  position: relative;
  margin-top: 1%;
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
  .maps-section {
    width: 100%;
    padding-left: 33px;
  }
  .image-upload-section {
    img {
      height: 40vh;
      width: auto;
    }
  }
}

.formgroup {
  &.show-password {
    position: relative;
    .input-group-append {
      position: absolute;
      right: 7%;
      top: 39%;
      font-size: 1.7rem;
      cursor: pointer;
    }
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

.image-upload {
  display: flex;
  flex-direction: column;
}
</style>