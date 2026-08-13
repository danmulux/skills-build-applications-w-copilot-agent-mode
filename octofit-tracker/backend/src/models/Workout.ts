import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'balance', 'endurance'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: Number,
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        duration: Number,
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completionDate: Date,
    scheduledDate: Date,
    notes: String,
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);
