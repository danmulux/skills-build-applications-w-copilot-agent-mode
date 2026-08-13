import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stats: {
      totalActivities: {
        type: Number,
        default: 0,
      },
      totalDistance: {
        type: Number,
        default: 0,
      },
      totalDuration: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', teamSchema);
