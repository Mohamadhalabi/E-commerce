import {pick, clone, includes, merge} from 'lodash';

// one image schema
function oneImageSchema(width, height) {
  const oneImageProperties = {
    id: {type: 'integer', unique: true, minimum: 1},
    alt: {type: 'string', faker: {'lorem.words': 8}},
    url: {type: 'string', faker: {'image.technics': [width, height, true]}},
    width: {type: 'integer', enum: [width]},
    height: {type: 'integer', enum: [height]}
  };

  return {
    type: 'object',
    required: Object.keys(oneImageProperties),
    properties: oneImageProperties
  };
}

// multi sizes image schema
const multiSizesImageSchema = {
  type: 'object',
  required: ['s', 'm', 'l'],
  properties: {
    s: oneImageSchema(200, 200),
    m: oneImageSchema(500, 500),
    l: oneImageSchema(800, 800)
  }
};

// categories schema
function categoriesSchema() {
  const categoriesProperties = {
    id: {type: 'integer', unique: true, minimum: 1},
    name: {type: 'string', faker: 'commerce.products'},
    slug: {type: 'string', faker: 'lorem.slug', unique: true}
  };

  return {
    type: 'object',
    required: Object.keys(categoriesProperties),
    properties: categoriesProperties
  };
}

// products properties
const productProperties = {
  id: {type: 'integer', unique: true, minimum: 1},
  title: {type: 'string', faker: {'lorem.words': 8}},
  short_title: {type: 'string', faker: {'lorem.words': 4}},
  summary_name: {type: 'string', faker: {'lorem.words': 6}},
  description: {type: 'string', faker: {'lorem.paragraph': 5}},
  sku: {type: 'integer', unique: true, minimum: 1},
  slug: {type: 'string', faker: 'lorem.slug', unique: true},
  price: {type: 'number', faker: {'commerce.price': [1000, 3000]}},
  is_sale: {type: 'boolean', faker: 'datatype.boolean'},
  sale_price: {type: 'number', faker: {'commerce.price': [500, 999]}},
  avg_rating: {type: 'integer', minimum: 0, maximum: 5},
  total_reviews: {type: 'integer', minimum: 0, maximum: 20},
  is_featured: {type: 'boolean', faker: 'datatype.boolean'},
  is_best_seller: {type: 'boolean', faker: 'datatype.boolean'},
  is_free_shipping: {type: 'boolean', faker: 'datatype.boolean'},
  is_out_of_stock: {type: 'boolean', faker: 'datatype.boolean'},
  gallery: {type: 'array', minItems: 3, maxItems: 8, items: multiSizesImageSchema},
  categories: {type: 'array', minItems: 1, maxItems: 5, items: categoriesSchema()}
};

// products schema
const productSchema = {
  type: 'object',
  required: Object.keys(productProperties),
  properties: productProperties
};

// selected products properties helper
function selectedProductProperties(properties, gallery = {}) {
  let selectedProperties = pick(clone(productProperties), properties);
  const minItems = gallery.minItems || 2;
  const maxItems = gallery.maxItems || 2;
  const width = gallery.width || 200;
  const height = gallery.height || 200;

  if(!includes(properties, 'gallery')) {
    selectedProperties = merge(selectedProperties, {
      gallery: {type: 'array', minItems, maxItems, items: oneImageSchema(width, height)}
    });
  }

  return {
    type: 'object',
    required: Object.keys(selectedProperties),
    properties: selectedProperties
  };
}

// products quick view schema
export const productQuickViewSchema = selectedProductProperties([
  'short_title', 'slug', 'price', 'is_sale', 'sale_price', 'avg_rating', 'total_reviews', 'gallery', 'categories'
]);

// products card schema
const productCardSchema = selectedProductProperties([
  'short_title', 'slug', 'price', 'is_sale', 'sale_price', 'avg_rating', 'total_reviews', 'categories'
], {
  width: 500,
  height: 500
});

// products small card schema
const productSmallCardSchema = selectedProductProperties([
  'short_title', 'slug', 'price', 'is_sale', 'sale_price', 'avg_rating', 'total_reviews'
]);

// products popup schema
const productPopupSchema = selectedProductProperties([
  'short_title', 'slug'
], {
  minItems: 1,
  maxItems: 1
});

export default {
  type: 'object',
  required: [
    'product', 'prevProduct', 'nextProduct', 'relatedProducts', 'featuredProducts',
    'bestSellingProducts', 'latestProducts', 'topRatedProducts'
  ],
  properties: {
    product: productSchema,
    prevProduct: productPopupSchema,
    nextProduct: productPopupSchema,
    relatedProducts: {type: 'array', minItems: 0, maxItems: 8, items: productCardSchema},
    featuredProducts: {type: 'array', minItems: 3, maxItems: 3, items: productSmallCardSchema},
    bestSellingProducts: {type: 'array', minItems: 3, maxItems: 3, items: productSmallCardSchema},
    latestProducts: {type: 'array', minItems: 3, maxItems: 3, items: productSmallCardSchema},
    topRatedProducts: {type: 'array', minItems: 3, maxItems: 3, items: productSmallCardSchema}
  }
};
