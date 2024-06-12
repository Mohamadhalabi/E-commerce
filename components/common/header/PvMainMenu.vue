<template>
  <div class="header-menu main-nav"
       :class="{'text-right':getIsAr}">
    <ul class="menu nav-categories header-main-menu">
<!--Cars Menu-->
      <li class="left-menu-items" @mouseover="getCars()">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.Cars") }} <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>
        <div class="megamenu custom-megamenu megamenu-car p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
             v-if="carMenuOpened"
             @click="closeCarMenu()"
             v-for="(item, key) in cars" :key="key">
          <div class="row bg-white m-0">
            <ul class="submenu custom-submenu d-flex flex-wrap bg-white p-0" >
              <li
                v-for="(i,key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow sub-menu-cars"
              >
                <nuxt-link :to="getLink('/'+i.slug)" v-if="i.image && i.image.s">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image.s.url"
                  />
                  <div class="brand-name">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <!--Manufacturers menu -->
      <li class="left-menu-items" @mouseover="getManufacturers()">
        <nuxt-link
          :to="getLink('#')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.Manufactures") }} <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>
        <div class="megamenu custom-megamenu p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
             v-if="ManufacturerMenuOpened"
             @click="closeManufacturerMenu()"
             v-for="(item, key) in manufacturers" :key="key">
          <div class="row bg-white m-0">
            <ul class="submenu custom-submenu d-flex flex-wrap bg-white p-0" >
              <li
                v-for="(i,key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow sub-menu-items"
              >
                <nuxt-link :to="getLink('/'+i.slug)" v-if="i.image && i.image.s">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image.s.url"
                  />
                  <div class="brand-name">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
<!--      Keys And remotes menu -->
      <li class="left-menu-items" @mouseover="getKeysAndRemotes()">
        <nuxt-link
          :to="getLink('')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.keysAndRemote") }} <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>
        <div class="megamenu custom-megamenu p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
             v-if="keysAndRemoteMenuOpened"
             @click="closeKeyAndRemotesMenu()"
             v-for="(item, key) in keysAndRemotes" :key="key">
          <div class="row bg-white m-0">
            <ul class="submenu custom-submenu d-flex flex-wrap bg-white p-0" >
              <li
                v-for="(i,key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow sub-menu-items"
              >
                <nuxt-link :to="getLink('/'+i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="brand-name">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
<!--      Accessoires and tools -->
      <li class="left-menu-items" @mouseover="getAccessoriesAndTools()">
        <nuxt-link
          :to="getLink('')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.AccessoriesAndTools") }} <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>
        <div class="megamenu custom-megamenu p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
             v-if="AccessoriesAndToolsMenuOpened"
             @click="closeAccessoriesAndTools()"
             v-for="(item, key) in accessoriesAndTools" :key="key">
          <div class="row bg-white m-0">
            <ul class="submenu custom-submenu d-flex flex-wrap bg-white p-0" >
              <li
                v-for="(i,key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow sub-menu-items"
              >
                <nuxt-link :to="getLink('/'+i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="brand-name">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
