<script setup>

import Header from "./components/Header.vue"
import SearchBarFunction from "./components/SearchBarFunction.vue"
import App_Type from "./components/App_Type.vue";

</script>


<template>
  <div class="image-container">
    <Header>
    </Header>
    <div class="searchbar-container">
      <div class="searchbar-text">
        <h2>Campus Dwelling makes finding shared housing easy. Explore our platform to find housing options tailored to
          your needs.</h2>
      </div>
      <SearchBarFunction></SearchBarFunction>
    </div>
  </div>
  <div>
    <App_Type></App_Type>
  </div>
</template>


<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

}



.image-container {
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: auto;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("./assets/editedImage.png");
  background-size: cover;
}

.searchbar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

}

.searchbar-container h2 {
  width: 1000px;
  margin-bottom: 40px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 1000;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-size: 40px;
  word-wrap: break-word;

}
</style>