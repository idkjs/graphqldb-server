import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

import { VotesSchema } from '../_shared/vote';
import { ReviewTC } from '../review';
import { LanguagesSchema } from './language';
import { AddressSchema } from './address';

export const UserSchema = new mongoose.Schema({
  name: String, // standard types
  age: {
    type: Number,
    index: true,
  },
  languages: {
    type: [LanguagesSchema], // you may include other schemas (also as array of embedded documents)
    default: [],
  },
  contacts: { // another mongoose way for providing embedded documents
    email: String,
    phones: [String], // array of strings
  },
  gender: { // enum field with values
    type: String,
    enum: ['male', 'female', 'intersex'],
  },
  address: {
    type: AddressSchema,
  },
  someMixed: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Some dynamic data',
  },
  yelping_since: String,
  votes: VotesSchema,
  review_count: Number,
  user_id: String,
  friends: Array,
  fans: Number,
  average_stars: Number,
  type: String,
  compliments: Object,
  elite: [],
});

export const User = mongoose.model('User', UserSchema);

export const UserTC = composeWithMongoose(User);

UserTC.addRelation(
  'reviewConnection',
  () => ({
    resolver: ReviewTC.getResolver('connection'),
    args: {
      filter: source => ({ user_id: source.user_id }),
    },
    projection: { user_id: true },
  }),
);

UserTC.setResolver('findMany', UserTC.getResolver('findMany')
  .addFilterArg({
    name: 'geoDistance',
    type: `input GeoDistance {
      lng: Float!
      lat: Float!
      # Distance in meters
      distance: Float!
    }`,
    description: 'Search by distance in meters',
    query: (rawQuery, value, resolveParams) => {
      if (!value.lng || !value.lat || !value.distance) return;
      // read more https://docs.mongodb.com/manual/tutorial/query-a-2dsphere-index/
      rawQuery['address.geo'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [value.lng, value.lat],
          },
          $maxDistance: value.distance, // <distance in meters>
        },
      };
    },
  }),
  // /* FOR DEBUG */
  // .wrapResolve((next) => (rp) => {
  //   const res = next(rp);
  //   console.log(rp);
  //   return res;
  // })
);

// UserTC.addResolver({
//   name: 'myCustomUpdate',
//   kind: 'mutation',
//   args: {
//     id: 'String',
//     firstName: 'String',
//     lastName: 'String',
//     complexArg: `input SomeComplexInput {
//       min: Int
//       max: Int
//     }`,
//   },
//   type: UserTC,
//   resolve: (_, args, context, info) => {
//     // edit and do what you need..
//     return user;
//   },
// });
