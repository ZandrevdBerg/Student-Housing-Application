<script setup>
import { ref } from 'vue';
import Header from './Header.vue'
import { userLoginState } from './Store';

const imagePreviews = ref([])

const PropertyImage = ref([])

const propertyName = ref("")
const propertyType = ref("")
const propertyAddress = ref("")
const propertyCity = ref("")
const PropertyProvince = ref("")
const PropertyPricePerMonth = ref()
const PropertyBedrooms = ref("")
const propertyBathrooms = ref("")
const propertyDescription = ref("")
/* TODO:
0. LANDLORD ID currently signed in
1. Property name if applicable
2. Type of property like Room, Apartment or House
3. Property Address
4. Property City
5. Property Province
6. Property Description
7. Property Price TO RENT only (per month)
8. Property Bedrooms
9. Property Bathrooms
10. Property Parking
11. Property Pets allowed
12. Property Smoking allowed


//Send the email, since it will be required to link the unique PK from user to the property

*/

const previewImages = (event) => {
    imagePreviews.value = [];
    const files = event.target.files;
    PropertyImage.value = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviews.value.push(e.target.result);
            PropertyImage.value.push(e.target.result)
        };
        reader.readAsDataURL(files[i]);
    }
};

function clearFormFields() {
    propertyName.value = "";
    propertyType.value = "";
    propertyAddress.value = "";
    propertyCity.value = "";
    PropertyProvince.value = "";
    PropertyPricePerMonth.value = null;
    PropertyBedrooms.value = "";
    propertyBathrooms.value = "";
    propertyDescription.value = "";
    imagePreviews.value = [];
    PropertyImage.value = [];
}





function onSubmit() {

    const formData = new FormData();

    formData.append("email", userLoginState().email);
    formData.append("propertyName", propertyName.value);
    formData.append("propertyType", propertyType.value);
    formData.append("propertyAddress", propertyAddress.value);
    formData.append("propertyCity", propertyCity.value);
    formData.append("PropertyProvince", PropertyProvince.value);
    formData.append("PropertyBedrooms", PropertyBedrooms.value);
    formData.append("propertyBathrooms", propertyBathrooms.value);
    formData.append("propertyDescription", propertyDescription.value);
    formData.append("PropertyPricePerMonth",PropertyPricePerMonth.value);

    for (let i = 0; i < PropertyImage.value.length; i++) {
        formData.append("propertyImage[]", PropertyImage.value[i]);
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./server/HouseListing/create-list.php", true);
    //Check form data
    // xhttp.setRequestHeader("Content-Type", "multipart/form-data");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            console.log(xhttp.responseText);
            alert("You have successfully uploaded listing to our database");
            clearFormFields();
        }
    };

        xhttp.send(formData);
    // xhttp.send(`email=${userLoginState().email}&propertyName=${propertyName.value}&propertyType=${propertyType.value}&propertyAddress=${propertyAddress.value}&propertyCity=${propertyCity.value}&PropertyProvince=${PropertyProvince.value}&PropertyPricePerMonth=${PropertyPricePerMonth.value}&PropertyBedrooms=${PropertyBedrooms.value}&propertyBathrooms=${propertyBathrooms.value}&propertyDescription=${propertyDescription.value}$propertyImage[]=${PropertyImage}`);
}


</script>



