<template>
  <button ontouchstart>
    <i
      style="font-size: larger"
      class="py-2 px-5 rounded-3 fab fa-whatsapp"
    ></i>
  </button>
</template>

<script>
export default {
  name: "WhatsappButton",
};
</script>

<style  scoped>
button {
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

button:active {
  transform: translate(0px, 2px);
}
</style>
