<template>
  <div>
    <section class="section about-section gray-bg" id="about">
      <div v-if="isLoadingSpinner">
        <Spinner :loading="isLoadingSpinner" />
      </div>
      <div v-else-if="!isLoadingSpinner" class="container">
        <div class="row align-items-center flex-row-reverse user-info">
          <div class="col-lg-6">
            <div class="about-text go-to">
              <div class="header-info">
                <h3 class="dark-color">{{ $t("userProfile.aboutMe") }}</h3>
                <div
                  :title="`${$t('userProfile.historyOrder')}`"
                  class="order-history"
                >
                  <router-link to="/history-order">
                    <font-awesome-icon :icon="['fas', 'clipboard-list']" />
                  </router-link>
                </div>
              </div>
              <div class="row about-list">
                <div class="col-md-6">
                  <div class="media">
                    <label>{{ $t("userProfile.name") }}</label>
                    <!-- <p>{{ getUser.name }}</p> -->
                    <input
                      type="text"
                      v-model="userObj.name"
                      @blur="
                        $v.userObj.name.$touch();
                        isDisabled = false;
                      "
                    />
                    <div v-if="$v.userObj.name.$error">
                      <p class="errorMessage" v-if="!$v.userObj.name.required">
                        Name is required
                      </p>
                    </div>
                  </div>
                  <!-- <div class="media">
                    <label>{{ $t("userProfile.role") }}</label>
                    <p>{{ userDataFromSer.role }}</p>
                  </div> -->
                  <div class="media">
                    <label>{{ $t("userProfile.coin") }}</label>
                    <p>{{ getCoinsUser }}</p>
                    <span class="coins-icon">
                      <font-awesome-icon :icon="['fas', 'coins']" />
                    </span>
                  </div>
                  <div class="media">
                    <label>{{ $t("userProfile.address") }}</label>
                    <p v-if="getAddressLocal.length > 0">
                      {{ getAddressLocal[0].name }}
                    </p>
                    <router-link
                      title="Edit User Address"
                      style="color: #000"
                      to="/edit-address"
                    >
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </router-link>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="media">
                    <label>{{ $t("userProfile.phone") }}</label>
                    <!-- <p>{{ getUser.phone_number }}</p> -->
                    <input
                      type="text"
                      v-model="userObj.phone_number"
                      @blur="
                        $v.userObj.phone_number.$touch();
                        isDisabled = false;
                      "
                    />
                    <div v-if="$v.userObj.phone_number.$error">
                      <p
                        class="errorMessage"
                        v-if="!$v.userObj.phone_number.required"
                      >
                        Phone number is required
                      </p>
                      <p
                        class="errorMessage"
                        v-if="!$v.userObj.phone_number.minLength"
                      >
                        Phone number minimum is 10 characters
                      </p>
                      <p
                        class="errorMessage"
                        v-if="!$v.userObj.phone_number.maxLength"
                      >
                        Phone number maximum is 10 characters
                      </p>
                    </div>
                  </div>
                  <div class="media">
                    <label>{{ $t("userProfile.email") }}</label>
                    <p class="email-user">{{ userDataFromSer.email }}</p>
                    <a
                      data-toggle="modal"
                      data-target="#changeEmailModal"
                      title="Edit User Email"
                      style="color: #000; cursor: pointer"
                    >
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </a>
                    <!-- <input
                      type="text"
                      v-model="userObj.email"
                      @blur="
                        $v.userObj.email.$touch();
                        isDisabled = false;
                      "
                    />
                    <div v-if="$v.userObj.email.$error">
                      <p class="errorMessage" v-if="!$v.userObj.email.email">
                        Email is invalid
                      </p>
                    </div> -->
                  </div>
                  <div class="media">
                    <label>Mật khẩu</label>
                    <div>
                      <button
                        data-toggle="modal"
                        data-target="#changePassModal"
                        class="btn btn-primary btn-update-password"
                      >
                        {{ $t("userProfile.changePassWord.title") }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-6 form-group">
                  <div v-show="showProgress">
                    <label>{{ $t("userProfile.upload") }}</label>
                    <progress-bar :options="options" :value="progress" />
                  </div>
                  <!-- <section v-if="results && results.secure_url">
                    <label>Image Uploaded</label>
                    <img :src="results.secure_url" :alt="results.public_id" />
                  </section> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="upload-image">
              <div class="item-upload btn-up">
                <!-- <label title="Change avatar">
                  <span class="icon icon-upload">
                    <font-awesome-icon :icon="['fas', 'camera']" />
                  </span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    @change="handleFileChange($event)"
                  />
                </label> -->
                <div v-if="!image">
                  <label
                    :title="`${$t('userProfile.changeAvatar')}`"
                    for="user-img"
                    class="img-user-upload"
                  >
                    <span class="icon icon-upload">
                      <font-awesome-icon :icon="['fas', 'camera']" />
                    </span>
                  </label>
                  <input
                    id="user-img"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    @change="handleFileChange($event)"
                    hidden
                  />
                </div>
                <div v-else class="image-to-upload">
                  <!-- <img :src="image" /> -->
                  <button
                    class="btn btn-primary remove-image"
                    @click="removeImage"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            </div>
            <div v-if="userDataFromSer.image || image" class="about-avatar">
              <img
                :src="
                  image
                    ? image
                    : userDataFromSer.image.url
                    ? `${userDataFromSer.image.url}`
                    : userImgAlt
                "
                title="User Avatar"
                alt="User Avatar"
                class="user-avatar"
                onload="this.style.opacity = 1"
              />
            </div>
            <!-- <div v-else-if="results && results.secure_url" class="about-avatar">
              <img
                :src="results.secure_url"
                title="User Avatar"
                alt="User Avatar"
              />
            </div> -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 justify-content-flex-end">
            <button
              @click="submitData"
              class="btn btn-primary btn-update-user"
              :disabled="$v.userObj.$invalid || isDisabled"
            >
              {{ $t("userProfile.update") }}
            </button>
          </div>
        </div>
        <!-- <div class="counter">
          <div class="row">
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                <p class="m-0px font-w-600">Happy Clients</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                <p class="m-0px font-w-600">Project Completed</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                <p class="m-0px font-w-600">Photo Capture</p>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="count-data text-center">
                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                <p class="m-0px font-w-600">Telephonic Talk</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </section>
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
            <div clas="loader-txt">
              <p>Waiting for Update Info</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ChangePassModal />
    <ChangeEmailModal
      :userDataFromSer="userDataFromSer"
      @emailChanged="emailChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import ChangePassModal from "./ChangePassModal";
import ChangeEmailModal from "./ChangeEmailModal";
import ProgressBar from "vuejs-progress-bar";
import { openToastMess } from "@/services/toastMessage";
import Spinner from "@/components/spinner/Spinner";
import $ from "jquery";
import axios from "axios";
export default {
  name: "UserInfo",
  components: { ProgressBar, ChangePassModal, ChangeEmailModal, Spinner },
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
      userImgAlt: require("./ava_alt.png"),
      isLoadingSpinner: false,
      coinOfUser: "",
      image: "",
      isDisabled: true,
      userDataFromSer: {},
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
      userObj: {
        name: "",
        phone_number: "",
      },
    };
  },
  validations: {
    userObj: {
      name: {
        required,
      },
      phone_number: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
    },
  },
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
      getAddressLocal: "address/getAddressLocal",
      getCoinsUser: "order/getCoinsUser",
    }),
  },
  methods: {
    ...mapActions({
      user: "auth/user",
      getAddress: "address/getAddress",
      setShoppingStatus: "cart/setShoppingStatus",
      showUser: "auth/showUser",
      updateUser: "auth/updateUser",
      coinsUsers: "order/coinsUsers",
    }),
    async submitData() {
      if (this.filesSelected != 0) {
        // console.log("1");
        await this.upload()
          .then((res) => {
            // console.log(this.userObj);
            this.$v.userObj.$touch();
            if (!this.$v.userObj.$invalid) {
              $("#loadMe").modal("show");

              this.updateUser(this.$data.userObj)
                .then((response) => {
                  $("#loadMe").modal("hide");
                  if (response) {
                    this.isDisabled = true;
                    this.image = "";
                    openToastMess("Update successfully", "success");
                    this.getResult();
                  }
                })
                .catch((err) => {
                  $("#loadMe").modal("hide");
                  this.registerErr = true;
                  this.isDisabled = false;
                  openToastMess(err, "error");
                });
              // .finally(() => {
              //   $("#loadMe").modal("hide");
              // });
            }
          })
          .catch((err) => {
            openToastMess(err, "error");
          });
      } else {
        // console.log("2");
        this.$v.userObj.$touch();
        if (!this.$v.userObj.$invalid) {
          // console.log(this.$data.userObj);
          $("#loadMe").modal("show");
          this.updateUser(this.$data.userObj)
            .then((response) => {
              if (response) {
                this.isDisabled = true;
                this.image = "";
                // console.log("3");
                openToastMess("Update successfully", "success");
                this.getResult();
              }
            })
            .catch((err) => {
              this.registerErr = true;
              this.isDisabled = false;
              openToastMess(err, "error");
            })
            .finally(() => {
              $("#loadMe").modal("hide");
            });
        }
      }
      // this.isDisabled = true;
      this.filesSelected = 0;
    },
    handleFileChange: function (event) {
      this.isDisabled = false;
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
      this.isDisabled = true;
      return new Promise((res, rej) => {
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
                this.userObj.image = this.results.secure_url;
                console.log(this.userObj.image);
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
      this.file = null;
      this.filesSelected = 0;
    },
    getUserChange(e) {
      // this.addressUpdate = e.target.value;
      // console.log(this.addressUpdate);
    },
    setUserInfo() {
      this.userDataFromSer = this.getUser;
      this.userObj.phone_number = this.userDataFromSer.phone_number;
      this.userObj.name = this.userDataFromSer.name;
    },
    emailChanged() {
      this.getResult();
    },
    getResult() {
      this.setShoppingStatus(false);
      this.isLoadingSpinner = true;
      this.showUser()
        .then((res) => {
          this.setUserInfo();
          // this.user();
          this.getAddress(this.user.id)
            .then((res) => {})
            .catch((error) => {
              openToastMess(error, "error");
            })
            .finally(() => {
              $("#loadMe").modal("hide");
            });
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.isLoadingSpinner = false;
          $("#loadMe").modal("hide");
        });
    },
  },
  created() {
    this.getResult();
    this.coinsUsers();
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_mixins.scss";
.user-info {
  text-align: left;
}
body {
  color: #6f8ba4;
  margin-top: 20px;
}
.section {
  padding: 100px 0;
  position: relative;
}
.gray-bg {
  background-color: #f5f5f5;
}
img {
  max-width: 100%;
  vertical-align: middle;
  border-style: none;
}
/* About Me 
---------------------*/
.about-text h3 {
  font-size: 45px;
  font-weight: 700;
  margin: 0 0 6px;
}

.about-avatar {
  margin-top: 30px;
  margin-top: 30px;
  width: 400px;
  height: 400px;
  .user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    text-align: center;
    opacity: 0;
    transition-duration: 500ms;
    border: 5px solid #ccc;
    &:hover {
      border: 5px solid #f6931d;
    }
  }
}
@media (max-width: 767px) {
  .about-text h3 {
    font-size: 35px;
  }
}
.about-text h6 {
  font-weight: 600;
  margin-bottom: 15px;
}
@media (max-width: 767px) {
  .about-text h6 {
    font-size: 18px;
  }
}
.about-text {
  p {
    font-size: 18px;
    max-width: 450px;
    mark {
      font-weight: 600;
      color: #20247b;
    }
  }
}

.about-list {
  padding-top: 10px;
  .media {
    padding: 5px 0;
    .coins-icon {
      margin: 0 4px;
      svg {
        color: #f6931d;
      }
    }
    p.email-user {
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
    }
    &:nth-child(3) {
      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        width: 41%;
      }
    }
    .input {
      position: relative;
    }
    div {
      p {
        position: absolute;
        top: 29px;
        right: -92px;
        width: 100%;
      }
    }
  }
  p {
    margin: 0;
    font-size: 15px;
  }
}

.about-list label {
  color: #20247b;
  font-weight: 600;
  width: 88px;
  margin: 0;
  position: relative;
}
.about-list label:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 11px;
  width: 1px;
  height: 12px;
  background: #20247b;
  -moz-transform: rotate(15deg);
  -o-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  margin: auto;
  opacity: 0.5;
}

