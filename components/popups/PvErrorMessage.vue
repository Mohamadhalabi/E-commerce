<template lang="html">
  <notifications
    group="errorMessage"
    :duration="3000"
    :width="350"
    :max="1"
    animation-name="fade-left"
    position='top right'
    style="top: 52px;z-index: 999999"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <div class="minipopup-box p-0">
        <div class="position-relative px-2" style="border:2px solid #f52020; border-radius: 7px;">

          <button
            class="mfp-close"
            @click="props.close"
          />
          <div class="product pt-5 position-relative">
            <i class="position-absolute fa fa-exclamation-circle"/>
            <span class="font-weight-bold p-2">{{props.item.text}}</span>
          </div>
          <div v-if="props.item.type ==='OutOfStockError'">
            <nuxt-link :to="getLink('/cart')">
              <success-button class="p-2 px-sm-3 px-4 mx-1 mb-1" style="background-color: #a51017">cart
              </success-button>
            </nuxt-link>
          </div>
        </div>

        <div
          v-if="props.item.type !=='OutOfStockError'"
          class="p-1 position-absolute alterTimerRed"></div>
      </div>
    </template>
  </notifications>
</template>

<script>
import { mapGetters } from "vuex";
import SuccessButton from "~/components/common/SuccessButton.vue";

export default {
  name: "ErrorMessage",

  components: {
    SuccessButton
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
