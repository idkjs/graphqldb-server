import mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    street: String,
    geo: {
      type: [Number],   // [<longitude>, <latitude>]
      index: '2dsphere', // create the geospatial index
    },
  },
);
