import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store/index";
import vuetify from "./plugins/vuetify";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vuelidate from "vuelidate";
import axios from "axios";
import { i18n } from "./Translation/i18n";
// @ts-ignore
import Chartkick from "vue-chartkick";
// @ts-ignore
import Chart from "chart.js";
import httpClient from "@/api/httpClient/httpClient";
import createApi from "@/api/index.api";

Vue.use(Vuelidate);
Vue.use(Buefy);
Vue.use(Chartkick.use(Chart));

Vue.config.productionTip = false;

// TODO: delete after removing all requests from component
Vue.prototype.$axios = axios;

const api = createApi(httpClient);
const store = createStore(api);

export const eventEmmitter = new Vue();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  ...{ api },
  render: h => h(App)
}).$mount("#app");
