 <template lang="html">
   <notifications
  position="top right"
   group="custom-notify"
  style="z-index: 999999"
      :duration="3000"
      :max="1"
      animation-name="fade-left"
  >

 <template
        slot="body"
        slot-scope="props"
      >
  <div class="minipopup-box p-0">
    <div class="position-relative">
      <div
        class="position-relative"
        style="border:2px solid #556b2f; border-radius: 7px;"
      >
        <button class="mfp-close" @click="props.close" />
        <div class="product pt-5 position-relative">
          <i class="position-absolute fa fa-check-circle " />

          <div :class="{'text-right':getIsAr}"  class="product-detail">
            <p style="font-size: medium;" class="p-2">{{ props.item.text }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-5 p-1 position-absolute alterTimer"></div>
    </div>
  </div>
</template>
  </notifications>


</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notify",

  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>

