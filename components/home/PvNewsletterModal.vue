<template>
  <div
    class="sender-form-field"
    :data-sender-form-id="sender_form_id"
  />

</template>

<script>
import {setCookie} from '~/utils/index';

export default {
  data: function() {
    return {
      sender_form_id: ''
    };
  },
  mounted() {
    (function(s, e, n, d, er) {
      s['Sender'] = er;
      s[er] = s[er] || function() {
        (s[er].q = s[er].q || []).push(arguments);
      }, s[er].l = 1 * new Date();
      let a = e.createElement(n),
        m = e.getElementsByTagName(n)[0];
      a.async = 1;
      a.src = d;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');
    sender("c199ed01562781");

    this.sender_form_id = "c199ed01562781";
  },
  methods: {
    removeNewsletter: function(e) {
      setCookie('newsletter', !e.target.checked);
    }
  }

};
</script>
