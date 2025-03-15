import mongoose from 'mongoose';

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

const globalWithMongoose = global as typeof global & {
  mongoose: MongooseCache;
};

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/globetrotter';

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null
  };
}

async function dbConnect() {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
  }
  
  try {
    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  } catch (e) {
    globalWithMongoose.mongoose.promise = null;
    throw e;
  }

  return globalWithMongoose.mongoose.conn;
}

export default dbConnect; 