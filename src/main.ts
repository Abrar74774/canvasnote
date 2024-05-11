import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: '<AUTH0_DOMAIN>',
    clientId: '<AUTH0_CLIENT_ID>',
    authorizationParams: {
      redirect_uri: '<MY_CALLBACK_URL>'
    }
  })
);

import './assets/main.css'

app.use(router).mount('#app')