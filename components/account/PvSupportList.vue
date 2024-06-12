<template>
  <div>
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      <i class="orange-1 sicon-wrench align-middle mx-2" />
      {{ $t("account.support") }}
    </h3>


    <div style="font-size: 2rem" class="w-100 d-flex justify-content-center">
      <base-button-icon-1
        @click="(showCreate = !showCreate), (showDetials = false)"
        :outline="true"
        class="text-center w-25"
        ><i
          :class="
            !showCreate ? 'fas fa-plus-circle' : 'fas fa-arrow-alt-circle-left'
          " />
        <p
          v-text="
            !showCreate
              ? $t('support.createTicket')
              : $t('support.backToSupport')
          "
      /></base-button-icon-1>
    </div>

    <div v-if="showCreate && !showDetials" class="pt-5">
      <div class="row">
        <div
          :class="
            selectedTickitType.value == 'order' ||
            selectedTickitType.value == 'product'
              ? 'col-lg-6'
              : 'col-lg-12'
          "
        >
          <div class="form-group required-field">
            <label for="contact-type" class="mb-0">
              {{ $t("account.type") }}</label
            >

            <AutoComplate
              v-model="selectedTickitType"
              :options="typesOptions"
              @setValue="selectedTickitType = $event"
            />
            <pv-error :error-msg="errorMsgCreate.type" />
          </div>
        </div>
        <div v-if="selectedTickitType.value == 'product'" class="col-lg-6">
          <div
            class="form-group required-field"
            style="margin-bottom: 0 !important"
          >
            <label for="contact-type" class="mb-0">{{
              selectedTickitType.name
            }}</label>
            <input
              id="search_term"
              v-model="searchProductKey"
              class="form-control"
              type="text"
              name="search_term"
              placeholder="Search a product"
              required
              autocomplete="off"
              @input="searchProduct"
            />

            <div class="live-search-list">
              <div
                v-if="productsBySearch.length > 0"
                class="search-suggests"
                style="top: calc(100% + -17px)"
              >
                <b-list-group
                  style="
                    z-index: 100;
                    height: 266px;
                    position: absolute;
                    width: 100%;
                    overflow: auto;
                  "
                >
                  <b-list-group-item
                    v-for="(product, index) in productsBySearch"
                    :key="index"
                    class="pruductSearch"
                    style="text-align: start"
                    @click="setProduct(product)"
                  >
                    <img
                      loading="lazy"
                      :src="product['gallery'][0]['s']['url']"
                      :alt="product['short_title']"
                      width="50"
                      class="d-inline-block"
                      style="
                        border: 1px solid #d2d2d2;
                        border-radius: 50%;
                        object-fit: fill;
                      "
                    />
                    <span>{{ product["short_title"] }}</span>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedTickitType.value == 'order'" class="col-lg-6">
          <div class="form-group required-field">
            <label for="contact-type" class="mb-0">{{
              $t("orders.muOrder")
            }}</label>
            <AutoComplate
              v-model="dataForm.model_id"
              :options="usersOrders"
              :item-text="'order_id'"
              @setValue="setOrder"
            />
          </div>
        </div>

        <div class="col-lg-12">
          <div class="form-group required-field">
            <label for="contact-subject" class="mb-0">{{
              $t("contact.subject")
            }}</label>

            <input
              id="contact-subject"
              v-model="dataForm.subject"
              type="text"
              class="form-control"
              name="contact-subject"
            />
            <pv-error :error-msg="errorMsgCreate.subject" />
          </div>
        </div>

        <div class="col-lg-12">
          <div class="form-group required-field pb-0 mb-0">
            <label for="contact-message" class="mb-0">{{
              $t("contact.message")
            }}</label>
            <vue-editor
              v-model="dataForm.details"
              :editorToolbar="customToolbar"
            />
            <pv-error :error-msg="errorMsgCreate.details" />
          </div>

          <div class="form-group">
            <label for="contact-message" class="mb-0">{{
              $t("support.files")
            }}</label>
            <b-form-file
              size="lg"
              multiple
              :file-name-formatter="formatNamesNew"
              style="text-align: start"
              class="mt-"
            />
            <pv-error :error-msg="errorMsgCreate.files" />
          </div>

          <div class="text-center">
            <!--  <button
              class="btn btn-warning text-light mr-0 mb-2 py-3"

            >
              <span v-if="!loadingCreateTicket">
                {{ $t("contact.sendTicket") }}
              </span>
              <b-spinner v-else style="color: #f07905" />
            </button> -->

            <base-button-icon-1
              style="width: 150px"
              :outline="true"
              @click="createNewSuport"
              class="py-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                viewBox="0 96 960 960"
                width="25"
                fill="#ff6800"

              >
                <path
                  d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"
                />
              </svg>

              <span class="text-center mx-2" v-if="!loadingCreateTicket">
                {{ $t("contact.sendTicket") }}
              </span>
              <b-spinner v-else style="color: #f07905"
            /></base-button-icon-1>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!showCreate && !showDetials" class="supportList mt-3" >
      <b-card no-body >
        <b-card-header class="text-center" header-tag="nav">
          <h3>{{ $t("support.supportTable") }}</h3>
        </b-card-header>
        <b-card-body style="overflow: scroll;" class="">
          <table class="table">
            <thead>
              <tr style="border: none">
                <th scope="col" style="border: none">
                  <b>{{ $t("support.TicketID") }}</b>
                </th>
                <th scope="col " style="border: none">
                  <b>{{ $t("support.subject") }}</b>
                </th>
                <th scope="col" style="border: none">
                  <b>{{ $t("support.status") }}</b>
                </th>
                <th scope="col" style="border: none">
                  <b>{{ $t("support.creationDate") }}</b>
                </th>
                <th scope="col" style="border: none">
                  <b>{{ $t("support.lastReply") }}</b>
                </th>
                <th scope="col" style="border: none">
                  <b>{{ $t("support.viewDetails") }}</b>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(ticket, index) in supports" :key="index">
                <td class="py-4">
                  {{ ticket.system_id }}
                </td>

                <td class="py-4">
                  <span class="px-2" style="cursor: pointer">
                    {{ ticket.subject }}
                  </span>
                </td>

                <td class="py-4">
                  <b-badge
                    class="text-light"
                    :variant="checkStatus(ticket.status)"
                  >
                    {{ ticket.status }}
                  </b-badge>
                </td>
                <td class="py-4">
                  <b-badge>
                    {{ ticket.created_at }}
                  </b-badge>
                </td>

                <td class="py-4">
                  <b-badge v-if="ticket.last_reply != '-'" variant="primary">
                    {{ ticket.last_reply }}
                  </b-badge>

                  <b-badge v-if="ticket.last_reply == '-'" variant="danger">
                    {{ " " + ticket.last_reply + " " }}
                  </b-badge>
                </td>

                <td class="py-4">
                  <a
                    style="color: #f07905; cursor: pointer"
                    @click="openSupportInfo(ticket.system_id)"
                    >{{ $t("support.viewDetails") }}</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-body>
      </b-card>
    </div>
    <div v-else-if="showDetials" class="mt-3">
      <b-card no-body>
        <b-card-header>
          #{{ ticketInfoVal.system_id }}
          |
          <small
            >{{ ticketInfoVal.sent_at }}
            <b-badge class="mr-3" :variant="checkStatus(ticketInfoVal.status)">
              {{ ticketInfoVal.status }}
            </b-badge>
          </small>
        </b-card-header>

        <b-card-body>
          <b>subject : </b> {{ ticketInfoVal.subject }}
          <br />
          <b>message : </b>
          <br />
          <p v-if="ticketInfoVal.type == 'product'">
            <b>Product : </b>
            {{ ticketInfoVal.model }}
          </p>
          <p v-if="ticketInfoVal.type == 'order'">
            <b>Order : </b>
            {{ ticketInfoVal.model }}
          </p>
          <p v-if="ticketInfoVal.files">
            <b>Files : </b>
            <a
              class="text-warning"
              :href="file.image_path"
              v-for="(file, index) in ticketInfoVal.files"
              :key="index"
            >
              <br v-if="index > 0" />
              <i class="sicon-cloud-download"></i> {{ file.image_name }}
            </a>
          </p>

          <p v-html="ticketInfoVal.details"></p>
        </b-card-body>

        <b-card-body
          v-if="ticketInfoVal.replies.length > 0"
          class="text-center pt-3 pb-0"
        >
          <div class="pad-top">
            <ul class="list-group list-group-flush">
              <li
                v-for="(replay, index) in ticketInfoVal.replies"
                :key="index"
                class="list-group-item px-0"
              >
                <div class="media">
                  <a class="media-left" href="#">
                    <span class="avatar avatar-sm mr-3">
                      <img loading="lazy" :src="replay.avatar" />
                    </span>
                  </a>
                  <div class="media-body">
                    <div class="comment-header">
                      <span class="text-bold h6 text-muted">{{
                        replay.from
                      }}</span>
                      <p class="text-muted text-sm fs-11">
                        {{ replay.created_at }}
                      </p>
                    </div>
                  </div>
                </div>
                <div style="text-align: initial">
                  <div v-html="replay.reply" />
                  <div class="mt-1">
                    <a
                      v-for="(file, indexFile) in replay.files"
                      :key="indexFile"
                      :href="file.image_path"
                      target="_blank"
                    >
                      <b-badge class="mr-3" variant="dark">
                        {{ file.image_name }}
                      </b-badge>
                    </a>
                  </div>
                  <br />
                </div>
              </li>
            </ul>
          </div>
        </b-card-body>
        <b-card-body
          v-if="ticketInfoVal.status != 'solved'"
          class="text-center pt-3 pb-0"
        >
