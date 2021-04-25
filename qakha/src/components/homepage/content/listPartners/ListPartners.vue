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
              <div class="partner-list-image">
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
        // if (partner.type_id && partner.name && partner.address) {
        return (
          (partner.type_id || "")
            .toString()
            .toLowerCase()
            .includes(this.typePartner.toLowerCase()) &&
          (partner.name || "")
            .toLowerCase()
            .includes(this.searchByName.toLowerCase()) &&
          (partner.address || "")
            .toLowerCase()
            .includes(this.searchByAddress.toLowerCase())
        );
        // } else {
        //   return false;
        // }
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
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 6,
      partnerData: [],
      typePartner: "1",
      searchByName: "",
      searchByAddress: "",
    };
  },
  methods: {
    ...mapActions({
      getPartners: "partner/getPartners",
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
      this.typePartner = event.target.value.toString();
    },
    getResult() {
      this.getPartners()
        .then((res) => {
          this.setCartsNull();
          this.setShoppingStatus(false);
          this.showFeedback(false);
          this.partnerData = this.getPartnersLocal;
        })
        .catch((err) => {
          // console.log(err);
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
    position: relative;
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
        background-color: #8493ca;
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
            font-size: 1.5rem !important;
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
  right: -15px;
  border-width: 0px;
  bottom: 0px;
  border-style: solid;
  border-color: #ea3a3c transparent;
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
  left: -15px;
  border-width: 0px;
  bottom: 0px;
  border-style: solid;
  border-color: #ea3a3c transparent;
  display: block;
  width: 0;
  height: 0;
  border-top: 23px solid transparent;
  border-bottom: 22px solid transparent;
  border-right: 15px solid #ea3a3c;
}
</style>