export default function ({ isHMR, app, store, route, params, error, redirect, req }) {
  // Ignore if middleware is called from hot module replacement
  if (isHMR) return;

  // Get locale from cookies
  let locale = null;
  if (req) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
      locale = cookies.locale;
    }
  }

  // If no locale is found, use the default 'en'
  if (!locale) locale = 'en';

  // Check if the locale is valid
  const validLocales = ['en', 'es', 'fr'];
  if (!validLocales.includes(locale)) {
    return error({ message: 'This locale is not supported.', statusCode: 400 });
  }

  // Redirect to the localized route if necessary
  // Check if the route is already localized
  if (!route.path.startsWith(`/${locale}`) && locale !== 'en') {
    // Generate the new localized route
    const localizedPath = `/${locale}${route.fullPath}`;
    return redirect(localizedPath);
  }
}
