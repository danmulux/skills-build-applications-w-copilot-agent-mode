"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
