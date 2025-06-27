import { Schema, model, models } from 'mongoose';

const UserSubmissionSchema = new Schema({
  userId: String, // optional: link to user table
  date: String,
  guesses: [String],
  score: Number,
});

export default models.UserSubmission || model('UserSubmission', UserSubmissionSchema);
