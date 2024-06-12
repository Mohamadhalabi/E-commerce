<!--<template>-->
<!--  <div class="filterSection">-->
<!--    <div-->
<!--      class="accordion"-->
<!--      role="tablist"-->
<!--    >-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('categories') && filter['categories']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Category == false ? 'opendList': '' "-->
<!--            @click="collapse.Category = !collapse.Category"-->
<!--          >-->
<!--            {{ $t('products.category') }}-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Category"-->
<!--        >-->
<!--          <div-->
<!--            class="widget widget-product-categories "-->
<!--          >-->
<!--            <vue-slide-toggle :open="catOpened">-->
<!--              <vue-tree-list-->
<!--                :id="categoryTree.id"-->
<!--                :model="categoryTree"-->
<!--                :default-expanded="false"-->
<!--                :add-tree-node-disabled="true"-->
<!--              >-->
<!--                <template #leafNameDisplay="slotProps">-->
<!--                  <nuxt-link :to="{path: '/shop', query: {category: slotProps.model.slug, page: 1}}">-->
<!--                    {{ slotProps.model.name }}-->
<!--                  </nuxt-link>-->
<!--                </template>-->
<!--                <template #treeNodeIcon="slotProps">-->
<!--                  <span/>-->
<!--                </template>-->
<!--              </vue-tree-list>-->
<!--            </vue-slide-toggle>-->
<!--          </div>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('manufacturers') && filter['manufacturers']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Manufacturers == false ? 'opendList': ''"-->
<!--            @click="collapse.Manufacturers = !collapse.Manufacturers"-->
<!--          >-->
<!--            Manufacturers-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Manufacturers"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.manufacturers"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in filter['manufacturers']['items']"-->
<!--                    :key="`manufacturers_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item.slug"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('colors') && filter['colors']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Colors == false ? 'opendList': ''"-->
<!--            @click="collapse.Colors = !collapse.Colors"-->
<!--          >-->
<!--            Colors-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Colors"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.colors"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in filter['colors']['items']"-->
<!--                    :key="`colors_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item.slug"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('types')"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Types == false ? 'opendList': ''"-->
<!--            @click="collapse.Types = !collapse.Types"-->
<!--          >-->
<!--            Types-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Types"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.types"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in Object.keys(filter['types']['items'])"-->
<!--                    :key="`types_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item"-->
<!--                  >-->
<!--                    {{ filter['types']['items'][item] }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('brands') && filter['brands']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Brands == false ? 'opendList': ''"-->
<!--            @click="collapse.Brands = !collapse.Brands"-->
<!--          >-->
<!--            Brands-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Brands"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.brands"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in filter['brands']['items']"-->
<!--                    :key="`brands_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item.slug"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('models') && filter['models']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Models == false ? 'opendList': ''"-->
<!--            @click="collapse.Models = !collapse.Models"-->
<!--          >-->
<!--            {{ $t('products.Models') }}-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Models"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.models"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in filter['models']['items']"-->
<!--                    :key="`models_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item.slug"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('years') && filter['years']['items'].length > 0"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Years == false ? 'opendList': ''"-->
<!--            @click="collapse.Years = !collapse.Years"-->
<!--          >-->
<!--            {{ $t('products.YEARS') }}-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Years"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.years"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in filter['years']['items']"-->
<!--                    :key="`years_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item.slug"-->
<!--                  >-->
<!--                    {{ item.name }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('price')"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.Price == false ? 'opendList': ''"-->
<!--            @click="collapse.Price = !collapse.Price"-->
<!--          >-->
<!--            {{ $t('products.PRICE') }}-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.Price"-->
<!--        >-->
<!--          <b-card-body-->
<!--            class="pb-0"-->
<!--            style="text-align-last: center;"-->
<!--          >-->
<!--            <b-form-input-->
<!--              v-model="filterSelected.lowest_price"-->
<!--              style="width:45% "-->
<!--              max="100"-->
<!--              class="d-inline-block mr-4"-->
<!--              min="10"-->
<!--              type="number"-->
<!--              placeholder="Min Price"-->
<!--            />-->
<!--            <b-form-input-->
<!--              v-model="filterSelected.highest_price"-->
<!--              style="width:45% "-->
<!--              max="100"-->
<!--              min="10"-->
<!--              class="d-inline-block"-->
<!--              type="number"-->
<!--              placeholder="Max Price"-->
<!--            />-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--      <b-card-->
<!--        v-if="filterKeys.includes('checkboxes')"-->
<!--        no-body-->
<!--        class="mb-0"-->
<!--      >-->
<!--        <b-card-header-->
<!--          header-tag="header"-->
<!--          class="p-1"-->
<!--          role="tab"-->
<!--        >-->
<!--          <b-button-->
<!--            block-->
<!--            variant="orange"-->
<!--            style="text-align:start ; background-color : #fff !important ; border:1px solid #f07905 !important"-->
<!--            class="py-3 px-3"-->
<!--            :class="collapse.OthersFilter == false ? 'opendList': ''"-->
<!--            @click="collapse.OthersFilter = !collapse.OthersFilter"-->
<!--          >-->
<!--            {{ $t('common.othersfilters') }}-->
<!--          </b-button>-->
<!--        </b-card-header>-->
<!--        <b-collapse-->
<!--          id="collapse-1"-->
<!--          v-model="collapse.OthersFilter"-->
<!--        >-->
<!--          <b-card-body class="pb-0">-->
<!--            <b-card-text>-->
<!--              <b-form-group-->
<!--                v-slot="{ariaDescribedby}"-->
<!--              >-->
<!--                <b-form-checkbox-group-->
<!--                  id="checkbox-group-2"-->
<!--                  v-model="filterSelected.checkboxes"-->
<!--                  :aria-describedby="ariaDescribedby"-->
<!--                  name="flavour-2"-->
<!--                  @change="routeChaged"-->
<!--                >-->
<!--                  <b-form-checkbox-->
<!--                    v-for="(item , index) in Object.keys(filter['checkboxes']['items'])"-->
<!--                    :key="`checkboxes_${index}`"-->
<!--                    class="my-2 d-block"-->
<!--                    :value="item"-->
<!--                  >-->
<!--                    {{ filter['checkboxes']['items'][item] }}-->
<!--                  </b-form-checkbox>-->
<!--                </b-form-checkbox-group>-->
<!--              </b-form-group>-->
<!--            </b-card-text>-->
<!--          </b-card-body>-->
<!--        </b-collapse>-->
<!--      </b-card>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import {Tree, VueTreeList} from 'vue-tree-list';-->

<!--export default {-->
<!--  components: {-->
<!--    VueTreeList-->
<!--  },-->
<!--  props: {-->
<!--    value: {-->
<!--      type: Object,-->
<!--      required: false-->
<!--    },-->
<!--    categoryKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    },-->
<!--    searchKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    },-->
<!--    brandKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    },-->
<!--    modelKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    },-->
<!--    yearKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    },-->
<!--    attributeKey: {-->
<!--      type: String,-->
<!--      required: false-->
<!--    }-->
<!--  },-->

