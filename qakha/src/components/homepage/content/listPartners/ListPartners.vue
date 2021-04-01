<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="section-title">
          <h2>Partner List</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <div class="sidebar">
          <div class="widget border-0">
            <div class="search">
              <input
                class="form-control"
                type="text"
                placeholder="Search Keywords"
              />
            </div>
          </div>
          <div class="widget border-0">
            <div class="locations">
              <input
                class="form-control"
                type="text"
                placeholder="All Locations"
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
                <label class="justify-content-start mr-2">Sort by :</label>
                <div class="short-by">
                  <select
                    class="form-control basic-select select2-hidden-accessible"
                    data-select2-id="1"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option data-select2-id="3">Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-lg-4 mb-4">
            <div class="partner-list partner-grid">
              <div class="partner-list-image">
                <img
                  class="img-fluid"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
              </div>
              <div class="partner-list-details">
                <div class="partner-list-info">
                  <div class="partner-list-title">
                    <h5>
                      <router-link to="/list-products">Partner A</router-link>
                    </h5>
                  </div>
                  <div class="partner-list-option">
                    <ul class="list-unstyled">
                      <li>
                        <span>Partner name</span>
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
        :partnerData="partnerData"
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
    }),
    visiblePartner() {
      return this.partnerData.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    },
    partnerDataOnChange() {
      return this.laravelData;
    },
  },
  data() {
    return {
      campaignIdForDel: "",
      currentPage: 0,
      pageSize: 5,
      partnerData: [],
    };
  },
  methods: {
    ...mapActions({
      getPartners: "partner/getPartners",
    }),
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    getResult() {
      this.getPartners()
        .then((res) => {
          this.products = this.getPartnersLocal.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getResult();
  },
  watch: {
    partnerDataOnChange() {
      this.currentPage = 0;
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  padding-top: 28%;
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
  &:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
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
    }
  }
}

.partner-list-title {
  margin-bottom: 5px;
}

.partner-list-details {
  ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 0px;
    li {
      margin: 5px 10px 5px 0px;
      font-size: 13px;
    }
  }
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
    }
  }
  .partner-list-details {
    text-align: center;
    padding: 20px 20px 0px 20px;
    border: 1px solid #eeeeee;
    border-top: none;
    ul {
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      li {
        margin: 2px 5px;
      }
    }
  }
}

.partner-list.partner-grid .partner-list-favourite {
  margin-bottom: 0px;
}
</style>