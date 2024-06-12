<template>
  <div v-if="item.group != 'attributes'">
    <h3 class="widget-title">
        <a
          data-toggle="collapse"
          href="javascript:;"
          :class="{ collapsed: !opened, 'text-right': getIsAr, 'mb-2': !opened ,'mb-1':opened }"
          @click="opened = !opened"
        >{{ item.group_name }}
        </a>
    </h3>
    <vue-slide-toggle :open="opened" class="filter-border-bottom">
      <div class="widget-body">
<!--        <drop-down-item-->
<!--          class="mt-1"-->
<!--          v-if="item.type === 'dropdown'"-->
<!--          :items="item.items"-->
<!--          :group="item.group"-->
<!--          :selectedCategory="selectedCategory"-->
<!--          :slugtype="slugtype"-->
<!--          @filter-query="filterQuery"-->
<!--          @filterquery="filterQuery2"-->
<!--        />-->
        <checkbox-item-category
            class="mt-1"
            v-if="item.type === 'checkbox_category'"
            :items="item.items"
            :group="item.group"
            @filter-query="filterQuery"
        />
        <checkbox-item
          class="mt-1"
          v-if="item.type === 'checkbox'"
          :items="item.items"
          :group="item.group"
          @filter-query="filterQuery"
        />
        <radio-button-item
          class="mt-1"
          v-if="item.type === 'radiobutton'"
          :items="item.items"
          :group="item.group"
          :slugtype="slugtype"
          @filter-query="filterQuery"
        />
<!--        <drop-down-manufacture-item-->
<!--          class="mt-1"-->
<!--          v-if="item.type ==='dropdown_manufactures'"-->
<!--          :selectedManufacture="selectedManufacture"-->
<!--          :items="item.items"-->
<!--          :group="item.group"-->
<!--          :slugtype="slugtype"-->
<!--          @filter-query="filterQuery"-->
<!--        />-->

      </div>
    </vue-slide-toggle>
  </div>
  <div v-else>
    <div class="widget-body"
         v-if="attributeFilters.items.length !==0">
      <template v-for="(filter, index) in attributeFilters.items">
        <div class="filter-toggle" @click="toggleFilter(index)" :class="{'text-right': getIsAr, 'mb-2': !isOpen(index) ,'mb-1':isOpen(index)}">
          <a
            data-toggle="collapse"
            href="javascript:;"
            class="filter-title"
            :class="{
            attributesfiltersClosed: !isOpen(index) && !getIsAr,
            attributesfiltersOpened:isOpen(index) && !getIsAr,
            attributesfiltersClosedAr: !isOpen(index) && getIsAr,
            attributesfiltersOpenedAr:isOpen(index) && getIsAr,
             }">
              {{ index }}
            </a>
        </div>
        <div class="filter-border-bottom2">
          <transition name="filter-slide">
            <checkbox-item
              class="mt-1"
              v-show="isOpen(index)"
              :items="filter"
              :group="index.toLowerCase().replace(/\s+/g, '-')"
              @filter-query="filterQuery"
              :key="index"
            />
          </transition>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import DropDownManufactureItem from "~/components/shop/itemType/DropDownManufactureItem.vue";
import DropDownItem from "~/components/shop/itemType/DropDownItem.vue";
import RadioButtonItem from "~/components/shop/itemType/RadioButtonItem.vue";
import CheckboxItem from "~/components/shop/itemType/CheckboxItem.vue";
import CheckboxItemCategory from '~/components/shop/itemType/CheckboxItemCategory.vue';
import { VueSlideToggle } from "vue-slide-toggle";
import { mapGetters } from "vuex";

export default {
  name: "FilterItem",
  components: {
    DropDownManufactureItem,
    RadioButtonItem,
    CheckboxItem,
    DropDownItem,
    VueSlideToggle,
    CheckboxItemCategory
  },
  props: {
    opened: Boolean,
    name: String,
    item: {
      type: [Object, Array],
      required: false,
    },
    slugtype: String,
    attributeFilters: {
      type: [Object, Array],
      required: false,
    },
    selectedCategory: String,
    selectedManufacture: String,
  },
  data() {
    return {
      openFilters: [],
      attributeOpened: {}, // Track the opened state for each attribute item
    };
  },
  created() {
    // alert(this.selectedManufacture)
    if (this.name === "checkboxes") {
      this.opened = true;
    }
  },
  methods: {
    toggleFilter(index) {
      if (this.isOpen(index)) {
        this.closeFilter(index);
      } else {
        this.openFilter(index);
      }
    },
    isOpen(index) {
      return this.openFilters.includes(index);
    },
    openFilter(index) {
      this.openFilters.push(index);
    },
    closeFilter(index) {
      const filterIndex = this.openFilters.indexOf(index);
      if (filterIndex > -1) {
        this.openFilters.splice(filterIndex, 1);
      }
    },
    filterQuery(data) {
        this.$emit("filter-query", data);
    },
    filterQuery2(data) {
        this.$emit("filter-query", data);
    },
    toggleAttributeOpened(index) {
      this.$set(this.attributeOpened, index, !this.attributeOpened[index]);
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>

<style scoped>
h3.widget-title a.text-right::before,
h3.widget-title a.text-right::after {
  right: initial;
  left: 0px;
}

.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.filter-slide-enter,
.filter-slide-leave-to {
  max-height: 0;
}

.fa-plus, .fa-minus{
  color: #313131;
  font-size: 12px;
}

.rotated {
  transition: all 0.35s;
  transform: rotate(180deg);
}


.filter-toggle:not(:first-child) {
  padding-top: 20px;
}

.filter-toggle{
  cursor: pointer;
  padding-top: 5px;
  transition: ease-out 0.3s;
}
.attributesfiltersOpened::before{
  display: inline-block;
  width: 10px;
  height: 2px;
  background: #535250;
  content: '';
  margin-right: 2px;
  margin-top: 7px;
  float: right;
}
a.attributesfiltersClosed,a.attributesfiltersOpened{
  font-weight: 550;
  color: #313131;
}

.attributesfiltersClosed::before{
  display: inline-block;
  width: 10px;
  height: 2px;
  content: '\002B';
  margin-right: 3px;
  font-size: 22px;
  margin-top: -6px;
  float: right;
  font-weight: normal;
}

.attributesfiltersClosedAr::before{
  display: inline-block;
  width: 10px;
  height: 2px;
  color: #535250;
  content: '\002B';
  margin-right: 3px;
  font-size: 22px;
  margin-top: -6px;
  float: left;
}
.attributesfiltersOpenedAr::before{
  display: inline-block;
  width: 10px;
  height: 2px;
  background: #535250;
  content: '';
  margin-right: 2px;
  margin-top: 7px;
  float: left;
}
.widget-title{
  text-transform: capitalize;
  font-size:1.1em;
  color: #333E48;
}
.filter-border-bottom {
  border-top: 1px solid #dee2e6;
}
.filter-border-bottom2{
  border-top: 1px solid #dee2e6;
}
.filter-border-bottom2::before{
  content: '';
  display: block;
  position: relative;
  width: 18%;
  border: 1px solid;
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
  margin-top: -2px;
}
.widget-title::after{
  content: '';
  display: block;
  position: relative;
  width: 18%;
  border: 1px solid;
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
}
.filter-title{
  text-transform: capitalize;
  font-size:1.1em;
  color: #333E48;
}
</style>
