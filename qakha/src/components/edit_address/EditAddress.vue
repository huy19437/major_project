<template>
  <div class="container">
    <div class="row back-btn">
      <button class="btn btn-lg">
        <a @click="hasHistory() ? $router.go(-1) : $router.push('/')">Back</a>
      </button>
    </div>
    <h1 class="well title">User Address Edit</h1>

    <div class="row register-form">
      <div class="col-lg-6 well">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="address in getAddressLocal" :key="address.id">
                    <th>{{ address.id }}</th>
                    <td>
                      <input
                        class="address-name"
                        type="text"
                        :value="`${address.name}`"
                        @input="getAddressChange($event)"
                      />
                    </td>
                    <td>
                      <a
                        @click="updateOneAddress(address.id)"
                        class="update-address"
                      >
                        <font-awesome-icon :icon="['fas', 'edit']" />
                      </a>
                      <a
                        @click="deleteOneAddress(address.id)"
                        class="delete-address"
                      >
                        <font-awesome-icon :icon="['fas', 'trash-alt']" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Spinner :loading="isLoading" />
          </div>
        </div>
      </div>
      <div class="col-lg-6 well">
        <GoogleMap @get-location-partner="getLocationUser" />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from "@/components/googlemap/GoogleMap";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { openToastMess } from "@/services/toastMessage";
import Spinner from "@/components/spinner/Spinner";
export default {
  name: "EditAddress",
  components: { GoogleMap, Spinner },
  data() {
    return {
      address: "",
      locationUser: {},
      addressUpdate: "",
      isLoading: false,
    };
  },
  validations: {},
  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
      getAddressLocal: "address/getAddressLocal",
    }),
  },
  methods: {
    ...mapActions({
      getAddress: "address/getAddress",
      addAddress: "address/addAddress",
      deleteAddress: "address/deleteAddress",
      user: "auth/user",
      updateAddress: "address/updateAddress",
    }),
    getLocationUser(location, place) {
      console.log(this.locationUser);
      let tmp = place.split(",");
      this.address = tmp[0] + "," + tmp[1] + "," + tmp[2];
      let params = {
        name: this.address,
        latitude: location.lat,
        longitude: location.lng,
      };
      this.addAddress(params)
        .then((response) => {
          openToastMess("Add address successfully!", "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        });
    },
    deleteOneAddress(id) {
      this.isLoading = true;
      this.deleteAddress(id)
        .then((res) => {
          this.getResult();
          openToastMess("Delete address successfully!", "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateOneAddress(addressId) {
      let params = {
        id: addressId,
        name: this.addressUpdate,
      };
      this.isLoading = true;
      this.updateAddress(params)
        .then((response) => {
          this.getResult();
          openToastMess("Update address successfully!", "success");
        })
        .catch((error) => {
          openToastMess(error, "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getAddressChange(e) {
      this.addressUpdate = e.target.value;
      console.log(this.addressUpdate);
    },
    getResult() {
      this.getAddress(this.getUser.id);
    },
    hasHistory() {
      return window.history.length > 2;
    },
  },
  created() {
    this.user();
    this.getResult();
  },
  watch: {},
};
</script>

<style scoped lang="scss">
$button-color: #f7941d;
.container {
  position: relative;
  margin-top: 1%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  select.form-control:not([size]):not([multiple]) {
    height: calc(2.25rem + 18px);
    border-radius: 10px;
    box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
      rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  }
  .col-6.form-group {
    margin-bottom: 0;
  }
  .register-form {
    padding-left: 19px;
    padding-right: 19px;
  }
  .title {
    background-color: $button-color;
    border: 5px solid #f5f5f5;
    margin-top: 0;
    border-radius: 10px;
  }
  form {
    position: relative;
    input,
    textarea {
      border-radius: 10px;
      box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
        rgb(0 0 0 / 30%) 0px 1px 3px -1px;
      font-size: 16px;
      padding: 18px 10px;
      background-color: #fff;
      width: 100%;
      height: 43%;
    }
    .col-12 {
      div {
        text-align: left;
      }
    }
    .err-mess {
      position: absolute;
      z-index: 100;
      right: -45%;
      top: -3%;
      font-size: 15px;
      font-weight: 700;
      width: 476px;
    }
  }
  .success-mess {
    margin-bottom: 0;
    background-color: rgb(156, 241, 163);
    border-color: transparent;
    font-size: 15px;
    font-weight: 700;
    color: #468847;
    position: absolute;
    z-index: 100;
    top: 13%;
    width: 52%;
    right: 24%;
  }
}

.back-btn {
  display: flex;
  justify-content: flex-start;
  button {
    background-color: #fff;
    padding-bottom: 0;
    a {
      color: #000000;
    }
  }
}

.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

.btn-info {
  width: 100%;
  background-color: $button-color;
  border-color: $button-color;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: relative;
  transition: all 200ms ease;
  &:active {
    -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
    box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000 !important;
    top: 4px;
    background-color: $button-color !important;
    border-color: rgb(245, 223, 124) !important;
  }
  &:hover {
    background-color: rgb(245, 223, 124);
    border-color: rgb(245, 223, 124);
  }
  &:focus {
    color: #ffffff;
    background-color: $button-color;
    border-color: $button-color;
  }
}

.loader {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.address-name {
  width: 100%;
  border: none;
  background: #f5f5f5;
  &:focus {
    outline: none;
  }
}

.update-address,
.delete-address {
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
}

.table {
  thead {
    tr {
      th {
        text-align: center;
      }
    }
  }
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;
}

/* Customize container */
@media (min-width: 768px) {
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
}
</style>