<template>
  <div>
    <section class="testimonial bg-light p-5">
      <div class="container">
        <h2 class="text-center">About Us</h2>
        <div class="row mt-5">
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                src="./huy2.jpg"
                alt=""
                class="img-fluid rounded-circle mb-3"
              />
              <h5>Nguyễn Đức Huy</h5>
              <h4>Front-End</h4>
              <p class="font-weight-light mb-0">
                "Enjoy the little things in life for one day you’ll look back
                and realize they were the big things!"
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                src="./anh.jpg"
                alt=""
                class="img-fluid rounded-circle mb-3"
              />
              <h5>Phan Tuấn Anh</h5>
              <h4>Back-End</h4>
              <p class="font-weight-light mb-0">
                "The closer you let people get to you,the easier it gets for
                them to hurt you."
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                src="./quynh.jpg"
                alt=""
                class="img-fluid rounded-circle mb-3"
              />
              <h5>Lê Thị Diễm Quỳnh</h5>
              <h4>Tester</h4>
              <p class="font-weight-light mb-0">
                "Learn from yesterday, live for today, hope for tomorrow. The
                important is to not stop questioning."
              </p>
            </div>
          </div>
          <div class="col-lg-12 flex-center">
            <div class="col-lg-4">
              <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  src="./an.jpg"
                  alt=""
                  class="img-fluid rounded-circle mb-3"
                />
                <h5>Võ Văn An</h5>
                <h4>Mobile</h4>
                <p class="font-weight-light mb-0">
                  "It’s better to cross the line and suffer the consequences
                  than to just stare at the line for the rest of your life."
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  src="./khang.png"
                  alt=""
                  class="img-fluid rounded-circle mb-3"
                />
                <h5>Võ Văn Khang</h5>
                <h4>Mobile</h4>
                <p class="font-weight-light mb-0">
                  "Life is not about waitng for the storm to pass, it’s about
                  learning to dance in the rain."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  .flex-center {
    display: flex;
    justify-content: center;
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
  }
  .testimonial-item {
    .img-fluid {
      width: 140px !important;
      height: 140px !important;
    }
  }
}
</style>