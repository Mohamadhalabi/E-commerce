// settings.js

import Api from '~/api';

export default async function ({ app, isClient }, inject) {
  try {
    const settingsRes = await Api.get('/setting');
    let settings = settingsRes.data.data.setting;
    inject('settings', settings);

    // Perform DOM-related operations only on the client side
    // if (isClient) {
    //   (function () {
    //     let s1 = document.createElement("script"),
    //       s0 = document.getElementsByTagName("script")[0];
    //     s1.async = true;
    //     s1.charset = "UTF-8";
    //     s1.setAttribute("crossorigin", "*");
    //     s0.parentNode.insertBefore(s1, s0);
    //   })();
    // }
  } catch (error) {
    throw error;
  }
}
