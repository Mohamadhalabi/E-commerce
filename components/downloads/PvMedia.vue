<template>
  <div>
    <div class="container">
      <div :class="{ 'img-grid': !ScreenShot, 'img-grid-screen-shot': ScreenShot }">
        <div
          class="swiper-dot swiper-slide"
          v-for="(image, index) in product.gallery"
          :key="image.s.id"
          :class="{ active: index === 0 }"
        >
          <img
            loading="lazy"
            :src="image.s.url"
            :alt="image.alt"
            @click="openModal(index)"
            class="rounded-5"
          />
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="download-modal" :class="{ 'zoom-in': modalOpen }">
      <div class="modal-content">
        <div class="image-container">
          <img
            loading="lazy"
            :class="{ 'modal-image': !ScreenShot }"
            :src="product.gallery[modalIndex].s.url" :alt="product.gallery[modalIndex].alt" />
        </div>
        <span class="close-modal" @click="closeModal">&times;</span>
      </div>
      <a class="prev" @click="showPrevious">&lsaquo;</a>
      <a class="next" @click="showNext">&rsaquo;</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    isMagnify: {
      type: Boolean,
      default: true,
    },
    ScreenShot: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalIndex: 0,
      modalOpen: false,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    openModal(index) {
      this.modalIndex = index;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    showPrevious() {
      this.modalIndex = (this.modalIndex - 1 + this.product.gallery.length) % this.product.gallery.length;
    },
    showNext() {
      this.modalIndex = (this.modalIndex + 1) % this.product.gallery.length;
    },
  },
};
</script>

<style scoped>
.img-grid img:hover, .img-grid-screen-shot img:hover {
  opacity: 0.7;
  cursor: pointer;
}

.img-grid img, .img-grid-screen-shot img{
  transition: opacity 0.3s ease;
}


/* CSS Grid */
.img-grid{
  display: inline-grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 5px;
}
.img-grid-screen-shot{
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

@media screen and (min-width: 1500px) {
  .img-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1499px) {
  .img-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (max-width: 1380px) {
  .img-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1140px) {
  .img-grid {
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
  }
}

@media screen and (max-width: 900px) {
  .img-grid {
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
  }
}

@media screen and (max-width: 650px) {
  .img-grid {
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
  }
}

@media screen and (max-width: 450px) {
  .img-grid {
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
  }
}

/* Modal Styles */
.download-modal {
  //display: block;
  position: fixed;
  z-index: 9999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-content {
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-height: 80%;
  position: relative;
}

.image-container {
  flex: 1;
}

.close-modal {
  color: #ffffff;
  position: fixed;
  font-weight: bold;
  top: 15px;
  right: 15px;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.close-modal:hover {
  color: #bbb;
}

.prev,
.next {
  color: #ffffff!important;
  position: absolute;
  top: 50%;
  font-size: 70px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.prev {
  left: 15px;
}

.next {
  right: 15px;
}

.prev:hover,
.next:hover {
  color: #bbb!important;
}

.modal .modal-content img:hover {
  opacity: 1;
}
.zoom-in {
  opacity: 0;
  animation: zoom-in 0.5s ease-in-out forwards;
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.modal-image{
  width: 900px;
  height: 900px;
  margin-top: 8%;
}
@media screen and (max-width: 992px){
  .modal-image{
    width: 700px;
    height: 700px;
    margin: auto;
  }
}
@media screen and (max-width: 580px){
  .modal-image{
    width: 100%;
    height: 100%;

  }
}
</style>
