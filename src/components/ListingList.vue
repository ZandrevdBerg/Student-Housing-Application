<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const imageList = ref([])
const activeImageIndex = ref(0);


const props = defineProps({
  listing: Object,
  user_id: Number,
  listing_id: Number
})

function resizeImage(src, width, height) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
    img.src = src;
  });
}




// const imagePath = computed(() => {
//   const path = props.listing.property_image_directory;
//   const parts = path.split("/");
//   const result = parts.slice(1).join("/");
//   console.log(result)
//   return result;
// })

//TODO: CHECK OVERFLOW IN MAIN-CONTAINER CSS for the property description part

const currentIndex = ref(0)

onMounted(async () => {
  const response = await axios.get('./server/Authentication/images.php', {
    params: { user_id: props.user_id, listing_id: props.listing_id },
  });

  const resizedImages = [];
  for (let i = 0; i < response.data.length; i++) {
    const imageSrc = response.data[i];
    const resizedImage = await resizeImage(imageSrc, 400, 400); // Change 400, 400 to the desired width and height
    resizedImages.push(resizedImage);
  }

  imageList.value = resizedImages;
  console.log(imageList.value);
});


const nextImage = () => {
  activeImageIndex.value = (activeImageIndex.value + 1) % imageList.value.length;
};

const previousImage = () => {
  activeImageIndex.value =
    (activeImageIndex.value - 1 + imageList.value.length) % imageList.value.length;
};



</script>



<template>
  <div class="main-container">
    <div class="listingImg-container" v-if="imageList.length > 0">
      <div :style="`background-image: url('${imageList[activeImageIndex]}');`" class="image-wrapper">
        <button class="btn-previous" @click="previousImage"></button>
        <button class="btn-next" @click="nextImage"></button>
      </div>
      
    </div>
    <div class="listingInfo-container">
      <div class="list-heading">
        <h2>{{ listing.property_name }}</h2>
        <p>{{ listing.property_city }}</p>
        <div class="list-body">
          <p><span class="list-title">Property Type : </span>{{ listing.property_type }}</p>
          <p><span class="list-title">Property Province : </span>{{ listing.property_province }}</p>
          <p><span class="list-title">Number of bedrooms : </span>{{ listing.property_bedrooms }}</p>
          <p><span class="list-title">Number of bathrooms : </span>{{ listing.property_bathrooms }}</p>
        </div>
        <div class="list-footer">
          <p><span style="  color: rgb(165, 49, 38); font-weight: 600; font-size: 24px;">from {{ listing.property_price_per_month  }}</span> per month</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.main-container {
  display: flex;
  height: 250px;
  border: 5px solid orangered;
  overflow-y: scroll;
}

.listingImg-container {
  display: flex;
  flex-direction: column;
  flex: 40%;
  height: 100%;
  border: 5px solid purple;
}

.image-wrapper {
  flex-grow: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listingInfo-container {
  flex: 60%;
  height: 100%;
  flex-direction: column;
}

.btn-previous {
  background-image: url(../assets/navigate-back-circle-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none; /* Remove the default border */
  cursor: pointer;
  padding: 20px;
}

.btn-next {
  background-image: url(../assets/navigate-forward-circle-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none; /* Remove the default border */
  cursor: pointer;
  padding: 20px;
}


.listingInfo-container {
  flex: 60%;
  height: 100%;
}

.list-heading {
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  word-wrap: break-word;
}

.list-heading h2 {
  font-size: 24px;
  font-weight: 200px;
  color: rgb(165, 49, 38);
}

.list-heading p {
  font-size: 16px;
}

.list-body {
  margin-top: 50px;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  word-wrap: break-word;
}

.list-body p {
  font-size: 16px;
  text-align: left;
  margin-left: 20px;
}

.list-footer {
  margin-top: 40px;
  align-items: end;
}

.list-title {
  font-weight: bold;
}
</style>

<!-- <div>
  {{ listing.property_name }} - {{ listing.property_address }} - {{ listing.property_price }} - {{ imagePath }}
</div>
<div v-for="(image, index) in imageList" :key="index">
  <img :src="`${image}`" alt="Listing Image" />
</div> -->

<!-- ./server/Authentication/images.php -->


<!-- onMounted(async () => {
  try {
    const response = await axios.get('./server/Authentication/images.php', {
      params: { user_id: props.user_id, listing_id: props.listing_id },
    });
    imageList.value = response.data;
    console.log(imageList)
  } catch (error) {
    if (error.response) {
      console.log('Error data:', error.response.data);
      console.log('Error status:', error.response.status);
      console.log('Error headers:', error.response.headers);
    } else if (error.request) {
      console.log('Error request:', error.request);
    } else {
      console.log('Error:', error.message);
    }
  }
}); -->




<!-- TODO: BACKUP BEFORE IMAGE RESCALE -->
<!-- <script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const imageList = ref([])

const props = defineProps({
  listing: Object,
  user_id: Number,
  listing_id: Number
})



const imagePath = computed(() => {
  const path = props.listing.property_image_directory;
  const parts = path.split("/");
  const result = parts.slice(1).join("/");
  console.log(result)
  return result;
})

const currentIndex = ref(0)

onMounted(async () => {
      const response = await axios.get('./server/Authentication/images.php', {
        params: { user_id: props.user_id, listing_id: props.listing_id },
      });
      imageList.value = response.data;
      console.log(imageList.value)
    });





</script>



<template>

<div class="main-container">
  <div v-for="(image, index) in imageList" :key="index">
    <div><img :src="`${image}`" alt="Listing Image" /></div>
  </div>
  <div class="listingInfo-container">

  </div>
</div>

</template> -->