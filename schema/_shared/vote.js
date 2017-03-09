import { Schema } from 'mongoose';

export const VotesSchema = new Schema(
  {
    funny: Number,
    useful: Number,
    cool: Number,
  },
  {
    _id: false, // disable `_id` field for `Votes` schema
  },
);
