import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

// Defining a schema for Checkin
export const CheckinSchema = new mongoose.Schema({
  checkin_id: String,
  checkin_info: Object,
});

export const Checkin = mongoose.model('Checkin', CheckinSchema);

export const customizationOptions = {};

export const CheckinTC = composeWithMongoose(Checkin, customizationOptions);

// create GraphQL Schema with all available resolvers for Checkin Type
GQC.rootQuery().addFields({
  checkinById: CheckinTC.getResolver('findById'),
  checkinByIds: CheckinTC.getResolver('findByIds'),
  checkinOne: CheckinTC.getResolver('findOne'),
  checkinMany: CheckinTC.getResolver('findMany'),
  checkinTotal: CheckinTC.getResolver('count'),
  checkinConnection: CheckinTC.getResolver('connection'),
});

GQC.rootMutation().addFields({
  checkinCreate: CheckinTC.getResolver('createOne'),
  checkinUpdateById: CheckinTC.getResolver('updateById'),
  checkinUpdateOne: CheckinTC.getResolver('updateOne'),
  checkinUpdateMany: CheckinTC.getResolver('updateMany'),
  checkinRemoveById: CheckinTC.getResolver('removeById'),
  checkinRemoveOne: CheckinTC.getResolver('removeOne'),
  checkinRemoveMany: CheckinTC.getResolver('removeMany'),
});
