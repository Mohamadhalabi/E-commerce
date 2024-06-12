<template>
  <div :class="wrap ? wrap : 'products-countdown is-countdown'">
    <span
      v-if="format !== 'HMS' && labelsShort"
      class="countdown-row countdown-show4"
    >
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > days ? `0${days}` : days}}
        </span>
        <span class="countdown-period">
          {{ $t('common.days') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > hours ? `0${hours}` : hours}}
        </span>
        <span class="countdown-period">
          {{ $t('common.hours') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > minutes ? `0${minutes}` : minutes}}
        </span>
        <span class="countdown-period">Mins</span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > seconds ? `0${seconds}` : seconds}}
        </span>
        <span class="countdown-period">
          {{ $t('common.secs') }}
        </span>
      </span>
    </span>
    <span
      v-if="format !== 'HMS' && ! labelsShort && ! compact"
      class="countdown-row countdown-show4"
    >
      <no-ssr>
      <flip-countdown
        :label="{ days: `${this.$t('common.days')}`, hours: `${$t('common.hours')}`, minutes: `${this.$t('common.minutes')}`, seconds: `${this.$t('common.seconds')}` }"
        :deadline="stringTime"
        class="d-flex" style="color: black!important;"></flip-countdown>
    </no-ssr>
    </span>
    <span
      v-if="format !== 'HMS' && ! labelsShort && compact"
      class="countdown-row countdown-amount"
    >
      {{`${days} DAYS, ${(10 > hours ? '0' : '') + hours}: ${(10 > minutes ? '0' : '') + minutes}: ${(10 > seconds ? '0' : '') + seconds}`}}
    </span>

    <span
      v-if="format === 'HMS' && ! labelsShort"
      class="countdown-row countdown-show3"
    >
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > hours ? `0${hours}` : hours}}
        </span>
        <span class="countdown-period">
          {{ $t('common.hours') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > minutes ? `0${minutes}` : minutes}}
        </span>
        <span class="countdown-period">
          {{ $t('common.minutes') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > seconds ? `0${seconds}` : seconds}}
        </span>
        <span class="countdown-period">
          {{ $t('common.seconds') }}
        </span>
      </span>
    </span>

    <span
      v-if="format === 'HMS' && labelsShort"
      class="countdown-row countdown-show3"
    >
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > hours ? `0${hours}` : hours}}
        </span>
        <span class="countdown-period">
          {{ $t('common.hrs') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > minutes ? `0${minutes}` : minutes}}
        </span>
        <span class="countdown-period">
          {{ $t('common.mins') }}
        </span>
      </span>
      <span class="countdown-section">
        <span class="countdown-amount">
          {{10 > seconds ? `0${seconds}` : seconds}}
        </span>
        <span class="countdown-period">
          {{ $t('common.secs') }}
        </span>
      </span>
    </span>
  </div>
</template>
<script>
// import FlipCountdown from 'vue2-flip-countdown'
export default {
  components: { FlipCountdown:() => import("vue2-flip-countdown") },

  props: {
    compact: Boolean,
    format: String,
    elements: {
      type: Number,
      default: 4
    },
    labelsShort: Boolean,
    until: String,
    wrap: String
  },
  data: function() {
    return {
      cdId: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      time: null,
      stringTime: null,
    };
  },
  created: function() {
    this.cdId = `count-down${Math.ceil(Math.random() * 1000)}`;
  },
  mounted: function() {
    this.time = this.until.substring(1, this.until.length - 1);
    switch (this.until[this.until.length - 1]) {
    case 'h':
      this.time = this.time * 3600;
      break;
    case 'm':
      this.time = this.time * 60;
      break;
    case 'd':
      this.time = this.time * 3600 * 24;
      break;
    default:
      break;
    }

    this.clock();

    setInterval(() => {
      this.clock();
      this.time--;
    }, 1000);
  },
  methods: {
    clock: function() {
      let until = new Date(this.until);
      let current = new Date();
      let time = (until - current) / 1000;

      if(time < 0) time = 0;
      if(this.until.substring(0, 1) === '+') time = this.time;
      else this.time = time;

      this.days = Math.floor(time / (3600 * 24));
      this.hours = Math.floor((time % (3600 * 24)) / 3600);
      this.minutes = Math.floor((time % 3600) / 60);
      this.seconds = Math.floor(time % 60);


// Parse the input date string
      let parsedDate = new Date(this.until);

// Extract year, month, and day
      let year = parsedDate.getFullYear();
      let month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      let day = String(parsedDate.getDate()).padStart(2, '0');

// Format the date in YYYY-MM-DD 00:00:00 format
      let formattedDate = `${year  }-${  month  }-${  day  } 23:59:59`;

      this.stringTime = formattedDate


    }
  }
};
</script>
<style lang="scss"> .flip-card__top, .flip-card__bottom, .flip-card__back-bottom, .flip-card__back::before, .flip-card__back::after { color: white !important; } </style>
