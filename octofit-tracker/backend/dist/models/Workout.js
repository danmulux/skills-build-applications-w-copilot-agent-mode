"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
