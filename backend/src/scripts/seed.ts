import dbConnect from '../lib/db';
import Destination from '../models/Destination';

const destinations = [
  {
    city: "Paris",
    country: "France",
    clues: [
      "This city is known as the City of Light",
      "Home to the world's most visited museum",
      "Famous for its iconic iron tower"
    ],
    fun_fact: [
      "The Eiffel Tower was meant to be a temporary structure",
      "There's only one stop sign in the entire city"
    ],
    trivia: [
      "This city has 37 bridges",
      "The Louvre was originally built as a fortress in 1190"
    ]
  },
  {
    city: "Tokyo",
    country: "Japan",
    clues: [
      "World's largest metropolitan area",
      "Home to the busiest pedestrian crossing",
      "Known for its high-tech innovations"
    ],
    fun_fact: [
      "Has over 200 underground stations",
      "Home to the world's oldest company"
    ],
    trivia: [
      "More Michelin stars than any other city",
      "Has over 300 cat cafes"
    ]
  }
];

async function seedDatabase() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert new destinations
    await Destination.insertMany(destinations);
    console.log('Added new destinations');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 