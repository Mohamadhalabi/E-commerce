<template>
  <div :class="{ 'text-right': getIsAr }">
    <div v-if="product.accessories && !isEmpty(product.accessories)">
      <h3 class="additional-product-items mb-lg-3">{{ $t("products.Accessories") }}</h3>
      <table class="table table-bordered table-spacing">
        <tr>
          <td>
            <div
              v-for="item in product.accessories"
              :key="item.sku"
              class="col-lg-12 col-md-12 col-sm-12"
            >
              <pv-product-row :product="item"  />
            </div>
          </td>
        </tr>
        <br>
      </table>
    </div>
    <div v-if="product.compatible_with && !isEmpty(product.compatible_with)">
      <h3 class="additional-product-items mb-lg-3">{{ $t("products.CompatibleWith") }}</h3>
      <table class="table table-bordered table-spacing">
        <tr>
          <td>
            <div
              v-for="item in product.compatible_with"
              :key="item.sku"
              class="col-lg-12 col-md-12 col-sm-12">
              <pv-product-row :product="item" />
            </div>
          </td>
        </tr>
        <br>
      </table>
    </div>
    <div v-if="product.bundled.length > 0">
      <h3 class="additional-product-items mb-lg-3">{{ $t("products.BundleProducts") }}</h3>
      <table class="table table-bordered table-spacing">
        <tr>
          <td>
            <div
              v-for="item in product.bundled"
              :key="item.sku"
              class="col-lg-12 col-md-12 col-sm-12">
              <pv-product-bundel :product="item" />
            </div>
          </td>
        </tr>
        <br>
      </table>
    </div>
    <div v-if="product.attributes && !isEmpty(product.attributes) || (product.weight !== 0 && product.weight != null)">
      <h3 class="additional-product-items">{{ $t("products.Attributes") }}</h3>
      <div class="col-12 p-0">
          <pv-attributes :product="product" />
      </div>
    </div>

    <div v-if="product.brands && !isEmpty(product.brands)">
      <h3 class="additional-product-items">{{ $t("products.Models") }}</h3>
      <div class="col-12 p-0">
        <pv-models :product="product" />
      </div>
    </div>

    <div v-if="product.videos && !isEmpty(product.videos)">
      <h3 class="additional-product-items">Videos</h3>
      <div class="row">
        <div
          v-for="(video, index) in product.videos"
          :key="index"
          class="downloadVedioWrapper col-md-14 col-sm-6 col-12 mb-2">
          <iframe class="d-flex" style="width: 100%;min-height: 300px"  :src="getEmbedUrl(video.link)" />
        </div>
      </div>
    </div>

    <div>

  <pv-tabs class="product-single-tabs">
    <ul
      class="nav bg-white nav-tabs"
      role="tablist"
      style="position: sticky;margin-bottom: 10px;"
    >
      <li
        class="nav-item"
        v-if="product.description && !isEmpty(product.description)"
      >
        <a
          id="product-tab-desc"
          class="nav-link active"
          data-toggle="tab"
          href="#product-desc-content"
          role="tab"
          aria-controls="product-desc-content"
          aria-selected="true"
          >{{ $t("products.Description") }}</a
        >
      </li>

      <li class="nav-item" v-if="product.frequently_asked_questions && !isEmpty(product.frequently_asked_questions)">
        <a
          id="product-tab-faq"
          class="nav-link"
          data-toggle="tab"
          href="#product-faq-content"
          role="tab"
          aria-controls="product-faq-content"
          aria-selected="true"
          >{{ $t("products.FAQ") }} ({{product.frequently_asked_questions.length}})</a
        >
      </li>

      <li class="nav-item">
        <a
          id="product-tab-reviews"
          class="nav-link"
          data-toggle="tab"
          href="#product-reviews-content"
          role="tab"
          aria-controls="product-reviews-content"
          aria-selected="false"
        >
          {{ $t("products.Reviews") }}({{ product.total_reviews }})</a
        >
      </li>

      <li class="nav-item d-none d-md-block" v-if="product.pdf.length > 0">
        <a
          id="product-tab-pdf"
          class="nav-link"
          data-toggle="tab"
          href="#product-pdf-content"
          role="tab"
          aria-controls="product-pdf-content"
          aria-selected="false"
          >{{ $t("products.PDF") }} ({{ product.pdf.length }})</a
        >
      </li>

      <li class="nav-item">
        <a
          id="product-tab-contactus"
          class="nav-link"
          data-toggle="tab"
          href="#product-contactus-content"
          role="tab"
          aria-controls="product-contactus-content"
          aria-selected="false"
          >{{ $t("products.contactus") }}</a
        >
      </li>
    </ul>

    <div class="tab-content">
      <div v-if="product.description && !isEmpty(product.description)"
           id="product-desc-content"
           class="tab-pane fade show active"
           role="tabpanel"
           aria-labelledby="product-tab-desc"
           ref="contentContainer">
        <div v-html="product.description"  @click="openModal"></div>
        <ImageModal :imageUrl="selectedImageUrl" ref="imageModal" />
      </div>
      <div
        id="product-bundled-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-bundled"
      >
        <div class="row">
          <div
            v-for="item in product.bundled"
            :key="item.sku"
            class="col-6 col-sm-3 col-lg-2"
          >
            <pv-product :product="item" />
          </div>
        </div>
      </div>
      <div
        v-if="product.offers && !isEmpty(product.offers)"
        id="product-offers-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-offers"
      >
        <pv-offers :product="product" />
      </div>

      <div
        v-if="product.frequently_asked_questions && !isEmpty(product.frequently_asked_questions)"
        id="product-faq-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-faq"
      >
        <div v-for="(faq, index) in product.frequently_asked_questions" :key="index">
          <b-card no-body class="mb-1">
            <b-button
              class="pdf-button"
              block
              v-b-toggle="'accordion-' + index"
              @click="flipArrow(index)"
            >
              <div class="pdf-icon"></div>
              <h2 class="m-0 pdf-faq-title">{{faq[0]}}
                <span :class="['accordion-arrow', {'flipped': isArrowFlipped(index)}]" style="float: right">&#9660;</span>
              </h2>
            </b-button>
            <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <p class="m-0" v-html="faq[1]"></p>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

        </div>
      </div>
      <div
        id="product-support-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-support"
      >
        <client-only>
          <pv-support :type-support="'product'" :model-id="product.sku" />
        </client-only>
      </div>

      <div
        id="product-reviews-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-reviews"
      >
        <pv-reviews :product="product" />
      </div>
      <div
        id="product-pdf-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-pdf">
        <pv-pdf :product="product" />
      </div>
      <div
        id="product-contactus-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-contactus"
      >
        <pv-contactus
          :product="product"
          :type-contact="'product'"
          :model-id="product.sku"
        />
      </div>
    </div>
  </pv-tabs>
    </div>
  </div>
