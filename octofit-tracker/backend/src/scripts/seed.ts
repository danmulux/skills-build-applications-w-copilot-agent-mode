import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('✓ Connected to octofit_db');

    // Clear existing data
    console.log('\n📋 Clearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Collections cleared');

    // Create sample users
    console.log('\n👥 Creating sample users...');
    const users = await User.insertMany([
      {
        username: 'alice_runner',
        email: 'alice@octofit.com',
        password: 'hashed_password_123',
        fullName: 'Alice Johnson',
        profile: {
          bio: 'Passionate marathon runner',
          location: 'San Francisco, CA',
          avatar: 'https://api.example.com/avatars/alice.jpg',
        },
        stats: {
          totalActivities: 24,
          totalDistance: 156.5,
          totalDuration: 8640,
        },
      },
      {
        username: 'bob_cyclist',
        email: 'bob@octofit.com',
        password: 'hashed_password_456',
        fullName: 'Bob Smith',
        profile: {
          bio: 'Cycling enthusiast & fitness coach',
          location: 'Portland, OR',
          avatar: 'https://api.example.com/avatars/bob.jpg',
        },
        stats: {
          totalActivities: 18,
          totalDistance: 342.8,
          totalDuration: 6480,
        },
      },
      {
        username: 'carol_swimmer',
        email: 'carol@octofit.com',
        password: 'hashed_password_789',
        fullName: 'Carol Williams',
        profile: {
          bio: 'Triathlon training',
          location: 'Austin, TX',
          avatar: 'https://api.example.com/avatars/carol.jpg',
        },
        stats: {
          totalActivities: 32,
          totalDistance: 89.2,
          totalDuration: 10800,
        },
      },
      {
        username: 'david_strength',
        email: 'david@octofit.com',
        password: 'hashed_password_101',
        fullName: 'David Brown',
        profile: {
          bio: 'Strength training & weightlifting',
          location: 'New York, NY',
          avatar: 'https://api.example.com/avatars/david.jpg',
        },
        stats: {
          totalActivities: 28,
          totalDistance: 12.5,
          totalDuration: 7920,
        },
      },
      {
        username: 'emma_walker',
        email: 'emma@octofit.com',
        password: 'hashed_password_202',
        fullName: 'Emma Davis',
        profile: {
          bio: 'Daily walker & wellness advocate',
          location: 'Seattle, WA',
          avatar: 'https://api.example.com/avatars/emma.jpg',
        },
        stats: {
          totalActivities: 45,
          totalDistance: 225.3,
          totalDuration: 12960,
        },
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    console.log('\n🏢 Creating sample teams...');
    const teams = await Team.insertMany([
      {
        name: 'Sunset Runners',
        description: 'A community of marathon and distance runners',
        owner: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
        stats: {
          totalActivities: 87,
          totalDistance: 724.6,
          totalDuration: 28800,
        },
      },
      {
        name: 'Urban Cyclists',
        description: 'City cycling and bike commuting group',
        owner: users[1]._id,
        members: [users[1]._id, users[2]._id],
        stats: {
          totalActivities: 52,
          totalDistance: 1205.5,
          totalDuration: 18000,
        },
      },
      {
        name: 'Fitness Champions',
        description: 'Multi-sport fitness and wellness team',
        owner: users[3]._id,
        members: [users[2]._id, users[3]._id, users[4]._id],
        stats: {
          totalActivities: 105,
          totalDistance: 327.0,
          totalDuration: 31680,
        },
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Update users with team associations
    await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { teamId: teams[2]._id });
    await User.updateOne({ _id: users[4]._id }, { teamId: teams[0]._id });

    // Create sample activities
    console.log('\n🏃 Creating sample activities...');
    const today = new Date();
    const activities = await Activity.insertMany([
      // Alice's activities
      {
        userId: users[0]._id,
        type: 'run',
        duration: 3600,
        distance: 10.5,
        caloriesBurned: 945,
        pace: 5.71,
        location: 'Golden Gate Park, SF',
        notes: 'Morning run - felt great!',
        activityDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'run',
        duration: 5400,
        distance: 15.2,
        caloriesBurned: 1368,
        pace: 5.92,
        location: 'Bay Trail',
        notes: 'Long run - good endurance',
        activityDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
      // Bob's activities
      {
        userId: users[1]._id,
        type: 'cycle',
        duration: 7200,
        distance: 48.5,
        caloriesBurned: 1552,
        pace: 6.76,
        location: 'Skyline Drive',
        notes: 'Weekend ride - uphill climb',
        activityDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      // Carol's activities
      {
        userId: users[2]._id,
        type: 'swim',
        duration: 2400,
        distance: 2.0,
        caloriesBurned: 480,
        pace: 20.0,
        location: 'Downtown Pool',
        notes: 'Lap swimming - 40 laps',
        activityDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      // David's activities
      {
        userId: users[3]._id,
        type: 'workout',
        duration: 3600,
        distance: 0,
        caloriesBurned: 720,
        location: 'Gym',
        notes: 'Chest and triceps - PRs on bench press',
        activityDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      // Emma's activities
      {
        userId: users[4]._id,
        type: 'walk',
        duration: 2700,
        distance: 3.5,
        caloriesBurned: 245,
        pace: 12.86,
        location: 'Pike Place Market',
        notes: 'Leisurely evening walk',
        activityDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    console.log('\n🏆 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      // Global weekly leaderboard
      {
        userId: users[2]._id,
        rank: 1,
        score: 950,
        totalDistance: 95.2,
        totalActivities: 8,
        totalDuration: 14400,
        period: 'weekly',
      },
      {
        userId: users[0]._id,
        rank: 2,
        score: 890,
        totalDistance: 85.5,
        totalActivities: 6,
        totalDuration: 13500,
        period: 'weekly',
      },
      {
        userId: users[4]._id,
        rank: 3,
        score: 850,
        totalDistance: 72.3,
        totalActivities: 12,
        totalDuration: 12600,
        period: 'weekly',
      },
      {
        userId: users[1]._id,
        rank: 4,
        score: 780,
        totalDistance: 125.8,
        totalActivities: 5,
        totalDuration: 11700,
        period: 'weekly',
      },
      {
        userId: users[3]._id,
        rank: 5,
        score: 720,
        totalDistance: 15.3,
        totalActivities: 9,
        totalDuration: 10800,
        period: 'weekly',
      },
      // Team leaderboard - Sunset Runners
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        rank: 1,
        score: 1200,
        totalDistance: 156.5,
        totalActivities: 24,
        totalDuration: 21600,
        period: 'weekly',
      },
      {
        userId: users[4]._id,
        teamId: teams[0]._id,
        rank: 2,
        score: 980,
        totalDistance: 125.3,
        totalActivities: 22,
        totalDuration: 19800,
        period: 'weekly',
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    console.log('\n💪 Creating sample workouts...');
    const workouts = await Workout.insertMany([
      // Alice's workouts
      {
        userId: users[0]._id,
        title: 'Marathon Prep - Long Run',
        description: 'Building endurance for upcoming marathon',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 120,
        exercises: [
          { name: 'Warm-up jog', duration: 10 },
          { name: 'Main run', duration: 100 },
          { name: 'Cool-down', duration: 10 },
        ],
        scheduledDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
        notes: 'Focus on steady pace and hydration',
        isCompleted: false,
      },
      // Bob's workouts
      {
        userId: users[1]._id,
        title: 'Hill Repeats',
        description: 'Strength and power intervals on hills',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 90,
        exercises: [
          { name: 'Warm-up', duration: 15 },
          { name: '6x hill repeats', duration: 60 },
          { name: 'Recovery spin', duration: 15 },
        ],
        scheduledDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        notes: 'Push hard on climbs',
        isCompleted: false,
      },
      // David's workouts
      {
        userId: users[3]._id,
        title: 'Push Day',
        description: 'Chest, shoulders, and triceps focus',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 60,
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
          { name: 'Cable Flyes', sets: 3, reps: 12 },
          { name: 'Tricep Dips', sets: 3, reps: 10 },
          { name: 'Overhead Press', sets: 3, reps: 8 },
        ],
        scheduledDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        isCompleted: false,
      },
      // Emma's workout
      {
        userId: users[4]._id,
        title: 'Flexibility & Mobility',
        description: 'Improve range of motion and prevent injury',
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          { name: 'Dynamic stretching', duration: 10 },
          { name: 'Yoga flow', duration: 30 },
          { name: 'Static stretching', duration: 5 },
        ],
        scheduledDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        notes: 'Relax and recover',
        isCompleted: false,
      },
      // Completed workout example
      {
        userId: users[0]._id,
        title: 'Speed Work',
        description: 'Tempo run and intervals',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 75,
        exercises: [
          { name: 'Warm-up jog', duration: 10 },
          { name: '5x 1km intervals', duration: 50 },
          { name: 'Cool-down', duration: 15 },
        ],
        isCompleted: true,
        completionDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        scheduledDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Great tempo run - hit all targets',
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ DATABASE SEEDING COMPLETE');
    console.log('='.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Teams: ${teams.length}`);
    console.log(`   • Activities: ${activities.length}`);
    console.log(`   • Leaderboard Entries: ${leaderboardEntries.length}`);
    console.log(`   • Workouts: ${workouts.length}`);
    console.log(`\n🎯 Database: octofit_db`);
    console.log(`🔗 Connection: ${connectionString}`);
    console.log('='.repeat(50));

    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
