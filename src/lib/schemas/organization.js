export const organizationSchema = {
  id: 'organization',
  name: 'Organization',
  icon: '🏢',
  fields: [
    { key: 'name', label: 'Organization Name', type: 'text', required: true, placeholder: 'Acme Corporation' },
    { key: 'description', label: 'Description', type: 'textarea', required: false, placeholder: 'A leading technology company' },
    { key: 'url', label: 'Website', type: 'url', required: true, placeholder: 'https://example.com' },
    { key: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'https://example.com/logo.png' },
    { key: 'email', label: 'Email', type: 'text', required: false, placeholder: 'info@example.com' },
    { key: 'telephone', label: 'Phone', type: 'text', required: false, placeholder: '+1-555-123-4567' },
    { key: 'streetAddress', label: 'Street Address', type: 'text', required: false, placeholder: '123 Main St' },
    { key: 'city', label: 'City', type: 'text', required: false, placeholder: 'San Francisco' },
    { key: 'state', label: 'State/Region', type: 'text', required: false, placeholder: 'CA' },
    { key: 'postalCode', label: 'Postal Code', type: 'text', required: false, placeholder: '94105' },
    { key: 'country', label: 'Country', type: 'text', required: false, placeholder: 'US' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: v.name,
      url: v.url,
    };
    if (v.description) data.description = v.description;
    if (v.logo) data.logo = v.logo;
    if (v.email) data.email = v.email;
    if (v.telephone) data.telephone = v.telephone;
    if (v.streetAddress || v.city) {
      data.address = { '@type': 'PostalAddress' };
      if (v.streetAddress) data.address.streetAddress = v.streetAddress;
      if (v.city) data.address.addressLocality = v.city;
      if (v.state) data.address.addressRegion = v.state;
      if (v.postalCode) data.address.postalCode = v.postalCode;
      if (v.country) data.address.addressCountry = v.country;
    }
    return data;
  },
};
