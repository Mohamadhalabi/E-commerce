<template>
  <div>
    <div class="d-flex align-items-center">
      <h3 class="account-sub-title d-md-block">
        {{ $t("review.your_review") }}
      </h3>
    </div>
    <div v-if="reviews.length != 0" class="table-container">
      <table class="table">
        <tbody>
          <tr v-for="(item, index) in reviews.data" :key="index">
            <td>
              <div class="row">
                <a
                  class="col-12 d-flex align-items-center"
                  :href="`/products/${item.product.slug}`"
                >
                  <div>
                    <b-avatar
                      v-if="item.product.gallery[0].s['url']"
                      class="mx-2"
                      style="width: 50px; height: 50px"
                      :src="item.product.gallery[0].s['url']"
                    />
                  </div>
                  <div class="d-flex align-items-start flex-column">
                    <span class="text-dark">
                      {{
                        item.product.title.length > 100
                          ? item.product.title.substring(0, 100 - 3) + "..."
                          : item.product.title
                      }}
                    </span>

                    <div class="my-2">
                      <span
                        v-for="(i, index) in item.product.avg_rating"
                        :key="index"
                      >
                        <i class="icon-star text-warning"></i>
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div class="row my-3 px-5" :class="{ 'text-right': getIsAr }">
                <div class="col-12 d-flex align-items-center">
                  <div>
                    <b-avatar
                      style="width: 50px; height: 50px"
                      class="mx-3"
                      :src="checkURL(StateUser.avatar)"
                    />
                  </div>

                  <div>
                    <div class="d-flex flex-column">
                      <span>{{
                        item.comment.length > 35 ? item.comment : item.comment
                      }}</span>
                      <span> {{ item.created_at }}</span>
                    </div>

                    <div class="my-2">
                      <span v-for="(i, index) in item.rating" :key="index">
                        <i class="icon-star text-warning"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row"
                v-if="item.replies"
                v-for="(item2, index2) in item.replies"
                :key="index2"
              >
                <div
                  class="col-12 col-md-10 offset-md-1 p-1 mt-1 mb-1"
                  style="display: block"
                >
                  <div class="row">
                    <div class="col-1">
                      <b-avatar
                        style="width: 40px; height: 40px"
                        class="border-0"
                        :src="$settings.website.default_images.m['url']"
                      />
                    </div>

                    <div class="col-11">
                      {{ item2.comment }}
                      <br />
                      <span class="text-warning"> {{ item2.created_at }}</span>
                      <br />
                      <span
                        v-if="item2.files"
                        v-for="(file, inde2) in JSON.parse(item2.files)"
                        :key="inde2"
                      >
                        <a
                          class="mr-1"
                          target="_blank"
                          :href="`${baseUrl + file.path + file.hashed_name}`"
                        >
                          <b-badge
                            style="border: 1px solid #ff6800; color: #ff6800"
                            title="Download file"
                            class="bg-white d-inline-flex align-items-center"
                          >
                            <div class="border-right px-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="12"
                                viewBox="0 96 960 960"
                                width="12"
                              >
                                <path
                                  d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"
                                />
                              </svg>
                            </div>
                            <span class="mx-1">{{ file.image_data }}</span>
                          </b-badge></a
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination
        v-if="pageCount > 1"
        v-model="page"
        :total-rows="pageCount"
        :per-page="1"
        pills
        size="lg"
        @input="changePage(page)"
      />
    </div>

    <div v-else-if="loadingOrders == true">
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <div v-else-if="reviews.length == 0 && loadingOrders == false">
      <div class="address-box">
        {{ $t("common.noAnyData") }}
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import { isEmpty } from "lodash";
import Api from "~/api";
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      loadingOrders: false,
      reviews: [],
      pageCount: 1,
      selectedPage: 1,
      isEmpty,
      page: 1,
      baseUrl: process.env.BaseUrl,
    };
  },

  created() {

    this.getReviews();

  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    getReviews: function () {
      this.loadingOrders = true;
      this.reviews = [];
      Api.get(`/user/my-reviews?page=${this.selectedPage}`)
        .then((response) => {
          this.reviews = response.data;
          this.pageCount = response.total_pages;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }))
        .finally(() => {
          this.loadingOrders = false;
        });
    },
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },
    changePage(page) {
      this.selectedPage = page;
      scrollTopHandler();
      this.getReviews();
    },
    goToProduct(item) {
      this.$router.push({ path: "/products/" + item.slug });
    },
  },
};
</script>
