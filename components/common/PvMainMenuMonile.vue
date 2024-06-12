<template>
  <div class="">
    <div v-if="isAuthenticated">
      <div class="customer-avatar d-flex align-items-center" >
        <nuxt-img
          format="webp"
          loading="lazy"
          v-if="StateUser.avatar"
          :src="checkURL(StateUser.avatar)"
          @error="defaultAvatar"
          width="60"
          height="60"
          alt="Avatar"
          class="ml-3 mobile-avatar"/>
        <span class="ml-3 font-weight-bold user-name">
        {{StateUser.name}}
        </span>
      </div>
    </div>
    <div v-else class="text-center" @click="closeAllNav()">
      <nuxt-link :to="getLink('/auth/login')">
        <button class="w-25 login-button" >
          {{ $t("login.title") }}
        </button>
      </nuxt-link>
      <nuxt-link :to="getLink('/auth/register')">
        <button class="w-25 register-button">
          {{ $t("login.registerNow") }}
        </button>
      </nuxt-link>
    </div>
    <hr class="mt-1 mb-0 dashed">
    <ul class="menu main-menu nav-categories">
      <div @click="closeAllNav()">
        <nuxt-link :to="getLink('/')">
          <li class="menu-list-items mb-0">
            {{ $t("header.home") }}
          </li>
        </nuxt-link>
      </div>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
          <p
            @click="KeyRemoteMenu(),getKeysAndRemotes()"
            class="pt-3 mb-1 mobile-menu-links">{{ $t("header.keysAndRemote") }}</p>
        <span @click="KeyRemoteMenu(),getKeysAndRemotes()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
          <p
            @click="accessoriesMenu(),getAccessoriesAndTools()"
            class="pt-3 mb-1 mobile-menu-links">{{ $t("header.AccessoriesAndTools") }}</p>
        <span @click="accessoriesMenu(),getAccessoriesAndTools()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
          <p
            @click="DeviceMachineMenu(),getDevicesAndMachines()"
            class="pt-3 mb-1 mobile-menu-links">{{ $t("header.DeviceAndMachine")}}</p>
        <span @click="DeviceMachineMenu(),getDevicesAndMachines()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <p
          @click="manufacturersMenu(),getManufacturers()"
          class="pt-3 mb-1 mobile-menu-links">
          {{ $t("header.Manufactures") }}
        </p>
        <span @click="manufacturersMenu(),getManufacturers()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <p
          @click="tokenSoftwareMenu()"
          class="pt-3 mb-1 mobile-menu-links">
          {{ $t("header.TokensAndSoftware") }}
        </p>
        <span @click="tokenSoftwareMenu()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4">
        <p
          @click="carsMenu(),getCars()"
          class="pt-3 mb-1 mobile-menu-links">
          {{ $t("header.Cars") }}
        </p>
        <span @click="carsMenu(),getCars()" class="float-right mb-2 mobile-menu-toggle-button">&#x025BE;</span>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/downloads')" class="d-flex">
          <p class="mobile-menu-links">{{ $t("header.downloads") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/pin-code')" class="d-flex">
          <p class="mobile-menu-links">{{ $t("header.PinCode") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/shop?free-shipping')" class="d-flex">
          <p class="mobile-menu-links-red">{{ $t("header.FreeShipping") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/shop?offers')" class="d-flex">
          <p class="mobile-menu-links-red">{{ $t("header.Offer") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/shop?bundled')" class="d-flex">
          <p class="mobile-menu-links-red">{{ $t("header.Bundles") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/unlock-remote-services')" class="d-flex">
          <p class="mobile-menu-links-red">{{ $t("header.unlockService") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4"
      @click="closeAllNav()"
      >
        <nuxt-link :to="getLink('/online-services')" class="d-flex">
          <p class="mobile-menu-links-red">{{ $t("header.OnlineServices") }}</p>
        </nuxt-link>
      </li>
      <hr class="mt-0 mb-0 dashed">
      <li class="menu-list-items mb-0 mt-0 p-3 pl-4" v-if="isAuthenticated">
        <div class="text-center">
          <button class="login-button w-50" @click="LogOut(),closeAllNav()">
            {{ $t("account.log_out") }}
          </button>
        </div>
      </li>
      <hr class="mt-0 mb-0 dashed">
    </ul>
    <div id="mySidenav" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.keysAndRemote") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item,index) in keysAndRemotes" :key="index" class="row ml-auto mr-auto text-center mb-1">
        <div v-for="(item2, index2) in item" :key="index2" class="col-6">
          <div v-if="item2.slug && item2.slug !=''">
            <div @click="closeAllNav()">
              <nuxt-link :to="'/'+item2.slug">
                <nuxt-img format="webp" alt="key and remote" :src="item2.image"  width="100" height="100" class="mt-1 mb-1" loading="lazy" />
                <span class="font-weight-bold">{{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav2" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.AccessoriesAndTools") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item,index) in accessoriesAndTools" :key="index" class="row ml-auto mr-auto text-center mb-1">
        <div v-for="(item2, index2) in item" :key="index2" class="col-6">
          <div v-if="item2.slug && item2.slug !=''" >
            <div @click="closeAllNav()">
              <nuxt-link :to="'/'+item2.slug">
                <nuxt-img alt="Accessories and tools" format="webp" :src="item2.image" width="100" height="100" class="mt-1 mb-1" loading="lazy" />
                <span class="font-weight-bold">{{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav3" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.DeviceAndMachine") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item,index) in devicesAndMachines" :key="index" class="row ml-auto mr-auto text-center mb-1">
        <div v-for="(item2, index2) in item" :key="index2" class="col-6">
          <div v-if="item2.slug && item2.slug !=''" >
            <nuxt-link :to="'/'+item2.slug">
              <div @click="closeAllNav()">
                <nuxt-img alt="Device and machines" format="webp" :src="item2.image" width="100" height="100" class="mt-1 mb-1" loading="lazy" />
                <span class="font-weight-bold">{{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav4" class="sidenav">
      <span class="mobile-menu-title">{{ $t("header.Manufactures") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item,index) in manufacturers" :key="index" class="row ml-auto mr-auto text-center mb-1">
        <div v-for="(item2, index2) in item" :key="index2" class="col-6">
          <div v-if="item2.slug && item2.slug !=''">
            <div @click="closeAllNav()">
              <nuxt-link :to="'/'+item2.slug">
                <nuxt-img alt="Manufactures" format="webp" :src="item2.image.s.url" width="100" height="100" class="mb-1" loading="lazy" />
                <span class="font-weight-bold">{{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav5" class="sidenav">
      <span class="mobile-menu-title-car">{{ $t("header.Cars") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div v-for="(item,index) in cars" :key="index" class="row ml-auto mr-auto text-center mb-1">
        <div v-for="(item2, index2) in item" :key="index2" class="col-6">
          <div v-if="item2.slug && item2.slug !=''">
            <div @click="closeAllNav()">
              <nuxt-link :to="'/'+item2.slug">
                <nuxt-img alt="Cars" format="webp" :src="item2.image.s.url" width="100" height="100" class="mb-1" loading="lazy" />
                <span class="font-weight-bold">{{ item2.name && item2.name[$i18n.locale] ? item2.name[$i18n.locale] : 'N/A' }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav6" class="sidenav">
      <span class="mobile-menu-title-car">{{ $t("header.TokensAndSoftware") }}</span>
      <a href="javascript:void(0)" @click="closeNav()" class="closebtn">&times;</a>
      <div class="text-center">
        <button class="token-and-software-buttons">{{ $t("common.software") }}</button>
      </div>
      <div v-for="(itemm,index) in $settings.main_menu" :key="index">
        <div v-for="(item2, index2) in itemm.items" :key="index2">
          <div v-if="itemm.slug =='tokens-software'" class="row ml-auto mr-auto text-center d-flex flex-row ">
            <div v-for="(item3,index3) in item2" :key="index3" class="col-6">
              <div v-if="item3.slug.includes('software')" >
                <div @click="closeAllNav()">
                  <nuxt-link
                    :to="'/'+item3.slug">
                    <nuxt-img alt="Software" format="webp" :src="item3.image.s.url" width="100" height="100" class="mb-1" loading="lazy" />
                    <span class="font-weight-bold">{{ item3.name && item3.name[$i18n.locale] ? item3.name[$i18n.locale] : 'N/A' }}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button class="token-and-software-buttons">{{ $t("common.token") }}</button>
      </div>
      <div v-for="(itemm,index) in $settings.main_menu" :key="index">
        <div v-for="(item2, index2) in itemm.items" :key="index2">
          <div v-if="itemm.slug =='tokens-software'" class="row ml-auto mr-auto text-center d-flex flex-row mb-1">
            <div v-for="(item3,index3) in item2" :key="index3" class="col-6">
              <div v-if="item3.slug.includes('token')" >
                <div @click="closeAllNav()">
                  <nuxt-link
                    :to="'/'+item3.slug">
                    <nuxt-img alt="Token" format="webp" :src="item3.image.s.url" width="100" height="100" class="mb-1" loading="lazy" />
                    <span class="font-weight-bold">{{ item3.name && item3.name[$i18n.locale] ? item3.name[$i18n.locale] : 'N/A' }}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import img from "~/static/images/blank.png";
import Api from "~/api";
export default {
  data: function () {
    return {
      manufacturers : [],
      cars: [],
      keysAndRemotes: [],
      accessoriesAndTools: [],
      devicesAndMachines: [],
      softwareAndTokens: [],
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    totalLength: function() {
      const mainMenuLength = Object.keys(this.$settings.main_menu).length;
      const menusLength = Object.keys(this.$settings.menus).length;
      return mainMenuLength + menusLength;
    },
  },
  methods: {
    ...mapActions("shop", ["getCartList"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),

    test(){
      alert("test")
    },

    getKeysAndRemotes: function(){
      Api.get('/keys-and-remotes-menu')
        .then(response => {
          this.keysAndRemotes = response.data.data.menu.main_menu['Key-Remote'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getAccessoriesAndTools: function(){
      Api.get('/accessories-tools-menu')
        .then(response => {
          this.accessoriesAndTools = response.data.data.menu.main_menu['accessories-tools'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getDevicesAndMachines: function(){
      Api.get('/device-machine-menu')
        .then(response => {
          this.devicesAndMachines = response.data.data.menu.main_menu['device_machines'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getManufacturers: function() {
      Api.get('/manufacturers_menu')
        .then(response => {
          this.manufacturers = response.data.data.menu.main_menu.manufacturers
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getCars: function() {
      Api.get(`/menu`)
        .then(response => {
          this.cars = response.data.data.menu.main_menu.cars;
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },
    defaultAvatar(e) {
      e.target.src = img;
    },
    KeyRemoteMenu(){
      document.getElementById("mySidenav").style.width = "260px";
    },
    accessoriesMenu(){
      document.getElementById("mySidenav2").style.width = "260px";
    },
    DeviceMachineMenu(){
      document.getElementById("mySidenav3").style.width = "260px";
    },
    manufacturersMenu(){
      document.getElementById("mySidenav4").style.width = "260px";
    },
    carsMenu(){
      document.getElementById("mySidenav5").style.width = "260px";
    },
    tokenSoftwareMenu(){
      document.getElementById("mySidenav6").style.width = "260px";
    },
    closeNav(){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
    },
    closeAllNav(){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
      document.querySelector("body").classList.remove("mmenu-active");
    },
    LogOut() {
      // this.$Progress.start();
      this.$auth.logout().then((res) => {
        localStorage.setItem("tokenEnded", 1);
        this.fetchList();
        this.fetchWishlist();
        this.getCartList();
        this.closeNav()
        this.$router.push("/");
      });
      // this.$Progress.finish();
    },
  },
};
</script>