<!--  data() {-->
<!--    return {-->
<!--      collapse: {-->
<!--        Category: true,-->
<!--        Manufacturers: true,-->
<!--        Colors: true,-->
<!--        Types: false,-->
<!--        Brands: false,-->
<!--        Models: false,-->
<!--        Years: false,-->
<!--        Attributes: false,-->
<!--        Price: false,-->
<!--        OthersFilter: false-->
<!--      },-->
<!--      initialvalue: this.value,-->
<!--      filter: null,-->
<!--      timerCountUrl: true,-->
<!--      filterKeys: [],-->
<!--      filterSelected: {-->
<!--        categories: [],-->
<!--        manufacturers: [],-->
<!--        colors: [],-->
<!--        types: [],-->
<!--        brands: [],-->
<!--        models: [],-->
<!--        years: [],-->
<!--        attributes: [],-->
<!--        lowest_price: '',-->
<!--        highest_price: '',-->
<!--        checkboxes: [],-->
<!--        page: 1,-->
<!--        search: ''-->

<!--      }-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    categoryTree: function () {-->
<!--      let tree = new Tree(this.filter['categories']['items']);-->
<!--      return tree;-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    filterSelected: {-->
<!--      handler: function (val) {-->
<!--        this.filterQuery(val);-->
<!--      },-->
<!--      deep: true-->
<!--    },-->
<!--    'initialvalue.page': function (val) {-->
<!--      this.filterSelected.page = val;-->

<!--    },-->
<!--    $route(val) {-->
<!--      if (val.path == '/shop' && val.path != '/' && this.timerCountUrl) {-->
<!--        this.init();-->
<!--      }-->
<!--    }-->

<!--  },-->
<!--  created() {-->
<!--    this.init();-->
<!--  },-->
<!--  methods: {-->
<!--    init() {-->
<!--      if (this.$route.query.filter) {-->
<!--        this.explodeFilter(this.$route.query.filter);-->

<!--        return;-->
<!--      }-->

<!--      if (this.categoryKey) {-->
<!--        this.filterSelected.categories = [this.categoryKey];-->
<!--      }-->
<!--      if (this.brandKey) {-->
<!--        this.filterSelected.brandKey = [this.brandKey];-->
<!--      }-->
<!--      if (this.modelKey && this.filterSelected.brandKey != '') {-->
<!--        this.filterSelected.models = [this.modelKey];-->
<!--      }else{-->
<!--        this.filterSelected.models='';-->
<!--      }-->
<!--      if (this.yearKey) {-->
<!--        this.filterSelected.years = [this.yearKey];-->
<!--      }-->
<!--      // if(this.attributeKey){-->
<!--      //   this.filterSelected.attributes = [this.attributeKey]-->
<!--      // }-->
<!--      this.$nextTick(() => {-->
<!--        this.getFilter();-->
<!--      });-->

<!--    },-->
<!--    filterQuery(objFilter) {-->
<!--      this.getFilter();-->
<!--      let keysFilter = Object.keys(objFilter);-->
<!--      let query = '?';-->
<!--      for (let index = 0; index < keysFilter.length; index++) {-->
<!--        if (objFilter[keysFilter[index]].length > 0 && keysFilter[index] != 'lowest_price' && keysFilter[index] != 'search' && keysFilter[index] != 'page' && keysFilter[index] != 'highest_price' && keysFilter[index] != 'checkboxes') {-->
<!--          let queryVal = '';-->
<!--          for (let indexVal = 0; indexVal < objFilter[keysFilter[index]].length; indexVal++) {-->
<!--            queryVal += `${objFilter[keysFilter[index]][indexVal]}`;-->
<!--            if (indexVal < objFilter[keysFilter[index]].length - 1) {-->
<!--              queryVal += ',';-->
<!--            }-->
<!--          }-->
<!--          query += `${keysFilter[index]}=${queryVal}&`;-->
<!--        }-->
<!--        if (keysFilter[index] == 'lowest_price' && objFilter[keysFilter[index]]) {-->
<!--          query += `lowest_price=${objFilter[keysFilter[index]]}&`;-->
<!--        }-->
<!--        if (keysFilter[index] == 'search' && objFilter[keysFilter[index]]) {-->
<!--          query += `search=${objFilter[keysFilter[index]]}&`;-->
<!--        }-->
<!--        if (keysFilter[index] == 'page' && objFilter[keysFilter[index]]) {-->
<!--          query += `page=${objFilter[keysFilter[index]]}&`;-->
<!--        }-->
<!--        if (keysFilter[index] == 'highest_price' && objFilter[keysFilter[index]]) {-->
<!--          query += `highest_price=${objFilter[keysFilter[index]]}&`;-->
<!--        }-->
<!--        if (keysFilter[index] == 'checkboxes' && objFilter[keysFilter[index]]) {-->
<!--          for (let indexCheck = 0; indexCheck < objFilter[keysFilter[index]].length; indexCheck++) {-->
<!--            query += `${objFilter[keysFilter[index]][indexCheck]}=${1}&`;-->

<!--          }-->
<!--        }-->
<!--      }-->

<!--      this.initialvalue.sintax = query;-->
<!--      this.$router.push({path: 'shop', query: {filter: query}});-->
<!--    },-->
<!--    getFilter() {-->
<!--      let dataForm = {-->
<!--        product_type: '',-->
<!--        categories: '',-->
<!--        colors: '',-->
<!--        brands: '',-->
<!--        models: '',-->
<!--        years: '',-->
<!--        search: ''-->
<!--      };-->
<!--      if (this.filterSelected.categories.length > 0) {-->
<!--        dataForm.categories = this.filterSelected.categories.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'categories');-->
<!--      }-->
<!--      if (this.filterSelected.colors.length > 0) {-->
<!--        dataForm.colors = this.filterSelected.colors.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'colors');-->
<!--      }-->
<!--      if (this.filterSelected.brands.length > 0) {-->
<!--        dataForm.brands = this.filterSelected.brands.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'brands');-->
<!--      }-->
<!--      if (this.filterSelected.models.length > 0 && this.filterSelected.brands.length > 0) {-->
<!--        dataForm.models = this.filterSelected.models.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'models');-->



<!--      }-->
<!--      if (this.filterSelected.years.length > 0) {-->
<!--        dataForm.years = this.filterSelected.years.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'years');-->
<!--      }-->

