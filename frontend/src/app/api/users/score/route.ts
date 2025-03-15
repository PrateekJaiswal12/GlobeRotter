import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { username, correct } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const updateField = correct ? 'score.correct' : 'score.incorrect';

    const user = await User.findOneAndUpdate(
      { username },
      {
        $inc: { [updateField]: 1 },
        $set: { lastPlayed: new Date() }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user score:', error);
    return NextResponse.json(
      { error: 'Failed to update score' },
      { status: 500 }
    );
  }
} 