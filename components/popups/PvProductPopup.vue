<template lang="html">
  <notifications
    group="addProduct"
    :duration="3000"
    :width="350"
    :max="1"
    animation-name="fade-left"
    position='top right'
    style="top: 52px;z-index: 999999999!important;"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <div class="minipopup-box p-0">
        <div class="position-relative px-2" style="border:2px solid #556b2f; border-radius: 7px;">

          <button
            class="mfp-close"
            @click="props.close"
          />
          <div class="product pt-5 position-relative">
            <i class="position-absolute fa fa-check-circle"/>
            <figure v-if="props.item.data" class="product-media">
              <nuxt-link :to="getLink(`/products/${props.item.data.slug}`)">
                <pv-gallery-image
                  :image="props.item.data.gallery[0]"
                  :size="'m'"
                />
              </nuxt-link>
            </figure>
            <div v-if="props.item.data" class="product-detail w-75">
              <nuxt-link
                :to="getLink(`/products/${props.item.data.slug}`)"
                class="product-name"
                style="font-size: medium;"
              >
                {{ props.item.data.short_title }}
              </nuxt-link>
              <br>
              <span class="sku-color">SKU:{{ props.item.data.sku }}</span>
              <p style="font-size: medium;" class="mt-lg-1  ">{{ props.item.text }}</p>
              <span style="color: red;font-weight: bold;font-size: 12px" v-if="props.item.data.stock < props.item.data.quantity">
                {{ $t("checkout.outOfStock") }}
              </span>
            </div>
            <span v-else class="font-weight-bold p-2">{{props.item.text}}</span>
          </div>

          <div v-if="props.item.data" class="product-action px-sm-0 px-2 d-flex align-items-center justify-content-between">
            <nuxt-link :to="getLink('/cart')">
              <success-button class="p-2 px-sm-3 px-4 mx-1 mb-1" :outline="true">{{ $t('header.view_cart') }}
              </success-button>
            </nuxt-link>
            <nuxt-link
              v-if="isAuthenticated"
              :to="getLink('/checkout')">
              <success-button class="p-2 px-sm-3 px-4 mx-1 mb-1  " :outline="true">{{ $t('header.checkout') }}
              </success-button>
            </nuxt-link>
          </div>
        </div>
        <div class=" p-1 position-absolute alterTimer"></div>
      </div>
    </template>
  </notifications>
</template>

<script>
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import { mapGetters } from "vuex";
import SuccessButton from "~/components/common/SuccessButton.vue";

export default {
  name: "Notify",

  components: {
    SuccessButton,
    PvGalleryImage,
  },
  data() {
    return {
    }
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("language", ["getLang"])
  },
};
</script>
