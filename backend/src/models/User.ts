import mongoose from 'mongoose';

export interface IUser {
  username: string;
  score: {
    correct: number;
    incorrect: number;
  };
  createdAt: Date;
  lastPlayed: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  score: {
    correct: {
      type: Number,
      default: 0
    },
    incorrect: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastPlayed: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User; 