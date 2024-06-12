<!-- <template>
  <div
    v-if="products.videos.length > 0"
    class="products-reviews-content "
  >
    <div
      v-for="(video , index) in products.videos"
      :key="index"
    >
      <pv-video-player
        :src="video.link"
        :type="'video/youtube'"
        :options="videoOptions"
      />


    </div>
  </div>
</template>

<script>
import PvVideoPlayer from '~/components/features/PvVideoPlayer';

export default {
  components: {
    PvVideoPlayer
  },
  props: {
    products: Object
  },
  data() {

    return {
      videoOptions: {
        autoplay: false,
        controls: true,

      }
    };
  }
};
</script>

 -->
