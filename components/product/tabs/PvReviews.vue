<template>
  <div>
    <div
      v-if="ratings.length > 0"
      key="noReviews"
      class="product-reviews-content"
    >
      <div class="container">
        <div
          v-for="(item, index) in ratings"
          :key="`reviews-${index}`"
          class=""
        >
          <div class="row mb-2">
            <div
              class="col-sm-2 col-5 d-flex align-items-center justify-content-center"
            >
              <figure>
                <img
                  loading="lazy"
                  :src="item.avatar"
                  alt="author"
                  width="50"
                  style="height: 50px; object-fit: contain"
                  :open_graph="item['open_graph']"
                  :scal="item['scal']"
                  :description="item['description']"
                />
              </figure>
            </div>

            <div
              class="col-sm-9 col-7 py-2 px-4 arrow-ltr rounded-5"
              style="background-color: rgb(225, 225, 225)"
              :class="{ 'arrow-rtl': getIsAr }"
            >
              <h5 class="m-0 z-100">{{ item.user_name }}</h5>
              <p class="m-0 z-100">{{ item.comment }}.</p>
              <div class="ratings-container z-100 m-0">
                <div class="product-ratings z-100">
                  <span
                    class="ratings"
                    :style="{ width: `${item.rating * 20}%` }"
                  />
                </div>
              </div>

              <p style="z-index: 100" class="m-0 mt-1">
                {{ $t("common.createdAt") }}: {{ item.created_at }}
              </p>

              <div
                v-for="(item2, index2) in item.replies"
                class="row"
                :key="index2"
              >
                <div class="col-md-1 col-sm-2 col-4 border p-0">
                  <img
                    loading="lazy"
                    class="rounded-circle"
                    style="width: 50px; height: 50px"
                    :src="$settings.website.default_images.s['url']"
                    alt=""
                    srcset=""
                  />
                </div>

                <div style="line-height: 1.3;" class="col-md-11 col-sm-10 col-8 border">
                  {{ item2.comment }}
                  <br />
                  <span class="text-warning"> {{ item2.created_at }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider" />

      <!-- <div class="add-products-review">
      <h3 class="review-title">
        {{ $t("review.AddReview") }}
      </h3>

      <form action="#" class="comment-form m-0 text-right">
        <div class="rating-form">
          <label for="rating">
            {{ $t("review.YourRating") }}
            <span class="required">*</span>
          </label>

          <div class="">
            <div class="rating-stars">
              <a
                v-for="number in [1, 2, 3, 4, 5]"
                :key="`rating${number}`"
                href="javascript:;"
                :class="`star-${number}`"
                @click="setRating($event, number)"
              >

              </a>
            </div>

            <select id="rating" name="rating" required style="display: none">
              <option value>
                {{ $t("review.rate") }}
              </option>
              <option value="5">
                {{ $t("review.rate") }}
                Perfect
              </option>
              <option value="4">
                {{ $t("review.good") }}
              </option>
              <option value="3">
                {{ $t("review.average") }}
              </option>
              <option value="2">
                {{ $t("review.NotBad") }}
              </option>
              <option value="1">
                {{ $t("review.VeryPoor") }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>
            {{ $t("review.your_review") }}
            <span class="required">*</span>
          </label>
          <textarea
            v-model="dataForm.comment"
            cols="5"
            rows="6"
            class="form-control form-control-sm"
          />
        </div>

        <input
          type="submit"
          class="btn btn-primary"
          value="Submit"
          @click="sendRating"
        />
      </form>
    </div> -->
    </div>

    <!-- <div v-else class="products-reviews-content">
    <h3 class="reviews-title">
      {{ $t("review.reviews") }}
    </h3>

    <p>
      {{ $t("review.firstToReview") }}
    </p>

    <div class="divider" />


  </div>
 -->
    <div class="add-product-review">
      <h3 v-if="ratings.length == 0" class="review-title">
        {{ $t("review.firstReview") }}: “{{ product.title }}”
      </h3>

      <div class="form-group position-relative">
        <div class="d-flex align-items-center justify-content-between">
          <label>
            {{ $t("review.your_review") }}
            <span class="required">*</span>
          </label>

          <div class="rating-form">
            <label for="rating">
              {{ $t("review.YourRating") }}
              <span class="required">*</span>
            </label>
            <span class="rating-stars">
              <a
                v-for="number in [1, 2, 3, 4, 5]"
                :key="`rating${number}`"
                href="javascript:;"
                :class="`star-${number}`"
                @click="setRating($event, number)"
              >
              </a>
            </span>

            <select
              id="rating"
              v-model="dataForm.rating"
              name="rating"
              required
              style="display: none"
            >
              <option value>
                {{ $t("review.rate") }}
              </option>
              <option value="5">
                {{ $t("review.perfect") }}
              </option>
              <option value="4">
                {{ $t("review.good") }}
              </option>
              <option value="3">
                {{ $t("review.average") }}
              </option>
              <option value="2">
                {{ $t("review.NotBad") }}
              </option>
              <option value="1">Very poor</option>
            </select>
          </div>
        </div>

        <base-button-icon-1
          style="bottom: 0px; right: 0px"
          @click="sendRating"
          :outline="true"
          class="position-absolute m-4 p-3 rounded-circle"
        >
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 96 960 960"
              width="30"
              fill="#ff6800"
            >
              <path
                d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"
              />
            </svg>
          </span>
        </base-button-icon-1>

        <b-form-textarea
          id="textarea-auto-height"
          no-resize
          class="m-0"
          placeholder="Write your review heare...."
          v-model="dataForm.comment"
        >
        </b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import Api from "~/api";

export default {
  components: {
    BaseButtonIcon1,
  },

  props: {
    product: Object,
  },

  data() {
    return {
      ratings: [],
      dataForm: {
        rating: "",
        comment: "",
        product_slug: this.product.slug,
      },
    };
  },

  created() {
    this.getRating();
  },

  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },

  methods: {
    getRating() {
      Api.get(`/products/review?product_slug=${this.$route.params.slug}`)
        .then((response) => {
          this.ratings = response.data.result;
        })
        .catch((error) => {
          this.$notify({
            group: "errorMessage",
            type: "success",
            text: error.response.data.message,
          });
        });
    },
    setRating: function (e, number) {
      this.dataForm.rating = number;
      if (e.currentTarget.parentNode.querySelector(".active"))
        e.currentTarget.parentNode
          .querySelector(".active")
          .classList.remove("active");
      e.currentTarget.classList.add("active");
    },
    sendRating() {
      /* Checling if the reating & comment is empty or n not */
      if (this.dataForm.rating == "" || this.dataForm.comment == "") {
        this.$notify({
          group: "custom-notify",
          type: "error",
          text: "reating and comment is required",
        });
      } else {
        Api.post("/products/review/create", this.dataForm)
          .then((response) => {
            (this.dataForm.comment = null),
              (this.dataForm.rating = null),
              this.$notify({
                group: "custom-notify",
                type: "success",
                text: response.data.message,
              });
          })
          .catch((error) => {
            this.$notify({
              group: "errorMessage",
              type: "error",
              text: error.response.data.message,
            });
          });
      }
    },
  },
};
</script>

<style  scoped>
.z-100 {
  z-index: 100 !important;
}
.arrow-ltr {
  position: relative;
}

.arrow-ltr::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgb(225, 225, 225);
  transform: translate(-50%, -50%) rotate(45deg);
  text-align: center;
  top: 50%;
  left: -1px;
  z-index: -1;
}

.arrow-rtl::after {
  transform: translate(50%, -50%) rotate(45deg);
  right: -1px;
}
</style>
