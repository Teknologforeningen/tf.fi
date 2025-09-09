import { GlobalConfig } from 'payload'

export const Donate: GlobalConfig = {
  slug: 'stod-projektet',
  fields: [
    {
      name: 'introduction',
      type: 'richText',
    },
    {
      name: 'form',
      type: 'group',
      required: true,
      interfaceName: 'DonateFormGroup',
      fields: [
        {
          name: 'visibility',
          type: 'text',
          required: true,
        },
        {
          name: 'donationLevels',
          type: 'array',
          interfaceName: 'DonationLevels',
          fields: [
            {
              name: 'threshold',
              type: 'number',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
          ],
        },
        {
          name: 'extraInfo',
          type: 'richText',
        },
      ],
    },
    {
      name: 'quotes',
      type: 'array',
      interfaceName: 'Quotes',
      fields: [
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      interfaceName: 'FAQs',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'donationListHeading',
      type: 'text',
      required: true,
    },
  ],
}
