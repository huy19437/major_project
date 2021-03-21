<template>
  <div class="wrapper">
    <div class="inner">
      <form @submit.prevent="handleSubmit">
        <h3>Forgot Password</h3>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" />
        </div>

        <button class="btn btn-primary btn-block btn-forgot">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forgot Password",
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  height: 100vh;
  align-items: center;
  .inner {
    background: #dfe0df;
    border-radius: 10px !important;
    padding: 40px;
    width: 500px;
    margin: 40px auto;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgb(255 255 255 / 30%);
    .form-group {
      .form-control {
        &:focus {
          outline: none;
          border-color: #f28809;
        }
      }
    }
  }
}

.btn-forgot {
  background: #f28809 !important;
  outline: none;
  border: 1px solid #f28809 !important;
  &:hover {
    background-color: #dbb78b !important;
    border: 1px solid #dbb78b !important;
    color: #fff !important;
    outline: none !important;
  }
}
</style>