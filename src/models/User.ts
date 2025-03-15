import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  score: {
    correct: number;
    incorrect: number;
  };
  createdAt: Date;
  lastPlayed: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  score: {
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  lastPlayed: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 