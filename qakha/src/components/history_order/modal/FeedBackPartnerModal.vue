<template>
  <div
    class="modal fade"
    id="feedBackPartnerModal"
    data-backdrop="true"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <img src="@/assets/images/logo_qakha2.png" alt="" />
          <div class="shipper-name">ABC bakery</div>
          <div class="rating-star-container">
            <star-rating
              @rating-selected="setRating"
              :star-size="30"
              :animate="true"
              :padding="9"
              :rounded-corners="true"
              :show-rating="false"
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            @click.prevent="submitAndOpenFeedbackPartnerModal"
            data-dismiss="modal"
            class="btn btn-primary"
            :disabled="rating == '' ? true : false"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StarRating from "vue-star-rating";
import { openToastMess } from "@/services/toastMessage";
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
      rating: "",
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
  },
  methods: {
    ...mapActions({ addFeedbackPartner: "feedback/addFeedbackPartner" }),
    setRating: function (rating) {
      this.rating = rating;
      console.log(this.rating);
    },
    submitAndOpenFeedbackPartnerModal() {
      this.feedBackPartnerObj.point = this.rating;
      console.log(this.feedBackPartnerObj);
      this.addFeedbackPartner(this.feedBackPartnerObj)
        .then((res) => {
          console.log(res);
          openToastMess("Add feedback partner successfully!", "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
      this.feedBackPartnerObj.content = "";
    },
    getResult() {
      this.feedBackPartnerObj.order_id = this.dataForFeedback.order_id;
      this.feedBackPartnerObj.partner_id = this.dataForFeedback.partner_id;
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
  }
  .rating-star-container {
    margin-bottom: 15px;
  }
}

.modal-content {
  top: 22vh !important;
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
</style>