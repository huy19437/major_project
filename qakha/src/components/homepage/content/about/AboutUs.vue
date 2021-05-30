<template>
  <div class="main-background">
    <section class="testimonial bg-light p-5">
      <div class="container">
        <!-- <h2 class="text-center">The Team</h2> -->
        <div class="text">
          <span>T</span>
          <span>H</span>
          <span>E</span>
          <span> </span>
          <span>T</span>
          <span>E</span>
          <span>A</span>
          <span>M</span>
        </div>
        <div class="row mt-5">
          <div v-for="person in member" :key="person.id" class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                :src="person.img"
                alt=""
                class="img-fluid rounded-circle mb-3"
                onload="this.style.opacity = 1"
              />
              <h5 class="name">{{ person.name }}</h5>
              <h4 class="major">{{ person.major }}</h4>
              <p class="font-weight-light mb-0">{{ person.slogan }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      member: [
        {
          id: 1,
          img: require("./thay_thi.jpg"),
          name: "Trịnh Sử Trường Thi",
          major: "Mentor",
          slogan: '"Be all you can be."',
        },
        {
          id: 2,
          img: require("./huy.jpeg"),
          name: "Nguyễn Đức Huy",
          major: "Front-End",
          slogan:
            '"Enjoy the little things in life for one day you’ll look back and realize they were the big things!"',
        },
        {
          id: 3,
          img: require("./anh.jpg"),
          name: "Phan Tuấn Anh",
          major: "Back-End",
          slogan:
            '"The closer you let people get to you,the easier it gets for them to hurt you."',
        },
        {
          id: 4,
          img: require("./quynh.jpg"),
          name: "Lê Thị Diễm Quỳnh",
          major: "Tester",
          slogan:
            '"Learn from yesterday, live for today, hope for tomorrow. The important is to not stop questioning."',
        },
        {
          id: 5,
          img: require("./an.jpg"),
          name: "Võ Văn An",
          major: "Mobile",
          slogan:
            '"It’s better to cross the line and suffer the consequences than to just stare at the line for the rest of your life."',
        },
        {
          id: 6,
          img: require("./khang1.jpg"),
          name: "Võ Văn Khang",
          major: "Mobile",
          slogan:
            '"Life is not about waitng for the storm to pass, it’s about learning to dance in the rain."',
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setShoppingStatus: "cart/setShoppingStatus",
    }),
  },
  created() {
    this.setShoppingStatus(false);
  },
};
</script>

<style scoped lang="scss">
.text {
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  transform: translateY(-50%);
  text-align: center;
  > span {
    display: block;
    background-color: #fff;
    font-size: 2.6rem;
    font-weight: 700;
    color: #f6931d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
  }
}
// .testimonial.bg-light.p-5 {
//   background-image: url("./bg_dtu.jpg");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
// }
.container {
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .name {
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 2.2rem;
  }
  .major {
    font-family: "Courier New", monospace;
    color: #fff;
    padding: 4px 12px;
    display: inline-block;
    background: #f6931d;
  }
  .font-weight-light {
    font-family: Garamond, serif;
    font-weight: 700 !important;
    font-size: 1.6rem !important;
  }
  .row .mt-5 {
  }
  .text-center {
    margin-bottom: 50px !important;
    font-weight: 700;
    font-size: 4rem;
    letter-spacing: 5px;
    &::after {
      display: none !important;
    }
  }
  .col-lg-4 {
    margin-bottom: 50px;
    // color: #fff;
  }
  .testimonial-item {
    .img-fluid {
      width: 180px !important;
      height: 180px !important;
      -webkit-animation-name: opacity;
      animation-name: opacity;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      border: 3px solid #ccc;
      opacity: 0;
      transition-duration: 500ms;
      &:hover {
        border: 3px solid #f6931d;
      }
    }
  }
}
@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>