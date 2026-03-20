import { defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    { name: 'value', title: 'Value', type: 'string', description: 'e.g. "3x", "98.5%", "20+"' },
    { name: 'label', title: 'Label', type: 'string', description: 'e.g. "More Deals", "Accuracy"' },
    { name: 'context', title: 'Context', type: 'string', description: 'Optional explanatory text' },
  ],
})
