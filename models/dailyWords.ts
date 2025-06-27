import { Schema, model, models } from 'mongoose';

const DailyWordsSchema = new Schema({
  date: { type: String, required: true },
  word: { type: String, required: true },
  isPangram: { type: Boolean, default: false },
});

export default models.DailyWords || model('DailyWords', DailyWordsSchema);
