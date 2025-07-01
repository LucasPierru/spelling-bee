'use server';

import { connectToMongoDB } from '@/lib/mongodb';
import { getTodayDate } from '@/lib/utils';
import { generateLetterSet } from '@/lib/words';
import DailyLetters from '@/models/dailyLetters';

export async function addDailyLetters() {
  try {
    await connectToMongoDB();
    const date = getTodayDate(); // Format: YYYY-MM-DD (local timezone)

    const existingLetters = await DailyLetters.findOne({ date });
    if (existingLetters) {
      return { success: true, data: existingLetters };
    } else {
      const letters: string[] = generateLetterSet();
      const centerLetter = letters[0]
      const result = await DailyLetters.create(
        { date, letters, centerLetter },
      );
      return { success: true, data: result };
    }
  } catch (error) {
    console.error('Failed to add daily letters:', error);
    return { success: false, error: 'Failed to add letters of the day.' };
  }
}