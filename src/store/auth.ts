import { defineStore } from "pinia";

interface User {
    username: string,
    email: string
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            user: null as User | null
        }

    },
    actions: {
        login(username: string, password:string)  {
            // login logic
            //
            //
            const email = 'example@example.com'
            this.user = { username, email }
            this.isLoggedIn = true
        },

        logout() {
            this.isLoggedIn = false
        }
    }
})