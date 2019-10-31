<template>
  <div class="home">
    <!-- Google Map Component -->
    <google-map
      :map-config="mapConfig"
      :markers="markers"
      api-key="AIzaSyDBa1uaqnDeYbjI3e8jLmRzgL1RMtHzJPQ"
    >
      <template slot-scope="{ google, map }">
        <!-- Google Map Marker Component -->
        <google-map-marker
          v-for="marker in markers"
          :key="marker.id"
          :marker="marker"
          :google="google"
          :map="map"
          @showInfoWindow="closePrevInfoWindow"
        />
      </template>
    </google-map>
    <!-- Dropdown Component -->
    <dropdown
      name="salony"
      :options="markers"
      :disabled="false"
      :max-item="10"
      placeholder="Please select a salon"
    />
  </div>
</template>
<script>
import GoogleMap from '~/components/GoogleMap'
import GoogleMapMarker from '~/components/GoogleMapMarker'
import Dropdown from '~/components/Dropdown'
import SALONY from '~/assets/salony.json'

export default {
  name: 'Home',
  components: {
    GoogleMap,
    GoogleMapMarker,
    Dropdown
  },

  data () {
    return {
      markers: SALONY,
      infoWindowShown: null
    }
  },

  computed: {
    mapConfig () {
      return {
        center: { lat: 52.776545, lng: 19.146423 },
        zoom: 7,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
      }
    }
  },

  methods: {
    // Close prev opened infoWindow
    closePrevInfoWindow (infoWindow) {
      if (this.infoWindowShown) {
        this.infoWindowShown.close()
      }
      this.infoWindowShown = infoWindow
    }
  }
}
</script>

<!-- Using Scoped styles for this component -->
<style lang="sass" scoped>
  .home
    position: relative
</style>
