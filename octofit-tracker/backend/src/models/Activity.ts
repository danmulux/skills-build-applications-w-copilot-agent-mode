import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['run', 'walk', 'cycle', 'swim', 'workout'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    caloriesBurned: Number,
    pace: Number,
    location: String,
    notes: String,
    activityDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', activitySchema);
