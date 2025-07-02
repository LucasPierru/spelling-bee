import { connectToMongoDB } from "@/lib/mongodb";
import { getTodayDate } from "@/lib/utils";
import { generateLetterSet } from "@/lib/words";
import DailyLetters from "@/models/dailyLetters";

export async function GET() {
  try {
    await connectToMongoDB();
    const date = getTodayDate(); // Format: YYYY-MM-DD (local timezone)

    const letters: string[] = generateLetterSet();
    const centerLetter = letters[0]
    const result = await DailyLetters.findOneAndUpdate(
      { date },
      { letters, centerLetter },
      { new: true, upsert: true }
    );
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Failed to add daily letters:', error);
    return Response.json({ success: false, error: 'Failed to add letters of the day.' });
  }
};
