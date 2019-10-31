<script>
export default {
  name: 'GoogleMapMarker',
  props: {
    google: {
      type: Object,
      required: true,
      default: () => ({})
    },
    map: {
      type: Object,
      required: true,
      default: () => ({})
    },
    marker: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  mounted () {
    // Create markeron map
    const marker = new this.google.maps.Marker({
      position: { lat: Number(this.marker.lat), lng: Number(this.marker.long) },
      marker: this.marker,
      map: this.map
    })

    // Create infoWindow window for marker
    const infoWindow = new this.google.maps.InfoWindow({
      content:
        `<div id="content">
          <h3 id="firstHeading" class="firstHeading">${this.marker.name}</h3>
          <div id="bodyContent">
            <p>${this.marker.address}</p>
            <p>${this.marker.postcode} ${this.marker.city}</p>
            <p>${this.marker.country}</p>
            <p>Telefon: ${this.marker.phone}</p>
          </div>
        </div>`,
      maxWidth: 300
    })

    // Listen click event to show infoWindow
    marker.addListener('click', this.showInfoWindow(marker, infoWindow))
  },
  methods: {
    // Show infoWindow
    showInfoWindow (marker, infoWindow) {
      return () => {
        infoWindow.open(this.map, marker)

        // infoWindow opened by click on marker is returned to parent and can be catch with v-on
        this.$emit('showInfoWindow', infoWindow)
      }
    }
  },
  render () { return '' }
}
</script>
