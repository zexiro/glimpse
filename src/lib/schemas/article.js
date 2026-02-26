export const articleSchema = {
  id: 'article',
  name: 'Article',
  icon: '📰',
  fields: [
    { key: 'headline', label: 'Headline', type: 'text', required: true, placeholder: 'Article headline' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Brief description of the article' },
    { key: 'authorName', label: 'Author Name', type: 'text', required: true, placeholder: 'John Doe' },
    { key: 'authorUrl', label: 'Author URL', type: 'url', required: false, placeholder: 'https://example.com/author' },
    { key: 'publisherName', label: 'Publisher Name', type: 'text', required: true, placeholder: 'Example News' },
    { key: 'publisherLogo', label: 'Publisher Logo URL', type: 'url', required: false, placeholder: 'https://example.com/logo.png' },
    { key: 'image', label: 'Image URL', type: 'url', required: true, placeholder: 'https://example.com/image.jpg' },
    { key: 'datePublished', label: 'Date Published', type: 'date', required: true },
    { key: 'dateModified', label: 'Date Modified', type: 'date', required: false },
    { key: 'url', label: 'Article URL', type: 'url', required: false, placeholder: 'https://example.com/article' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: v.headline,
      description: v.description,
      author: {
        '@type': 'Person',
        name: v.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: v.publisherName,
      },
      image: v.image,
      datePublished: v.datePublished,
    };
    if (v.authorUrl) data.author.url = v.authorUrl;
    if (v.publisherLogo) data.publisher.logo = { '@type': 'ImageObject', url: v.publisherLogo };
    if (v.dateModified) data.dateModified = v.dateModified;
    if (v.url) data.url = v.url;
    return data;
  },
};
