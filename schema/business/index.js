import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import { ReviewTC } from '../review';
import { AttributesSchema } from './attributes';
import { HoursSchema } from './hours';

// Defining a schema for Business
export const BusinessSchema = new mongoose.Schema({
  is_claimed: Boolean,
  rating: String,
  mobile_url: String,
  rating_img_url: String,
  rating_img_url_small: String,
  url: String,
  categories: Object,
  full_address: String,
  city: String,
  review_count: String,
  name: String,
  neighborhoods: [],
  longitude: Number,
  state: String,
  stars: Number,
  latitude: Number,
  phone: String,
  attributes: AttributesSchema,
  snippet_text: String,
  image_url: String,
  snippet_image_url: String,
  display_phone: String,
  rating_img_url_large: String,
  business_id: String,
  open: Boolean,
  is_closed: Boolean,
  location: Object,
  hours: [HoursSchema],
  type: String,
});

BusinessSchema.index({ name: 1, business_id: 1 }, { unique: true });

export const Business = mongoose.model('Business', BusinessSchema);

// see: <https://github.com/nodkz/graphql-compose-relay>
export const BusinessTC = composeWithMongoose(Business);

BusinessTC.setResolver('findMany', BusinessTC.getResolver('findMany').addFilterArg({
  name: 'nameRegexp',
  type: 'String',
  description: 'Search by regExp',
  query: (query, value, rp) => { // eslint-disable-line
    query.name = new RegExp(value, 'i'); // eslint-disable-line
  },
}));

BusinessTC.addRelation('reviewConnection', () => ({
  resolver: ReviewTC.getResolver('connection'),
  args: {
    filter: source => ({ business_id: source.business_id }),
  },
  projection: { business_id: true },
}));

// BusinessTC.addRelation(
//   'review',
//   () => ({
//     resolver: ReviewTC.getResolver('findMany'),
//     args: {
//       filter: source => ({ business_id: source.business_id }),
//       skip: null,
//       sort: ({ date: -1 }),
//     },
//     projection: { business_id: 1, text: 1 },
//   }),
// );

// BusinessTC.addRelation(
//   'category',
//   () => ({
//     resolver: CategoryTC.getResolver('findOne'),
//     args: {
//       filter: (source) => ({ categoryID: source.categoryID }),
//       skip: null,
//       sort: null,
//     },
//     projection: { categoryID: true },
//   })
// );
