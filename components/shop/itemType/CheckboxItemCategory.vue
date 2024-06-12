<template>
  <div class="checkbox-container" :class="getIsAr ? 'text-right' : ''">

    <form
        :class="{ notViseble: items.length <= 3 }"
        class="nosubmit"
    >
      <input
          class="nosubmit"
          type="search"
          :placeholder="$t('common.search')"
          v-model="typedText"
          :style="getIsAr ? 'background-position: 96% ;' : 'background-position: 5px ;'"
      />
    </form>
    <p v-if="filterdItemsArray.length==0">{{ $t("common.notAvailable") }}</p>
    <div
        v-for="(item, index) in getFilterdItemsArray"
        :key="`${group}_${index}_${item.slug}`"
        class="d-felx align-items-center"
    >
      <input
          type="checkbox"
          :checked="item.checked"
          :name="item.name"
          :value="item.name"
          @change="filterQuery(item.slug)"
          class="mx-1"
      />
      <label style="font-weight: 800" :for="item.name">{{ item.name }}</label>
      <div
          v-for="(children,index2) in item.children"
          :key="`${group}_${index2}_${children.slug}`"
          class="mx-3"
      >
        <input
            type="checkbox"
            :checked="children.checked"
            :name="children.name"
            :value="children.slug"
            @change="filterQuery(children.slug)"
            class="mx-1"
        />
        <label style="font-size: 11px" :for="children.name">
          {{ children.name.length > 25 ? children.name.slice(0, 25) + '...' : children.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CheckboxItem",
  props: {
    items: Array,
    group: String,
  },
  data() {
    return {
      checked: true,
      typedText: "",
      filterdItemsArray: [],
      selectedItems: [],
    };
  },

  methods: {
    filterQuery(slug) {
      this.$emit("filter-query", { type: this.group, slug: slug });
    },
  },

  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),

    getFilterdItemsArray() {
      if (this.typedText === "") {
        this.filterdItemsArray = this.items;
      } else {
        this.filterdItemsArray = this.items.map((element) => {
          // Check if the main name matches the search text
          const nameMatch = element.name.toLowerCase().includes(this.typedText.toLowerCase());

          // Filter children based on the search text
          const filteredChildren = element.children.filter(
            (child) => child.name.toLowerCase().includes(this.typedText.toLowerCase())
          );

          // Include the element in the result if either the main name or any child's name matches
          if (nameMatch || filteredChildren.length > 0) {
            return {
              ...element,
              children: filteredChildren,
            };
          }

          return null; // Exclude the parent if neither the main name nor any child's name matches
        }).filter(Boolean); // Remove null values from the result
      }
      return this.filterdItemsArray;
    },
  },
};
</script>

<style scoped>
.custom-control {
  margin-top: 7px;
  margin-bottom: 7px;
}

.checkbox-container {
  max-height: 155px;
  overflow-y: scroll;
  padding: 0px 3px !important;
}

form {
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;

}

input[type="search"] {
  border: none;
  background: transparent;
  margin: 0px ;
  padding: 2px 25px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

input[type="search"]::placeholder {
  color: #bbb;
}


input[type="search"]:focus {
  box-shadow: 0 0.12rem 0.2rem #ff6800 !important;
  border-color: #ff6800;
  outline: none;
}

form.nosubmit {
  border: none;
  padding: 0;
  position: sticky;
  top: -0px;
  background: white;
  z-index: 5;
}

input.nosubmit {
  border: 1px solid #555;
  width: 100%;
  margin-bottom: 6px !important;
  padding: 3px 3px 3px 32px;
  background: transparent
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
  no-repeat center;

}

.notViseble {
  display: none !important;
}
[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
  background-size: 10px 10px;
}
</style>
