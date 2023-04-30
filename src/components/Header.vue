<script setup>

import { ref } from 'vue';
import SignUpModal from "./SignUp_Modal.vue"

const isSignUpModalVisible = ref(false)


</script>


<template>
    <div class="header-container">
        <img class="logo-img" src="../assets/CampusDwellingBrown.png" alt="Logo" draggable="false">
        <div class="header-buttons">
            <button class="login_button">Login</button>
            <button class="signup_button" @click="isSignUpModalVisible = true">Sign Up</button>
        </div>
    </div>
    <SignUpModal :isVisible = isSignUpModalVisible @close="isSignUpModalVisible = false"></SignUpModal>
</template>


<style scoped>
.header-container {
    display: flex;
    height: 110px;
    width: auto;
    align-items: center;
}

.logo-img {
    position: relative;
    height: 90%;
    padding-left: 6px;
    margin-right: auto;
    border-radius: 25%;
    cursor: pointer;
    user-select: none;
    transition: transform 0.3s ease-in-out;
}

.logo-img:hover {
    transform: scale3d(1.1, 1.1, 1)
}

.header-buttons button {
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
}

.header-buttons button:hover {
    background-color: #195055;
}
</style>