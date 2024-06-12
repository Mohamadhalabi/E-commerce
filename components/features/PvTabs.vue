<template>
  <div @click="tabClicked($event)">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    changePath: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    if(this.changePath)
      this.$router.push({path: this.$route.path});
  },
  methods: {
    tabClicked: function(e) {
      this.$router.push('?')
      if(e.target.getAttribute('data-toggle') === 'tab') {
        e.preventDefault();
        // active nav-link
        let target = e.target;
        target.closest('.nav').querySelector('.nav-link.active').classList.remove('active');
        target.classList.add('active');

        // active tab-pane
        let tabPane = document.querySelector(target.getAttribute('href'));

        tabPane.parentNode.querySelector('.tab-pane.show').classList.remove('show');
        tabPane.classList.add('show');
        setTimeout(() => {
          if(this.changePath) {
            let href = target.getAttribute('href').split('#')[1];
            this.$router.push({path: this.$route.path, query: {tab: href}});
          }
          tabPane.parentNode.querySelector('.tab-pane.active').classList.remove('active');
          tabPane.classList.add('active');
        }, 150);
      }
    }
  }
};
</script>
