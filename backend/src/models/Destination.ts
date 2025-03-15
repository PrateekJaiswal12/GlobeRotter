import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

const DestinationSchema = new Schema<IDestination>({
  city: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  clues: [{ type: String, required: true }],
  fun_fact: [{ type: String, required: true }],
  trivia: [{ type: String, required: true }]
});

const Destination = mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
export default Destination; 