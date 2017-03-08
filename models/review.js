import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import composeWithRelay from 'graphql-compose-relay';

import { BusinessTC } from './business';
// import { UserTC } from './user';
import { VotesSchema } from './vote';

// const VotesSchema = new mongoose.Schema(
//   {
//     funny: Number,
//     useful: Number,
//     cool: Number,
//   },
//   {
//     _id: false, // disable `_id` field for `Votes` schema
//   },
// );

export const ReviewSchema = new mongoose.Schema({
  votes: VotesSchema,
  user_id: String,
  review_id: String,
  stars: Number,
  date: { type: Date },
  text: String,
  type: String,
  business_id: String,
});

export const Review = mongoose.model('Review', ReviewSchema);

export const ReviewTC = composeWithRelay(composeWithMongoose(Review));

const extendedResolver = ReviewTC
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
ReviewTC.addResolver(extendedResolver);

ReviewTC.addRelation(
  'business',
  () => ({
    resolver: BusinessTC.getResolver('findOne'),
    args: {
      filter: source => ({ business_id: source.business_id }),
      skip: null,
      sort: ({ date: -1 }),
    },
    projection: { business_id: true },
  }),
);

// ReviewTC.addRelation(
//   'userConnection',
//   () => ({
//     resolver: UserTC.getResolver('connection'),
//     args: {
//       filter: source => ({ review_id: source.review_id }),
//     },
//     projection: { review_id: true },
//   }),
// );


