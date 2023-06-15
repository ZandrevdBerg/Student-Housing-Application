<script setup>
import { ref, onMounted, computed, defineExpose } from 'vue'
import Header from './Header.vue';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';

import ListingList from './ListingList.vue';

//TURF lib to calculate the distance


const map = ref(null);
const address = ref("");

const listings = ref([])

const filters = {
  minPrice: ref(0),
  maxPrice: ref(0),
  PriceSliderMax: ref(0),
  PriceSliderMin: ref(0),
  city: ref(""),
  province: ref(""),
  propertyType: ref(""),
  bedrooms: ref(0),
  bathrooms: ref(0),

}


onMounted(() => {
  initializeMap();
  fetchData();
})

const addMarker = (lng, lat, popupContent) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map.value);

  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(popupContent);

  marker.setPopup(popup);
};

function UniversityMarker(x1,x2,desc){
  
  const marker = new mapboxgl.Marker({
      color: "red"
    })
    .setLngLat([x1, x2])
    .addTo(map.value);
    const popup = new mapboxgl.Popup()
    .setHTML(`<h1>${desc}</h1>`)
    marker.setPopup(popup)


}

function GateMarker(x1,x2,desc){
  
  const marker = new mapboxgl.Marker({
      color: "green"
    })
    .setLngLat([x1, x2])
    .addTo(map.value);
    const popup = new mapboxgl.Popup()
    .setHTML(`<h1>${desc}</h1>`)
    marker.setPopup(popup)


}


const forwardGeocode = (query) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          resolve({ lng, lat });
        } else {
          reject(new Error('No results found.'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addMarkerByAddress = (address, popupContent) => {
  forwardGeocode(address)
    .then(({ lng, lat }) => {
      addMarker(lng, lat, popupContent);
    })
    .catch((error) => {
      console.error('Error adding marker:', error);
    });
};


function addMarkerToMap(data) {
  data.forEach((item) => {
    const address = item.property_address;
    addMarkerByAddress(address, address);
  });
}





const initializeMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiemFuZHJlMTExIiwiYSI6ImNsaWM0Ymh0cTAzemwzZW9iOGRycGwzMG8ifQ.uNMvyQAAu2Jb2HCpVkgerQ';
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [22.937506, -30.559483],
    zoom: 6,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });

  map.value.addControl(geocoder);

  map.value.on('load', () => {
    // addMarker(22.937506, -30.559483,"TEST");
    UniversityMarker(27.092908551565557,-26.69064074980091,"Potchefstroom University")
    GateMarker(27.09316347684929,-26.690382689426222,"NWU Hoofhek")

    addMarkerToMap
  });

};

function fetchData() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "./server/Authentication/fetchListings.php");
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const responseText = xhttp.responseText.replace(/“/g, '"');
      const data = JSON.parse(responseText);
      console.log(data);
      addMarkerToMap(data);
      listings.value = data;
      // console.log(listings.value[0].property_name);
    }
  };
  xhttp.send();
}

const filteredListings = computed(() => {
  return listings.value.filter(listing => {
    const isCityValid = filters.city.value === '' || listing.property_city.toLowerCase() === filters.city.value.toLowerCase();
    const isProvinceValid = filters.province.value === '' || listing.property_province.toLowerCase() === filters.province.value.toLowerCase();
    const isMaxPriceValid = filters.maxPrice.value === 0 || parseInt(listing.property_price_per_month) <= filters.maxPrice.value;
    const propertyTypeMatches = !filters.propertyType.value || listing.property_type === filters.propertyType.value;
    const isBathroomValid = filters.bathrooms.value == 0 || (listing.property_bathrooms <= filters.bathrooms.value);
    const isBedroomValid = filters.bedrooms.value == 0 || (listing.property_bedrooms  <= filters.bedrooms.value);
    return isCityValid && isMaxPriceValid && isProvinceValid && propertyTypeMatches && isBathroomValid && isBedroomValid;
  });
});



</script>

<template>
  <Header></Header>
  <div class="main_container">
    <div class="feature_container">
      <h1>Features</h1>
      <div class="filters">
        <div class="filter-style">
          <label for="priceSlider">Price Per Month (max)</label>
          <input type="range" min="0" max="100000" step="10000" id="priceSlider" v-model="filters.maxPrice.value"
            @input="filters.PriceSliderMax.value = filters.maxPrice.value" :value="filters.maxPrice.value">
          <span>{{ filters.PriceSliderMax.value }}</span>
        </div>
        <div class="filter-style">
          <label>City</label>
          <input type="text" v-model="filters.city.value" class="custom-input">
        </div>
        <div class="filter-style">
          <label>Province</label>
          <input type="text" v-model="filters.province.value" class="custom-input">
        </div>
        <div class="filter-style">
          <label>Property Type</label>
          <select id="property-type" name="propertyType" class="custom-input" v-model="filters.propertyType.value">
            <option value="">--Please choose an option--</option>
            <option value="room">Room</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>
        <div class="filter-style">
          <label>Bedrooms</label>
          <input type="number" v-model="filters.bedrooms.value" class="custom-input">
        </div>
        <div class="filter-style">
          <label>Bathrooms</label>
          <input type="number" v-model="filters.bathrooms.value" class="custom-input" value="">
        </div>
      </div>
      <!-- <div class="listings" v-for="(item, index) in listings">
          <div v-for="(listing, index) in listings" :key="index">
            {{ listing.property_name }} - {{ listing.property_address }} - {{ listing.property_price }}
          </div>
        </div> -->
      <div class="listing-holder">
        <div class="listings" v-for="(item, index) in filteredListings" :key="index">
          <div>
            <ListingList :key="index" :listing="item" :user_id="item.user_id" :listing_id="item.id"></ListingList>
          </div>
        </div>
      </div>
    </div>
    <div id="map" class="map_container"></div>
  </div>
</template>

<style scoped>
.main_container {
  display: flex;
  height: 88vh;
  border: 5px solid red;
}

.feature_container {
  height: 100%;
  margin-right: auto;
  width: 40vw;
  display: flex;
  flex-direction: column;
}

.feature_container h1 {
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 200px;
  color: rgb(165, 49, 38);
  text-align: center;
  font-size: 40px;
  word-wrap: break-word;
}

.filters {
  display: flex;
  flex-direction: column;
  height: 350px;
  border: 5px solid black;
}

.filter-style {
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
}

.filter-style label {
  display: inline-block;
  /* Add this line */
  width: 200px;
  /* Add this line to set a fixed width */
  margin-right: 40px;
  max-width: 100%;
  text-align: right;
  /* Add this line to align labels to the right */
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 1000;
  color: rgb(65, 15, 11);
}


.listing-holder {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 5px solid slateblue;
  overflow-y: auto;
}

.custom-input {
    border: 2px solid #333;
    background-color: white;
    border-radius: 0.25rem;
    box-sizing: border-box;
    /* padding: 0.5rem 0.75rem; */
}

/* .listings {
  display: flex;
  flex-direction: column;
  height: 500px;
  border: 5px solid purple;
  overflow-y: auto;
} */






.map_container {
  height: 100%;
  border: 5px solid purple;
  width: 60vw;
}

#map {
  z-index: 0;
}
</style>
