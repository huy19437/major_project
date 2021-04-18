<template>
  <div v-if="getFeedbacksStatus" class="tab-pane" id="reviews">
    <h2>FeedBacks of <b>Customers</b></h2>
    <div class="p-4 p-lg-5 bg-white">
      <div class="row">
        <div v-if="visibleFeedbacks" class="col-lg-8">
          <div
            v-for="feedback in visibleFeedbacks"
            :key="feedback.id"
            class="media mb-3"
          >
            <img
              class="rounded-circle"
              :src="`${feedback.user.image.url}`"
              alt=""
              width="50"
            />
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
      <div class="row">
        <PaginationCustom
          :paginationData="getFeedbacks"
          @page:update="updatePage"
          :currentPage="currentPage"
          :pageSize="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import PaginationCustom from "@/components/pagination/PaginationCustom";
export default {
  name: "FeedBack",
  components: { PaginationCustom },
  data() {
    return {
      currentPage: 0,
      pageSize: 3,
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
    visibleFeedbacks() {
      return this.getFeedbacks.slice(
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
    getResult() {
      console.log("this.getFeedbacksStatus " + this.getFeedbacksStatus);

      if (this.getFeedbacksStatus) {
        console.log("this.getFeedbacksStatus " + this.getFeedbacksStatus);
        let params = {
          partner_id: this.$route.params.slug,
        };
        console.log(params);
        this.Feedbacks(params)
          .then((res) => {
            console.log("hi");
            console.log(res);
          })
          .catch((error) => {
            openToastMess(error, "error");
          });
      }
    },
  },
  watch: {
    feedBacksStatusChange() {
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
</style>