<script setup>


//Create a scrolling feature for the whole container for the mid section
// https://www.youtube.com/watch?v=T33NN_pPeNI

</script>


<template>
    <h2 class="mid-header">How it works for Tenants and Students</h2>
    <div class="info-container">
        <div class="info-1">
            <img src="../assets/ChattingWithLandLord.jpg">
            <div class="info-1-text">
                <h2>Chat with Landlords</h2>
                <p>Campus Dwelling is here to help you make the process easier and more enjoyable. Our platform connects you
                    directly with landlords who offer a range of accommodation options to suit your needs and
                    budget.</p>
            </div>
        </div>
        <div class="info-2">
            <img src="../assets/CreatingAccount.jpg">
            <div class="info-2-text">
                <h2>Create an Account</h2>
                <p>Ready to connect with potential landlords and find your perfect accommodation? Create your Campus
                    Dwelling account today and take the first step towards securing your new home away from home. Don't miss
                    out on the best student housing options - sign up now and start your search!</p>
            </div>
        </div>
        <div class="info-3">
            <img src="../assets/ApartmentSearch.jpg">
            <div class="info-3-text">
                <h2>Find Your Apartment</h2>
                <p>Discover your perfect home away from home with Campus Dwelling. Our platform offers a wide range of
                    accommodation options in close proximity to your desired universities. Once you find a place that meets
                    your needs, create an account with us to start the conversation and secure your dream accommodation.
                    With Campus Dwelling, you'll find the perfect place to stay while pursuing your academic goals.</p>
            </div>
        </div>
    </div>
</template>




<style scoped>
.mid-header {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 100px;
    font-weight: 900;
    font-size: 50px;
    color: rgba(85, 30, 25, 1);

}

.info-container {
    height: 60vh;
    display: flex;
    justify-content: space-around;
}

.info-1 {
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.info-1 img {
    position: relative;
    height: 50%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    pointer-events: none;
    user-select: none;

}

.info-1 h2 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin-bottom: 40px;
    color: rgba(85, 30, 25, 1);
    font-weight: 500;

}

.info-1-text {
    position: absolute;
    top: 50%;
    max-width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 30px;
}

.info-2 {
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.info-2 img {
    position: relative;
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    pointer-events: none;
    user-select: none;

}

.info-2 h2 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin-bottom: 40px;
    color: rgba(85, 30, 25, 1);
    font-weight: 500;

}

.info-2-text {
    position: absolute;
    top: 50%;
    max-width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 30px;
    font-size: 15px;
}

.info-3 {
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.info-3 img {
    position: relative;
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    pointer-events: none;
    user-select: none;

}

.info-3 h2 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin-bottom: 40px;
    color: rgba(85, 30, 25, 1);
    font-weight: 500;

}

.info-3-text {
    position: absolute;
    top: 50%;
    max-width: 100%;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 30px;
    font-size: 15px;
}

</style>