import { createApp } from "vue";
import App from "./App.vue";
import {keycloakStore} from "./components/LoginStates.ts";
import('eruda').then(eruda => eruda.default.init());

keycloakStore.init(window.location.href);
createApp(App).mount("#app");
