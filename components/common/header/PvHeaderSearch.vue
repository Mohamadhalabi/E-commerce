<template>
  <div
    class="header-search header-search-inline header-search-category text-right"
  >
    <div class="header-search-wrapper">
      <label for="search_term" class="sr-only">
        {{ $t("common.search") }}
      </label>
      <input
        id="search_term"
        v-model="searchKey"
        class="form-control"
        type="text"
        name="search_term"
        :placeholder="$t('home.searchInput')"
        autocomplete="off"
        @input="searchProduct(),isInputClicked = true; $emit('SearchInputClicked', isInputClicked)"
        @click="isInputClicked = true; $emit('SearchInputClicked', isInputClicked),searchProduct()"
        @blur="isInputClicked = false; $emit('SearchInputClicked', isInputClicked) "
        @keyup.enter="goToShop"
      />
      <div class="autoComplateClass">
        <AutoComplate
        style="width: 220px;text-align:end"
          v-model="selectedCategory"
          :placeholder="$t('home.selectCategory')"
          :options="categories || []"
          :item-text="`name_${$i18n.locale}`"
          @setValue="
            $event
              ? (selectedCategory = $event.slug)
              : (selectedCategory = null)
          "
        />
<!--        <b-form-select-->
<!--              v-model="selectedCategory"-->
<!--              :options="categories || []"-->
<!--          :text-field="`name_${$i18n.locale}`"-->
<!--          :value-field="`value_${$i18n.locale}`"-->
<!--          :placeholder="$t('home.selectCategory')"-->
<!--          ></b-form-select>-->

      </div>
      <button class="btn icon-magnifier" title="search" @click="goToShop" />
      <div class="live-search-list">
        <div v-if="searchKey.length > 0" class="search-suggests">
          <b-list-group>
            <b-list-group-item
              v-for="(product, index) in availableItems"
              :key="index"
              class="pruductSearch align-items-center justify-content-between">
              <nuxt-link class="p-0 notHover" @click.native="RemoveSearchKey" :to="getLink('/products/'+product.slug)">
                <div class="row">
                  <div class="col-xl-2 col-lg-2 m-auto">
                    <nuxt-img
                      format="webp"
                      :src="product['gallery'][0]['s']['url']"
                      :alt="product['short_title']"
                      class="mr-auto ml-auto search-image"
                    />
                  </div>
                  <div class="" :class="{'col-xl-8 col-lg-8': product.hide_price === 0, 'col-xl-7 col-lg-7': product.hide_price !== 0}">
                    <p v-html="highlightSearchKey(product['title'] + ' ' + product['summary_name'], searchKey)" class="w-100"></p>
                    <div class="sku-color">
                      <p v-html="highlightSearchKey(product.sku, searchKey)"></p>
                    </div>
                  </div>

                  <div :class="{'col-xl-2 col-lg-2': product.hide_price === 0, 'col-xl-3 col-lg-3': product.hide_price !== 0}">
                    <pv-price-box
                      class="text-right"
                      v-if="product.hide_price == 0"
                      :product="product"
                    />
                    <div v-else class="float-right d-flex">
                      <i
                        class="fab fa-sm fa-whatsapp m-auto"
                        style="font-size: 20px; color: rgb(43, 169, 104); cursor: pointer;"
                        @click="goToWhatsApp(product)"
                      />
                      <small
                        class="px-2"
                        @click="goToWhatsApp(product)"
                        style="position: relative; color: rgb(43, 169, 104); cursor: pointer;font-size: 15px"
                      >
                        {{ $t("products.ContactUsToSendYouThePrice") }}
                      </small>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </b-list-group-item>
            <b-list-group-item
              v-if="getProductsBySearchArrayLength > 5"
              class="text-center border"
            >
              <nuxt-link v-if="selectedCategory !=null" class="notHover" :to="getLink('/shop?&categories='+selectedCategory+'&search='+searchKey)">
                <base-button-icon-1 class="w-50 py-3" :outline="true">
                  see ({{ getProductsBySearchArrayLength - 5 }}) product more..
                </base-button-icon-1>
              </nuxt-link>
              <nuxt-link v-else class="notHover" :to="getLink('/shop?search='+searchKey)">
                <base-button-icon-1 class="w-100 py-3" :outline="true">
                  see ({{ getProductsBySearchArrayLength - 5 }}) product more..
                </base-button-icon-1>
              </nuxt-link>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AutoComplate from "~/components/common/AutoComplate.vue";
import BaseButtonIcon1 from "../BaseButtonIcon1.vue";
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import {mapGetters} from "vuex";
import axios from 'axios';

