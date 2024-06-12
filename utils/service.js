import Api from '~/api';

export default async function getProducts(query, length = 3) {
  const response = await Api.get('shop', {
    params: {
      page: 1,
      ...query,
      length
    }
  });
  return response.data.products;
}
export const productsQueries = {
  featured_products: {
    sort_by: 'price',
    direction: 'asc',
    is_new_arrival: 1
  },
  best_selling_products: {
    is_best_seller: 1
  },
  latest_products: {
    sort_by: 'created_at',
    direction: 'desc'
  },
  top_rated_products: {
    sort_by: 'avg_rating',
    direction: 'desc'
  }
};
