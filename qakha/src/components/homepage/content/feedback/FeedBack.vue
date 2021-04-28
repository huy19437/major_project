<template>
  <div v-if="getFeedbacksStatus" class="container tab-pane" id="reviews">
    <h2>
      {{ $t("feedback.title") }} <b>{{ $t("feedback.customers") }}</b>
    </h2>
    <div class="p-4 p-lg-5 bg-white">
      <div class="row">
        <div v-if="visibleFeedbacks" class="col-lg-12">
          <div
            v-for="feedback in visibleFeedbacks"
            :key="feedback.id"
            class="media mb-3"
            style="cursor: pointer"
            data-toggle="modal"
            data-target="#detailsFeedBackModal"
            @click="getDetailsFeedback(feedback)"
          >
            <img
              class="user-img"
              :src="`${feedback.user.image.url}`"
              alt=""
              width="50"
            />
            <!-- <img
              class="user-img"
              src="@/assets/images/logo_qakha2.png"
              alt=""
              width="50"
            /> -->
            <div class="media-body">
              <h6 class="mb-0 text-uppercase">
                {{ feedback.user.name }}
              </h6>
              <p class="small text-muted mb-0 text-uppercase">
                {{ feedback.created_at }}
              </p>
              <div class="stars">
                <span
                  v-for="star in feedback.point"
                  :key="star"
                  class="fa fa-star checked"
                ></span>
              </div>
              <p class="text-small mb-0 text-muted">
                {{ feedback.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row pagination-custom">
        <PaginationCustom
          :paginationData="feedBackData"
          @page:update="updatePage"
          :currentPage="currentPage"
          :pageSize="pageSize"
        />
      </div>
      <ShowFeedBackModal :detailsFeedBack="detailsFeedBack" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import PaginationCustom from "@/components/pagination/PaginationCustom";
import ShowFeedBackModal from "./ShowFeedBackModal";
export default {
  name: "FeedBack",
  components: { PaginationCustom, ShowFeedBackModal },
  data() {
    return {
      currentPage: 0,
      pageSize: 3,
      feedBackData: [],
      detailsFeedBack: {},
    };
  },
  computed: {
    ...mapGetters({
      getFeedbacksStatus: "feedback/getFeedbacksStatus",
      getFeedbacks: "feedback/getFeedbacks",
    }),
    feedBacksStatusChange() {
      return this.getFeedbacksStatus;
    },
    feedBacksDataChange() {
      return this.getFeedbacks;
    },
    visibleFeedbacks() {
      return this.feedBackData.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    },
  },
  methods: {
    ...mapActions({
      Feedbacks: "feedback/Feedbacks",
    }),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    getDetailsFeedback(feedBackData) {
      this.detailsFeedBack = feedBackData;
    },
    getResult() {
      this.feedBackData = this.getFeedbacks;
      // console.log(this.feedBackData);
    },
  },
  created() {},
  watch: {
    feedBacksDataChange() {
      this.getResult();
    },
  },
};
</script>

<style scoped lang="scss">
.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}
.bg-white {
  .row {
    &.pagination-custom {
      display: contents;
    }
  }
}

.media {
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 0 !important;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  }
}
.media-body {
  text-align: left;
  margin-left: 10px;
  h6 {
    font-family: inherit;
    font-weight: 900;
    line-height: 1.2;
    color: inherit;
    margin-top: 0;
  }
  .small {
    font-size: 80%;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: #6c757d !important;
    margin-bottom: 0 !important;
  }
  .text-small {
    font-size: 1.85rem !important;
  }
  .text-muted {
    color: #6c757d !important;
  }
}
.stars {
  span {
    color: #f7941d !important;
  }
}

.user-img {
  width: 50px;
  height: 50px;
  margin: 0;
  border-radius: 50%;
  object-fit: cover;
}
</style>