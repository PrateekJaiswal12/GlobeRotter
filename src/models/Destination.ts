import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  clues: string[];
  funFacts: string[];
  trivia: string[];
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  country: string;
  continent: string;
}

const DestinationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  clues: [{ type: String, required: true }],
  funFacts: [{ type: String, required: true }],
  trivia: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  country: { type: String, required: true },
  continent: { type: String, required: true }
});

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema); 