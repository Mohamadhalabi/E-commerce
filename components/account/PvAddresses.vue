<template>
  <div>
    <div class="clearfix d-flex align-items-center justify-content-between">
      <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1" v-if="checkout !=true">
        {{ $t("account.address") }}
      </h3>
      <div v-if="addresses && !isEmpty(addresses)" class="address">
        <base-button-icon-1
          v-if="checkout !== true"
          style="width: 150px"
          class="py-4 checkout-buttons"
          @click="openAddressFormModal(null),displayAddressInCheckout(), scrollToDiv()"
          :outline="true">
          <i class="icon-plus"></i>
          {{ $t("account.add_address") }}</base-button-icon-1>
      </div>
    </div>
    <div v-if="!addresses" class="address position-relative pl-5">
      <div class="loading" />
      <div class="address-box">
        {{ $t("account.loading_addresses") }}
      </div>
    </div>
    <div class="d-flex align-items-center flex-column mb-1 mt-2" v-else-if="addresses && isEmpty(addresses)">
      <div class="address-box s text-center" v-if="checkout !== true">
          {{ $t("address.noAddress") }}
      </div>
      <div style="display: flex;justify-content: center;">
      <div v-if="displayAddressFormInCheckout == false">
      <base-button-icon-1
        v-if="checkout !== true"
        :outline="true"
          @click="openAddressFormModal(null),scrollToDiv()"
        class="address px-2 py-4 checkout-buttons mr-2"
      ><i class="icon-plus"></i>
        {{ $t('address.addNewAddress') }}
      </base-button-icon-1>
      <base-button-icon-1
        v-else
        :outline="true"
        @click="openAddressFormModal(null),displayAddressInCheckout(), scrollToDiv()"
        class="address px-2 py-4 checkout-buttons mr-2"
      ><i class="icon-plus"></i>
        {{ $t('address.addNewAddress') }}
      </base-button-icon-1>
      </div>
        <div class="address text-center mb-1" v-if="addresses && isEmpty(addresses) && this.close == true">
          <base-button-icon-1
            style="width: 150px;"
            class="py-4"
            @click="closeAddNewAddress()"
            :outline="true"
          > Close</base-button-icon-1
          >
      </div>
      </div>

    </div>
    <div v-else>
      <div class="row mt-2">
        <div
          v-for="(address, index) in addresses"
          :key="index"
          :class="getAddressClass(addresses.length)"
          class=""
          style="border-radius: 6px;"
        >
          <div class="text-center">
          <b-card
            :class="{'selectedCard': address === selectedAddress}"
            style="border-radius: 10px; margin-top: 3px"
            class="address-card"
            @click="selectAddress(address)"
          >
            <!-- Add a radio button input inside the b-card -->
            <input
              type="radio"
              :name="'address-radio-' + index"
              :checked="address === selectedAddress"
              style="position: absolute; opacity: 0; pointer-events: none;"
            />
            <b-card-text class="addressInfoP">
              <div class="mb-1">
                <span>
                  <b>{{ $t("checkout.addrress") }}:</b>
                  {{`${address.address} ${address.city} ${address.country.country_name}`}}
                </span>
              </div>

              <div class="mb-1">
                <span>
                  <b>{{ $t("checkout.phone") }}:</b>
                  {{ `${address.phone}` }}
                </span>
              </div>
            </b-card-text>

            <template #header>
              <div style="text-align-last: justify">
                <a
                  v-b-modal.modalConfirmDelete
                  class="scalling"
                  style="color: #892118; cursor: pointer; display: inline-block"
                  @click="openDeleteConfirm(address)"
                >
                  <small
                    ><i class="fa fa-trash-alt" />
                    {{ $t("common.delete") }}</small
                  >
                </a>
                <base-button-icon-1
                  @click="openAddressFormModal(address),displayAddressInCheckout()"
                  :outline="true"
                  class="px-2"
                >
                  <i class="fa fa-edit" />
                  {{ $t("common.edit") }}</base-button-icon-1
                >
              </div>
            </template>
          </b-card>
            <input
              type="radio"
              :name="'address-radio-' + index"
              :checked="address === selectedAddress"
              class="radio"
            />
          </div>
