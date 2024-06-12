<template>
  <div class="whatsnewlass">
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      {{
        $t("account.whatsnew")
      }}
    </h3>

    <div v-if="!news" class="address position-relative pl-5">
      <div class="loading" />
      <div class="address-box">
        <!--        {{$t('account.loading_coupon')}}-->
      </div>
    </div>

    <div v-else-if="news && isEmpty(news)" class="address">
      <div class="address-box">
        <!--        {{$t('account.no_coupon')}}-->
      </div>
      <div class="wishlist-table-container w-100 text-center">
        <table
          class="table-wishlist w-100"
          data-pagination="no"
          data-per-page="5"
          data-page="1"
          data-id
          data-token
        >
          <tbody class="wishlist-items-wrapper">
            <tr class="border-0 py-0">
              <!-- <td colspan="6" class="px-3 py-2 text-center">
                <i class="sicon-paper-clip wishlist-empty" />
              </td> -->
            </tr>
            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 py-2 wishlist-empty wishlist-text">
                {{ $t("account.no_whatsnew") }}
              </td>
            </tr>
            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 text-center">
                <nuxt-link to="/shop">
                <base-button-icon-1 style="width:150px;" :outline="true" class="py-4"> {{ $t("wishlist.GoShop") }}</base-button-icon-1>
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="whatsNewCalsss">
      <div class="row">
        <div class="col-md-12" v-if="showInfo == false">
          <div class="pad-top pb-3">
            <ul class="pb-3">
              <li
                v-for="(newItem, index) in news"
                :key="index"
                class="list-group-item mb-2 p-3 px-4 scaling"
                style="cursor: pointer; border-radius: 6px !important"
                :class="newItem.read == 1 ? 'readedClass' : ''"
                @click="readMore(newItem)"
              >
                <div class="h-100 position-absolute left-0 vertical-line"></div>
                <div>
                  <h5
                    class="text-bold"
                    :class="newItem.read != 1 ? 'text-theam' : 'text-muted'"
                  >
                    <svg
                      v-if="newItem.read == 0"
                      xmlns="http://www.w3.org/2000/svg"
                      height="30"
                      viewBox="0 96 960 960"
                      width="30"
                      fill="#f07905"
                      id="unreaded"
                    >
                      <path
                        d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140 371v465h680V371L480 594Zm0-60 336-218H145l335 218ZM140 371v-55 520-465Z"
                      />
                    </svg>

                    <svg v-else
                      xmlns="http://www.w3.org/2000/svg"
                      height="30"
                      viewBox="0 96 960 960"
                      width="30"
                      fill="#605e5d"


                    >
                      <path
                        d="m480 136 371 222q17 9 23 24.5t6 30.5v463q0 24-18 42t-42 18H140q-24 0-42-18t-18-42V413q0-15 6.5-30.5T109 358l371-222Zm0 466 336-197-336-202-336 202 336 197Zm0 67L140 469v407h680V469L480 669Zm0 207h340-680 340Z"
                      />
                    </svg>
                    <b>{{ newItem.title }}</b>
                  </h5>

                  <p
                    class="text-muted text-sm fs-11"
                    :class="newItem.read != 1 ? 'text-theam' : 'text-muted'"
                  >
                    {{ newItem.created_at || "2022-10-31 18:17:54" }}
                  </p>

                </div>
              </li>
            </ul>
          </div>
          <b-pagination
            v-if="total_pages > 1"
            v-model="page"
            :total-rows="total_pages"
            :per-page="1"
            pills
            size="lg"
            @input="changePage(page)"
          />
        </div>

        <div v-else class="col-12">
          <button
            class="btn btn-dark btn-orange mr-0 mb-2 py-3"
            @click="showInfo = false, getWhatsNews"
          >
            <i class="fa fa-arrow-left" /> Back
          </button>

           <b-list-group>
            <b-list-group-item class="flex-column align-items-start bg-light mb-2 readedClass" style="border-radius: 6px;">
               <div class="h-100 position-absolute left-0 vertical-line"></div>

              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                  {{ selecteItem.title }}
                  <b-badge
                    v-if="selecteItem.read == 1"
                    style="color: white"
                    class="pt-2 pb-1"
                    variant="success"
                    pill
                  >
                    <span>{{ $t("common.readed") }}</span>
                  </b-badge>
                </h5>
                <small>{{ $t("common.threeDaysAgo") }}</small>
              </div>

              <div class="mb-1">
                <div v-html="selecteItem.content" />
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import { isEmpty } from "lodash";
import Api from "~/api";
import BaseButtonIcon1 from '../common/BaseButtonIcon1.vue';

export default {
  components: { BaseButtonIcon1 },
  data: function () {
    return {
      news: null,
      total_pages: 1,
      selectedPage: 1,
      showInfo: false,
      selecteItem: null,
      page: 1,
      isEmpty,
      isCkliced:false,
    };
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  created() {
    this.getWhatsNews();
  },
  computed: {
    getIsClicked() {
      return this.isCkliced
    }
  },
  methods: {
    changePage(page) {
      this.selectedPage = page;
      this.getWhatsNews();
      scrollTopHandler();
    },
    getWhatsNews() {
      this.news = null;
      Api.get(`/user/whats-new?page=${this.selectedPage}`)
        .then((response) => {
          this.total_pages = response.data.total_pages;
          this.news = response.data.news;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    readMore(item) {
      this.showInfo = true;
      this.selecteItem = item;
      scrollTopHandler();
      if (item.read == 1) return;
      Api.post("/user/whats-new/read", { id: item.id })
        .then((response) => {
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }));

      this.getWhatsNews();
    },

  },
};
</script>
<style scoped>
.whatsNewCalsss .pad-top ul li {
  border: 1px solid #f07905;
  margin-bottom: 0px;
}
.scaling {
  transition: all 0.2s ease-in-out;
}

.scaling:hover {
  transform: scale(1.01);
}

.readedClass {
  background-color: #fffaf4;
  border: 1px solid #605e5d !important;
}
.vertical-line {
  top: 0px;
  border-radius: 4px 0px 0px 4px;
  width: 8px;
  background: #f07905 !important;
}
.readedClass .vertical-line {
  background: #605e5d !important;
}
.text-theam {
  color: #f07905 !important;
}

</style>
