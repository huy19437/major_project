<template>
  <div
    class="modal fade"
    id="feedBackPartnerModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <img :src="`${partner_image.url}`" alt="" />
          <div class="shipper-name">{{ partnerName }}</div>
          <div class="rating-star-container">
            <star-rating
              @rating-selected="setRating"
              :star-size="30"
              :animate="true"
              :padding="9"
              :rounded-corners="true"
              :show-rating="false"
              v-model="rating"
            ></star-rating>
          </div>
        </div>
        <div class="modal-body">
          <div class="block-comment">
            <textarea
              class="comment-text"
              name=""
              id=""
              placeholder="Chia sẻ đánh giá của bạn. Đánh giá và bình luận của bạn sẽ được giữ dưới chế độ ẩn danh."
              maxlength="300"
              v-model="feedBackPartnerObj.content"
            ></textarea>
          </div>
          <div class="upload-image">
            <div class="item-upload btn-up">
              <div v-if="!image">
                <span class="icon icon-upload">
                  <font-awesome-icon :icon="['fas', 'camera']" />
                </span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  @change="handleFileChange($event)"
                />
              </div>
              <div v-else class="image-to-upload">
                <!-- <img :src="image" /> -->
                <button class="btn btn-primary" @click="removeImage">
                  Remove image
                </button>
              </div>
            </div>
            <div class="image-feedback" v-if="image">
              <img :src="image" />
              <div>
                <div v-show="showProgress">
                  <progress-bar :options="options" :value="progress" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            :disabled="isDisabled"
            data-dismiss="modal"
          >
            {{ $t("historyOrders.feedbackModal.close") }}
          </button>
          <button
            @click.prevent="submitPartnerFeedback"
            class="btn btn-primary"
            :disabled="rating == '' ? true : false || isDisabled"
          >
            {{ $t("historyOrders.feedbackModal.submit") }}
          </button>
          <p class="notice-feedback">completed feedback to get 500 coins</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StarRating from "vue-star-rating";
import { openToastMess } from "@/services/toastMessage";
import axios from "axios";
import $ from "jquery";
export default {
  props: {
    dataForFeedback: {
      type: Object,
    },
  },
  components: {
    StarRating,
  },
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
      isDisabled: false,
      rating: 0,
      partner_image: "",
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
      feedBackPartnerObj: {
        order_id: 0,
        content: "",
        point: 0,
        partner_id: 0,
      },
    };
  },
  computed: {
    dataForFeedbackChange() {
      return this.dataForFeedback;
    },
    partnerName() {
      // console.log(this.dataForFeedback.partner_name);
      return this.dataForFeedback.partner_name;
    },
  },
  methods: {
    ...mapActions({ addFeedbackPartner: "feedback/addFeedbackPartner" }),
    setRating: function (rating) {
      this.rating = rating;
      // console.log(this.rating);
    },
    async submitPartnerFeedback() {
      if (this.filesSelected != 0) {
        await this.upload()
          .then((res) => {
            this.feedBackPartnerObj.point = this.rating;
            // console.log(this.feedBackPartnerObj);
            this.addFeedbackPartner(this.feedBackPartnerObj)
              .then((res) => {
                this.image = "";
                // console.log(res);
                openToastMess("Add feedback partner successfully!", "success");
                openToastMess("You have recieved 500 coins!", "info");
                $("#feedBackPartnerModal").modal("hide");

                // window.location.reload();
                this.$emit("completedFeedback");
              })
              .catch((error) => {
                openToastMess(error, "error");
              })
              .finally(() => {
                this.rating = 0;
                this.isDisabled = false;
              });
          })
          .catch((err) => {
            openToastMess(err, "error");
          });
      } else {
        this.feedBackPartnerObj.point = this.rating;
        // console.log(this.feedBackPartnerObj);
        this.addFeedbackPartner(this.feedBackPartnerObj)
          .then((res) => {
            // console.log(res);
            openToastMess("Add feedback partner successfully!", "success");
            openToastMess("You have recieved 500 coins!", "info");
            $("#feedBackPartnerModal").modal("hide");

            // window.location.reload();
            this.$emit("completedFeedback");
          })
          .catch((error) => {
            openToastMess(error, "error");
          })
          .finally(() => {
            this.rating = 0;
            this.isDisabled = false;
          });
      }
      this.feedBackPartnerObj.content = "";
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
                this.feedBackPartnerObj.image = this.results.secure_url;
                console.log(this.feedBackPartnerObj.image);
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
      this.filesSelected = 0;
    },
    getResult() {
      this.feedBackPartnerObj.order_id = this.dataForFeedback.order_id;
      this.feedBackPartnerObj.partner_id = this.dataForFeedback.partner_id;
      this.partner_image = this.dataForFeedback.partner_image;
    },
  },
  created() {},
  watch: {
    dataForFeedbackChange() {
      this.getResult();
    },
  },
};
</script>

<style scoped lang="scss">
.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  .shipper-name {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
    margin-top: 4px;
  }
  .rating-star-container {
    margin-bottom: 15px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.modal-content {
  top: 22vh !important;
}

.modal-body {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  .block-comment {
    flex-grow: 1;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    .comment-text {
      font-size: 14px;
      background-color: transparent;
      border: 0;
      padding: 0;
      width: 100%;
      max-width: 100%;
      resize: none;
      min-height: 60px;
      overflow: auto;
      margin: 0;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}

.modal-dialog {
  width: 1140px !important;
  max-width: 1140px !important;
}

.modal-footer {
  justify-content: center;
  position: relative;
  button {
    background-color: #000;
    &:hover {
      background-color: #f7941d;
      border-color: #f7941d;
      color: #fff;
    }
  }
  .notice-feedback {
    position: absolute;
    right: 97px;
    font-size: 19px;
    font-weight: bold;
    -webkit-animation: my 2000ms infinite;
    -moz-animation: my 2000ms infinite;
    -o-animation: my 2000ms infinite;
    animation: my 2000ms infinite;
  }
}

@-webkit-keyframes my {
  0% {
    color: #f8cd0a;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #f8cd0a;
  }
}
@-moz-keyframes my {
  0% {
    color: #f8cd0a;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #f8cd0a;
  }
}
@-o-keyframes my {
  0% {
    color: #f8cd0a;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #f8cd0a;
  }
}
@keyframes my {
  0% {
    color: #f8cd0a;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #f8cd0a;
  }
}

.upload-image {
  display: flex;
  flex: 1;
  padding: 10px 0;
  .image-feedback {
    width: 475px;
    img {
      width: 50%;
      display: inline-block;
    }
  }
  // overflow: auto;
}

.icon-upload {
  font-size: 20px;
  background-position: -337px -335px;
}
</style>