<template>
    <div class="image-root">
        <Header></Header>
    </div>
    <div class="form-root">
        <div class="form-heading">
            <h1>Create a listing with Campus Dwelling</h1>
            <p>Campus Dweller makes it easy for landlords to create a listing for their properties. Our simple and
                user-friendly platform allows you to add all the details about your property, including photos, amenities,
                and Description.</p>
        </div>
        <form method="post" @submit.prevent="onSubmit" action="./server/HouseListing/create-list.php">
            <div class="form-group">
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-name">Property Heading</label>
                    <input type="text" id="property-name" name="propertyName" v-model="propertyName" class="custom-input">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-type">Property Type</label>
                    <select id="property-type" name="propertyType" class="custom-input" v-model="propertyType">
                        <option value="">--Please choose an option--</option>
                        <option value="room">Room</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-address">Property Address</label>
                    <input type="text" id="property-address" name="propertyAddress" class="custom-input"
                        v-model="propertyAddress">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-city">Property City</label>
                    <input type="text" id="property-city" name="propertyCity" class="custom-input" v-model="propertyCity">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-province">Property Province</label>
                    <input type="text" id="property-province" name="PropertyProvince" class="custom-input"
                        v-model="PropertyProvince">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-price">Property Price (Per Month)</label>
                    <input type="number" id="property-price" name="PropertyPricePerMonth" class="custom-input" min="0"
                        v-model="PropertyPricePerMonth">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-bedrooms">Property Bedrooms</label>
                    <input type="number" id="property-bedrooms" name="PropertyBedrooms" class="custom-input" min="0"
                        v-model="PropertyBedrooms">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-bathrooms">Property Bathrooms</label>
                    <input type="number" id="property-bathrooms" name="propertyBathrooms" class="custom-input" min="0"
                        v-model="propertyBathrooms">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="">Property Parking</label><br />
                    Yes<input type='radio' name='propertyParking' value='yes' v-model="propertyParking" />
                    No<input type='radio' name='propertyParking' value='no' v-model="propertyParking" />
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="property-description">Property Description</label>
                    <textarea class="text-area" id="property-description" name="propertyDescription"
                        placeholder="Type your description" v-model="propertyDescription"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label for="propertyImage">Property Images</label>
                    <input type="file" id="propertyImage" name="propertyImage" accept="image/*" multiple
                        @change="previewImages">
                </div>
            </div>
            <div class="form-group">
                <div class="input-wrapper">
                    <label>Image Previews</label>
                    <div class="form-group image-preview-container">
                        <div v-for="(preview, index) in imagePreviews" :key="index" class="image-preview">
                            <img :src="preview" alt="Image Preview">
                        </div>
                    </div>

                </div>
            </div>

            <div class="form-group">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
</template>



<style scoped>
.image-root {
    display: flex;
    flex-direction: column;
    height: 40vh;
    width: auto;
    position: relative;
    top: 0;
    left: 0;
    background-image: url("../assets/listing1blurred.jpg");
    background-size: cover;
    background-position-y: -200px;
}

.form-heading {
    text-align: center;
}

.form-heading h1 {
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 200px;
    color: rgb(165, 49, 38);
    text-align: center;
    font-size: 40px;
    word-wrap: break-word;
}

.form-heading p {
    max-width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(65, 15, 11);
    margin-bottom: 20px;
}

.form-group {
    text-align: center;
    margin-bottom: 5px;
}

.input-wrapper label {
    display: block;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 1000;
    color: rgb(65, 15, 11);

}

.text-area {
    width: 1000px;
    height: 500px;
    resize: none;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 1000;
    color: rgb(0, 0, 0);
    margin-bottom: 20px;

}

.custom-input {
    border: 2px solid #333;
    background-color: white;
    border-radius: 0.25rem;
    font: 1.25rem / 1.5 sans-serif;
    box-sizing: border-box;
    /* padding: 0.5rem 0.75rem; */
}

button[type="submit"] {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    background-color: rgba(85, 30, 25, 1);
    border-radius: 50px;
    cursor: pointer;
    border: none;
    padding: 18px 50px;
    transition: all 0.3s ease 0s;
    margin-right: 10px;
    user-select: none;
    margin-top: 50px;
}

button:hover {
    background-color: #195055;
}

.image-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.image-preview {
    flex: 0 0 auto;
    border: 2px solid #333;
    background-color: white;
    border-radius: 0.25rem;
    padding: 10px;
    box-sizing: border-box;
}

.image-preview img {
    max-width: 100px;
    max-height: 100px;
}
</style>


