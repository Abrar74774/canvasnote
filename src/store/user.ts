import { defineStore } from "pinia";

interface User {
    username: string,
    email: string
}

export const useUserStore = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            data: null as User | null
        }

    },
    actions: {
        removeUserData() {
            if (localStorage) {
                localStorage.removeItem('user-data')
            }
        },
        setUserData(userData?: User) {
            if (localStorage) {
                localStorage.setItem('user-data', JSON.stringify(userData ?? this.$state.data))
            }
        },
        loadUserData() {
            console.log('loaddd')
            const localData = localStorage.getItem('user-data')
            try {
                if (localData && localData.length) {
                    this.$state.data = JSON.parse(localData)
                    this.isLoggedIn = true
                } else throw Error()
            } catch (error) {
                this.removeUserData()
            }
        },
        async register(email: string, username:string, password:string) {
            try {
                const response = await fetch(import.meta.env.VITE_API_SERVER_URL + '/user/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        username
                    })
                })

                const data = await response.json()
                const userData = data?.user

                this.$state.data = userData 
                this.setUserData(userData)
                this.$state.isLoggedIn = true
                
                console.log(userData)
                window.localStorage.setItem('user-data', JSON.stringify(userData))
            } catch (error) {
                console.log(error)
            }

        },
        async login(email: string, password:string)  {
            try {
                const response = await fetch(import.meta.env.VITE_API_SERVER_URL + '/user/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                        
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email,
                        password
                    })
                })

                const data = await response.json()
                const userData = data?.user

                this.$state.data = userData
                this.setUserData(userData)
                this.$state.isLoggedIn = true

                console.log(userData)
                window.localStorage.setItem('user-data', JSON.stringify(userData))
            } catch (error) {
                console.error(error)
            }
        },

        async logout() {
            try {
                const response = await fetch(import.meta.env.VITE_API_SERVER_URL + '/user/logout', {
                    method: "POST",
                    credentials: 'include',
                })

                if (!response.ok) throw 'Logout error: Response from server: ' + response.status
                const data = await response.json()
                
                console.log('logout', data?.message)
            } catch (error) {
                console.error(error)
            } finally {
                this.$state.data = null
                this.$state.isLoggedIn = false
                this.removeUserData()
            }
        }
    }
})