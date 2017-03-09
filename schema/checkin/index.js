import mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

// Defining a schema for Checkin
export const CheckinSchema = new mongoose.Schema({
  checkin_id: String,
  checkin_info: Object,
});

export const Checkin = mongoose.model('Checkin', CheckinSchema);

export const CheckinTC = composeWithMongoose(Checkin);