</template>

<script>
import PvTabs from "~/components/features/PvTabs";
import PvModels from "~/components/product/tabs/PvModels";
import PvReviews from "~/components/product/tabs/PvReviews";
import PvPdf from "~/components/product/tabs/PvPdf";
import PvProduct from "~/components/product/card/PvProduct";
import PvContactus from "~/components/product/tabs/PvContactus";
import { isEmpty } from "lodash";
import PvProductRow from "~/components/product/card/PvProductRow.vue";
import PvProductBundel from "~/components/product/card/PvProductBundel.vue";
import {mapGetters} from "vuex";
import ImageModal from "~/components/product/ImageModal.vue";
export default {
  components: {
    ImageModal,
    PvProductBundel,
    PvProductRow,
    PvTabs,
    PvAttributes: () => import("~/components/product/tabs/PvAttributes"),
    PvModels,
    PvSupport:() => import("~/components/product/tabs/PvSupport"),
    PvReviews,
    PvProduct,
    PvPdf,
    PvContactus,
  },

  props: {
    product: Object,
  },
  data: function () {
    return {
      isEmpty,
      loadedData: false,
      ImageFromDescription:'',
      isModalOpen: false,
      flippedArrows: [],
      selectedImage: null,
      selectedImageUrl: '',
      videoOptions: {
        autoplay: false,
        controls: true,
      },
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  watch: {
    $route(val) {
      if (val.query.reviews == "true") {
        document.getElementById("products-tab-reviews").click();
        document.getElementById("products-tab-reviews").scrollIntoView();
      }
    },
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
    flipArrow(index) {
      const currentIndex = this.flippedArrows.indexOf(index);
      if (currentIndex === -1) {
        this.flippedArrows.push(index);
      } else {
        this.flippedArrows.splice(currentIndex, 1);
      }
    },
    openModal(event) {
      if (event.target.tagName === 'IMG') {
        this.selectedImageUrl = event.target.src;
        this.$refs.imageModal.showModal = true;
      }
    },
    isArrowFlipped(index) {
      return this.flippedArrows.includes(index);
    },
  }
};
</script>
<style>
.table-spacing tr {
  margin-bottom: 10px!important;
}
.additional-product-items{
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
  padding-left: 0;
}

div.vjs-poster{
  border: 10px solid white;
  border-radius: 0!important;
}
.table-bordered{
  border: 0px solid #dee2e6;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  //max-width: 40%;
}

.modal-image-container {
  text-align: center;
}

.modal-image {
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}

.close-btn {
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 20px;
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}
.pdf-faq-title{
  font-size: 16px;
  color: #ffffff;
}
.modal-body{
  padding: 0;
}
</style>