<!--      // if (this.filterSelected.attributes.length > 0){-->
<!--      //   dataForm.attributes = this.filterSelected.attributes.toString();-->
<!--      // } else {-->
<!--      //   this.$delete(dataForm, 'attributes');-->
<!--      // }-->

<!--      if (this.filterSelected.types.length > 0) {-->
<!--        dataForm.product_type = this.filterSelected.types.toString();-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'product_type');-->
<!--      }-->
<!--      if (this.filterSelected.checkboxes.includes('has_discount')) {-->
<!--        dataForm.has_discount = true;-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'has_discount');-->
<!--      }-->
<!--      if (this.filterSelected.checkboxes.includes('is_new_arrival')) {-->
<!--        dataForm.is_new_arrival = true;-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'is_new_arrival');-->
<!--      }-->
<!--      if (this.filterSelected.checkboxes.includes('is_free_shipping')) {-->
<!--        dataForm.is_free_shipping = true;-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'is_free_shipping');-->
<!--      }-->
<!--      if (this.filterSelected.checkboxes.includes('is_bundled')) {-->
<!--        dataForm.is_bundled = true;-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'is_bundled');-->
<!--      }-->
<!--      if (this.filterSelected.checkboxes.includes('is_best_seller')) {-->
<!--        dataForm.is_best_seller = true;-->
<!--      } else {-->
<!--        this.$delete(dataForm, 'is_best_seller');-->
<!--      }-->

