import express, { Request, Response } from 'express';
import cors from 'cors';
import dbConnect from './lib/db';
import Destination from './models/Destination';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/destinations/random', async (req: Request, res: Response) => {
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
      { $project: { city: 1 } }
    ]);

    // Combine and shuffle options
    const options = [
      destination.city,
      ...otherDestinations.map(d => d.city)
    ].sort(() => Math.random() - 0.5);

    res.json({
      destination,
      options
    });
  } catch (error) {
    console.error('Error fetching random destination:', error);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
}); 