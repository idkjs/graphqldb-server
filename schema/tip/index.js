import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import { BusinessTC } from '../business';

export const TipSchema = new mongoose.Schema({
  user_id: String,
  text: String,
  business_id: String,
  likes: Number,
  date: Date,
  type: String,
});

export const Tip = mongoose.model('Tip', TipSchema);

export const TipTC = composeWithMongoose(Tip);

TipTC.addRelation(
  'businessConnection',
  () => ({
    resolver: BusinessTC.getResolver('connection'),
    args: {
      filter: source => ({ _id: source._id }),
    },
    projection: { _id: true },
  }),
);

// TipTC.addRelation(
//   'business',
//   () => ({
//     resolver: BusinessTC.getResolver('findOne'),
//     args: {
//       filter: source => ({ business_id: source.business_id }),
//       skip: null,
//       sort: null,
//     },
//     projection: { business_id: true },
//   }),
// );
