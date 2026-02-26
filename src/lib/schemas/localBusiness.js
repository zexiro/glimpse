export const localBusinessSchema = {
  id: 'localBusiness',
  name: 'Local Business',
  icon: '🏪',
  fields: [
    { key: 'name', label: 'Business Name', type: 'text', required: true, placeholder: "Joe's Coffee Shop" },
    { key: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'A cozy coffee shop in downtown Portland' },
    { key: 'image', label: 'Image URL', type: 'url', required: false, placeholder: 'https://example.com/shop.jpg' },
    { key: 'telephone', label: 'Phone', type: 'text', required: false, placeholder: '+1-555-123-4567' },
    { key: 'url', label: 'Website', type: 'url', required: false, placeholder: 'https://example.com' },
    { key: 'streetAddress', label: 'Street Address', type: 'text', required: true, placeholder: '123 Main St' },
    { key: 'city', label: 'City', type: 'text', required: true, placeholder: 'Portland' },
    { key: 'state', label: 'State/Region', type: 'text', required: true, placeholder: 'OR' },
    { key: 'postalCode', label: 'Postal Code', type: 'text', required: true, placeholder: '97201' },
    { key: 'country', label: 'Country', type: 'text', required: true, placeholder: 'US', default: 'US' },
    { key: 'latitude', label: 'Latitude', type: 'text', required: false, placeholder: '45.5155' },
    { key: 'longitude', label: 'Longitude', type: 'text', required: false, placeholder: '-122.6789' },
    { key: 'priceRange', label: 'Price Range', type: 'text', required: false, placeholder: '$$' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: v.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: v.streetAddress,
        addressLocality: v.city,
        addressRegion: v.state,
        postalCode: v.postalCode,
        addressCountry: v.country,
      },
    };
    if (v.description) data.description = v.description;
    if (v.image) data.image = v.image;
    if (v.telephone) data.telephone = v.telephone;
    if (v.url) data.url = v.url;
    if (v.latitude && v.longitude) {
      data.geo = { '@type': 'GeoCoordinates', latitude: v.latitude, longitude: v.longitude };
    }
    if (v.priceRange) data.priceRange = v.priceRange;
    return data;
  },
};
