
<script setup>
/* 1 - Create a way for users to only submit once (currently after a user has submitted, the sign up is closed off) */
/* 2 - Check if the email exists in the userdatabase */
import { computed, ref } from 'vue';


const password = ref('');
const email = ref('');
const repeat_password = ref('');
const personType = ref('');

var signed_up = ref(false);

const passwordAuthentication = computed(() => {
    return password.value === repeat_password.value
})



const props = defineProps({
    isVisible: Boolean
})

const emits = defineEmits(['close']);

function onClose() {
    emits('close');
    signed_up.value = false;
}



function onSubmit() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "./server/Authentication/form-submit.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            // console.log(xhttp.responseText);
            const response = JSON.parse(xhttp.responseText);
            const sessionID = response.session_id;
            // signed_up = response.signed_up;
            signed_up.value = response.user_exist;
            // alert(sessionID);
            // alert(document.cookie);
            // cookieValue = document.cookie

        }

    }
    xhttp.send(`password=${password.value}&email=${email.value}&persontype=${personType.value}`);
}

</script>


<template>
    <div v-if="isVisible" class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <h1>Create an account</h1>
                <p>Enter the details below to create an account</p>
            </div>
            <div class="modal-body">
                <form @submit.prevent="onSubmit" method="post" action="./server/Authentication/form-submit.php">
                    <span v-if="signed_up == true" class="error-msg">Existing User. Try Logging in</span>

                    <input type="email" placeholder="Email" required name="email" v-model="email" >
                    <input type="password" placeholder="Password" required name="password" v-model="password">
                    <input type="password" placeholder="Repeat Password" required name="repeat_password"
                        v-model="repeat_password">
                        <!-- <span v-if="signed_up == true" class="error-msg">User Already exists in the database</span> -->
                    <span v-if="!passwordAuthentication" class="error-msg">Password does not match</span>
                    <div class="modal-body-checkbox">
                        <input type="radio" value="student" id="student" name="personType" v-model="personType">
                        <label for="student">Student</label>
                        <input type="radio" value="landlord" id="landlord" name="personType" v-model="personType">
                        <label for="landlord">Landlord</label>
                    </div>
                    <div class="form-submit">
                        <input type="submit" value="Confirm" :disabled="!passwordAuthentication || signed_up == true">
                    </div>
                </form>
            </div>
            <div>
                <button @click="onClose" class="closeButton"></button>
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

.modal-body-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
}


.modal-body-checkbox input[type=checkbox],
.modal-body-checkbox label {
    display: inline-block;
    vertical-align: middle;
    justify-content: center;
    margin-right: 10px;
    margin-left: 5px;
    margin-top: 15px;
}

input[type="submit"]:disabled {
    background-color: red;
    pointer-events: none;
}

.error-msg {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
</style>