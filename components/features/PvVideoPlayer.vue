<!--<template>-->
<!--    <video-->
<!--    class="video-js"-->
<!--    ref="videoPlayer"-->
<!--    />-->
<!--</template>-->

<!--<script>-->
<!--import videojs from 'video.js';-->
<!--import 'video.js/dist/video-js.css';-->

<!--export default {-->
<!--  name: 'VideoPlayer',-->
<!--  props: {-->
<!--    src: String,-->
<!--    type: String,-->
<!--    options: {-->
<!--      type: Object,-->
<!--      default() {-->
<!--        return {};-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      player: null-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.options.sources = [{-->
<!--      src: this.src,-->
<!--      type: this.type-->
<!--    }];-->

<!--    this.player = videojs(this.$refs.videoPlayer, this.options, () => {-->
<!--       this.player.log('onPlayerReady', this);-->
<!--    });-->
<!--  },-->
<!--  beforeUnmount() {-->
<!--    if(this.player) this.player.dispose();-->
<!--  }-->
<!--};-->
<!--</script>-->
