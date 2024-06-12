<template>
  <div class="container">
    <h1 class="account-sub-title d-md-block mt-0 ml-1 font-weight-bold">
      <i
        class="orange-1 fa fa-random wishlist-empty align-middle mx-2 pr-1"
      />{{ $t("account.compares") }}
    </h1>
    <div style="overflow-x: scroll"
         :class="{ 'text-right': getIsAr }"
         class="mb-5">
<!--      <label v-if="getList.length > 0"-->
<!--      >-->
<!--        {{ $t("compare.highlight") }}-->
<!--        <input type="checkbox" v-model="highlightCommon" />-->
<!--      </label>-->
      <table
        v-if="getList.length > 0"
        class="table table-striped table-bordered text-center table-responsive-md  justify-content-lg-center justify-content-start"
      >
        <tbody>
        <tr>
          <th class="p-5 font-weight-bold w-25">
            {{ $t("compare.image") }}
          </th>
          <td
            v-for="(product, index) in getList"
            :key="index"
          >
            <i
              color="danger"
              style="
                  position: relative;
                  float: right;
                  bottom: 0px;
                  color: #d60000;
                  cursor: pointer;
                "
              class="fas fa-times-circle"
              @click="removeFromListAndAttributes({ product, index })"
            />
            <nuxt-link
              :to="getLink('/products/'+product.slug)"
            >
            <img
              loading="lazy"
              width="120"
              height="120"
              :src="product.gallery[0]['s']['url']"
              class="ml-auto mr-auto"
              style="position: relative"
              alt=""
            />
            </nuxt-link>
          </td>
        </tr>
        <tr>
          <td class="p-5 font-weight-bold">
            {{ $t("compare.name") }}
          </td>
          <th
            v-for="(product, index) in getList"
            :key="index"
            class=""
          >
            <nuxt-link
              :class="{ 'highlighted': hasDuplicateShortTitle(product.short_title) }"
              class="d-block w-75 ml-auto mr-auto"
              :to="getLink('/products/'+product.slug)"
            >
              {{ product.short_title }}
            </nuxt-link>
          </th>
        </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.price") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <pv-price-box
                class="m-0"
                v-if="product.hide_price == 0"
                :product="product"
                :highlightCommon="highlightCommon"
              />

              <div v-else class="d-flex align-items-center " >
                <i
                  class="fab fa-whatsapp mx-1"
                  style="font-size: 20px; color: #556b2f; cursor: pointer"
                  @click="goToWhatsApp"
                ></i>

                <p
                  class="py-0 m-0 px-2"
                  @click="goToWhatsApp(product)"
                  style="
                    width:;
                    position: relative;
                    color: #556b2f;
                    cursor: pointer;
                  "
                >
                  {{ $t("products.ContactUsToSendYouThePrice") }}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td class="p-5 font-weight-bold">Sku</td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <span v-if="product.sku" class="sku-color">
                {{ product.sku }}</span
              >
            </td>
          </tr>
        <tr>
          <td class="p-5 font-weight-bold">
            {{ $t("compare.summary_name") }}
          </td>
          <td
            v-for="(product, index) in getList"
            :key="index"
          >
            <div v-if="product.summary_name.length > 0">

            <span v-html="product.summary_name"
                  :class="{ 'highlighted': hasDuplicateSummaryName(product.summary_name) }"
            ></span>
            </div>
            <div v-else
                 v-html="'_'"
            />
          </td>
        </tr>

          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.brands") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
              style=""
              class=""

            >
              <span v-if="product.brands && product.brands.length > 0">
                <ul
                  :class="{ 'text-right': getIsAr }"
                  class="compare-list"
                  v-for="(products, index) in product.brands"
                  :key="index">
                  <li style="margin-bottom: 7px;">
                    <b>{{ $t("products.BRAND") }}:</b> {{ products.brand }}
                  </li>
                  <li style="margin-bottom: 7px;">
                    <b>{{ $t("products.MODEL") }}:</b> {{ products.model }}
                  </li>
                  <li style="margin-bottom: 7px;">
                    <b>{{ $t("products.YEARS") }}:</b> {{ $t("products.FROM") }} {{ getYearRange(products.years) }}
                  </li>
                  <hr v-if="index < product.brands.length - 1" style="margin-top: 5px; margin-bottom: 5px;" /> <!-- Adjust the margin as needed -->
                </ul>
              </span>
              <span v-else>
                _
              </span>
            </td>
          </tr>
            <tr>
              <td class="p-5 font-weight-bold">
                {{ $t("compare.freeShipping") }}
              </td>
              <td
                v-for="(product, index) in getList"
                :key="index"
              >
                <span
                  :class="{ 'highlighted': hasDuplicateFreeShipping(product.is_free_shipping) }"
                  v-text="
                  product.is_free_shipping ? $t('common.yes') : $t('common.no')
                "
                />
              </td>
            </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.is_bundled") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <div v-if="product.bundled && product.bundled.length > 0" class="text-left pl-5 pt-4">
                <div v-for="(products, index) in product.bundled" :key="index">
                 <nuxt-link
                   :to="getLink('/products/'+product.slug)"
                 >
                   <ul style="list-style-type: circle">
                     <li>
                       {{products.short_title}}
                     </li>
                   </ul>
                 </nuxt-link>
                </div>
              </div>
              <div v-else>
                <span>_</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.manufacturer") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <div v-if="product.specifications.manufacturer !== null">
                <span
                  :class="{ 'highlighted': hasDuplicateManufacture(product.specifications.manufacturer) }"
                >
                  {{product.specifications.manufacturer}}
                </span>
              </div>
              <div v-else>
                _
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.accessories") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <div v-if="product.accessories && product.accessories.length > 0" class="text-left pl-5 pt-4">
                <div v-for="(products, index2) in product.accessories" :key="index2">
                  <nuxt-link
                    :to="getLink('/products/'+product.short_title)"
                  >
                    <ul style="list-style-type: circle">
                      <li>
                        {{products.short_title}}
                      </li>
                    </ul>
                  </nuxt-link>
                </div>
              </div>
              <div v-else>
                <span
                  >
                  _
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.totalReviews") }}
            </td>
            <td v-for="(product, index) in getList"
              :key="index">
              <pv-rating
                :product="product"
              />
              <!--              <div v-text="products.total_reviews" />-->
            </td>
          </tr>
          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.categories") }}
            </td>
            <td v-for="(product, index) in getList" :key="index">
              <div>
                <span
                  v-for="category in product.categories"
                  :key="category.slug"
                  :class="{
                    'badge badge-info m-1': true,
                    'highlighted': isCommonCategory(category.name),
                    'highlighted-category': isCommonCategory(category.name)
                  }"
                >
                  <nuxt-link
                    :class="{ 'text-white': !isCommonCategory(category.name), 'text-black': isCommonCategory(category.name) }"
                    :to="getLink('/'+category.slug)"
                  >
                    {{ category.name }}
                  </nuxt-link>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td class="p-5 font-weight-bold">
              {{ $t("compare.weight_kg") }}
            </td>
            <td
              v-for="(product, index) in getList"
              :key="index"
            >
              <span
                :class="{ 'highlighted': hasDuplicateWeight(product.specifications.weight) }"
              >
              {{product.specifications.weight}} KG
              </span>
            </td>
          </tr>
        <tr v-for="(attributes, index) in mergedAttributes" :key="index">
          <td class="font-weight-bold p-5">{{ index }}</td>
          <td v-for="(attr, attrIndex) in attributes" :key="attrIndex">
            <template v-if="commonValues[index] !== undefined && commonValues[index] !=='_'">
            <span
              :class="{ highlighted: highlightCommon && attr[0] === commonValues[index] && mergedAttributes[index].filter(a => a[0] === attr[0]).length >= 2 }"
            >{{ attr[0] }}
            </span>
            </template>
            <template v-else>
              {{ attr[0] }}
            </template>
          </td>
        </tr>
         <tr>
            <td />
            <td v-for="(product, index) in getList" :key="index">
              <base-button-icon-1
                v-if="product.hide_price == 0 && !product.has_token"
                style="width: max-content"
                class="p-3"
                :outline="true"
                @click="addToCart(product)"
              >
                {{ $t("compare.addToCard") }}
              </base-button-icon-1>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center">
        <p class="cart-empty-text font-weight-bold" style="font-size: 14px">
          {{ $t("compare.noProductsInCompares") }}
        </p>
        <nuxt-link to="/shop">
          <base-button-icon-1 class="py-4" style="width: 150px" :outline="true">
            {{ $t("account.go_shop") }}
          </base-button-icon-1>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import { mapActions, mapGetters } from "vuex";
