import Vue from 'vue';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
// import VueLazyLoad from 'vue-lazyload';

Vue.use(VModal);
Vue.use(Notifications);

// Vue.use(VueLazyLoad, {
//   preLoad: 0,
//   throttleWait: 0,
//   attempt: 1,
//   scale: 0,
//   observer: true,
//
//   // optional
//   observerOptions: {
//     rootMargin: '0px',
//     threshold: 0.1
//   },
//   adapter: {
//     loaded({bindType, el}) {
//       if(el.nodeName === 'IMG')
//         handler(el);
//     },
//     loading(listener, Init) {
//       if(!listener.el.style.paddingTop) {
//         let padding = 100;
//         let ratio = listener.el.getAttribute('image-ratio');
//         if(ratio) padding = ratio;
//         else if(listener.el.getAttribute('width') && listener.el.getAttribute('height'))
//           padding = listener.el.getAttribute('height') / listener.el.getAttribute('width') * 100;
//         if(listener.el.nodeName === 'IMG') {
//           listener.el.style.paddingTop = `${padding}%`;
//           listener.el.style.height = 0;
//         }
//       }
//
//       if(!listener.el.style.backgroundColor && !listener.el.nodeName === 'IMG')
//         listener.el.style.backgroundColor = '#ffffff';
//     }
//   }
// });
