<template>
  <vue-tree-list
    :model="dataTree"
    :default-expanded="true"
    @click="filterQuery()"
  >
    <template #leafNameDisplay="slotProps">
<!--      if user enter from manufacture ( software or token ) -->
      <div v-if="slotProps.model.parent_id == null && slugtype == 'manufacturer' && $route.query['manufacturer-type']">
        <i
          @click="RemoveManufacturerType()"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2 ml-1"
          v-if="slotProps.model.slug === selectedManufacture"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}`+'?'+qy"
          :class="{ 'selected': slotProps.model.slug === selectedManufacture}"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>
<!--      if user enter from manufacture without choosing software or token -->
      <div v-if="slotProps.model.parent_id == null && slugtype == 'manufacturer' && !$route.query['manufacturer-type']" class="d-flex">
        <i
          @click="RemoveManufacturer(slugtype)"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2 ml-1"
          v-if="slotProps.model.slug === selectedManufacture"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}`"
          :class="{ 'selected': slotProps.model.slug === selectedManufacture}"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>

<!--      if user enter from shop or category -->
      <div v-if="slugtype != 'manufacturer'" class="d-flex">
        <i
          @click="RemoveManufacturer(slugtype)"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2 ml-1"
          v-if="slotProps.model.slug === selectedManufacture"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}?manufacturers=${slotProps.model.slug}`+qy"
          :class="{ 'selected': slotProps.model.slug === selectedManufacture}"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>


      <div v-if="slotProps.model.parent_id > '1' && slugtype == 'manufacturer' && !$route.query['manufacturer-type']" class="d-flex">
        <i
          @click="RemoveSubManufacturer()"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2 ml-1"
          v-if="slotProps.model.slug === selectedManufacture"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}?manufacturers=${slotProps.model.slug}`"
          :class="{ 'selected': slotProps.model.slug === selectedManufacture}"
        >
          {{ slotProps.model.name }} ({{ slotProps.model.count }})
        </nuxt-link>
      </div>

      <div v-if="slotProps.model.parent_id > '1' && slugtype == 'manufacturer' && $route.query['manufacturer-type']" class="d-flex">
        <i
          @click="RemoveSubManufacturer()"
          style="cursor: pointer;margin-top: 1px"
          class="sicon-close mr-2"
          v-if="slotProps.model.slug === selectedManufacture"
        >
        </i>
        <nuxt-link
          :to="`/${$route.path}?manufacturers=${slotProps.model.slug}`+'&'+qy"
          :class="{ 'selected': slotProps.model.slug === selectedManufacture}"
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
  name: "DropDownManufactureItem",
  components: {
  },
  props: {
    items: Array,
    group: String,
    slugtype:String,
    selectedManufacture: String,
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
    }
  },
  methods: {
    RemoveManufacturerType(){
      let softwareOrToken = this.$route.query['manufacturer-type']
      const query = Object.assign({}, this.$route.query);
      delete query['manufacturer-type'];
      this.$router.push({ path: `/shop`, query: { ...query, categories: softwareOrToken } });
    },
    RemoveManufacturer(slugtype){
      const query = Object.assign({}, this.$route.query);

      delete query['manufacturers'];
      if(slugtype === 'manufacturer'){
        this.$router.push({path: '/shop', query: {...query}});
      }
      else
        this.$router.push({path: this.$route.path, query: {...query}});

      // if(queryLength == 1 && query.page != undefined || queryLength == 0)
      // {
      //   this.$router.push('/shop');
      // }
      // else {
      //   this.$router.push({path: '/shop', query: {...query}});
      // }

    },
    RemoveSubManufacturer(){
      const query = Object.assign({}, this.$route.query);
      delete query['manufacturers'];
      this.$router.push({ path: this.$route.path, query: { ...query } });
    },
    filterQuery(){
      this.$emit("filter-query", { type: this.group, slug: this.$route.query.categories });
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

      // GET PARAMETERS WITHOUT CATEGORY
      const secondAmpIndex = this.qy.indexOf('&', this.qy.indexOf('&') + 1);
      if (secondAmpIndex !== -1) {
        this.parametersWithoutCategory = this.qy.substring(secondAmpIndex + 1);
      }
      if (q.length <= 1) {
        this.qy = '';
      }
    }
  },
  watch: {
    $route() {
      this.qry();
    }
  },
}
;
</script>
<style>
.selected {
  font-weight: bold!important;
}
</style>
