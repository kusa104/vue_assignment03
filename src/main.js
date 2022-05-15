import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import firebaseConfig from '../firebaseConfig'
import mixins from './mixins'

Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false

Vue.mixin(mixins)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
