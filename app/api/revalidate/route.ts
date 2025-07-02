import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  // Optional: add a secret or auth if you want
  revalidatePath('/');
  return NextResponse.json({ revalidated: true });
}