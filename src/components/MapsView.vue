<script setup>
import { ref, onMounted } from 'vue'
import Header from './Header.vue';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';


const map = ref(null);

onMounted(() => {
    initializeMap();
})

const addMarker = (lng, lat) => {
    console.log('Adding marker at', lng, lat);
    const marker = new mapboxgl.Marker({
    })
        .setLngLat([lng, lat])
        .addTo(map.value);
};



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
    // addMarker(22.937506, -30.559483);
});

};
</script>

<template>
    <Header></Header>
    <div class="main_container">
        <div class="feature_container"></div>
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
    border: 5px solid black;
    margin-right: auto;
    width: 40vw;
}

.map_container {
    height: 100%;
    border: 5px solid purple;
    width: 60vw;
}

#map {
    z-index: 0;
}
</style>
