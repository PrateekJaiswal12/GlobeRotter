import { Request, Response } from 'express';
import User from '../models/User.js';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create new user
    const user = new User({
      username,
      score: { correct: 0, incorrect: 0 },
      lastPlayed: new Date()
    });

    await user.save();

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        score: user.score,
        createdAt: user.createdAt,
        lastPlayed: user.lastPlayed
      }
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 