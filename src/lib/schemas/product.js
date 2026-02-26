export const productSchema = {
  id: 'product',
  name: 'Product',
  icon: '🛍️',
  fields: [
    { key: 'name', label: 'Product Name', type: 'text', required: true, placeholder: 'Widget Pro 3000' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'A high-quality widget for all your needs' },
    { key: 'image', label: 'Image URL', type: 'url', required: true, placeholder: 'https://example.com/product.jpg' },
    { key: 'brand', label: 'Brand', type: 'text', required: false, placeholder: 'Acme Corp' },
    { key: 'sku', label: 'SKU', type: 'text', required: false, placeholder: 'WP-3000' },
    { key: 'price', label: 'Price', type: 'text', required: true, placeholder: '29.99' },
    { key: 'currency', label: 'Currency', type: 'text', required: true, placeholder: 'USD', default: 'USD' },
    { key: 'availability', label: 'Availability', type: 'select', required: true, options: ['InStock', 'OutOfStock', 'PreOrder', 'BackOrder'], default: 'InStock' },
    { key: 'ratingValue', label: 'Rating (1-5)', type: 'text', required: false, placeholder: '4.5' },
    { key: 'reviewCount', label: 'Review Count', type: 'text', required: false, placeholder: '127' },
    { key: 'url', label: 'Product URL', type: 'url', required: false, placeholder: 'https://example.com/product' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: v.name,
      description: v.description,
      image: v.image,
      offers: {
        '@type': 'Offer',
        price: v.price,
        priceCurrency: v.currency,
        availability: `https://schema.org/${v.availability}`,
      },
    };
    if (v.brand) data.brand = { '@type': 'Brand', name: v.brand };
    if (v.sku) data.sku = v.sku;
    if (v.url) data.offers.url = v.url;
    if (v.ratingValue && v.reviewCount) {
      data.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: v.ratingValue,
        reviewCount: v.reviewCount,
      };
    }
    return data;
  },
};
