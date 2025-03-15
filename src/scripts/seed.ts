import dbConnect from '../lib/db';
import Destination from '../models/Destination';

const destinations = [
  {
    name: 'Taj Mahal',
    clues: [
      'A testament of love built in white marble',
      'This wonder changes color throughout the day',
      'Shah Jahan\'s masterpiece took 22 years to complete'
    ],
    funFacts: [
      'The four minarets are slightly tilted outwards to prevent damage to the main structure if they fall',
      'The entire complex uses perfect symmetry in its architecture',
      'Over 1,000 elephants were used to transport building materials'
    ],
    trivia: [
      'Located in Agra, India',
      'Built between 1632 and 1653',
      'A UNESCO World Heritage Site'
    ],
    imageUrl: 'https://example.com/taj-mahal.jpg',
    coordinates: {
      latitude: 27.1751,
      longitude: 78.0421
    },
    country: 'India',
    continent: 'Asia'
  },
  {
    name: 'Machu Picchu',
    clues: [
      'A city in the clouds, hidden for centuries',
      'Incan architecture without mortar',
      'Sacred stones align with the solstices'
    ],
    funFacts: [
      'The stones are cut so precisely that a knife blade cannot fit between them',
      'It was built without the use of wheels',
      'The site contains over 150 buildings'
    ],
    trivia: [
      'Located in Peru',
      'Built in the 15th century',
      'Discovered by Hiram Bingham in 1911'
    ],
    imageUrl: 'https://example.com/machu-picchu.jpg',
    coordinates: {
      latitude: -13.1631,
      longitude: -72.5450
    },
    country: 'Peru',
    continent: 'South America'
  },
  // Add more destinations here...
];

async function seedDatabase() {
  try {
    await dbConnect();

    // Clear existing destinations
    await Destination.deleteMany({});

    // Insert new destinations
    await Destination.insertMany(destinations);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 