import {reactive} from 'vue'
import Keycloak, {KeycloakConfig} from "keycloak-js";

export interface KeycloakUser {
  username: string
}

let initOptions: KeycloakConfig = {
  url: "http://10.0.2.2:24904/auth",
  realm: 'OnePool',
  clientId: 'application',
}

export const keycloakStore = reactive({
  keycloak: new Keycloak(initOptions),
  isAuthenticated: false,
  user: {} as KeycloakUser,

  init(redirectionUrl: string) {
    this.keycloak.init({
      onLoad: 'login-required',
      redirectUri: redirectionUrl,
      checkLoginIframe: false
    }).then((auth: boolean) => {
      this.isAuthenticated = auth;

      if (!auth) {
        return;
      }

      this.keycloak.loadUserInfo().then((userInfo: any) => {
        //useUserStore().init(userInfo.preferred_username)
      })
    })

    this.keycloak.onTokenExpired = () => {
      //HTTPAxios.updateToken();
    }
  },
  loginUser(redirectionUrl: string) {
    if (!keycloakStore.isAuthenticated || !keycloakStore.keycloak.authenticated) {
      window.open(keycloakStore.keycloak.createLoginUrl({redirectUri: redirectionUrl}), '_self')
    }
  }
})
