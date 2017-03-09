import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import { VotesSchema } from '../_shared/vote';
import { BusinessTC } from '../business';
// import { UserTC } from './user';

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

export const ReviewTC = composeWithMongoose(Review);

ReviewTC.setResolver(
  'findMany',
  ReviewTC.getResolver('findMany').addFilterArg({
    name: 'nameRegexp',
    type: 'String',
    description: 'Search by regExp',
    query: (query, value, rp) => {
      // eslint-disable-line
      query.name = new RegExp(value, 'i'); // eslint-disable-line
    },
  })
);

ReviewTC.addRelation('business', () => ({
  resolver: BusinessTC.getResolver('findOne'),
  args: {
    filter: source => ({ business_id: source.business_id }),
    skip: null,
    sort: { date: -1 },
  },
  projection: { business_id: true },
}));

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