<!--      Devices And Machines -->
      <li class="left-menu-items"
          @mouseover="getDevicesAndMachines()">
        <nuxt-link
          :to="getLink('')"
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles">
          <span class="header-main-menu">
            {{ $t("header.DeviceAndMachine") }} <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>
        <div class="megamenu custom-megamenu p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
             v-if="DeviceAndMachineMenuOpened"
             @click="closeDeviceAndMachineMenu()"
             v-for="(item, key) in devicesAndMachines" :key="key">
          <div class="row bg-white m-0">
            <ul class="submenu custom-submenu d-flex flex-wrap bg-white p-0" >
              <li
                v-for="(i,key2) in item"
                :key="key2"
                class="bg-white logo-item-car p-0 with-box-shadow "
              >
                <nuxt-link :to="getLink('/'+i.slug)" v-if="i.image">
                  <nuxt-img
                    format="webp"
                    class="sub-menu-images"
                    :src="i.image"
                  />
                  <div class="brand-name">
                    <span>{{ i.name[$i18n.locale] }}</span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li
        @mouseover="SoftwareAndTokenMenuOpened = true"
        v-for="(item, name, index) in $settings.main_menu"
        :key="index"
        :class="{
          active:
            item.slug != 'tokens-software' &&
            item.slug != 'manufacturers' &&
            item.slug === currentItem,
        }"
        class="left-menu-items"
      >
        <nuxt-link
          class="d-flex align-items-center flex-column mt-auto mb-auto header-li-titles"
          :to="
          item.slug !== 'tokens-software' && item.slug !== 'manufacturers'
          ? getLink('/' + item.slug)
          : getLink('#' + item.slug)
          "
          :class="{
            active:
              false &&
              name != 'tokens-software' &&
              name != 'manufacturers' &&
              item.slug === currentItem,
          }"
        >
          <span class="header-main-menu">{{ item.name[$i18n.locale] ? item.name[$i18n.locale] : item.name.en }}
              <span class="hoverable">&#x025BE;</span>
          </span>
        </nuxt-link>

        <div
          class="megamenu custom-megamenu p-0 megamenu-fixed-width w-100 megamenu-2cols bg-white"
          v-if="SoftwareAndTokenMenuOpened"
        >
          <div class="row bg-white m-0">
            <template v-if="item.items.software">
              <div
                @click="closeSoftwareAndTokenMenu()"
                v-for="(category, index) in item.items"
                :key="index"
                class="col-lg-6"
                :class="getIsAr ? 'tokens-and-software' : 'token-and-software'">
                <ul
                  class="submenu custom-submenu d-flex flex-wrap bg-white p-0">
                  <div class="row">
                    <div class="pb-lg-4 pt-lg-4 ml-auto mr-auto">
                      <button
                        class="token-and-software-buttons"
                      >
                        {{ capitalize(index) }}
                      </button>
                    </div>
                    <div class="">
                      <li
                        v-for="i in category"
                        :key="i.slug"
                        class="bg-white logo-item with-box-shadow sub-menu-items-software-token"
                      >
                        <nuxt-link :to="getLink('/'+i.slug)">
                          <nuxt-img
                            format="webp"
                            v-if="i.image.s"
                            :src="i.image.s.url"
                            :alt="i.name[$i18n.locale]"
                            class="software-token-image"
                          />
                          <div class="brand-name">
                            <span> {{ i.name[$i18n.locale] }}</span>
                          </div>
                        </nuxt-link>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </li>

      <!-- 2 -->
      <li
        v-for="(item, name, index) in $settings.menus"
        :key="name"
        :class="{ active: item.link === currentItem }"
        class="right-menu-items"
      >
        <nuxt-link
          v-if="item.link"
          :to="getLink('/'+item.link)"
          :class="{ active: item.link === currentItem }"
          class="d-flex align-items-center flex-column download-pin-code"
        >
          <span class="header-main-menu">
            {{item.name[$i18n.locale] ? item.name[$i18n.locale] : item.name.en}}
          </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { capitalize } from "lodash";