<!--      // api.post('/products/filters', dataForm).then((response) => {-->
<!--      //   this.filter = response.data;-->
<!--      //   this.filterKeys = Object.keys(this.filter);-->
<!--      // });-->
<!--    },-->
<!--    explodeFilter(query) {-->
<!--      let explodedArray = query.substring(1, query.length).split('&');-->
<!--      let filtered = explodedArray.filter(function (element) {-->
<!--        return element != '';-->
<!--      });-->

<!--      for (let index = 0; index < filtered.length; index++) {-->
<!--        let filterKey = filtered[index].substring(0, filtered[index].indexOf('='));-->

<!--        if (filterKey == 'categories') {-->
<!--          this.filterSelected.categories = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        if (filterKey == 'colors') {-->
<!--          this.filterSelected.colors = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        if (filterKey == 'types') {-->
<!--          this.filterSelected.types = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        if (filterKey == 'brandKey') {-->
<!--          this.filterSelected.brands = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        if (filterKey == 'models') {-->
<!--          this.filterSelected.models = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        if (filterKey == 'years') {-->
<!--          this.filterSelected.years = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        }-->
<!--        // if (filterKey == 'attributes') {-->
<!--        //   this.filterSelected.attributes = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',');-->
<!--        // }-->
<!--        if (filterKey == 'is_best_seller') {-->
<!--          this.filterSelected.checkboxes.push('is_best_seller');-->
<!--        }-->
<!--        if (filterKey == 'page') {-->
<!--          this.filterSelected.page = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length);-->
<!--          this.$emit('selectedPage', this.filterSelected.page);-->
<!--        }-->
<!--        if (filterKey == 'is_new_arrival') {-->
<!--          this.filterSelected.checkboxes.push('is_new_arrival');-->
<!--        }-->
<!--        if (filterKey == 'is_free_shipping') {-->
<!--          this.filterSelected.checkboxes.push('is_free_shipping');-->
<!--        }-->
<!--        if (filterKey == 'is_bundled') {-->
<!--          this.filterSelected.checkboxes.push('is_bundled');-->
<!--        }-->
<!--        if (filterKey == 'has_discount') {-->
<!--          this.filterSelected.checkboxes.push('has_discount');-->
<!--        }-->
<!--        if (filterKey == 'search') {-->
<!--          this.filterSelected.search = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',')[0];-->
<!--        }-->
<!--        if (filterKey == 'lowest_price') {-->
<!--          this.filterSelected.lowest_price = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',')[0];-->
<!--        }-->
<!--        if (filterKey == 'highest_price') {-->
<!--          this.filterSelected.highest_price = filtered[index].substring(filtered[index].indexOf('=') + 1, filtered[index].length).split(',')[0];-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    routeChaged() {-->
<!--      this.timerCountUrl = false;-->
<!--      setTimeout(() => {-->
<!--        this.timerCountUrl = true;-->
<!--      }, 500);-->

<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.filterSection .card-body {-->
<!--  max-height: 250px;-->
<!--  overflow: auto;-->
<!--  min-height: auto;-->
<!--}-->

<!--.filterSection .card-text {-->
<!--  padding-bottom: 0 !important-->
<!--}-->

<!--.opendList {-->
<!--  background: #f07905 !important;-->
<!--  color: #fff !important;-->
<!--}-->

<!--/* Scroll bar stylings */-->
<!--::-webkit-scrollbar {-->
<!--  width: 7px;-->
<!--  height: 7px;-->
<!--}-->

<!--/* Track */-->
<!--::-webkit-scrollbar-track {-->
<!--  background: var(&#45;&#45;lightestgrey);-->
<!--}-->

<!--/* Handle */-->
<!--::-webkit-scrollbar-thumb {-->
<!--  background: #f07905;-->
<!--  border-radius: 10px;-->
<!--}-->

<!--/* Handle on hover */-->
<!--::-webkit-scrollbar-thumb:hover {-->
<!--  background: #f07905;-->
<!--}-->

<!--.vtl-node-main .vtl-operation {-->
<!--  display: none;-->
<!--}-->
<!--</style>-->
