<template>
  <div>
    <div
      class="clearfix d-flex align-items-center justify-content-between my-5 w-100">
      <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1" v-if="checkout !==true">
        <i class="orange-1 sicon-credit-card align-middle mx-2 pr-1" />{{
          $t("account.creditCard")
        }}
      </h3>
      <base-button-icon-1
        v-if="checkout !== true"
        style="width: 150px"
        class="p-4 checkout-buttons text-center"
        @click="showForm = true"
        :outline="true"
      >
        <i class="icon-plus"></i>
        {{ $t("account.add_card") }}</base-button-icon-1
      >
    </div>

    <div v-if="!cards" class="addressposition-relative pl-5">
      <div class="loading" />
      <div class="address-box">
        {{ $t("account.loading_cards") }}
      </div>
    </div>

    <div v-else-if="cards && isEmpty(cards)" class="address text-center">
      <div class="address-box">
        {{ $t("account.not_card") }}
      </div>

      <base-button-icon-1
        @click="openCardFormModal(null),displayAddressInCheckout()"
        :outline="true"
        style="width: 150px"
        class="py-4 checkout-buttons"
        >{{ $t("account.add_card") }}</base-button-icon-1
      >
    </div>

    <div v-else>
      <div class="row">
        <div v-for="(card, index) in cards" :key="index" class="col-md-4 mb-2">
          <div class="cardsClass" @click="deleteCard(card)">
<!--            <vue-paycard-->
<!--              :has-random-backgrounds="false"-->
<!--              :set-type="card.brand"-->
<!--              :value-fields="cardsValue(card)"-->
<!--              :is-card-number-masked="false"-->
<!--            />-->
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" v-if="showForm == true">
      <base-button-icon-1
        class="p-4 checkout-buttons w-100"
        @click="showForm = false"
        :outline="true"
      > Close</base-button-icon-1
      >
    </div>

    <div v-if="cards && !isEmpty(cards)" class="address text-center mb-1">
      <base-button-icon-1
        v-if="checkout ==true"
        class="py-4 px-5 checkout-buttons"
        @click="openCardFormModal(null),displayAddressInCheckout()"
        :outline="true">
        {{ $t("account.add_card") }}
      </base-button-icon-1>
    </div>

    <CardsDialog
      v-if="showForm"
      @close="closedEvent"
      :checkout="checkout"
      :displayCardsInCheckout =displayCardsInCheckout
    />
    <ConfirmDelete
      :api="apiToDelete"
      :delete-form="deleteForm"
      @close="closedEvent"
    />
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import CardsDialog from "~/components/account/PvCardFormModal";
import ConfirmDelete from "~/components/common/ConfirmCardDelete";
// import VuePaycard from "vue-paycard";

import { isEmpty } from "lodash";
import Api from "~/api";

export default {
  components: {
    ConfirmDelete,
    // VuePaycard,
    CardsDialog,
  },
  data: function () {
    return {
      showForm: false,
      displayCardsInCheckout: false,
      cards: null,
      selectedAddressToUpdate: {},
      typeForm: "add",
      apiToDelete: "",
      deleteForm: {
        id: null,
      },
      isEmpty,
    };
  },
  created() {
    this.getCards();
  },
  props: ['checkout'],
  methods: {
    cardsValue(card) {
      let valueFields = {
        cardName: "",
        cardNumber: `#### #### #### ${card.last4}`,
        cardMonth: null,
        cardYear: null,
        cardCvv: null,
        type: card.brand,
      };
      return valueFields;
    },
    getCards() {
      this.cards = null;
      // this.$Progress.start();
      Api.get("/card?length=1000000")
        .then((response) => {
          this.cards = response.data.cards;
          // scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
      // this.$Progress.finish();
    },
    closedEvent() {
      this.$bvModal.hide("bv-modal-card");
      this.getCards();
    },

    openCardFormModal() {
      this.$bvModal.show("bv-modal-card");
    },
    deleteCard(card) {
      this.$bvModal.show("modalConfirmDeleteCard");
      this.deleteForm.id = card.card_id;
      this.apiToDelete = "card/delete";
    },
    displayAddressInCheckout(){
      this.displayCardsInCheckout = true;
    },
  },
};
</script>

<style>
.cardsClass .card-item__side {
  width: 100%;
  height: 170px;
  cursor: pointer;
}
.cardsClass .cardContainer {
  width: 100%;
  height: 170px;
}
.cardsClass .card-item__typeImg {
  width: 50px;
}
.cardsClass .card-item__wrapper {
  padding: 25px 5px;
  direction: ltr !important;
}
.cardsClass .card-item__chip {
  width: 45px;
}
.cardsClass .card-item__number {
  font-size: 12px;
}
.cardsClass .card-item__numberItem.-active {
  width: 10px;
}
.cardsClass .card-item__numberItem {
  width: 11px;
}
.cardsClass .card-item__content,
.clearfix::after {
  display: none !important;
}
.cardsClass .card-item__type {
  margin: 0px 6px;
  display: block;
  height: auto;
  width: max-content;
}
.cardsClass .card-item__top {
  align-items: center !important;
}
.checkout-buttons{
  background-color: #892118;
  color: white;
  border: 1px solid white;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  box-shadow: 0px 1px 2px white;
  transition: all 0.1s ease;
}
</style>
