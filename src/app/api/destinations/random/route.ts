import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Destination from '@/models/Destination';

export async function GET() {
  try {
    await dbConnect();

    // Get random destination
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);

    // Get 3 other random destinations for options
    const otherDestinations = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
      { $project: { name: 1 } }
    ]);

    // Combine and shuffle options
    const options = [
      destination.name,
      ...otherDestinations.map(d => d.name)
    ].sort(() => Math.random() - 0.5);

    return NextResponse.json({
      destination,
      options
    });
  } catch (error) {
    console.error('Error fetching random destination:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
} 