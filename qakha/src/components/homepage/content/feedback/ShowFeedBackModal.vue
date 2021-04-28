<template>
  <div
    class="modal fade"
    id="detailsFeedBackModal"
    data-backdrop="true"
    data-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body">
          <div class="content">
            <!-- <div class="user-img">
              <img
                class="user-img"
                v-if="feedBackData.user"
                :src="`${feedBackData.user.image.url}`"
                alt=""
                width="50"
              />
              
            </div> -->
            <div class="description">
              <div v-if="feedBackData.user" class="name">
                {{ feedBackData.user.name }}
              </div>
              <div class="rating">
                <div class="stars">
                  <span
                    v-for="star in feedBackData.point"
                    :key="star"
                    class="fa fa-star checked"
                  ></span>
                </div>
              </div>
              <div class="feedback-content">
                {{ feedBackData.content }}
              </div>
            </div>
          </div>
          <div v-if="feedBackData.image" class="img-feedback">
            <img
              class="img-product"
              :src="feedBackData.image.url"
              onload="this.style.opacity = 1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import $ from "jquery";
export default {
  props: {
    detailsFeedBack: { type: Object },
  },
  components: {},
  data() {
    return {
      feedBackData: {},
    };
  },
  computed: {
    feedBackDataChange() {
      return this.detailsFeedBack;
    },
  },
  methods: {
    ...mapActions({ addFeedbacks: "feedback/addFeedbacks" }),

    getResult() {
      this.feedBackData = this.detailsFeedBack;
      console.log(this.feedBackData);
    },
  },
  created() {
    this.getResult();
  },
  watch: {
    feedBackDataChange() {
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
  display: flex;
  .content {
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;
    .name {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .rating {
      color: #f7941d;
    }
    .feedback-content {
      font-size: 2rem;
    }
  }
  .img-feedback {
    flex: 1;
    .img-product {
      width: 40vw;
    }
  }
}

.modal-dialog {
  width: 1140px !important;
  max-width: 1140px !important;
}

.img-product {
  opacity: 0;
  transition-duration: 500ms;
}

.user-img {
  width: 100px;
  height: 100px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: contain;
}
</style>