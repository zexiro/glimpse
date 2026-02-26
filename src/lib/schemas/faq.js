export const faqSchema = {
  id: 'faq',
  name: 'FAQ Page',
  icon: '❓',
  fields: [
    { key: 'url', label: 'Page URL', type: 'url', required: false, placeholder: 'https://example.com/faq' },
    {
      key: 'items',
      label: 'Questions & Answers',
      type: 'repeater',
      fields: [
        { key: 'question', label: 'Question', type: 'text', placeholder: 'What is your return policy?' },
        { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'You can return any item within 30 days...' },
      ],
    },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (v.items || [])
        .filter(i => i.question && i.answer)
        .map(i => ({
          '@type': 'Question',
          name: i.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: i.answer,
          },
        })),
    };
    if (v.url) data.url = v.url;
    return data;
  },
};
