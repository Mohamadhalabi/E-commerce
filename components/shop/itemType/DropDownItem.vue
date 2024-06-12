<template>
  <vue-tree-list
    :model="dataTree"
    :default-expanded="isOpened()"
    @click="filterQuery()"
  >
    <template #leafNameDisplay="slotProps"
    >
      <div v-if="slugtype =='category'" class="d-flex">
        <i
          @click="test(slotProps.model.slug)"
          style="line-height: 1.4 !important;cursor: pointer"
          class=" sicon-close mt-auto mr-2"
          v-if="slotProps.model.slug === selectedCategory"
        >
        </i>
        <nuxt-link
          :to="slotProps.model.slug"
          :class="{ 'selected': slotProps.model.slug === selectedCategory }"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>
      <div v-else-if="qy.includes('manufacturer-type')">
        <div>

          <i
            @click="test2(slotProps.model.slug)"
            style="line-height: 1.4 !important;cursor: pointer"
            class=" sicon-close mt-auto mr-2"
            v-if="slotProps.model.slug === selectedCategory"
          >
          </i>
          <nuxt-link
            :to="slotProps.model.slug"
            :class="{ 'selected': slotProps.model.slug === selectedCategory }"
          >
            {{ slotProps.model.name }} ({{ slotProps.model.count }})
          </nuxt-link>
        </div>
      </div>
      <div v-else class="d-flex">
        <i
          @click="test(slotProps.model.slug)"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2"
          v-if="slotProps.model.slug === selectedCategory"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}?categories=${slotProps.model.slug}`+'&'+qy"
          :class="{ 'selected': slotProps.model.slug === selectedCategory}"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>
    </template>
    <template #treeNodeIcon>
      <span/>
    </template>
  </vue-tree-list>
</template>

<script>
export default {
  name: 'DropDownItem',
  components: {
  },
  props: {
    items: Array,
    group: String,
    slugtype:String,
    selectedCategory:String,
  },
  data() {
    return {
      qy: '',
      parametersWithoutCategory:''
    }
  },
  computed: {
    dataTree: function () {
      this.qry();
      // return new Tree(this.items);
    },
  },
  created() {
  },
  methods: {
    test(slug){

      this.$emit("filterquery", { type: this.group, slug: slug});
    },
    test2(slug){
      this.$emit("filterquery", { type: 'manufacturer-type', slug: slug});
    },
    isOpened(){
      if(this.$route.query['manufacturer-type'] != undefined){
        return true
      }
      else if(this.dataTree.children[0].expended == true ||  this.dataTree.children[1] && typeof this.dataTree.children[1].expended !== 'undefined') {
        return true
      }
      else{
        return false
      }

    },
    filterQuery(){
      this.$emit("filter-query", { type: this.group, slug: this.$route.query.categories});
    },
    qry() {
      let queries = this.$route.query;

      let result = Object.keys(queries).map((key) => [key, queries[key]]);


      let q = '';
      if(this.$route.query.categories !== undefined) {
        q = '&';
      }
      result.forEach((item, index) => {
        if (index > 0) {
          q += '&';
        }
        if (item[0] !== null && item[0] != 'page') {
          q += item[0];
        }
        if (item[1] !== null && item[0] != 'page') {
          q += `=${item[1]}`;
        }
      });

      this.qy = q;

      // if(this.qy.includes('manufacturer-type')){
      //   this.selectedCategory = this.$route.query['manufacturer-type']
      // }
      //
      // if(this.qy.includes('categories')){
      //   this.selectedCategory = this.$route.query['categories'];
      // }

      // GET PARAMETERS WITHOUT CATEGORY
      // const secondAmpIndex = this.qy.indexOf('&', this.qy.indexOf('&') + 1);
      // if (secondAmpIndex !== -1) {
      //
      //   this.parametersWithoutCategory = this.qy.substring(secondAmpIndex + 1);
      // }



      // Split the URL into parts using the '&' as a separator
      const urlParts = this.qy.split('&');

      let categoryToRemove = 'categories='; // The prefix for the categories parameter

  // Find the index of the second 'categories' parameter
        let indexToRemove = -1;
        for (let i = 0; i < urlParts.length; i++) {
          if (urlParts[i].startsWith(categoryToRemove)) {
            if (indexToRemove === -1) {
              indexToRemove = i;
            } else {
              break; // Found the second 'categories' parameter, exit the loop
            }
          }
        }

      // Remove the second 'categories' parameter
        if (indexToRemove !== -1) {
          urlParts.splice(indexToRemove, 1);
        }

      // Reconstruct the URL by joining the parts with '&'
        const updatedUrl = urlParts.join('&');

        this.qy = updatedUrl



      if (q.length <= 1) {
        this.qy = '';
      }
    }
  },
  watch: {
    $route() {
      this.qry();
    }
  }
}
;
</script>

<style>
.selected {
  font-weight: bold;
  color: red!important;
}
</style>
