import Vue from 'vue';

Vue.filter('ratingFormat', function(value, inlineStyle) {
  if(value === undefined) return '';
  const step = 0.25;
  let inv = 1.0 / step;
  let val = Math.round(value * inv) / inv;
  return inlineStyle ? `width: ${val * 20}%` : val;
});

Vue.filter('discountFormat', function(value) {
  return Vue.filter('ratingFormat')(value);
});
