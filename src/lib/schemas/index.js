import { articleSchema } from './article.js';
import { productSchema } from './product.js';
import { localBusinessSchema } from './localBusiness.js';
import { faqSchema } from './faq.js';
import { howtoSchema } from './howto.js';
import { breadcrumbSchema } from './breadcrumb.js';
import { eventSchema } from './event.js';
import { organizationSchema } from './organization.js';
import { personSchema } from './person.js';
import { recipeSchema } from './recipe.js';

export const schemas = [
  articleSchema,
  productSchema,
  localBusinessSchema,
  faqSchema,
  howtoSchema,
  breadcrumbSchema,
  eventSchema,
  organizationSchema,
  personSchema,
  recipeSchema,
];

export function getSchema(id) {
  return schemas.find(s => s.id === id);
}

export function getDefaultValues(schema) {
  const values = {};
  for (const field of schema.fields) {
    if (field.type === 'repeater') {
      values[field.key] = [getRepeaterDefaults(field.fields)];
    } else {
      values[field.key] = field.default ?? '';
    }
  }
  return values;
}

function getRepeaterDefaults(fields) {
  const obj = {};
  for (const f of fields) {
    obj[f.key] = f.default ?? '';
  }
  return obj;
}

export function generateJsonLd(schema, values) {
  return schema.template(values);
}
