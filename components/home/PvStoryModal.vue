<template>
  <div
    id="video-modal"
    class="video-modal"
    :class="story.type === 'image' ? 'video-modal-image' : 'video-modal-video'"
  >
    <div>
      <button class="close" type="button" @click="$emit('close')">
          <span>
            <i class="icon-close" />
          </span>
      </button>

      <div class="lightBoxVideoWrapper" v-if="story.link">
        <video-player :src="story.link" />
      </div>

      <div v-if="story.type === 'image'" class="lightboxImageWrapper" >
        <img class="w-100"  :src="story.value" />
      </div>
      <div v-if="story.type === 'video'" class="lightBoxVideoWrapper">
        <video-player
          :src="story.value"
        />
      </div>
    </div>
  </div>
</template>

<style>

</style>
<script>
// import VideoPlayer from 'nuxt-video-player'

export default {
  components: {
    VideoPlayer
  },
  props: {
    story: Object,
  },
  data: function () {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
      },
    };
  },
};
</script>
