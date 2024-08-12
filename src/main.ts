import { createApp } from "vue";
import App from "./App.vue";
import {keycloakStore} from "./components/LoginStates.ts";
import('eruda').then(eruda => eruda.default.init());

keycloakStore.init("http://10.0.2.2:1420");
createApp(App).mount("#app");
