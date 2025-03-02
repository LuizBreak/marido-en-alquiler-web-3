/* eslint-disable no-unused-vars */
<template>
  <!-- Article Reference: https://github.com/Jebasuthan/Vue-Facebook-Google-oAuth -->
  <div class="signup-buttons">
    <div id="fb-root"></div>
    <div>
      <a
        class="btn btn-outline-info w-100 mb-3"
        @click.prevent="loginWithGoogle"
        ><i class="fi-google fs-lg me-1"></i>Continuar con Google</a
      ><a
        class="btn btn-outline-info w-100 mb-3"
        @click.prevent="loginWithFacebook"
        ><i class="fi-facebook fs-lg me-1"></i>Continuar con Facebook</a
      >
    </div>
  </div>
</template>

<script>
import { initFbsdk } from "../../../services/facebook.oAuth.service";
import router from "../../../router";

export default {
  name: "login-signup-social",
  mounted() {
    initFbsdk();
  },
  methods: {
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          // on success do something
          console.log("GoogleUser", GoogleUser);
          console.log("getId", GoogleUser.getId());
          console.log("basicprofile", GoogleUser.getBasicProfile().getName());
          console.log("getBasicProfile", GoogleUser.getBasicProfile());
          console.log("getAuthResponse", GoogleUser.getAuthResponse());
          // eslint-disable-next-line no-unused-vars
          var userInfo = {
            loginType: "google",
            google: {
              auth: GoogleUser.getAuthResponse(),
              user: {
                name: GoogleUser.getBasicProfile().getName(),
                email: GoogleUser.getBasicProfile().getEmail(),
                profileImage: GoogleUser.getBasicProfile().getImageUrl(),
              },
            },
          };
          // this.$store.commit("setLoginUser", userInfo);
          router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    loginWithFacebook() {
      window.FB.login((response) => {
        if (response && response.authResponse) {
          console.log("response", response);
          // eslint-disable-next-line no-unused-vars
          var userInfo = {
            loginType: "fb",
            fb: {
              auth: response.authResponse,
            },
          };
          // this.$store.commit("setLoginUser", userInfo);
          window.FB.api(
            `/${response.authResponse.userID}`,
            (userResponse) => {
              if (userResponse) {
                console.log(userResponse);
                // eslint-disable-next-line no-unused-vars
                var userInfo = {
                  loginType: "fb",
                  fb: {
                    auth: response.authResponse,
                    user: userResponse,
                  },
                };
                // this.$store.commit("setLoginUser", userInfo);
              }
            },
            this.params
          );
          router.push("/");
        }
      }, this.params);
    },
  },
};
</script>
