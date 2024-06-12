// function to get price of products
export function getPrice(product) {
  if(!product.is_sale && !product.variants)
    return product.price;

  if(product.is_sale)
    return product.salePrice;
}

// function to handle sticky header
export function showScrollTopHandler() {
  if(window.pageYOffset > 400)
    document.querySelector('#scroll-top').classList.add('fixed');
  else
    document.querySelector('#scroll-top').classList.remove('fixed');
}

// function to scroll window screen
export function scrollTop(isCustom = true, speed = 50) {
  let des = isCustom && document.querySelector('main-content') ? document.querySelector('main-content').getBoundingClientRect().top + window.pageYOffset : 0;
  let timerId = setInterval(() => {
    if(pageYOffset <= des)
      clearInterval(timerId);
    else
      window.scrollBy(0, -speed);
  }, 1);
}

// function to remove classes on resizing
export function resizeHandler() {
  // let bodyClasses = document.querySelector('body').classList;
  // let initClasses = ['home', 'loaded', 'modal-open'];
  // bodyClasses = bodyClasses.value.split(' ').filter(item => initClasses.indexOf(item) === -1);
  // for(let i = 0; i < bodyClasses.length; i++)
  //   document.querySelector('body').classList.remove(bodyClasses[i]);
}

export function stickyHeaderHandler() {
  let main = document.querySelector('main');
  let top = main ? main.offsetTop : 300;
  let stickyHeader;
  let stickyHeader2;

  let stickyType = window.innerWidth >= 992 ? '.desktop-sticky' : '.mobile-sticky';
  if (document.querySelector('header .sticky-header') && !document.querySelector('header .sticky-header.mobile-sticky')) {
    stickyType = '';
  } else {
    if (window.innerWidth >= 992) {
      document.querySelector('.sticky-header.mobile-sticky') && document.querySelector('.sticky-header.mobile-sticky').classList.remove('fixed');
    } else {
      document.querySelector('.sticky-header.desktop-sticky') && document.querySelector('.sticky-header.desktop-sticky').classList.remove('fixed');
      document.querySelector('.sticky-wrapper.desktop-sticky') && document.querySelector('.sticky-wrapper.desktop-sticky').setAttribute('style', 'height: auto');
    }
  }

  stickyHeader = document.querySelector(`.sticky-header${stickyType}`);

  let height = 0;

  if (stickyHeader)
    height = stickyHeader.offsetHeight;

  // Select the sticky-header2 element
  stickyHeader2 = document.querySelector('.sticky-header.desktop-sticky2');

  if (window.pageYOffset >= top) {
    if (stickyHeader) {
      stickyHeader.classList.add('fixed');
      if (!document.querySelector(`.sticky-wrapper${stickyType}`)) {
        let newNode = document.createElement('div');
        newNode.className = `sticky-wrapper ${stickyType.substring(1, stickyType.length)}`;
        stickyHeader.parentNode.insertBefore(newNode, stickyHeader);
        document.querySelector(`.sticky-wrapper${stickyType}`).insertAdjacentElement('beforeend', stickyHeader);
        document.querySelector(`.sticky-wrapper${stickyType}`).setAttribute('style', 'height: ' + `${height}px`);
      }

      if (!document.querySelector(`.sticky-wrapper${stickyType}`).getAttribute('style'))
        document.querySelector(`.sticky-wrapper${stickyType}`).setAttribute('style', 'height: ' + `${height}px`);
    }

    // Make desktop-sticky2 fixed
    if (stickyHeader2) {
      stickyHeader2.classList.add('fixed');
      if (!document.querySelector('.sticky-wrapper.desktop-sticky2')) {
        let newNode = document.createElement('div');
        newNode.className = 'sticky-wrapper desktop-sticky2';
        stickyHeader2.parentNode.insertBefore(newNode, stickyHeader2);
        document.querySelector('.sticky-wrapper.desktop-sticky2').insertAdjacentElement('beforeend', stickyHeader2);
      }
    }
  } else {
    if (stickyHeader)
      stickyHeader.classList.remove('fixed');

    if (stickyHeader2)
      stickyHeader2.classList.remove('fixed');

    if (document.querySelector(`.sticky-wrapper${stickyType}`))
      document.querySelector(`.sticky-wrapper${stickyType}`).removeAttribute('style');
  }

  if (document.querySelector('.sticky-navbar')) {
    if (window.scrollY >= 400)
      document.querySelector('.sticky-navbar').classList.add('fixed');
    else document.querySelector('.sticky-navbar').classList.remove('fixed');
  }
}


// function to set cookie
export function setCookie(name, value, exdays = 7) {
  let date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=${window.location.path}`;
}

// function to get cookie
export function getCookie(cookieName) {
  let name = `${cookieName}=`;
  let cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; ++i) {
    let cookie = cookies[i];
    while(cookie.charAt(0) == ' ')
      cookie = cookie.substring(1);
    if(cookie.indexOf(name) == 0)
      return cookie.substring(name.length, cookie.length);
  }
  return '';
}

// function to get options
export function parseOptions(options) {
  if('string' === typeof options)
    return JSON.parse(options.replace(/'/g, '"').replace(';', ''));
  return {};
}


// function to scroll to top
export function scrollTopHandler(isCustom = true, speed = 15) {
  let offsetTop = 0;

  if(isCustom && !isEdgeBrowser()) {
    if(document.querySelector('.main > .container > .row'))
      offsetTop = document.querySelector('.main > .container > .row').getBoundingClientRect().top + window.pageYOffset - document.querySelector('.sticky-header').offsetHeight + 2;
  } else offsetTop = 0;

  if(isSafariBrowser() || isEdgeBrowser()) {
    let pos = window.pageYOffset;
    let timerId = setInterval(() => {
      if(pos <= offsetTop) clearInterval(timerId);
      window.scrollBy(0, -speed);
      pos -= speed;
    }, 1);
  } else {
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// function to detect safari browser
export function isSafariBrowser() {
  let sUsrAg = navigator.userAgent;
  if(sUsrAg.indexOf('Safari') !== -1 && sUsrAg.indexOf('Chrome') === -1)
    return true;
  return false;
}

// function to detect Edge browser
export function isEdgeBrowser() {
  let sUsrAg = navigator.userAgent;
  if(sUsrAg.indexOf('Edge') > -1)
    return true;
  return false;
}

// function to find index in array
export function findIndex(array, cb) {
  for(let i = 0; i < array.length; i++) {
    if(cb(array[i]))
      return i;
  }
  return -1;
}
