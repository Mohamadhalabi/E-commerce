<template>
  <div class="from-demo-37" v-if="stories.length > 0">
    <div class="stories header-bottom">
      <div class="container">
        <Carousel
          :slides-per-page='16'
          :gutter='5'
          :responsive='[
          {
            maxWidth: 319,
            slidesPerPage: 3,
          },
          {
            minWidth: 320,
            maxWidth: 399,
            slidesPerPage: 4,
          },
          {
            minWidth: 400,
            maxWidth: 479,
            slidesPerPage: 5,
          },
          {
            minWidth: 480,
            maxWidth: 575,
            slidesPerPage: 6,
          },
          {
            minWidth: 576,
            maxWidth: 649,
            slidesPerPage: 7,
          },
          {
            minWidth: 650,
            maxWidth: 767,
            slidesPerPage: 8,
          },
          {
            minWidth: 768,
            maxWidth: 849,
            slidesPerPage: 9,
          },
          {
            minWidth: 850,
            maxWidth: 991,
            slidesPerPage: 10,
          },
          {
            minWidth: 992,
            maxWidth: 1199,
            slidesPerPage: 11,
          },
          {
            minWidth: 1200,
            maxWidth: 1434,
            slidesPerPage: 13,
          },
          {
            minWidth: 1435,
            slidesPerPage: 16,
          }
        ]'


          class="products-slider dots-top dots-small mb-0 border-0">
          <div
            v-for="story in stories"
            :key="story.id"
            class="swiper-slide stories"
            :class="{ 'thumb-item': clickedStoryIndices.includes(story.id), 'thumb-item2': !clickedStoryIndices.includes(story.id) }">
            <a
              :href="story.type === 'link' ? story.value : 'javascript:;'"
              :target="story.type === 'link' ? '_blank' : '_self'"
              class="has-preview"
              @click="story.type === 'link' ? storeIdInSession(story.id) : openStory(story),storeIdInSession(story.id)"
            >
              <nuxt-img
                format="webp"
                loading="lazy"
                width="75"
                height="75"
                alt="stories"
                :src="story.image"
                class="thumb-info-image"
                :open_graph="story['open_graph']"
                :scal="story['scal']"
                :description="story['description']"
              />
            </a>
          </div>
        </Carousel>

        <div>
          <b-modal v-model="showModalImage" hide-footer centered hide-header>

          </b-modal>

          <iframe v-if="showModalImage && selectedStory.type === 'video'"
                  class="d-flex modal-image"
                  width="700px"
                  height="440px"
                  style="border: 0!important;"
                  :src="getEmbedUrl(selectedStory.value)" />

          <img v-if="showModalImage && selectedStory.type === 'image'" :src="selectedStory.value"
               alt="Modal Image" style="max-width: 900px;max-height: 900px" class="modal-image rounded-6">


          <button
            v-if="this.showModalImage"
            title="Close (Esc)"
            type="button"
            class="close-image-modal"
            @click="closeModal"
          >
            X
          </button>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api';
export default {
  components: {
    Carousel: () => import("vue-ssr-carousel"),
  },
  data: function() {
    return {
      stories: [],
      clickedStoryIndices: [],
      showModalImage: false,
      selectedStory: null,
    };
  },
  async fetch() {
    const response = await Api.get('status');
    this.stories = response.data.result;
  },
  methods: {
    getEmbedUrl(link) {
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = link.match(regex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      } else {
        return ""; // or handle invalid URLs accordingly
      }
    },
    openStory: function(story) {
      this.selectedStory = story
      this.showModalImage = true
    },
    closeModal() {
      this.showModalImage = false;
    },
    storeIdInSession: function(index) {
      this.clickedStoryIndices = JSON.parse(sessionStorage.getItem('clickedStoryIndex')) || [];
      if (!this.clickedStoryIndices.includes(index)) {
        this.clickedStoryIndices.push(index);
        sessionStorage.setItem('clickedStoryIndex', JSON.stringify(this.clickedStoryIndices));
      }
    }
  },
  mounted() {
    if(process.client){
      this.clickedStoryIndices = JSON.parse(sessionStorage.getItem('clickedStoryIndex')) || [];
    }
  }
};
</script>
<style>
@media screen and (max-width: 767px){
  .stories{
    margin-top: 15px;
  }
}
@media screen and (max-width: 992px){
  .from-demo-37{
    display: none;
  }
}
.modal{
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0!important;
  border: 0!important;
}
</style>