import {mapGetters} from "vuex";
import Api from "~/api";
export default {
  data: function () {
    return {
      capitalize,
      manufacturers : [],
      cars: [],
      keysAndRemotes : [],
      accessoriesAndTools: [],
      devicesAndMachines: [],
      softwareAndTokens: [],
      carMenuOpened: false,
      ManufacturerMenuOpened: false,
      keysAndRemoteMenuOpened: false,
      AccessoriesAndToolsMenuOpened: false,
      DeviceAndMachineMenuOpened: false,
      SoftwareAndTokenMenuOpened: false,
    };
  },
  methods: {
    closeCarMenu(){
      this.carMenuOpened = false;
    },
    closeManufacturerMenu(){
      this.ManufacturerMenuOpened = false;
    },
    closeKeyAndRemotesMenu(){
      this.keysAndRemoteMenuOpened = false;
    },
    closeAccessoriesAndTools(){
      this.AccessoriesAndToolsMenuOpened = false;
    },
    closeDeviceAndMachineMenu(){
      this.DeviceAndMachineMenuOpened = false;
    },
    closeSoftwareAndTokenMenu(){
      this.SoftwareAndTokenMenuOpened = false;
    },
    getCars: function() {
      Api.get(`/menu`)
        .then(response => {
          this.carMenuOpened = true
          this.cars = response.data.data.menu.main_menu.cars;
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getManufacturers: function() {
      Api.get('/manufacturers_menu')
        .then(response => {
          this.ManufacturerMenuOpened = true
          this.manufacturers = response.data.data.menu.main_menu.manufacturers
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getKeysAndRemotes: function(){
      Api.get('/keys-and-remotes-menu')
        .then(response => {
          this.keysAndRemoteMenuOpened = true
          this.keysAndRemotes = response.data.data.menu.main_menu['Key-Remote'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getAccessoriesAndTools: function(){
      Api.get('/accessories-tools-menu')
        .then(response => {
          this.AccessoriesAndToolsMenuOpened = true;
          this.accessoriesAndTools = response.data.data.menu.main_menu['accessories-tools'];
        })
        .catch(error => ({error: JSON.stringify(error)}));
    },
    getDevicesAndMachines: function(){
      Api.get('/device-machine-menu')
        .then(response => {
          this.DeviceAndMachineMenuOpened = true;
          this.devicesAndMachines = response.data.data.menu.main_menu['device_machines'];
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
    },
  computed: {
    ...mapGetters("language", ["getLang"]),
      ...mapGetters("rtlStore", ["getIsAr"]),
    totalLength: function () {
      const mainMenuLength = Object.keys(this.$settings.main_menu).length;
      const menusLength = Object.keys(this.$settings.menus).length;
      return mainMenuLength + menusLength;
    },
    itemWidth: function () {
      return `${100 / this.totalLength}%`;
    },
    currentItem: function () {
      if (this.$route.query && this.$route.query.category)
        return this.$route.query.category;
      return "";
    },
  },
};
</script>

<style scoped>
.header-main-menu{
  color: white;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  background-color: #3e3e3e;
  max-height: 49px;
  padding-left:5px;
  padding-right: 5px;
  display: flex;
  justify-content: center;
}
.left-menu-items, .right-menu-items{
  border-right: 1px solid #585a5e!important;
}
.header-li-titles{
  height: 50px!important;
}
.hoverable {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  font-size: 14px;
  margin: auto;
}

.left-menu-items:hover .hoverable {
  transform: rotateX(-180deg);

}
.token-and-software-buttons{
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  padding: 10px!important;
  border-radius: 10px;
  background-color: #892118;
  border: 1px solid #892118;
  color: white;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}
.token-and-software-buttons:hover{
  background-color: #892118!important;
  text-decoration: underline;
}

.logo-item, .logo-item-car {
  position: relative;
  overflow-y: hidden;
}

.brand-name {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25%!important;
  background: #892118;
  color: white;
  top: 88%;
  left: 50%;
  transform-origin: top left;
  transform: translate(-50%, 50%);
  transition: all 0.4s ease-out;
  font-size: 10px;
  overflow: hidden;
  padding: 11px;
}
@media screen and (max-width: 1435px)
{
  .brand-name{
    padding: 0;
    height: 30%!important;
    top: 85%;
  }
}
@media screen and (max-width: 1300px)
{
  .brand-name{
    padding: 0;
    top: 90%;
    font-size: 8px;
  }
}
.logo-item:hover .brand-name, .logo-item-car:hover .brand-name {
  opacity: 0.85;
  transform: translate(-50%, -50%);
  border-radius: 3px;
}
.logo-item img{
  transform: scale(0.85)!important;
  transition: transform .2s ease-in-out!important;
}

.logo-item-car img {
  padding: 5px;
  transition: transform .2s ease-in-out!important;
  transform: scale(0.9)!important;
}

.logo-item-car:hover img{
  transform: scale(0.85)!important;
}

.logo-item:hover img {
  transform: scale(0.8)!important;
}

.logo-item .brand-name span {
  opacity: 1;
}

.with-box-shadow {
  box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.1);
}

.with-box-shadow:nth-child(6), .with-box-shadow:nth-child(12), .with-box-shadow:nth-child(1){
  box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.1);
  clip-path: inset(-5px 0px -5px -5px);
}


.sub-menu-items{
  width: 128.7px!important;
  height: 128.7px!important;
}
.sub-menu-cars{
  width: 100.6px!important;
  height: 100.6px!important;
}
.sub-menu-items-software-token{
  width: 117.8px!important;
  height: 117.8px!important;
}


@media screen and (max-width: 1600px){
}

@media screen and (max-width: 1435px){
  li.sub-menu-items{
    width: 102px!important;
    height: 102px!important;
  }
  .header-main-menu{
    font-size: smaller!important;
  }
  .sub-menu-items-software-token{
    width: 94.7px!important;
    height: 94.7px!important;
  }
  .sub-menu-cars{
    width: 94.3px!important;
    height: 94.3px!important;
  }
}
@media screen and (max-width: 1300px){
  li.sub-menu-items{
    width: 95px!important;
    height: 95px!important;
  }
}

.nav-categories{
}
@media screen and (max-width: 1200px){
  li.sub-menu-items{
    width: 96px!important;
    height: 96px!important;
  }
  .header-main-menu{
    font-size: smaller!important;
  }
  .sub-menu-items-software-token{
    width: 79.7px!important;
    height: 79.7px!important;
  }
  .sub-menu-cars{
    width: 86.6px!important;
    height: 86.6px!important;
  }
}
.download-pin-code{
  height: 50px;
}
.megamenu-car{
  overflow-y: scroll;
  max-height: 75vh;
}
</style>
