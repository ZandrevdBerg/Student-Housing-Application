import { defineStore } from "pinia";

export const userLoginState = defineStore('LoginState',{
    state: () => ({
        loggedIn: false,
        email: "",
        sessionID: ""
    }),
    actions: {
        logIn() {
            this.loggedIn = true
        }
    }
})