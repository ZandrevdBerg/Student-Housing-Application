<script setup>

import { ref,computed } from 'vue';
import SignUpModal from "./SignUp_Modal.vue";
import LoginModal from "./Login_Modal.vue";
import { userLoginState } from './Store';

import LoggedInModal from './LoggedInModal.vue'


const isSignUpModalVisible = ref(false)
const isLoginModalVisible = ref(false);

//Make it false later on, only use true when testing the buttons


const LoggedInEmail = ref('');

const toggleDropDown = ref(false)

const LoginState = userLoginState()
const LoginFlagState = LoginState.loggedIn

const userLoggedIn = computed(() => {
  return LoginState.loggedIn
})


/*
TODO:

1. Follow UserLoggedIn from Header to LoginModal

## 1 ## UserLoggedIn -> onUserLogin -> @LoggedIn_Flag inside LoginModal

## 2 ## @LoggedIn_Flag -> LoginCheckFunction() -> LoginFlag.value inside onLogin()

*/

/*
TODO:

1. Fix Buttons after user Logs in


*/



const emits = defineEmits(['userLogged'])
//Can add user session maybe below, for session management
function onUserLogin(x) {
    LoggedInEmail.value = x;
    LoginState.email = LoggedInEmail.value
    console.log(LoginState.email)
    console.log(LoginState.type)
    UserLoggedIn.value = true;
    LoginState.loggedIn = UserLoggedIn.value
    emits('userLogged',UserLoggedIn.value)
}

function ToggleMenu() {
    toggleDropDown.value = !toggleDropDown.value;
}

</script>


<template>
    <div class="header-container">
        <img class="logo-img" src="../assets/CampusDwellingBrown.png" alt="Logo" draggable="false">
        <div class="header-buttons" v-if="userLoggedIn==false">
            <button class="login_button" @click="isLoginModalVisible = true">Login</button>
            <button class="signup_button" @click="isSignUpModalVisible = true">Sign Up</button>
        </div>
        <div v-if="userLoggedIn==true">
            <LoggedInModal :isVisible="LoginState.loggedIn == true"></LoggedInModal>
        </div>
    </div>
    <SignUpModal :isVisible=isSignUpModalVisible @close="isSignUpModalVisible = false"></SignUpModal>
    <LoginModal :isVisible="isLoginModalVisible" @close="isLoginModalVisible = false" @LoggedIn_Flag="onUserLogin">
    </LoginModal>
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

.header-account-buttons button {
    padding: 40px 40px;
    border-radius: 150px;
    border: none;
    margin-right: 30px;
    /* margin-top: 10px; */
    background-image: url("../assets/account_icon.jpeg");
    background-size: contain;
    cursor: pointer;
    outline: none;
    position: absolute;
    right: 0;
    top: 5px;
}

.dropdown-container {
    z-index: 9999;
    border-radius: 10px;
    position: absolute;
    margin-top: 130px;
    margin-right: 10px; 
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    right: 0;
    top: -40px;
    background-color: #FFFFFF;
}

.dropdown-mid {
    border-top: 2px solid #195055;
    margin-top: 10px;
    margin-bottom: 3px;
    border-bottom: 2px solid #195055;
}
.logout-button {
    padding: 5px !important;
    border-radius: 10px !important;
    margin-right: 0px !important;
    background-color: #FFFFFF;
    /* margin-top: 10px; */
    background-image:none !important;
    cursor: pointer;
    position: relative !important;
    right: 0;
    top: 0 !important;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease 0s;
}
.logout-button:hover {
    background-color: #195055;
}

ul {
  list-style-type: none;
}

.header-buttons button:hover {
    background-color: #195055;
}
</style>