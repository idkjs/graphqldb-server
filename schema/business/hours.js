import { Schema } from 'mongoose';

export const HoursSchema = new Schema({
  Friday: {
    close: String,
    open: String,
  },
  Tuesday: {
    close: String,
    open: String,
  },
  Thursday: {
    close: String,
    open: String,
  },
  Wednesday: {
    close: String,
    open: String,
  },
  Monday: {
    close: String,
    open: String,
  },
});
