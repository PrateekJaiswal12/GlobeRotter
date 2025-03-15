import { Request, Response } from 'express';
import Destination from '../models/Destination.js';

export const getRandomDestination = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Get random destination
        const count = await Destination.countDocuments();
        if (count === 0) {
            res.status(404).json({ error: 'No destinations found' });
            return;
        }

        const random = Math.floor(Math.random() * count);
        const destination = await Destination.findOne().skip(random);
    
        if (!destination) {
            res.status(404).json({ error: 'No destinations found' });
            return;
        }
    
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
            options,
          destination
        });
      } catch (error) {
        console.error('Error fetching random destination:', error);
        res.status(500).json({ error: 'Failed to fetch destination' });
      }
}

