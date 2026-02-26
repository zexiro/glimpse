export const breadcrumbSchema = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  icon: '🔗',
  fields: [
    {
      key: 'items',
      label: 'Breadcrumb Items',
      type: 'repeater',
      fields: [
        { key: 'name', label: 'Name', type: 'text', placeholder: 'Home' },
        { key: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com' },
      ],
    },
  ],
  template(v) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (v.items || [])
        .filter(i => i.name)
        .map((i, idx) => {
          const item = {
            '@type': 'ListItem',
            position: idx + 1,
            name: i.name,
          };
          if (i.url) item.item = i.url;
          return item;
        }),
    };
  },
};
