'use server';

import { connectToMongoDB } from '@/lib/mongodb';
import DailyLetters from '@/models/dailyLetters';

export async function addDailyLetters() {
  try {
    await connectToMongoDB();
    const existingLetters = await DailyLetters.findOne();
    if (existingLetters) {
      return { success: true, data: existingLetters };
    } else {
      return { success: false, error: 'No letters found.' };
    }
  } catch (error) {
    console.error('Failed to add daily letters:', error);
    return { success: false, error: 'Failed to add letters of the day.' };
  }
}

export async function getYesterdaysLetters(date: string) {
  try {
    await connectToMongoDB();
    const existingLetters = await DailyLetters.findOne({ date });
    if (existingLetters) {
      return { success: true, data: existingLetters };
    } else {
      return { success: false, error: 'No letters found for yesterday.' };
    }
  } catch (error) {
    console.error('Failed to get yesterday\'s letters:', error);
    return { success: false, error: 'Failed to get letters of yesterday.' };
  }
}