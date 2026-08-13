import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// Get global leaderboard (with optional period in query string)
router.get('/global', async (req: Request, res: Response) => {
  try {
    const period = (req.query.period as string) || 'weekly';

    const leaderboard = await Leaderboard.find({
      period,
      teamId: null,
    } as any)
      .populate('userId', 'username email profile')
      .sort({ score: -1 })
      .limit(100);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch global leaderboard' });
  }
});

// Get team leaderboard (with optional period in query string)
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const period = (req.query.period as string) || 'weekly';

    const leaderboard = await Leaderboard.find({
      teamId,
      period,
    } as any)
      .populate('userId', 'username email profile')
      .sort({ rank: 1 })
      .limit(100);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// Get leaderboard entry by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id)
      .populate('userId', 'username email profile')
      .populate('teamId', 'name');

    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// Create leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, teamId, score, totalDistance, totalActivities, totalDuration, period } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const entry = new Leaderboard({
      userId,
      teamId,
      score,
      totalDistance,
      totalActivities,
      totalDuration,
      period,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create leaderboard entry' });
  }
});

// Update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard entry' });
  }
});

export default router;
