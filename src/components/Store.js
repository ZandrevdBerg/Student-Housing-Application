import { defineStore } from "pinia";

export const userLoginState = defineStore('LoginState',{
    state: () => ({
        loggedIn: false,
        email: "",
        sessionID: "",
        type: ""
    }),
    actions: {
        logIn() {
            this.loggedIn = true
        }
    }
})