import mongoose from 'mongoose';
import { mongoUri } from '../config';

const opts = {
  promiseLibrary: Promise,
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  },
  config: {
    autoIndex: false,
  },
};

mongoose.Promise = Promise;
mongoose.connect(mongoUri, opts);

export const connection = mongoose.connection;
connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e);
    mongoose.connect(mongoUri, opts);
  }
  console.log(e);
});
connection.once('open', () => {
  console.log(`MongoDB successfully connected to ${mongoUri}`);
});
