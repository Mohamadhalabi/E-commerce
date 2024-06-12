<template>
  <div>
    <div class="mobile-menu-overlay" @click="hideMobileMenu" />

    <div class="mobile-menu-container">
      <div class="mobile-menu-wrapper">
        <!--  <pv-header-search class="border py-4 bg-white mb-3 d-block"/> -->

        <nav class="mobile-nav">
          <ul class="mobile-menu">
            <li v-for="(cat, index) in []" :key="`header-cat-${index}`">
              <nuxt-link
                :to="{ path: '/shop', query: { category: cat.slug } }"
                v-html="cat.name"
              />
            </li>
          </ul>
        </nav>

        <form
          action="#"
          class="nosubmit d-flex justify-content-center mx-auto px-3"
        >
          <span class="mobile-menu-close" @click="hideMobileMenu">
            <i class="fa fa-times" />
          </span>

<!--          <input-->
<!--            v-model="searchKey"-->
<!--            type="text"-->
<!--            class="py-3 mx-auto nosubmit bg-white rounded-5"-->
<!--            placeholder="Search..."-->
<!--            required-->
<!--            @input="searchProduct"-->
<!--            @keyup.enter="goToShop"-->
<!--          />-->
          <!-- <button
            class="btn icon-search text-white bg-transparent p-0"
            type="submit"
          /> -->

          <div class="live-search-list">
            <div v-if="productsBySearch.length > 0" class="search-suggests">
              <b-list-group
                style="
                  z-index: 100;
                  height: max-content;
                  position: absolute;
                  width: 100%;
                  overflow: auto;
                "
              >
                <b-list-group-item
                  v-for="(product, index) in productsBySearch"
                  v-if="index < 3"
                  :key="index"
                  class="pruductSearch d-flex align-items-start border border-bottom p-1"
                  style="text-align: start"
                  @click="$router.push(`/products/${product['slug']}`)"
                >
                  <nuxt-img
                    format="webp"
                    loading="lazy"
                    :src="product['gallery'][0]['s']['url']"
                    :alt="product['short_title']"
                    width="50"
                    height="50"
                    class="d-inline-block"
                    style="
                      border: 1px solid #d2d2d2;
                      border-radius: 50%;
                      object-fit: fill;
                    "
                  />

                  <div class="">
                    <span class="mx-3">{{ product["short_title"] }}</span>
                    <div
                      class="p-1 d-flex align-items-center justify-content-between w-100"
                    >
                      <div class="top-details">
                        <pv-price-box
                          class="m-0"
                          v-if="product.hide_price == 0"
                          :product="product"
                        />

                        <div v-else style="text-align: start; display: flex">
                          <i
                            class="fab fa-sm fa-whatsapp mx-1"
                            style="
                              font-size: 20px;
                              color: #556b2f;
                              cursor: pointer;
                            "
                            @click="goToWhatsApp"
                          />

                          <small
                            class="d-inline-block px-2"
                            @click="goToWhatsApp(product)"
                            style="
                              width: 100px;
                              position: relative;
                              color: #556b2f;
                              cursor: pointer;
                            "
                          >
                            {{ $t("products.ContactUsToSendYouThePrice") }}
                          </small>
                        </div>
                      </div>
                      <span class="sku-color">{{ product.sku }}</span>
                    </div>
                  </div>
                </b-list-group-item>
                <b-list-group-item v-if="productsBySearch.length>=3" class="border px-2">
                <nuxt-link to="/shop"><base-button-icon-1 class=" py-3 w-100" py-3 :outline="true">See ({{ totalProduct - 3 }}) product more</base-button-icon-1></nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </form>
        <no-ssr>
          <PvMainMenuMonile />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import PvMainMenuMonile from "~/components/common/PvMainMenuMonile";
import BaseButtonIcon1 from "../BaseButtonIcon1.vue";
import PvPriceBox from "~/components/product/partials/PvPriceBox.vue";
import Api from "~/api";

export default {
  components: {
    PvMainMenuMonile,
    PvPriceBox,
    BaseButtonIcon1,
  },
  data: function () {
    return {
      catOpened: false,
      var1Opened: false,
      var2Opened: false,
      prodOpened: false,
      prod1Opened: false,
      prod2Opened: false,
      pageOpened: false,
      searchKey: "",
      productsBySearch: [],
      totalProduct:null,
    };
  },
  methods: {
    hideMobileMenu: function () {
      document.querySelector("body").classList.remove("mmenu-active");
    },
    searchProduct() {
      if (!this.searchKey || this.searchKey == " ") {
        this.productsBySearch = [];
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          if (!this.searchKey || this.searchKey == " ") {
            this.productsBySearch = [];
            return;
          }

          let query = `?search=${this.searchKey}`;
          if (this.selectedCategory != null) {
            query = `?search=${this.searchKey}&categories=${this.selectedCategory}`;
          }
          Api.get(`shop${query}`)
            .then((response) => {
              this.productsBySearch = response.data.products;
              this.totalProduct = response.data.total;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        }, 500);
      }
    },
    goToShop() {
      if (!this.searchKey && !this.selectedCategory) return;
      let query = "";
      if (this.searchKey && this.selectedCategory == null) {
        query = `?page=1&search=${this.searchKey}&`;
      } else {
        query = `?categories=${this.selectedCategory}&page=1&search=${this.searchKey}&`;
      }
      this.$router.push({ path: "shop", query: { filter: query } });
    },
    showSearchForm: function (e) {
      e.currentTarget.closest(".header-search").classList.add("show");
    },
  },
};
</script>

<style scoped>
.live-search-list span {
  display: inline-block;
}

/* Search */

form.nosubmit {
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  margin: 0px 6px 8px 0px;
}

form.nosubmit input[type="search"] {
  border: none;
  /* background: transparent; */
  margin: 0;
  padding: 13px 35px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

form.nosubmit input[type="search"]::placeholder {
  color: #bbb;
}

form.nosubmit input[type="search"]:focus {
  box-shadow: 0 0.12rem 0.2rem #ff6800 !important;
  border-color: #ff6800;
  outline: none;
}

form.nosubmit {
  border: none;
  position: sticky;
  top: 25px;
}

input.nosubmit {
  border: 1px solid #555;
  width: 100%;
  padding-left: 30px !important;
  padding-right: 30px !important;

  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat;
  background-position: 90% center;
}

.notViseble {
  display: none !important;
}
form.nosubmit [type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
  background-size: 10px 10px;
}

.mobile-menu-close {
  top: -10px;
  right: 10px;
  font-size: 18px;
  color: black!important;
}
</style>
