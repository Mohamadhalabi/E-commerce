<template>
  <div
    v-if="product.pdf.length > 0"
    key="noReviews"
    class="product-reviews-content contact-two"
  >
    <div class="accordion" role="tablist">
      <div v-for="(pdfFile, index) in product.pdf" :key="index">
        <b-card no-body class="mb-1">
          <b-button
            class="pdf-button"
            block
            v-b-toggle="'accordion-' + index"
            @click="flipArrow(index)"
          >
            <div class="pdf-icon"></div>
            {{ pdfFile.title.split('.pdf')[0] }}
            <span :class="['accordion-arrow', {'flipped': isArrowFlipped(index)}]" style="float: right">&#9660;</span>
          </b-button>
          <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text style="overflow: auto; width: 100%; padding-top: 56.25%; position: relative;">
                <embed :src="pdfFile.path" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" type="application/pdf" />
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    product: Object
  },
  data() {
    return {
      flippedArrows: []
    };
  },
  methods: {
    flipArrow(index) {
      const currentIndex = this.flippedArrows.indexOf(index);
      if (currentIndex === -1) {
        this.flippedArrows.push(index);
      } else {
        this.flippedArrows.splice(currentIndex, 1);
      }
    },
    isArrowFlipped(index) {
      return this.flippedArrows.includes(index);
    }
  }
};
</script>

<style>
.pdf-button {
  text-align: left;
  background-color: #3e3e3e!important;
  padding: 20px!important;
}

.accordion-arrow {
  display: inline-block;
  margin-left: auto;
  transition: transform 0.3s;
  font-size: 14px;
}

.flipped {
  transform: rotate(180deg);
}

.pdf-icon{
  background-image: url("./static/images/icons/pdf-icon.png");
  background-size: cover;
}
.contact-two .btn{
  margin-top: 0;
}
</style>
