export const eventSchema = {
  id: 'event',
  name: 'Event',
  icon: '📅',
  fields: [
    { key: 'name', label: 'Event Name', type: 'text', required: true, placeholder: 'Tech Conference 2026' },
    { key: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'Annual technology conference' },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date', required: false },
    { key: 'locationName', label: 'Venue Name', type: 'text', required: true, placeholder: 'Convention Center' },
    { key: 'streetAddress', label: 'Street Address', type: 'text', required: false, placeholder: '123 Main St' },
    { key: 'city', label: 'City', type: 'text', required: false, placeholder: 'San Francisco' },
    { key: 'image', label: 'Image URL', type: 'url', required: false, placeholder: 'https://example.com/event.jpg' },
    { key: 'url', label: 'Event URL', type: 'url', required: false, placeholder: 'https://example.com/event' },
    { key: 'performerName', label: 'Performer/Speaker', type: 'text', required: false, placeholder: 'Jane Smith' },
    { key: 'price', label: 'Ticket Price', type: 'text', required: false, placeholder: '99.00' },
    { key: 'currency', label: 'Currency', type: 'text', required: false, placeholder: 'USD', default: 'USD' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: v.name,
      startDate: v.startDate,
      location: {
        '@type': 'Place',
        name: v.locationName,
      },
    };
    if (v.description) data.description = v.description;
    if (v.endDate) data.endDate = v.endDate;
    if (v.streetAddress || v.city) {
      data.location.address = { '@type': 'PostalAddress' };
      if (v.streetAddress) data.location.address.streetAddress = v.streetAddress;
      if (v.city) data.location.address.addressLocality = v.city;
    }
    if (v.image) data.image = v.image;
    if (v.url) data.url = v.url;
    if (v.performerName) {
      data.performer = { '@type': 'Person', name: v.performerName };
    }
    if (v.price) {
      data.offers = {
        '@type': 'Offer',
        price: v.price,
        priceCurrency: v.currency || 'USD',
      };
    }
    return data;
  },
};
