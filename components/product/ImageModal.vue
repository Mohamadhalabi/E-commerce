<template>
  <div>
    <b-modal v-model="showModal" hide-footer centered hide-header>
    </b-modal>
    <img v-if="this.showModal" :src="imageUrl" alt="Modal Image" class="modal-image">

    <button
        v-if="this.showModal"
        title="Close (Esc)"
        type="button"
        class="close-image-modal"
        @click="closeModal"
    >
      X
    </button>
  </div>
</template>
<script>
export default {
  name: "ImageModal",
  props: {
    imageUrl: String
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style>
.close-image-modal{
  position: fixed!important;
  top: 0!important;
  background: transparent;
  color: white;
  font-size: 25px;
  right: 0;
  border: 0;
  z-index: 10000
}
.modal-image{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 9999999999;
  padding: 50px;
}

@media screen and (max-width: 992px){
  .modal-image{
    padding: 10px;
  }
}
</style>
