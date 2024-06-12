<template>
  <div
    :class="{ 'text-right': getIsAr }"
    v-images-loaded.on="updateIsotope">
    <Carousel
      class="rounded-5"
      :options="baseSlider6"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="swiper-slide boxed-slide rounded-5"
        :class="`boxed-slide-${index}`"
      >
          <img
            style="width: 100%"
            class="slide-bg ml-auto mr-auto"
            :src="slide.image"
            alt="banner"

          />
      </div>
    </Carousel>
    <div class="container mt-3">
      <div class="d-flex">
        <h1 class="text-center unlock-service-title">{{ $t("services.unlockServices") }}</h1>
        <button type="button" class="border-0 bg-white " @click="downloadPDF">
          <img src="../static/images/pdf-logo.png" class="pdf-logo mb-1" alt="PDF Button">
        </button>
      </div>


      <b-container style="text-align: center">
        <!-- Main table element -->
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>
        <b-table
          id="my-table"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          sort-icon-left
          responsive="sm"
          stacked="md"
          bordered
          striped
          show-empty
          small
          @filtered="onFiltered"
        >
          <template v-slot:cell(id)="row">
            <div style="text-align: -webkit-center">
              {{ calculateOverallIndex(row) }}
            </div>
          </template>
          <template v-slot:cell(image)="row">
            <div style="text-align: -webkit-center">
              <img :src="row.value" width="100" height="100" style="text-align: -webkit-center"  />
            </div>
          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rowss"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>

        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
          <pre>{{ infoModal.content }}</pre>
        </b-modal>
      </b-container>

    </div>
    <div class="container">
      <button class="mt-2 text-center align-items-center ml-auto mr-auto d-flex whatsapp-button p-3 mb-2"
      @click="orderWhatsapp"
      >
        {{ $t("pincode.orderUsingWhatsapp") }}
        <i
          style="font-size: larger"
          class="py-3 px-3 rounded-3 fab fa-whatsapp"
        ></i>
      </button>
    </div>

    <div class="container mt-lg-3">
      <div class="row">
        <div class="col-lg-6">
          <img src="images/unlock-remote-services/unlocking-service-1.jpg" class="m-auto" width="80%" />
        </div>
        <div class="col-lg-6">
          <h3 class="h3-unlock-remote">{{ $t("services.toEnsure") }}</h3>
          <ul style="list-style-type: circle">
            <li class="unlock-service-list">
              {{ $t("services.chooseARep") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.ensureSecure") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.packItens") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.useadequate") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.ensureBattery")}}
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 mt-auto mb-auto">
          <h3 class="h3-unlock-remote">{{ $t("services.regardingthe")}}</h3>
          <p class="unlock-remote-p">
            {{ $t("services.technolockkeys")}}
          </p>
          <p class="unlock-remote-p">
            {{ $t("services.askeysandremote")}}
          </p>
        </div>
        <div class="col-lg-6">
          <img src="images/unlock-remote-services/unlocking-service-2.jpg" class="m-auto" width="80%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from 'vue-ssr-carousel';
import {baseSlider6} from "~/utils/data/carousel";
import Api from "~/api";
import {mapGetters} from "vuex";

export default {
  name: "unlock-remote-services",
  components: {
    Carousel,
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    baseSlider6() {
      return baseSlider6;
    },
    rowss() {
      return this.items.length
    }
  },

  mounted() {
    // this.$Progress.start();
    Api.get("/unlock-remote")
      .then((response) => {
        const data = response.data; // Assuming response.data is the array you provided
        this.uniqueMakes = [...new Set(data.map(item => item.make))];
        this.uniqueModels = [...new Set(data.map(item => item.model))];
        this.uniqueFromToYears = [...new Set(data.map(item => `${item.from} - ${item.to}`))];
        this.rows = response.data.map(item => ({
          ...item,
          year: `${item.from} - ${item.to}`,
          image: item.image
        }));


        this.items = this.rows.map(item => ({
          image: item.image,
          make: item.make,
          model: item.model,
          description: item.description,
          year: item.year,
        }));
        // this.$Progress.finish();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    this.$emit("unlock-remote", true);
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: '#',
        },
        {
          key: 'image',
          label: 'Image',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: 'make',
          label: 'Make',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: 'model',
          label: 'Model',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: 'description',
          label: 'Description',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
          key: 'year',
          label: 'From - To',
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      items: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },


      uniqueMakes : [],
      uniqueModels: [],
      uniqueFromToYears: [],
      slides: [
        { image: "images/unlock-remote-sliders/alpha-romeo.jpg" },
        { image: "images/unlock-remote-sliders/kia.jpg" },
        { image: "images/unlock-remote-sliders/chrysler.jpg" },
        { image: "images/unlock-remote-sliders/hyundai.jpg" },

      ],
      rows: [],
    };
  },
  methods: {
    calculateOverallIndex(row) {
      // Assuming this.currentPage starts from 1
      return (this.currentPage - 1) * this.perPage + row.index + 1;
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    downloadPDF() {
      const pdfUrl = '/pdf/Techno-lock-keys-unlock-service-list.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Techno-lock-keys-unlock-service-list.pdf';
      link.target = '_blank'; // Open in a new tab
      link.click();
    },
    updateIsotope: function () {
      if (this.$refs.introIso) {
        this.$refs.introIso.layout("masonry");
      }
    },
    orderWhatsapp(){
      window.open(
        `https://api.whatsapp.com/send?phone=${this.$settings.contact.whatsapp}&text=i want to know more about the online services`,
        "_blank"
      );
    }
  },
};
</script>

<style>
.footer__row-count{
  display: none!important;
}
.vgt-global-search{
  height: 50px!important;
  padding: 8px;
}
table.vgt-table td{
  vertical-align: middle;
  text-align: center;
}
li.unlock-service-list, p.unlock-remote-p{
  font-size: 18px;
  line-height: 25px;
  font-family: sans-serif;
  padding: 7px;
  color: #757575;
}
h3.h3-unlock-remote{
  font-size: 23px;
}
.whatsapp-button{
  background-color: #2ba968;
  border: 1px solid #2ba968;
  border-radius: 6px;
  transition: all 0.2s ease-in;
  font-size: 1em;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease-out;
  box-shadow: 0px 1px 2px #2ba968;
}
.unlock-service-title{
  font-size: 36px;
  color: black;
  width: fit-content;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