@media (max-width: 991px) {
  .about-avatar {
    margin-top: 30px;
    .user-avatar {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
  }
}

.about-section {
  .counter {
    padding: 22px 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    .count-data {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .count {
      font-weight: 700;
      color: #20247b;
      margin: 0 0 5px;
    }
    p {
      font-weight: 600;
      margin: 0;
    }
  }
}

mark {
  background-image: linear-gradient(
    rgba(252, 83, 86, 0.6),
    rgba(252, 83, 86, 0.6)
  );
  background-size: 100% 3px;
  background-repeat: no-repeat;
  background-position: 0 bottom;
  background-color: transparent;
  padding: 0;
  color: currentColor;
}
.theme-color {
  color: #fc5356;
}
.dark-color {
  color: #20247b;
}

.header-info {
  display: flex;
  justify-content: space-between;
  .order-history {
    a {
      color: #000;
      &:hover {
        color: #f7941d;
      }
    }
    font-size: 3rem;
  }
}
.justify-content-flex-end {
  display: flex;
  justify-content: flex-end;
}

.btn-update-password {
  line-height: 1rem !important;
}

.btn.btn-primary.btn-update-user,
.btn.btn-primary.btn-update-password,
.btn.btn-primary.remove-image {
  @include buttonStyle();
  color: #fff;
  background-color: #000;
  border-color: #000;
  border-radius: 0 !important;
  &:hover {
    background-color: #f7941d;
    border-color: #f7941d;
  }
  &:active {
    color: #fff !important;
    background-color: #f7941d !important;
    border-color: #f7941d !important;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 50%) !important;
  }
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
}

.upload-image {
  display: flex;
  padding: 10px 0;
  // overflow: auto;
  .img-user-upload {
    cursor: pointer;
    svg {
      font-size: 3rem;
    }
  }
}

.item-upload {
  position: relative;
  margin-right: 10px;
  width: 50px;
}

.btn-up {
  cursor: pointer;
}

.icon-upload {
  font-size: 20px;
  background-position: -337px -335px;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>