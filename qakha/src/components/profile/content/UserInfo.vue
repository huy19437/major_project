<template>
  <div>
    <section class="section about-section gray-bg" id="about">
      <div class="container">
        <div class="row align-items-center flex-row-reverse user-info">
          <div class="col-lg-6">
            <div class="about-text go-to">
              <h3 class="dark-color">About Me</h3>
              <div class="row about-list">
                <div class="col-md-6">
                  <div class="media">
                    <label>Name</label>
                    <p>{{ getUser.name }}</p>
                  </div>
                  <div class="media">
                    <label>Role</label>
                    <p>{{ getUser.role }}</p>
                  </div>
                  <div class="media">
                    <label>Address</label>
                    <p>{{ getUser.address }}</p>
                    <router-link to="/edit-address">
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </router-link>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="media">
                    <label>E-mail</label>
                    <p>{{ getUser.email }}</p>
                  </div>
                  <div class="media">
                    <label>Phone</label>
                    <p>{{ getUser.phone_number }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-avatar">
              <img
                :src="`${getUser.image.url}`"
                title="User Avatar"
                alt="User Avatar"
              />
            </div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
    }),
  },
  methods: {
    ...mapActions({
      user: "auth/user",
    }),
    getResult() {
      this.user();
      console.log(this.getUser);
    },
  },
  created() {
    this.getResult();
  },
};
</script>

<style lang="scss">
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
</style>