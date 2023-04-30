<script setup>

import { ref } from 'vue';
const props = defineProps({
    isVisible: Boolean
})

const emits = defineEmits(['close']);

function onClose(){
    emits('close');
}


</script>


<template>
    <div v-if="isVisible">
    <h1>Create an account</h1>
    <p>Enter the details below to create an account</p>
    <form>
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Password" required>
        <input type="password" placeholder="Repeat Password" required>
        <input type="submit" value="Confirm">
    </form>
    <button @click="onClose">Close</button>
</div>
</template>


<style scoped></style>