<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
               {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/shop">
             {{ $t('shop.shop') }}
             </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            <h1 class="breadcrumb-item d-flex m-0">{{title}}</h1>
          </li>
        </ol>
      </nav>
      <div class="col-md-12">
        <ShopBanner v-if="category" :image="category.banner"/>
        <ShopBanner v-if="manufacturer" :image="manufacturer.banner"/>
      </div>
      <div class="row">
        <div class="col-lg-10">
          <pv-product-list
            :slug="slug"
            :slugtype="slugtype"
            @sort-by="sortBy"
            @direction-by="changeDirection"
            @filters="displayFilters"
          />
          <div class="category-desc mt-3">
            <pv-tabs class="product-single-tabs">
              <ul class="nav nav-tabs" role="tablist" style="position: sticky;margin-bottom: 10px;">
                <li class="nav-item" v-if="description && !isEmpty(description)">
                  <a id="product-tab-desc" class="nav-link active" data-toggle="tab" href="#product-desc-content" role="tab" aria-controls="product-desc-content" aria-selected="true">{{ $t("products.Description") }}</a>
                </li>
                <li class="nav-item" v-if="frequently_asked_questions && !isEmpty(frequently_asked_questions)">
                  <a id="product-tab-faq" class="nav-link" data-toggle="tab" href="#faq-content" role="tab" aria-controls="faq-content" aria-selected="true">{{ $t("products.FAQ") }} ({{frequently_asked_questions.length}})</a>
                </li>

                <li class="nav-item" v-if="videos && !isEmpty(videos)">
                  <a
                    id="video-tab"
                    class="nav-link"
                    data-toggle="tab"
                    href="#video-tab-content"
                    role="tab"
                    aria-controls="video-tab-content"
                    aria-selected="false"
                  >Videos</a
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
                <div v-if="description && !isEmpty(description)"
                     id="product-desc-content"
                     class="tab-pane fade show active"
                     role="tabpanel"
                     aria-labelledby="product-tab-desc"
                     v-html="description"
                     ref="contentContainer"
                     @click="openModal2"
                >
                </div>
                <ImageModal :imageUrl="selectedImageUrl" ref="imageModal" />

                <div v-if="frequently_asked_questions && !isEmpty(frequently_asked_questions)" id="faq-content" class="tab-pane fade" role="tabpanel" aria-labelledby="product-tab-faq" ref="contentContainer">
                  <div v-for="(faq, index) in frequently_asked_questions" :key="index">
                    <b-card no-body class="mb-1">
                      <b-button class="pdf-button" block v-b-toggle="'accordion-' + index" @click="flipArrow(index)">
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
                  id="video-tab-content"
                  class="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="video-tab"
                >
                  <div class="row">
                    <div
                      v-for="(video, index) in videos"
                      :key="index"
                      class="downloadVedioWrapper col-md-4 col-sm-12 col-12 mb-2">
                      <video-player :src="video" />
                    </div>
                  </div>
                </div>

                <div
                  id="product-contactus-content"
                  class="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="contactus-tab"
                >
                  <pv-contactus
                  />
                </div>

              </div>
            </pv-tabs>
          </div>
        </div>
        <div class="sidebar-shop col-lg-2 order-lg-first mobile-sidebar p-0" sticky-container>
          <div v-sticky="isSticky" sticky-offset="{top: 75}">
            <sidebar-filter v-if="category" :category="category.slug"/>
            <sidebar-filter v-if="manufacturer" :manufacturer="manufacturer.slug"/>
            <sidebar-filter v-if="brand" :brand="brand.slug"/>
          </div>
        </div>
      </div>
      <div class="filter-modal">
        <b-modal
          id="bv-modal-example2"
          v-model="openModal" centered hide-header hide-footer>
          <div class="sidebar-shop p-4">
              <sidebar-filter v-if="category" :category="category.slug"/>
              <sidebar-filter v-if="manufacturer" :manufacturer="manufacturer.slug"/>
              <sidebar-filter v-if="brand" :brand="brand.slug"/>
          </div>
        </b-modal>
        <button
          v-if="openModal"
          title="Close (Esc)"
          type="button"
          class="close-image-modal"
          @click="closeModal"
        >
          X
        </button>
      </div>
    </div>
  </main>
</template>
<script>
import ShopBanner from '~/components/shop/PvShopBanner';
import PvProductList from "~/components/shop/PvProductList.vue";
import SidebarFilter from "~/components/shop/SidebarFilter.vue";
import PvTabs from "~/components/features/PvTabs.vue";
import {isEmpty} from "lodash";
import ImageModal from "~/components/product/ImageModal.vue";
import PvContactus from "~/components/product/tabs/PvContactus.vue";
import {scrollTopHandler} from "~/utils";
export default {
  name: 'ShopTemplate',
  components: {
    PvContactus,
    ImageModal,
    PvTabs,
    PvProductList,
    ShopBanner,
    SidebarFilter,
  },
  props: {
    category: {
      type: Object
    },
    manufacturer: {
      type: Object
    },
    brand: {
      type: Object
    }
  },
  data() {
    return {
      isSticky: false,
      page: 1,
      orderBy: 'created_at',
      directionBy: 'asc',
      slugtype: null,
      description: null,
      slug: null,
      title: null,
      openModal: false,
      selectedImageUrl: '',
      frequently_asked_questions: [],
      videos: [],
      flippedArrows: [],
    };
  },
  created() {
    if (this.category) {
      this.slug = this.category.slug;
      this.description = this.category.description;
      this.slugtype = "category";
      this.title = this.category.title;

    } else if (this.manufacturer) {
      this.slug = this.manufacturer.slug;
      this.description = this.manufacturer.description;
      this.slugtype = "manufacturer";
      this.title = this.manufacturer.title;
      this.frequently_asked_questions = this.manufacturer.frequently_asked_questions
      this.videos = this.manufacturer.videos

    } else if (this.brand) {
      this.slug = this.brand.slug;
      this.description = this.brand.description;
      this.slugtype = "brand";
      this.title = this.brand.title;
    }
    if(process.client){
      scrollTopHandler();
    }
  },
  methods: {
    isEmpty,
    displayFilters(val){
      if(val){
        this.openModal = true
      }
    },
    closeModal(){
      this.openModal = false
    },
    sortBy(sortBy) {
      this.orderBy = sortBy;
      this.getProduct(this.slug);
    },
    changeDirection(directionBy) {
      this.directionBy = directionBy;
      this.getProduct(this.slug);
    },
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
    },
    openModal2(event) {
      if (event.target.tagName === 'IMG') {
        this.selectedImageUrl = event.target.src;
        this.$refs.imageModal.showModal = true;
      }
    },
  }
}
;
</script>

<style>
.category-desc {
  background-color: #FBFBFB;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 10px;
  padding: 30px;
  font-size: 1.7rem;
  line-height: 1.5;
}
#bv-modal-example2{
  display: flex!important;
}
@media screen and (max-width: 993px) {
  .mobile-sidebar {
    display: none;
  }
}
img{
  cursor: pointer;
}
.modal-body{
  padding: 10px!important;
}
</style>
