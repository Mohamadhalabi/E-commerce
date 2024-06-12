<template >
  <button  ontouchstart
    @click="handleClick"
    class="noselect"
    :disabled="disabled"
    :class="{ outline: outline, disaple: disabled }"
    :type="type"
  >
    <slot>

    </slot>
    <span class="innerText" :class="hasIcon ? 'text' : ''">{{
      innerText
    }}</span>
  </button>
</template>

<script>
export default {
  name: "BaseButtonIcon1",

  props: ["innerText", "icon", "outline", "disabled",'type'],

  computed: {
    hasIcon() {
      return this.icon;
    },
  },

  methods: {
    handleClick: function () {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
button {
  background-color: #a51017;
  border: 1px solid white;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  color: white;
  box-shadow: 0px 1px 2px white;
  transition: all 0.1s ease;
}
button:active {
  transform: translate(0px, 2px);
  box-shadow: 0px 0px 2px white;

}
button:hover{
  background-color: #892118;
}
.outline {
  background-color: #a51017;
  border: 1px solid #a51017;
  color: white;
  font-weight: bold;
  box-shadow: 0px 1px 2px #a51017;
}
.outline:active {
  box-shadow: 0px 0px 2px #a51017;
  transform: translate(0px,2px);

}
.disaple {
  color: #ababab !important ;
  background-color: #e5e5e5;
}
.disaple:hover {
  transform: none !important;
  box-shadow: none !important ;
  cursor: not-allowed !important;
  background-color: #e5e5e5;
}
</style>
