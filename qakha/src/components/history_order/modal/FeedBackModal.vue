<template>
  <div>
    <div
      class="modal fade"
      id="feedBackModal"
      data-backdrop="true"
      data-keyboard="true"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <img :src="`${driver_image.url}`" alt="" />
            <div class="shipper-name">{{ driverName }}</div>
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
                v-model="feedBackDriverObj.content"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("historyOrders.feedbackModal.close") }}
            </button>
            <button
              @click.prevent="submitAndOpenFeedbackPartnerModal"
              data-dismiss="modal"
              class="btn btn-primary"
              :disabled="rating == '' ? true : false"
            >
              {{ $t("historyOrders.feedbackModal.submit") }}
            </button>
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
      <div
        style="height: 100vh; width: 100vh !important; margin-top: 23vh"
        class="modal-dialog modal-sm"
        role="document"
      >
        <div id="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StarRating from "vue-star-rating";
import { openToastMess } from "@/services/toastMessage";
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
    return {
      rating: 0,
      driver_image: "",
      feedBackDriverObj: {
        order_id: 0,
        content: "",
        point: 0,
        driver_id: 0,
        partner_id: 0,
      },
    };
  },
  computed: {
    dataForFeedbackChange() {
      return this.dataForFeedback;
    },
    driverName() {
      return this.dataForFeedback.driver_name;
    },
  },
  methods: {
    ...mapActions({ addFeedbacks: "feedback/addFeedbacks" }),
    setRating: function (rating) {
      this.rating = rating;
      // console.log(this.rating);
    },
    submitAndOpenFeedbackPartnerModal() {
      $("#loadMe").modal("show");

      this.feedBackDriverObj.point = this.rating;
      // console.log(this.feedBackDriverObj);
      this.addFeedbacks(this.feedBackDriverObj)
        .then((res) => {
          $("#feedBackPartnerModal").modal("show");
          // console.log(res);
          openToastMess("Add feedback driver successfully!", "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.rating = 0;
          $("#loadMe").modal("hide");
        });
      this.feedBackDriverObj.content = "";
    },
    getResult() {
      // console.log(this.dataForFeedback);
      this.feedBackDriverObj.order_id = this.dataForFeedback.order_id;
      this.feedBackDriverObj.driver_id = this.dataForFeedback.driver_id;
      this.feedBackDriverObj.partner_id = this.dataForFeedback.partner_id;
      this.driver_image = this.dataForFeedback.driver_image;
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
  width: 40vw !important;
}

.modal-body {
  .block-comment {
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
  button {
    background-color: #000;
    &:hover {
      background-color: #f7941d;
      border-color: #f7941d;
      color: #fff;
    }
  }
}

/* Center the loader */
#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #000;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>