<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="section-title">
          <h3 class="title-comm">
            <span class="title-holder">{{
              $t("listPartners.restaurants")
            }}</span>
          </h3>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <div class="sidebar">
          <label class="justify-content-start mr-2"
            >{{ $t("listPartners.searchBy.title") }}:</label
          >
          <div class="widget border-0">
            <div class="search">
              <input
                class="form-control"
                type="text"
                :placeholder="`${$t('listPartners.searchBy.name')}`"
                v-model="searchByName"
              />
            </div>
          </div>
          <div class="widget border-0">
            <div class="locations">
              <input
                class="form-control"
                type="text"
                :placeholder="`${$t('listPartners.searchBy.location')}`"
                v-model="searchByAddress"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="job-filter mb-4 d-sm-flex align-items-center">
          <div class="job-shortby ml-sm-auto d-flex align-items-center">
            <form class="form-inline">
              <div class="form-group mb-0">
                <label class="justify-content-start mr-2"
                  >{{ $t("listPartners.sortBy") }}:</label
                >
                <div class="short-by">
                  <select
                    class="form-control basic-select select2-hidden-accessible"
                    tabindex="-1"
                    aria-hidden="true"
                    @change="getTypePartner($event)"
                  >
                    <option value="">ALL</option>
                    <option value="1">VEGE</option>
                    <option value="2">RICE BOX</option>
                    <option value="3">STREETFOOD</option>
                    <option value="4">SUSHI</option>
                    <option value="5">DRINK</option>
                    <option value="6">BEST RATED</option>
                    <option value="7">NEAR BY</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div
            v-for="partner in visiblePartner"
            :key="partner.id"
            class="col-sm-6 col-lg-4 mb-4"
            :style="{
              display:
                partner.status === 'locked' ||
                partner.status === 'not_activated'
                  ? 'none'
                  : 'block',
            }"
          >
            <div class="partner-list partner-grid">
              <div
                v-if="typePartner === '5'"
                class="home-product-item__best-rated"
              >
                <span
                  class="icon icon-quality-merchant"
                  title="This is one of the best rated Merchants on Qakha"
                ></span>
              </div>
              <div class="partner-list-image">
                <div class="img-box">
                  <router-link
                    :to="{
                      name: 'ListProducts',
                      params: { slug: partner.id },
                    }"
                  >
                    <img
                      class="img-fluid"
                      :src="`${partner.image.url}`"
                      alt="Partner's image"
                      onload="this.style.opacity = 1"
                    />
                    <span :class="`time-tag ${partner.status}`">
                      <!-- {{ partner.status }} -->
                      {{ $t(`listPartners.${partner.status}`) }}
                    </span>
                  </router-link>
                </div>
              </div>
              <div class="partner-list-details">
                <div class="partner-list-info">
                  <div class="partner-list-title">
                    <h5>
                      <router-link
                        :to="{
                          name: 'ListProducts',
                          params: { slug: partner.id },
                        }"
                        >{{ partner.name }}</router-link
                      >
                    </h5>
                  </div>
                  <div class="partner-list-option">
                    <ul class="list-unstyled">
                      <li>
                        <span>{{ partner.address }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <PaginationCustom
        :paginationData="filteredList"
        @page:update="updatePage"
        :currentPage="currentPage"
        :pageSize="pageSize"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PaginationCustom from "../../../pagination/PaginationCustom";
import { openToastMess } from "@/services/toastMessage";
import axios from "axios";
export default {
  name: "ListPartners",
  components: {
    PaginationCustom,
  },
  computed: {
    ...mapGetters({
      getPartnersLocal: "partner/getPartnersLocal",
      getUser: "auth/getUser",
    }),
    filteredList() {
      return this.partnerData.filter((partner) => {
        return (
          (this.xoa_dau(partner.name) || "")
            .toLowerCase()
            .includes(this.xoa_dau(this.searchByName).toLowerCase()) &&
          (this.xoa_dau(partner.address) || "")
            .toLowerCase()
            .includes(this.xoa_dau(this.searchByAddress).toLowerCase()) &&
          (this.typePartner === "6" || this.typePartner === "7"
            ? true
            : (partner.type_id || "")
                .toString()
                .toLowerCase()
                .includes(this.typePartner.toLowerCase()))
        );
      });
    },
    visiblePartner() {
      return this.filteredList.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    },
    partnerDataOnChange() {
      return this.partnerData;
    },
    searchByAddressOnChange() {
      return this.searchByAddress;
    },
    searchByNameOnChange() {
      return this.searchByName;
    },
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 6,
      partnerData: [],
      typePartner: "",
      searchByName: "",
      searchByAddress: "",
    };
  },
  methods: {
    ...mapActions({
      getPartners: "partner/getPartners",
      getPartnersBestRated: "partner/getPartnersBestRated",
      getPartnersNearBy: "partner/getPartnersNearBy",
      setCartsNull: "cart/setCartsNull",
      setShoppingStatus: "cart/setShoppingStatus",
      user: "auth/user",
      showUser: "auth/showUser",
      getAddress: "address/getAddress",
      showFeedback: "feedback/showFeedback",
    }),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    getTypePartner(event) {
      console.log(event.target.value.toString());
      if (event.target.value.toString() == "6") {
        this.bestRatedPartner(event.target.value.toString());
      } else if (event.target.value.toString() == "7") {
        this.getUserLocation(event.target.value.toString());
      } else {
        this.partnerData = this.getPartnersLocal;
        this.typePartner = event.target.value.toString();
      }
    },
    bestRatedPartner(typePartner) {
      this.getPartnersBestRated().then((res) => {
        this.partnerData = res;
        this.typePartner = typePartner;
      });
    },
    getUserLocation(typePartner) {
      let options = {
        enableHighAccuracy: Boolean, //defaults to false
        timeout: 3000, //defaults to Infinity
        maximumAge: 0, //defaults to 0
      };
      this.$getLocation(options).then((coordinates) => {
        let params = {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          localityLanguage: "vn",
        };
        this.getPartnersNearByUserLocation(params, typePartner);
      });
    },
    getPartnersNearByUserLocation(params, typePartner) {
      this.getPartnersNearBy(params).then((res) => {
        this.partnerData = res;
        this.typePartner = typePartner;
      });
    },
    xoa_dau(str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      return str.toLowerCase();
    },
    getResult() {
      this.getPartners()
        .then((res) => {
          // console.log("call here");
          this.setCartsNull();
          this.setShoppingStatus(false);
          this.showFeedback(false);
          this.partnerData = this.getPartnersLocal;
          // console.log(this.partnerData);
        })
        .catch((error) => {
          // console.log(error);
          openToastMess(error, "error");
        });
    },
  },
  created() {
    this.getResult();
    if (this.getUser) {
      this.showUser();
    }
  },
  watch: {
    partnerDataOnChange() {
      this.currentPage = 0;
    },
    searchByAddressOnChange() {
      this.currentPage = 0;
    },
    searchByNameOnChange() {
      this.currentPage = 0;
    },
  },
};
</script>