export default {
  components: {
    AutoComplate,
    BaseButtonIcon1,
    PvPriceBox,
  },
  data: function () {
    return {
      isInputClicked:false,
      selectedCategory: null,
      searchKey: "",
      timer: null,
      categories: [],
      productsBySearch: [],
      availableItems: [],
      getProductsBySearchArrayLength: 5,
    };
  },

  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  mounted() {
    this.getCategoriesWithTranslate();
  },
  methods: {
    RemoveSearchKey(){
      this.searchKey = "";
      this.productsBySearch = [];
      this.availableItems = [];
    },
    getLink(route) {
      if (this.getLang === 'en') {
        this.getLang = "";
        return route;
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    highlightSearchKey(shortTitle, searchKey) {
      const lowerShortTitle = shortTitle.toLowerCase();
      const lowerSearchKey = searchKey.toLowerCase();

      const startIndex = lowerShortTitle.indexOf(lowerSearchKey);
      const endIndex = startIndex + searchKey.length;

      if (startIndex === -1) {
        return shortTitle;
      }

      const highlightedPart = `<mark style="background-color: #fdb585">${shortTitle.slice(
        startIndex,
        endIndex
      )}</mark>`;
      const remainingPart = shortTitle.slice(endIndex);

      return `${shortTitle.slice(0, startIndex)}${highlightedPart}${remainingPart}`;
    },

    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971504429045&text=Could I please have the price of the ${product.title}`,
        "_blank"
      );
    },
    searchProduct() {
      if (this.searchKey.length >= 3) {
        let str = this.searchKey;
        str = str.replace(/ +(?= )/g,'');
        let search_key = str.replace(/#/g, "# "); // Add a space after #
        search_key = search_key.replace(/# /g, ""); // Remove # and the following space

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          // this.$Progress.start();
          let query = `?search=${search_key}`;
          if (this.selectedCategory != null && this.selectedCategory !== "shop") {
            query = `?search=${search_key}&categories=${this.selectedCategory}`;
          }
          this.$nuxt.$loading.start()
          axios.get(`shop${query}`,{
            baseURL: process.env.API_BASE_URL,
            headers:{
              'Accept-Language': this.$i18n.locale,
              'Content-Type': 'application/json',
              'currency': this.$cookies.get('currency') || 'USD',
              'Accept': 'application/json',
              'secret-key': process.env.SECRET_KEY,
              'api-key': process.env.API_KEY,
            },
          })
            .then((response) => {
              this.$nuxt.$loading.finish()
              this.productsBySearch = response.data.products;
              this.getProductsBySearchArrayLength = response.data.total;
              this.availableItems = this.productsBySearch.slice(0, 5);
              // this.$Progress.finish();
            })
            .catch((error) => {
              // this.$Progress.fail();
              return {error: JSON.stringify(error)};
            });
        }, 500);
      }
      if(this.searchKey.length <3){
        this.productsBySearch = [];
      }
    },
    getCategoriesWithTranslate() {
      this.categories = this.$settings.categories.map((category) => {
        let categoryNameLang = category.name;
        for (const categoryNameLangKey in categoryNameLang) {
          category[`name_${categoryNameLangKey}`] =
            categoryNameLang[categoryNameLangKey];
        }
        return category;
      });
    },

    removeInputText() {
      this.searchKey = "";
    },
    goToShop() {
      let query = null;
      if (this.searchKey == "" && this.selectedCategory == null) {
        return;
      } else if (this.searchKey == "" && this.selectedCategory != null) {
        query = {
          categories: this.selectedCategory,
          page: 1,
        };
      } else if (this.searchKey != "" && this.selectedCategory == null) {
        query = {
          page: 1,
          search: this.searchKey,
        };
      } else if (this.searchKey != "" && this.selectedCategory != null) {
        query = {
          page: 1,
          categories: this.selectedCategory,
          search: this.searchKey,
        };
      } else if (this.searchKey != "" && this.selectedCategory == 'shop') {
        query = {
          page: 1,
          search: this.searchKey,
        };
      }
      this.$router.push({ path: "/shop", query });
      this.removeInputText();
      this.productsBySearch = [];
    },
  },
};
</script>


<style>
#search_term {
  background: #fff !important;
}
.autoComplateClass .multiselect__tags {
  border: 0px;
  margin-top: 3%;
  width: 100%
}

.autoComplateClass .multiselect__element,
.autoComplateClass .multiselect__input,
.autoComplateClass .multiselect__single {
  font-size: 12px;
  text-align: end;
  margin-top: 3px;
  color: #b5adb5;
}
[dir=rtl] span.multiselect__placeholder {
  float: left;
}
span.multiselect__placeholder{
}
.list-group-item.pruductSearch {
  text-align: start;
  border-bottom: 3px solid #dee2eb;
}
.notHover:hover {
  background: none !important;
}
.search-image{
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  width: 75px;
}
.search-image:hover{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
