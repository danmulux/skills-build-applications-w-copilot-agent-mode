import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('userId', 'username email')
      .sort({ scheduledDate: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workouts by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({
      scheduledDate: -1,
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'userId',
      'username email'
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      title,
      description,
      type,
      difficulty,
      duration,
      exercises,
      scheduledDate,
      notes,
    } = req.body;

    if (!userId || !title || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workout = new Workout({
      userId,
      title,
      description,
      type,
      difficulty,
      duration,
      exercises,
      scheduledDate,
      notes,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Complete workout
router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        isCompleted: true,
        completionDate: new Date(),
      },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
