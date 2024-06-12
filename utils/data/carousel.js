import {mapGetters} from "vuex";
export const
  baseSlider1 = {
  slidesPerView: 1,
  spaceBetween: 100,
  autoplay: false
};

export const bigSlider = {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: true
};


export const smallSlider = {
  spaceBetween: 8,
  direction: 'vertical',
  slidesPerView: 3,
  nav: true,
  isThumbCarousel: true,
  navigation: {
    nextEl: '.vertical-thumbs .thumb-up',
    prevEl: '.vertical-thumbs .thumb-down'
  }
}; export const smallSlider2 = {
  spaceBetween: 8,
  direction: 'vertical',
  slidesPerView: 3,
  nav: true,
  isThumbCarousel: true,
  navigation: {
    nextEl: '.vertical-thumbs .thumb-up2',
    prevEl: '.vertical-thumbs .thumb-down2'
  }
};

export const baseSlider2 = {
  slidesPerView: 1,
  spaceBetween: 20,
  nav: true,
  navigation: {
    nextEl: '.swiper-nav .swiper-next',
    prevEl: '.swiper-nav .swiper-prev'
  },
  pagination: {
    el: '.swiper-dots',
    clickable: true
  }
};

export const baseSlider3 = {
  spaceBetween: 20,
  autoplay: true,
  slidesPerView: 1,

  pagination: {
    el: '.swiper-dots',
    clickable: true
  }
};

export const baseSlider4 = {
  loop: false,
  spaceBetween: 20,
  autoplay: false,
  slidesPerView: 2,
  breakpoints: {
    992: { slidesPerView: 1 }
  }
};

export const baseSlider5 = {
  loop: false,
  spaceBetween: 30,
  autoplay: false,
  slidesPerView: 3,
  breakpoints: {
    480: { slidesPerView: 1 },
    1200: { slidesPerView: 2 }
  },
  pagination: {
    el: '.swiper-dots',
    clickable: true
  },
};



export const baseSlider7 = {
  spaceBetween: 0,
  autoplay: {},
    slidesPerView: 5,
  slidesPerGroup: 5, // Set slidesPerGroup to 1
  breakpoints: {
    425: { slidesPerView: 11, spaceBetween: 30 , slidesPerGroup: 11},
    768: { slidesPerView: 11 , slidesPerGroup: 11},
    992: { slidesPerView: 11 , slidesPerGroup: 11},
    1200: { slidesPerView: 11 , slidesPerGroup: 11},
  },
  pagination: {
    el: '.swiper-dots',
    clickable: true,
  },
};

export const baseSlider8 = {
  spaceBetween: 8,
  direction: 'vertical',
  slidesPerView: 3,
  nav: true,
  isThumbCarousel: true,
  navigation: {
    nextEl: '.vertical-thumbs .thumb-up',
    prevEl: '.vertical-thumbs .thumb-down'
  }
};
export const baseSlider88 = {
  spaceBetween: 8,
  direction: 'vertical',
  slidesPerView: 3,
  nav: true,
  isThumbCarousel: true,
  navigation: {
    nextEl: '.vertical-thumbs .thumb-up2',
    prevEl: '.vertical-thumbs .thumb-down2'
  }
};


export const baseSlider6 = {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: true,
  loop:true,
  pagination: {
    el: '.swiper-dots',
    clickable: true
  }
};

export const baseSlider9 = {
  speed: 1000,
  spaceBetween: 30,
  autoplay: true,
  slidesPerView: 5,
  slidesPerGroup: 5, // Set slidesPerGroup to 1
  breakpoints: {
    425: { slidesPerView: 1, spaceBetween: 30 , slidesPerGroup: 1},
    768: { slidesPerView: 2 , slidesPerGroup: 2},
    992: { slidesPerView: 3 , slidesPerGroup: 3},
    1200: { slidesPerView: 3 , slidesPerGroup: 3},
  },
  pagination: {
    el: '.swiper-dots',
    clickable: true,
  },
  nav: true,
  navigation: {
    nextEl: '.swiper-nav .swiper-next',
    prevEl: '.swiper-nav .swiper-prev'
  },

};

// home

export const serviceSlider = {
  slidesPerView: 3,
  spaceBetween: 0,
  breakpoints: {
    576: { slidesPerView: 1 },
    992: { slidesPerView: 2 }
  }
};

export const bannerSlider = {
  slidesPerView: 3,
  breakpoints: {
    576: { slidesPerView: 1 },
    992: { slidesPerView: 2 }
  }
};

export const productSlider = {
  spaceBetween: 2,
  slidesPerView: 5,
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 }
  }
};

export const categorySlider = {
  spaceBetween: 20,
  slidesPerView: 6,
  breakpoints: {
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 4 },
    1200: { slidesPerView: 5 }
  }
};

export const blogSlider = {
  spaceBetween: 20,
  slidesPerView: 4,
  breakpoints: {
    480: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 }
  }
};
export const HomePageSlider = {
  speed: 1000,
  autoplay: true,
  slidesPerView: 1,
  slidesPerGroup: 1, // Set slidesPerGroup to 1
  nav: true,
  navigation: {
    nextEl: '.swiper-nav .swiper-next',
    prevEl: '.swiper-nav .swiper-prev'
  },
}
