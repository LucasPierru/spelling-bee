import { Schema, model, models } from 'mongoose';

const DailyLettersSchema = new Schema({
  date: { type: String, required: true, unique: true }, // e.g. '2025-06-26'
  letters: [String], // length 7
  centerLetter: String,
  pangrams: [String],
});

export default models.DailyLetters || model('DailyLetters', DailyLettersSchema);