<script setup>
import { ref } from "vue";
const password = ref('');
const email = ref('');

const LoginFlag = ref(false);

const valid_password = ref(true);
const existence_failed = ref(false);

import { userLoginState } from "./Store";

const LoginState = userLoginState()
const loggedIn = LoginState.loggedIn;


const props = defineProps({
    isVisible: Boolean,
})

const emits = defineEmits(['close','LoggedIn_Flag']);

function LoginCheckFunction(flag,mail)
{
    if(flag == true)
    {
        emits("LoggedIn_Flag",email.value);
        LoginState.logIn();
        LoginState.email = mail
    }
}


function onClose() {
    emits('close');
    valid_password.value = true;

}


function onLogin() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./server/Authentication/CheckUserExistence.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            console.log(xhttp.responseText);
            const response = JSON.parse(xhttp.responseText);
            LoginFlag.value = response.login_flag;
            valid_password.value = response.valid;
            existence_failed.value = response.existence_failed;
            LoginCheckFunction(LoginFlag.value,email.value)
            // emits('emitEmail',email.value)


        }

    }
    xhttp.send(`password=${password.value}&email=${email.value}`);
}


</script>

<template>
    <div v-if="isVisible" class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <h1>Welcome back!</h1>
                <p>Please Provide your login details below</p>
            </div>
            <div class="modal-body">
                <form @submit.prevent="onLogin" method="post" action="./server/Authentication/CheckUserExistence.php">
                    <span v-if="valid_password == false" class="error-msg">Password is incorrect</span>
                    <span v-if="existence_failed == true" class="error-msg">User does not exist, go to Sign-Up</span>
                    <input type="email" placeholder="Email" required name="email" v-model="email">
                    <input type="password" placeholder="Password" required name="password" v-model="password">
                    <div class="form-submit">
                        <input type="submit" value="Continue">
                    </div>
                </form>
            </div>
            <div>
                <button @click="onClose" class="closeButton" :disabled="valid_password == false"></button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.modal-mask {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

}

.modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* background-color: #FFFFFF; */
    background-color: rgba(255, 255, 255, 0.95);
    width: 500px;
    height: 500px;
    margin: auto;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    border-radius: 20px;
    z-index: 9998;

}

.modal-header {
    text-align: center;
}

.modal-header h1 {
    color: rgba(85, 30, 25, 1);
    font-weight: 500;
}

.modal-header p {
    font-size: small;
}

.modal-body {
    margin-top: 20px;
    display: flex;
    justify-content: center;

}

.modal-body form input {
    display: block;
    margin-top: 15px;
    padding: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.modal-body form input[type='email'],
input[type='password'] {
    width: 400px;
    background-color: rgba(85, 30, 25, 0.2);
    border: none;
    font-weight: 600;
    border-radius: 15px;

}

.form-submit {
    display: flex;
    justify-content: center;
}

.form-submit input {
    width: 250px;
    border-radius: 15px;
    font-weight: 500;
    font-size: 16px;
    background-color: rgba(85, 30, 25, 1);
    color: #FFFFFF;
    box-shadow: none;
    border: none;
}

.closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    width: 20px;
    background-image: url("../assets/x-close-delete-svgrepo-com.svg");
    background-size: cover;
    border: none;
    cursor: pointer;
}

input[type="submit"] {
    transition: all 0.3s ease 0s;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #195055;
}

.error-msg {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    color: red;  
}
</style>