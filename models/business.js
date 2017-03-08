import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
// import { GQC } from 'graphql-compose';
import composeWithRelay from 'graphql-compose-relay';

import { AttributesSchema } from './attributes';
import { HoursSchema } from './hours';
import { ReviewTC } from './review';

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
export const BusinessTC = composeWithRelay(composeWithMongoose(Business));

// export const BusinessTC = composeWithMongoose(Business, customizationOptions);
// create GraphQL Schema with all available resolvers for Business Type
// GQC.rootQuery().addFields({
//   businessById: BusinessTC.getResolver('findById'),
//   businessByIds: BusinessTC.getResolver('findByIds'),
//   businessOne: BusinessTC.getResolver('findOne'),
//   businessMany: BusinessTC.getResolver('findMany'),
//   businessTotal: BusinessTC.getResolver('count'),
//   businessConnection: BusinessTC.getResolver('connection'),
// });

// GQC.rootMutation().addFields({
//   businessCreate: BusinessTC.getResolver('createOne'),
//   businessUpdateById: BusinessTC.getResolver('updateById'),
//   businessUpdateOne: BusinessTC.getResolver('updateOne'),
//   businessUpdateMany: BusinessTC.getResolver('updateMany'),
//   businessRemoveById: BusinessTC.getResolver('removeById'),
//   businessRemoveOne: BusinessTC.getResolver('removeOne'),
//   businessRemoveMany: BusinessTC.getResolver('removeMany'),
// });

// export const Business = mongoose.model('Business', BusinessSchema);
// // see: <https://github.com/nodkz/graphql-compose-relay>
// export const BusinessTC = composeWithRelay(composeWithMongoose(Business));


const extendedResolver = BusinessTC
  .getResolver('findMany')
  .addFilterArg({
    name: 'nameRegexp',
    type: 'String',
    description: 'Search by regExp',
    query: (query, value, resolveParams) => { // eslint-disable-line
      query.name = new RegExp(value, 'i'); // eslint-disable-line
    },
  });
extendedResolver.name = 'findMany';
BusinessTC.addResolver(extendedResolver);


BusinessTC.addRelation(
  'reviewConnection',
  () => ({
    resolver: ReviewTC.getResolver('connection'),
    args: {
      filter: source => ({ business_id: source.business_id }),
    },
    projection: { business_id: true },
  }),
);

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
