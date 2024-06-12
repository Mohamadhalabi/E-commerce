<template>
  <div
    :class="loadedBtn?'hideBtn':''"
    style=" height: 74px;"
  >
    <div class="signup-buttons">
      <div id="googleLoginBtn" v-if="$settings.login_setting.google.enable" />
      <a
        href="#"
        v-if="$settings.login_setting.facebook.enable"
        class="facebook-signup"
        @click.prevent="loginWithFacebook"
      >
        <svg class="ml-3"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#3578E5"
        ><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
        {{$t('login.facebook')}}
      </a>

    </div>
  </div>

</template>

<script>

import settings from "~/plugins/settings";

const loadGoogleSDK = async() => {
  return new Promise((resolve) => {
    let script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onreadystatechange = script.onload = () => {
      if(!script.readyState || /loaded|complete/.test(script.readyState)) {
        setTimeout(() => {
          resolve();
        }, 500);
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};

const parseJwt = (token) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
  }).join(''));

  return JSON.parse(jsonPayload);
};
export default {
  name: 'LoginSignupSocial',
  data() {
    return {
      loadedBtn: true
    };
  },
  async created() {
    Promise.all([this.loadFacebookSDK(document, 'script', 'facebook-jssdk'), this.initFacebook()]);
  },
  mounted() {
    Promise.all([this.loadFacebookSDK(document, 'script', 'facebook-jssdk'), this.initFacebook()]);
  },
  created() {
    loadGoogleSDK()
      .then(()=>{
        window.google.accounts.id.initialize({
          client_id:  this.$settings.login_setting.google.client_id,
          callback: this.loginWithGoogle,
          auto_select: true
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleLoginBtn'), {
            text: 'Login',
            size: 'large',
            width: '18', // max width 400
            theme: 'outline' // option : filled_black | outline | filled_blue
          }
        );

      });

    setTimeout(() => {
      this.loadedBtn = false;
    }, 2000);
  },
  methods: {
    async loginWithGoogle(response) {
      const responsePayload = parseJwt(response.credential);
      const user = {
        name: responsePayload.name,
        userID: responsePayload.sub,
        email: responsePayload.email,
        profile_picture: responsePayload.picture
      };
      this.$store.dispatch('auth/loginWithGoogle', user).then((res)=> {
        // this.$modal.hideAll();
        this.$store.dispatch('auth/setUser', res.data.data);
      });
    },
    async loginWithFacebook() {


      window.FB.login((response) => {
        if(response && response.authResponse) {
          window.FB.api(`/${response.authResponse.userID}`, userResponse => {
            if(userResponse) {
              const user = {
                name: userResponse.name,
                userID: userResponse.id
              // email: userResponse.email,
              // profile_picture: userResponse.picture
              };
              this.$store.dispatch('auth/loginWithFacebook', user).then((res)=> {
                this.$store.dispatch('auth/setUser', res.data.data);
                // this.$store.dispatch('auth/setUser', res);
              });
            }
          });
        }
      },
      {
        scope: 'public_profile,email',
        auth_type: 'rerequest'
      });
    },
    async initFacebook() {
      window.fbAsyncInit = () => {
        return window.FB.init({
          appId: this.$settings.login_setting.facebook.app_id, // you will need to change this
          // appId: "1451592131972313", // you will need to change this
          cookie: true, // this is important, it's not enabled by default,
          xfbml: true,
          version:this.$settings.login_setting.facebook.version
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
};
</script>
<style>

.signup-buttons {
    margin: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
}
@media (max-width:600px){
  .signup-buttons{
    flex-flow: column;
    align-items: center;
  }
  .facebook-signup {
    margin-top: 5px !important;

  }
}
.facebook-signup {
    color: #031b4e;
    background: #f2f8ff;
    border: 1px solid rgba(0,105,255,.2);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
    display: inline-block;
    margin-top: 0;
    width: 47.5%;
    padding: 10px;
    text-align: center;
    position: inherit;
}
.signup-buttons svg {
    left: 16px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.hideBtn{
  opacity: 0;

}
</style>