<!--          <vue-editor v-model="reply" :editorToolbar="customToolbar" />-->
          <pv-error :error-msg="errorMsg.reply" />
          <b-form-file
            size="lg"
            multiple
            :file-name-formatter="formatNames"
            style="text-align: start"
            class="mt-2"
          />
          <pv-error :error-msg="errorMsg.files" />
          <div style="text-align-last: end" class="mt-1">
            <button
              class="btn btn-warning text-light mr-0 mb-2 py-3"
              @click="sendReply()"
            >
              <span v-if="!loadingReplayTicket">
                <i class="fa fa-paper-plane" /> {{ $t("support.send") }}
              </span>
              <b-spinner v-else style="color: #f07905" />
            </button>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>




<script>
// import { VueEditor } from "vue2-quill-editor";
import PvError from "~/components/common/ErrorMessage.vue";
import AutoComplate from "~/components/common/AutoComplate.vue";

import { scrollTopHandler } from "~/utils";
import Api from "~/api";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";

export default {
  components: {
    // VueEditor,
    PvError,
    AutoComplate,
    BaseButtonIcon1,
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[
        this.$i18n.locale
      ],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    };
  },
  data() {
    return {
      searchProductKey: "",
      usersOrders: [],
      selectedOrder: {},
      searchOrderKey: "",
      selectedTickitType: { name: "Other", value: "other" },
      typesOptions: [
        { name: "Order", value: "order" },
        { name: "Product", value: "product" },
        { name: "Support", value: "support" },
        { name: "Shipping", value: "shipping" },
        { name: "Other", value: "other" },
      ],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],

        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ color: [] }],
      ],
      productsBySearch: [],
      showCreate: false,
      showDetials: false,
      loadingInfo: false,
      loadingCreateTicket: false,
      loadingReplayTicket: false,
      supports: [],
      files: [],
      filesNew: [],
      ticketInfoVal: null,
      dataForm: {
        subject: "",
        details: "",
        type: "other",
        model_id: "",
      },

      reply: "",
      errorMsgCreate: {
        details: [],
        subject: [],
        files: [],
      },
      errorMsg: {
        reply: [],
        files: [],
      },
    };
  },
  created() {
    // this.$Progress.start();
    this.getSupport();
    this.getOrders();
    // this.$Progress.finish();
  },
  methods: {
    getSupport() {
      this.supports = [];
      Api.get("/tickets")
        .then((response) => {
          this.supports = response.data.tickets;
          for (let index = 0; index < this.supports.length; index++) {
            this.$set(this.supports[index], "opend", false);
          }
          if (this.supports.length > 0) {
            this.selectedTicketId = this.supports[0]["system_id"];
          }
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    setProduct(product) {
      this.searchProductKey = product.title;
      this.dataForm.model_id = product.sku;
    },
    setOrder(order) {
      if (!order) {
        (this.selectedOrder = {}), (this.dataForm.model_id = null);
        return;
      }
      this.selectedOrder = order;
      this.dataForm.model_id = order.order_id;
    },

    searchProduct() {
      if (!this.searchProductKey || this.searchProductKey == " ") {
        this.productsBySearch = [];
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          if (!this.searchProductKey || this.searchProductKey == " ") {
            this.productsBySearch = [];
            return;
          }

          let query = `?search=${this.searchProductKey}`;
          Api.get(`shop${query}`)
            .then((response) => {
              this.productsBySearch = response.data.products;
              // eslint-disable-next-line no-console
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        }, 500);
      }
    },
    getOrders() {
      Api.get("/user/orders?lenght=10000000")
        .then((response) => {
          this.usersOrders = response.data.orders;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    formatNames(files) {
      this.files = files;
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    formatNamesNew(files) {
      this.filesNew = files;
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    sendReply() {
      this.loadingReplayTicket = true;
      let formData = new FormData();
      formData.append("reply", this.reply);
      formData.append("ticket_id", this.ticketInfoVal.id);

      for (let index = 0; index < this.files.length; index++) {
        formData.append(`files[${[index]}]`, this.files[index]);
      }

      Api.post("/tickets/reply", formData)
        .then((response) => {
          this.files = [];
          this.reply = "";
          scrollTopHandler();
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.message,
          });
          this.openSupportInfo(this.ticketInfoVal.system_id);
        })
        .catch((err) => {
          this.errorMsg = err.response.data.data;
        })
        .finally(() => {
          this.loadingReplayTicket = false;
        });
    },
    createNewSuport() {
      this.loadingCreateTicket = true;
      let formData = new FormData();

      formData.append("subject", this.dataForm.subject);
      formData.append("details", this.dataForm.details);
      formData.append("type", this.selectedTickitType.value);
      if (this.dataForm.model_id) {
        formData.append("model_id", this.dataForm.model_id);
      }

      for (let index = 0; index < this.filesNew.length; index++) {
        formData.append(`files[${[index]}]`, this.filesNew[index]);
      }
      Api.post("/tickets/create", formData)
        .then((response) => {
          (this.dataForm.subject = ""), (this.dataForm.details = "");

          this.errorMsgCreate = {
            name: [],
            details: [],
            files: [],
          };
          scrollTopHandler();
          this.getSupport();
          (this.showDetials = false), (this.showCreate = false);
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.message,
          });
        })
        .catch((err) => {
          scrollTopHandler();
          this.errorMsgCreate = err.response.data.data;
        })
        .finally(() => {
          this.loadingCreateTicket = false;
        });
    },
    openSupportInfo(id) {
      this.loadingInfo = true;
      Api.get(`/tickets/${id}`)
        .then((response) => {
          this.ticketInfoVal = response.data.ticket;
          this.showDetials = true;
          this.showCreate = true;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }))
        .finally(() => {
          this.loadingInfo = false;
        });
    },
    checkStatus(status) {
      if (status == "solved") {
        return "success";
      } else if (status == "pending") {
        return "info";
      } else if (status == "open") {
        return "warning";
      }
    },
  },
};
</script>


<style>
.createTicket {
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 250px;
  margin: auto;
  height: 150px;
  box-shadow: 0px 0px 10px 2px #ddd;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}

.createTicket:hover {
  box-shadow: 0px 0px 10px 2px #bbb;
}

.createTicket i {
  font-size: 50px;
  margin: auto;
  display: block;
  text-align: center;
  margin-top: 25px;
  color: #ccc;
}

.createTicket p {
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  color: #f07905;
}

.subTable {
  width: calc(100% + 65px);
}

.subTable tr:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

.pad-top .media {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
}

.pad-top .media .media-left {
  width: 50px;
}

.pad-top .media .media-body {
  text-align: start;
  padding-left: 10px;
  padding-right: 10px;
}

.pad-top .avatar img {
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  border-radius: 50%;
  height: 100%;
}
.card {
  border-radius: 10px !important;
}
</style>
