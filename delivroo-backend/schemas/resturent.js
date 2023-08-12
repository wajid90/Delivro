import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurent',
  title: 'Restarent',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Resturant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      title: 'Image of the Resturent',
      type: 'image',
    },
    {
      name: 'lat',
      title: 'Latitude of the Resturent',
      type: 'number',
    },
    {
      name: 'long',
      title: 'longitude of the Resturent',
      type: 'number',
    },
    {
      name: 'genra',
      title: 'Genra',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Resturent Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 Starts)',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please Enter a Value Between 1  and 5'),
    },
    {
      name: 'type',
      type: 'array',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
