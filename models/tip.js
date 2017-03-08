import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import composeWithRelay from 'graphql-compose-relay';

import { BusinessTC } from './business';

export const TipSchema = new mongoose.Schema({
  user_id: String,
  text: String,
  business_id: String,
  likes: Number,
  date: Date,
  type: String,
});

export const Tip = mongoose.model('Tip', TipSchema);

export const TipTC = composeWithRelay(composeWithMongoose(Tip));

// const extendedResolver = TipTC
//   .getResolver('findMany')
//   .addFilterArg({
//     name: 'nameRegexp',
//     type: 'String',
//     description: 'Search by regExp',
//     query: (query, value, resolveParams) => { // eslint-disable-line
//       query.name = new RegExp(value, 'i'); // eslint-disable-line
//     },
//   });
// extendedResolver.name = 'findMany';
// TipTC.addResolver(extendedResolver);

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

// // create GraphQL Schema with all available resolvers for Business Type
// GQC.rootQuery().addFields({
//   tipById: TipTC.getResolver('findById'),
//   tipByIds: TipTC.getResolver('findByIds'),
//   tipOne: TipTC.getResolver('findOne'),
//   tipMany: TipTC.getResolver('findMany'),
//   tipTotal: TipTC.getResolver('count'),
//   tipConnection: TipTC.getResolver('connection'),
// });

// GQC.rootMutation().addFields({
//   tipCreate: TipTC.getResolver('createOne'),
//   tipUpdateById: TipTC.getResolver('updateById'),
//   tipUpdateOne: TipTC.getResolver('updateOne'),
//   tipUpdateMany: TipTC.getResolver('updateMany'),
//   tipRemoveById: TipTC.getResolver('removeById'),
//   tipRemoveOne: TipTC.getResolver('removeOne'),
//   tipRemoveMany: TipTC.getResolver('removeMany'),
// });