<style scoped lang="scss">
$border-radius: 7px;
.container {
  .row:nth-child(3) {
    display: flex;
    justify-content: center;
    padding-top: 33px;
  }
}
.sidebar {
  padding-top: 28%;
  text-align: left;
  .widget {
    padding-bottom: 20px;
    .form-control {
      height: 43px;
    }
  }
}

select.form-control:not([size]):not([multiple]) {
  height: calc(2.25rem + 14px);
}
/* partner List */
.partner-list {
  background: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  border-radius: $border-radius;
  &:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    // position: relative;
    z-index: 99;
    a.partner-list-favourite {
      color: #e74c3c;
      -webkit-box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
      box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
    }
  }
  .partner-list-image {
    margin-right: 25px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 80px;
    flex: 0 0 80px;
    border: none;
  }
  .partner-list-image {
    img {
      width: 80px;
      height: 80px;
      -o-object-fit: cover;
      object-fit: cover;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
    .time-tag {
      display: inline-block;
      opacity: 1;
      font-size: 11px;
      color: #fff;
      right: 20px;
      top: 20px;
      padding: 1px 16px;
      font-weight: 700;
      border-radius: 0;
      text-align: center;
      position: absolute;
      text-transform: uppercase;
      border-radius: 30px;
      height: 26px;
      line-height: 24px;
      &.open {
        background-color: #1fbb3c;
      }
      &.close {
        background-color: #ed1b24;
      }
      &.locked {
        background-color: #f7941d;
      }
    }
  }
}

.partner-list-title {
  margin-bottom: 5px;
}

.partner-banner .partner-list:hover {
  position: inherit;
  -webkit-box-shadow: inherit;
  box-shadow: inherit;
  z-index: inherit;
}

/* partner Grid */
.partner-list {
  &.partner-grid {
    padding: 0px;
    display: block;
    border-bottom: none;
  }
  .partner-list-image {
    text-align: center;
    margin-right: 0px;
  }
  .partner-list-image {
    img {
      height: 150px;
      width: 100%;
      opacity: 0;
      transition-duration: 500ms;
    }
  }
  .partner-list-details {
    text-align: left;
    padding: 20px 20px 20px 20px;
    border: 1px solid #eeeeee;
    border-top: none;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    .partner-list-info {
      .partner-list-title {
        h5 {
          a {
            color: #000;
            font-weight: 600 !important;
            font-size: 1.8rem !important;
            color: #000;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            &:hover {
              color: #f7941d;
              text-decoration: none;
            }
          }
        }
      }
    }
    ul {
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-bottom: 0px;
      li {
        font-size: 13px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }
}

.partner-list.partner-grid .partner-list-favourite {
  margin-bottom: 0px;
}

.title-comm {
  color: #fff;
  font-size: 20px;
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 700;
  background-color: #fff;
  text-align: center;
}

h3.title-comm:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin-top: 0;
  border-top: 2px solid #d0d2d3;
  z-index: 1;
  display: block;
}

.title-comm .title-holder {
  min-width: 350px;
  height: 45px;
  background-color: #ea3a3c;
  height: auto;
  line-height: 45px;
  padding: 0px 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  display: inline-block;
  min-width: 280px;
  text-transform: uppercase;
}

.title-holder:before {
  content: "";
  position: absolute;
  right: -18px;
  // border-width: 0px;
  bottom: 0px;
  border-style: solid;
  // border-color: #ea3a3c transparent;
  display: block;
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 15px solid #ea3a3c;
}

.title-holder:after {
  content: "";
  position: absolute;
  left: -18px;
  // border-width: 0px;
  bottom: 0px;
  border-style: solid;
  // border-color: #ea3a3c transparent;
  display: block;
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 22px solid transparent;
  border-right: 15px solid #ea3a3c;
}

.img-box {
  height: 160px;
}

.home-product-item__best-rated {
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 11px;
  color: #4652a5;
  background-color: currentColor;
  font-size: 1.5rem;
  line-height: 1rem;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 3px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    border-right: 4px solid currentColor;
    border-bottom: 4px solid transparent;
    filter: brightness(60%);
  }
  span {
    color: #fff;
    letter-spacing: 1px;
  }
}

.icon {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.icon-quality-merchant {
  width: 25px;
  height: 25px;
}

.icon-quality-merchant,
.icon-quality-merchant-medi {
  background-image: url("../../../../assets/images/best-rated.png");
  background-size: cover;
}
</style>