<!--          <div v-else>-->
<!--            <b-card-->
<!--              :class="{'defoultCard': address.default && !clicked, 'selectedCard': address === selectedAddress && clicked}"-->
<!--              @click="selectAddress(address)"-->
<!--            >-->
<!--              &lt;!&ndash; Add a radio button input inside the b-card &ndash;&gt;-->
<!--              <input-->
<!--                type="radio"-->
<!--                :name="'address-radio-' + index"-->
<!--                :checked="address === selectedAddress"-->
<!--                style="position: absolute; opacity: 0; pointer-events: none;"-->
<!--              />-->
<!--              <b-card-text class="addressInfoP">-->
<!--                <div class="mb-1">-->
<!--                    <span class="p-0">-->
<!--                      <b>{{ $t("checkout.addrress") }}: </b>-->
<!--                      {{`${address.address} ${address.city} ${address.country.country_name}` }}-->
<!--                    </span>-->
<!--                </div>-->

<!--                <div class="">-->
<!--                  <span class="p-0"><b>{{ $t("checkout.phone") }}:</b> {{ `${address.phone}` }}</span>-->
<!--                </div>-->
<!--              </b-card-text>-->

<!--              <template #header>-->
<!--                <div style="text-align-last: justify">-->
<!--                  <a-->
<!--                    v-b-modal.modalConfirmDelete-->
<!--                    class="scalling"-->
<!--                    style="color: #f07905; cursor: pointer; display: inline-block"-->
<!--                    @click="openDeleteConfirm(address)"-->
<!--                  >-->
<!--                    <small-->
<!--                    ><i class="fa fa-trash-alt" />-->
<!--                      {{ $t("common.delete") }}</small-->
<!--                    >-->
<!--                  </a>-->
<!--                  <base-button-icon-1-->
<!--                    @click="openAddressFormModal(address),displayAddressInCheckout(), scrollToDiv()"-->
<!--                    :outline="true"-->
<!--                    class="px-2"-->
<!--                  >-->
<!--                    <i class="fa fa-edit" />-->
<!--                    {{ $t("common.edit") }}</base-button-icon-1-->
<!--                  >-->
<!--                </div>-->
<!--              </template>-->
<!--            </b-card>-->
<!--          </div>-->
        </div>
      </div>
    </div>


    <div class="d-lg-flex d-md-flex justify-content-md-center d-sm-flex justify-content-sm-center justify-content-lg-center">
      <div v-if="addresses && !isEmpty(addresses)" class="address text-center mb-1 mr-2">
        <base-button-icon-1
          v-if="checkout == true"
          style="width: 150px;"
          class="py-4 checkout-buttons"
          @click="openAddressFormModal(null),displayAddressInCheckout()"
          :outline="true"
        >          <i class="icon-plus"></i>
          {{ $t("account.add_address") }}</base-button-icon-1
        >
      </div>
      <div class="address text-center" v-if="addresses && !isEmpty(addresses) && this.close == true">
        <base-button-icon-1
          style="width: 150px;"
          class="py-4 close-button"
          @click="closeAddNewAddress()"
          :outline="true"
        > Close</base-button-icon-1
        >
      </div>
    </div>
    <AddressDialog
      ref="myDiv"
      :address-info="selectedAddressToUpdate"
      :type-form="typeForm"
      :checkout="checkout"
      :displayAddressFormInCheckout =displayAddressFormInCheckout
      @close="closedEvent"
      @buttonPressed="ButtonPressed"
    />
    <ConfirmDelete :api="apiToDelete" @close="closedEvent" />
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import AddressDialog from "~/components/account/PvAddressFormModal";
import ConfirmDelete from "~/components/common/ConfirmDelete";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";

import { isEmpty } from "lodash";
import Api from "~/api";