import BaseButtonIcon1 from "./BaseButtonIcon1.vue";
import PvRating from "~/components/product/partials/PvRating.vue";
export default {
  name: "PvCompareTable",

  components: {
    PvRating,
    BaseButtonIcon1,
    PvPriceBox,
  },
  data() {
    return {
      compares: [],
      mergedAttributes: [],
      highlightCommon: false
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("compare", ["getList"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("currency",["updateProductsCurrency"]),
    commonValues() {
      const common = {};

      for (const index in this.mergedAttributes) {
        const values = this.mergedAttributes[index].map(attr => attr[0]);

        // Count occurrences of each value
        const valueCounts = {};
        values.forEach(value => {
          if (!valueCounts[value]) {
            valueCounts[value] = 0;
          }
          valueCounts[value]++;
        });

        // Find the common value (appears at least twice)
        const commonValue = Object.keys(valueCounts).find(value => valueCounts[value] >= 2);
        if (commonValue) {
          common[index] = commonValue;
        }
      }
      return common;
    },
    commonCategoryNames() {
      const categoryCount = {};
      const commonNames = [];

      this.getList.forEach(product => {
        product.categories.forEach(category => {
          const categoryName = category.name;
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        });
      });

      for (const categoryName in categoryCount) {
        if (categoryCount[categoryName] > 1) {
          commonNames.push(categoryName);
        }
      }

      return commonNames;
    }
  },

  mounted: async function () {
    // this.$Progress.start();
    await this.fetchList();
    const mergedAttributes = {};
    const listLength = this.getList.length;
    this.getList.forEach((object) => {
      const attributes = object.attributes;
      for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
          if (!mergedAttributes[attribute]) {
            mergedAttributes[attribute] = Array(listLength).fill("_");
          }
          mergedAttributes[attribute].splice(this.getList.indexOf(object), 1, attributes[attribute]);
        }
      }
    });
    // this.$Progress.finish();
    this.mergedAttributes = mergedAttributes;
  },

  methods: {
    ...mapActions("compare", ["fetchList", "addToList", "removeFromList"]),
    ...mapActions("shop", ["addToCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    getYearRange(years) {
      const sortedYears = years.slice().sort((a, b) => a - b);
      return `${sortedYears[0]} to ${sortedYears[sortedYears.length - 1]}`;
    },
    hasDuplicate(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.is_free_shipping === status).length;

        return count >= 2 ;
      }
    },
    hasDuplicateShortTitle(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.short_title === status).length;

        return count >= 2 ;
      }
    },
    hasDuplicateSummaryName(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.summary_name === status).length;

        return count >= 2 ;
      }
    },
    hasDuplicateFreeShipping(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.is_free_shipping === status).length;

        return count >= 2 ;
      }
    },
    hasDuplicateWeight(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.specifications.weight === status).length;

        return count >= 2 ;
      }
    },
    hasDuplicateBrand(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.brands === status).length;
        return count >= 2 ;
      }
    },
    hasDuplicateManufacture(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.specifications.manufacturer === status).length;
        return count >= 2 ;
      }
    },
    isCommonCategory(categoryName) {
      if(this.highlightCommon)
        return this.commonCategoryNames.includes(categoryName);
    },

    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${product.title}`,
        "_blank"
      );
    },
    async removeFromListAndAttributes({ product, index }) {
      await this.removeFromList({ product, index }); // Remove from the list
      this.removeMergedAttribute(index);
    },
    removeMergedAttribute(removedIndex) {
      const attributeNameList = Object.keys(this.mergedAttributes);
      attributeNameList.forEach((attributeName) => {
        this.mergedAttributes[attributeName].splice(removedIndex, 1); // Remove the <td> associated with the removed products
      });
    },
  },
};
</script>
<style scoped>

</style>
