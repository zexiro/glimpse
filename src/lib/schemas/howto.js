export const howtoSchema = {
  id: 'howto',
  name: 'How-To',
  icon: '🔧',
  fields: [
    { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'How to Change a Tire' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Step-by-step guide to changing a flat tire' },
    { key: 'image', label: 'Image URL', type: 'url', required: false, placeholder: 'https://example.com/howto.jpg' },
    { key: 'totalTime', label: 'Total Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT30M' },
    {
      key: 'steps',
      label: 'Steps',
      type: 'repeater',
      fields: [
        { key: 'name', label: 'Step Name', type: 'text', placeholder: 'Loosen the lug nuts' },
        { key: 'text', label: 'Step Instructions', type: 'textarea', placeholder: 'Use the wrench to loosen each lug nut...' },
        { key: 'image', label: 'Step Image URL', type: 'url', placeholder: 'https://example.com/step1.jpg' },
      ],
    },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: v.name,
      description: v.description,
      step: (v.steps || [])
        .filter(s => s.name || s.text)
        .map((s, i) => {
          const step = { '@type': 'HowToStep', position: i + 1 };
          if (s.name) step.name = s.name;
          if (s.text) step.text = s.text;
          if (s.image) step.image = s.image;
          return step;
        }),
    };
    if (v.image) data.image = v.image;
    if (v.totalTime) data.totalTime = v.totalTime;
    return data;
  },
};