export default {
  components: {
    AddressDialog,
    ConfirmDelete,
    BaseButtonIcon1,
  },
  data: function () {
    return {
      close: false,
      clicked:false,
      selectedAddress: null,
      addresses: null,
      selectedAddressToUpdate: {},
      typeForm: "add",
      apiToDelete: "",
      isEmpty,
      displayAddressFormInCheckout:false
    };
  },
  props:['checkout'],

  created() {
    this.getAddresses();
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[
        this.$i18n.locale
      ],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    };
  },
  // displayAddressFormInCheckout
  methods: {
    getAddressClass(length) {
      if (length === 1) {
        return 'col-xl-4 col-lg-5 col-md-4 col-sm-6 col-12';
      } else if (length === 2) {
        return 'col-xl-4 col-lg-5 col-md-4 col-sm-6 col-12';
      } else if (length === 3 || length === 4) {
        return 'col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12';
      } else {
        return 'col-xl-3 col-md-4 col-sm-6 col-12';
      }
    },
    closeAddNewAddress(){
      this.close = false
      this.displayAddressFormInCheckout = false
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.clicked = true


      this.$emit("DefaultAddress",true)
      this.$emit("address",address)
    },
    scrollToDiv() {
      // const element = this.$refs.myDiv;
      // const offset = element.$el.offsetTop + 0;
      // window.scrollTo({
      //   top: offset,
      //   behavior: 'smooth'
      // });

      this.close = true
    },
    ButtonPressed(newValue){
      this.displayAddressFormInCheckout = newValue
      this.clicked = false
      this.close = false
    },
    displayAddressInCheckout(){
      this.displayAddressFormInCheckout = true;
      this.close = true
    },
    getAddresses() {
      this.addresses = null;
      Api.get("/user/addresses?length=1000")
        .then((response) => {
          this.addresses = response.data.addresses;
          if(response.data.length == 0){
            this.displayAddressFormInCheckout = true
          }

          scrollTopHandler();

          const hasDefaultOne = this.addresses.some(obj => obj.default === 1);
          this.selectedAddress = this.addresses.find(address => address.default);
          if(hasDefaultOne == true) {
            this.$emit("address",this.selectedAddress)
          }
          this.$emit("DefaultAddress",hasDefaultOne)
        })
        .catch((error) => ({ error: JSON.stringify(error) }));

    },

    closedEvent() {
      this.$bvModal.hide("bv-modal-example");
      this.getAddresses();
    },

    openAddressFormModal(address) {
      this.displayAddressFormInCheckout = true
      this.selectedAddressToUpdate = address;
      if (address) {
        this.typeForm = "edit";
      } else {
        this.typeForm = "add";
      }
      this.$bvModal.show("bv-modal-example");
    },

    openDeleteConfirm(address) {
      this.apiToDelete = `user/addresses/${address.id}`;
    },
  },
};
</script>
<style>

.defoultCard , .selectedCard{
  border: 3px solid #f07905;
  border-radius: 10px;
  margin-top: 3px
}

.card-header {
  border-radius: 10px 10px 0px 0px !important ;
}
.checkout-buttons{
  background-color: #892118!important;
  color: white!important;
  font-size: 14px!important;
}
</style>
<style lang="scss">
:root {
  --card-line-height: 1.2em;
  --card-padding: 1em;
  --card-radius: 0.5em;
  --color-green: #558309;
  --color-gray: #e2ebf6;
  --color-dark-gray: #c4d1e1;
  --radio-border-width: 2px;
  --radio-size: 1.5em;
}

.radio {
  font-size: inherit;
  margin: 0;
  right: calc(var(--card-padding) + var(--radio-border-width));
  top: calc(var(--card-padding) + var(--radio-border-width));
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  .radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #fff;
    border: var(--radio-border-width) solid var(--color-gray);
    border-radius: 50%;
    cursor: pointer;
    height: var(--radio-size);
    outline: none;
    transition:
      background 0.2s ease-out,
      border-color 0.2s ease-out;
    width: var(--radio-size);

    &::after {
      border: var(--radio-border-width) solid #fff;
      border-top: 0;
      border-left: 0;
      content: '';
      display: block;
      height: 1rem;
      margin-left: 4px;
      margin-top: 7px;
      transform:
        rotate(45deg)
        translate(-50%, -50%);
      width: 0.5rem;
    }

    &:checked {
      background: var(--color-green);
      border-color: var(--color-green);
    }
  }
}
.address-card{
  margin-bottom: 1rem!important;
  min-height: 200px;
}
</style>
