<template>
  <div class="google-map">
    <div>
      <h2>Search Locations</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          :options="{
            fields: ['geometry', 'formatted_address', 'address_components'],
          }"
          >>
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width: 100%; height: 21vh">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      //mặc định là Montreal
      center: { lat: 16.0544068, lng: 108.2021667 },
      markers: [],
      places: [],
      currentPlace: null,
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      // console.log(place.formatted_address);
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        let tmp = this.currentPlace;
        this.currentPlace = null;
        this.$emit("get-location-partner", this.center, tmp.formatted_address);
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>

<style scoped lang="scss">
h2::after {
  display: none;
}
.google-map {
  margin-bottom: 41px;
  button {
    background-color: #f7941d;
    color: #fff;
    border-color: #f7941d;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    position: relative;
    transition: all 200ms ease;
    &:active {
      -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
      top: 4px;
    }
  }

  input {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    border: 1px solid #000;
  }
}
</style>