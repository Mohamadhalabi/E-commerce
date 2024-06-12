<template>
  <div class="d-flex align-items-center flex-column">
    <span
      v-if="!isCopied"
      @click="handleCopy"

      :class="{ 'pointer': useCounter > 0 }">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="25"
        viewBox="0 96 960 960"
        width="25">
        <path
          d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"
        />
      </svg>
    </span>

    <span
      @click="handleCopy"
      v-if="isCopied"
      :class="{ 'pointer': useCounter > 0 }"
      class="d-flex align-items-center flex-column"
    >
    <span class="d-block">copied!</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="25"
        viewBox="0 96 960 960"
        width="25"
        fill="#2ba968"
      >
        <path
          d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
    props:['useCounter','code'],
  data() {
    return {
      copied: false,
    };
  },

  computed: {
    isCopied() {
      return this.copied;
    },
  },

  methods: {
      handleCopy() {
        if (this.useCounter==0) {
            return;
      }
      navigator.clipboard.writeText(this.code);
      this.copied = !this.copied;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    },

  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
