import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
.use(
  createAuth0({
    domain: "dev-hagxd1jy5tk4yugt.us.auth0.com",
    clientId: "uChDu8PpdzifqeOdzaPvjLIQzRh4KEi2",
    authorizationParams: {
      redirect_uri: 'http://localhost:5173/dashboard'
    }
  })
)
.mount('#app')