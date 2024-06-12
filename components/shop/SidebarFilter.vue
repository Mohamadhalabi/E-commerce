<template>
  <div class="sidebar-wrapper">
    <div class="p-0 pb-2 border-bottom">
      <div @click="goToPreviousPage()" class="mb-1">
        <i class="fa fa-chevron-left"></i>
        <span class="previous-page">Back To Previous Page</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <span
          style="color: #f07905; text-decoration: underline; cursor: pointer"
        >({{ this.total }}) {{$t('shop.results')}}</span
        >
        <nuxt-link :to="getLink('/shop')">

          <base-button-icon-1 v-if="$route.fullPath !='/shop'"
                              :outline="true">
            {{$t('shop.clear_all')}}
          </base-button-icon-1>

        </nuxt-link>
<!--        <span class="close-btn" @click="$bvModal.hide('bv-modal-example2')">X</span>-->

      </div>

      <div>
        <ul class="my-2 d-flex align-items-center flex-wrap">
          <li
            v-for="item in checked_items"
            :key="item.slug"
            class="border p-1 shadow-sm rounded-2 filtergroup"
          >
            {{ item.name }}
            <i
              @click="filterQuery({ slug: item.slug, type: item.group })"
              class="mx-1 fa fa-times-circle pt-2 filter-close"
              style="margin-top: -5px"
            ></i>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-for="(item, index) in filter"
      :key="item.group"
      @filter-query="filterQuery"
    >
      <div
        class="widget widget-product-categories"
        v-if="typeof item !== 'number' && index != 'checked_items'"
      >
        <filter-item
          :item="item"
          :name="index"
          :slugtype="slugtype"
          :attributeFilters="attributeFilters"
          :selectedCategory="selected_category"
          :selectedManufacture="selected_manufacture"
          @filter-query="filterQuery"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "~/api";
import FilterItem from "~/components/shop/FilterItem.vue";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import {mapGetters} from "vuex";
import {scrollTopHandler} from "~/utils";
import axios from "axios";

export default {
  name: "SidebarFilter",

  components: {
    FilterItem,
    BaseButtonIcon1,
  },

  props: {
    category: {
      type: String,
      required: false,
      default: null,
    },
    manufacturer: {
      type: String,
      required: false,
      default: null,
    },
    brand: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      slugtype: "",
      total: 0,
      checked_items: null,
      filter: null,
      attributeFilters: null,
      selected_category: null,
      selected_manufacture:null,
    };
  },

  watch: {
    '$route': {
      immediate: true, // Trigger the watcher immediately when the component is created
      handler() {
        this.explodeFilter(this.$route.query);
      },
    },
  },
  created() {
    this.explodeFilter(this.$route.query);
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    goToPreviousPage(){
      this.$router.go(-1)
      },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    explodeFilter(query) {
      let slug_type = "";
      if (this.category) {
        slug_type = "category";
      } else if (this.brand) {
        slug_type = "brand";
      } else if (this.manufacturer) {
        slug_type = "manufacturer";
      }
      this.slugtype = slug_type
      let dataForm = {
        categories: this.category,
        colors: "",
        brands: this.brand,
        types: "",
        manufacturers: this.manufacturer,
        models: "",
        years: "",
        lowest_price: "",
        highest_price: "",
        search: "",
        attributes: query,
        slug_type: slug_type,
        language: this.getLang,
        main_manufacturer: this.manufacturer
      };
      for (const property in query) {
        dataForm[property] = query[property]
          ? query[property].split(",").toString()
          : true;
      }

      const locale = this.$i18n.locale;
      const currency = this.$cookies.get('currency') || 'USD';

      const axiosConfig = {
        baseURL: process.env.API_BASE_URL,
        headers:{
          'Accept-Language': this.$i18n.locale,
          'Content-Type': 'application/json',
          'currency': currency,
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        }
      };

      axios.post("/search/filter", dataForm, axiosConfig)
        .then((response) => {
          this.filter = response.data;
          this.total = this.filter.total;
          this.checked_items = this.filter.checked_items.items;
          this.attributeFilters = this.filter.attributes;
          this.selected_category = response.data.categories.selected;
          this.selected_manufacture = response.data.manufacturers.selected;
        });

    },

    filterQuery(data) {
      scrollTopHandler()
      let tempQuery = Object.assign({}, this.$route.query);
      let selector = "";
      const queryParameters = ['manufacturer', 'brands', 'category','manufacturer-type'];

      const hasQuery = queryParameters.some(param => this.$route.query.hasOwnProperty(param));

      let FullPath = this.$route.fullPath;
      let pathParts = FullPath.split('/');
      let pathpart = pathParts[1];
      let questionMarkIndex = pathpart.indexOf("?");
      let urlWithoutBeforeQuestionMark = pathpart.substring(questionMarkIndex + 1);
      let finalUrl = "/shop?" + urlWithoutBeforeQuestionMark.replace("?", "/");
      const path = this.$route.path;

      // Split the path by '/' to get an array of parts
      const parts = path.split('/');

      // Get the first part (excluding the empty string at the beginning)
      const firstPart = parts[1] || '';


      if (data.type === "others_filter") {
        if (tempQuery.hasOwnProperty(data.slug)) {
          delete tempQuery[data.slug];
        }
        else {
          tempQuery[data.slug] = null;
        }
      }

      else if (data.type === "manufacturers")
      {
        if(data.slug === tempQuery.manufacturers)
        {
          delete tempQuery.manufacturers
        }
      }

      else {
        selector = tempQuery[data.type] ? tempQuery[data.type].split(",") : [];
        let index = selector.indexOf(data.slug);
        if (index > -1) {
          selector.splice(index, 1);
          if (!selector.length) {
            delete tempQuery[data.type];
          } else {
            tempQuery[data.type] = selector.toString();
          }
        } else {
          selector.push(data.slug);
          tempQuery[data.type] = selector.toString();
        }
      }
      tempQuery["page"] = 1;


      if(data.slug === firstPart){
        if (hasQuery) {
          this.$router.push({
            path: finalUrl
          })
        } else {
          this.$router.push({
            path: '/shop'
          })
        }
      }
      else {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...tempQuery,
          },
        });
      }
    }
  },
};
</script>
<style>
span.previous-page{
  cursor: pointer;
  font-size: 12px;
  color: #f07905;
}
.fa-chevron-left{
  font-size: 12px;
}
span.previous-page:hover{
  text-decoration: underline;
}
.filtergroup{
  background: #eee;
  border-radius: 5px;
  padding: 5px!important;
  font-size: 14px;
  margin-bottom: 8px;
  margin-right: 5px;
  color: #333333;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)!important;
}
.filter-close{
  cursor: pointer;
  color: red;
  position: relative;
  top: 2px;
}
</style>
