export const personSchema = {
  id: 'person',
  name: 'Person',
  icon: '👤',
  fields: [
    { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
    { key: 'jobTitle', label: 'Job Title', type: 'text', required: false, placeholder: 'Software Engineer' },
    { key: 'url', label: 'Website', type: 'url', required: false, placeholder: 'https://janedoe.com' },
    { key: 'image', label: 'Photo URL', type: 'url', required: false, placeholder: 'https://example.com/photo.jpg' },
    { key: 'email', label: 'Email', type: 'text', required: false, placeholder: 'jane@example.com' },
    { key: 'worksForName', label: 'Employer', type: 'text', required: false, placeholder: 'Acme Corp' },
    { key: 'worksForUrl', label: 'Employer Website', type: 'url', required: false, placeholder: 'https://acme.com' },
    { key: 'sameAs', label: 'Social Profiles (one per line)', type: 'textarea', required: false, placeholder: 'https://twitter.com/janedoe\nhttps://linkedin.com/in/janedoe' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: v.name,
    };
    if (v.jobTitle) data.jobTitle = v.jobTitle;
    if (v.url) data.url = v.url;
    if (v.image) data.image = v.image;
    if (v.email) data.email = v.email;
    if (v.worksForName) {
      data.worksFor = { '@type': 'Organization', name: v.worksForName };
      if (v.worksForUrl) data.worksFor.url = v.worksForUrl;
    }
    if (v.sameAs) {
      const links = v.sameAs.split('\n').map(s => s.trim()).filter(Boolean);
      if (links.length) data.sameAs = links;
    }
    return data;
  },
};
