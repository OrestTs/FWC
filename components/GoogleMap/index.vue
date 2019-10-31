<template>
  <div
    class="GoogleMap"
  >
    <!-- Google Map-->
    <div
      ref="googleMap"
      class="GoogleMap__map"
    >
      <template v-if="Boolean(google) && Boolean(map)">
        <slot
          :google="google"
          :map="map"
        />
      </template>
    </div>
  </div>
</template>
<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: 'GoogleMap',
  props: {
    mapConfig: {
      type: Object,
      required: false,
      default: () => (
        {
          center: { lat: 52.776545, lng: 19.146423 },
          zoom: 7
        }),
      note: 'Map configuration'
    },

    apiKey: {
      type: String,
      required: true,
      default: '',
      note: 'Api key for your account'
    },

    markers: {
      type: Array,
      required: true,
      default: () => ([]),
      note: 'List of markers on your map'
    }
  },

  data () {
    return {
      google: null,
      map: null
    }
  },

  async mounted () {
    this.google = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.initializeMap()
    this.fitMapToMarkers()
  },

  methods: {
    initializeMap () {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
    },

    // Fit map to make all markers visible
    fitMapToMarkers () {
      const bounds = new this.google.maps.LatLngBounds()
      for (let i = 0; i < this.markers.length; i++) {
        bounds.extend({ lat: Number(this.markers[i].lat), lng: Number(this.markers[i].long) })
      }
      this.map.fitBounds(bounds)
    }
  }
}
</script>

<!-- Using Scoped styles and the BEM convention for this component -->
<style lang="sass" scoped>
  @import './styles/google-map--desktop'
  @import './styles/google-map--tablet'
  @import './styles/google-map--mobile'
</style>
