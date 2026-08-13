# OctoFit Tracker Database Initialization & Population

## ✅ Database Status

**Database**: `octofit_db`  
**Connection**: `mongodb://localhost:27017/octofit_db`  
**Status**: ✓ Initialized and populated  
**Last Seeded**: 2026-08-13 13:37:00

## 📊 Seeded Data Summary

### Collections & Record Counts

| Collection | Count | Purpose |
|------------|-------|---------|
| Users | 5 | User profiles with stats & team associations |
| Teams | 3 | Team management with membership & stats |
| Activities | 6 | Activity logging (runs, cycles, swims, workouts, walks) |
| Leaderboard | 7 | Global & team leaderboard rankings |
| Workouts | 5 | Scheduled & completed workout plans |

### Sample Users Created

1. **alice_runner** (alice@octofit.com)
   - Role: Marathon runner, Team Lead
   - Team: Sunset Runners
   - Stats: 24 activities, 156.5 km, 8,640 minutes

2. **bob_cyclist** (bob@octofit.com)
   - Role: Cyclist & fitness coach
   - Team: Sunset Runners
   - Stats: 18 activities, 342.8 km, 6,480 minutes

3. **carol_swimmer** (carol@octofit.com)
   - Role: Triathlon trainer
   - Team: Urban Cyclists
   - Stats: 32 activities, 89.2 km, 10,800 minutes (top leaderboard)

4. **david_strength** (david@octofit.com)
   - Role: Strength training specialist
   - Team: Fitness Champions
   - Stats: 28 activities, 12.5 km, 7,920 minutes

5. **emma_walker** (emma@octofit.com)
   - Role: Wellness advocate
   - Team: Sunset Runners
   - Stats: 45 activities, 225.3 km, 12,960 minutes

### Sample Teams Created

1. **Sunset Runners** (Owner: alice_runner)
   - Members: 3 (alice_runner, bob_cyclist, emma_walker)
   - Team Stats: 87 activities, 724.6 km, 28,800 minutes

2. **Urban Cyclists** (Owner: bob_cyclist)
   - Members: 2 (bob_cyclist, carol_swimmer)
   - Team Stats: 52 activities, 1,205.5 km, 18,000 minutes

3. **Fitness Champions** (Owner: david_strength)
   - Members: 3 (carol_swimmer, david_strength, emma_walker)
   - Team Stats: 105 activities, 327.0 km, 31,680 minutes

### Activity Types Logged

- **Run** (2 activities) - Marathon training, speed work
- **Cycle** (1 activity) - Hill repeats
- **Swim** (1 activity) - Lap swimming
- **Workout** (1 activity) - Strength training
- **Walk** (1 activity) - Leisurely walking

All activities dated within the last 3 days with realistic durations, distances, and calories burned.

### Leaderboard Data

**Global Weekly Rankings:**
1. 🥇 carol_swimmer - Score: 950 (95.2 km, 8 activities)
2. 🥈 alice_runner - Score: 890 (85.5 km, 6 activities)
3. 🥉 emma_walker - Score: 850 (72.3 km, 12 activities)
4. 4️⃣ bob_cyclist - Score: 780 (125.8 km, 5 activities)
5. 5️⃣ david_strength - Score: 720 (15.3 km, 9 activities)

**Team Leaderboards:**
- Sunset Runners: 2 members ranked
- Fitness Champions: Team data available
- Urban Cyclists: Team data available

### Workout Plans Seeded

1. **Marathon Prep - Long Run** (alice_runner)
   - Type: Cardio, Difficulty: Advanced
   - Duration: 120 min
   - Status: Scheduled (not completed)

2. **Hill Repeats** (bob_cyclist)
   - Type: Cardio, Difficulty: Advanced
   - Duration: 90 min
   - Status: Scheduled

3. **Push Day** (david_strength)
   - Type: Strength, Difficulty: Intermediate
   - Duration: 60 min
   - Exercises: 5 (Bench Press, Incline DB Press, Cable Flyes, Tricep Dips, Overhead Press)

4. **Flexibility & Mobility** (emma_walker)
   - Type: Flexibility, Difficulty: Beginner
   - Duration: 45 min
   - Status: Scheduled

5. **Speed Work** (alice_runner)
   - Type: Cardio, Difficulty: Advanced
   - Status: ✓ Completed 2 days ago

## 🚀 API Endpoints Verified

### ✅ Working Endpoints (Tested)

**Health & Status**
- `GET /api/health` - API health check

**Users** 
- `GET /api/users` - List all users (5 returned)
- `GET /api/users/:id` - Get user details with stats
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Teams**
- `GET /api/teams` - List all teams (3 returned)
- `GET /api/teams/:id` - Get team with members populated
- `POST /api/teams` - Create team
- `POST /api/teams/:id/members` - Add team member
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

**Activities**
- `GET /api/activities` - List all activities (6 returned)
- `GET /api/activities/user/:userId` - Get user's activities
- `GET /api/activities/:id` - Get specific activity
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

**Leaderboard**
- `GET /api/leaderboard/global` - Global rankings
- `GET /api/leaderboard/global?period=weekly` - Global with period filter
- `GET /api/leaderboard/team/:teamId` - Team leaderboard
- `GET /api/leaderboard/:id` - Get specific leaderboard entry
- `POST /api/leaderboard` - Create leaderboard entry
- `PUT /api/leaderboard/:id` - Update leaderboard

**Workouts**
- `GET /api/workouts` - List all workouts (5 returned)
- `GET /api/workouts/user/:userId` - Get user's workouts
- `GET /api/workouts/:id` - Get specific workout
- `POST /api/workouts` - Create workout
- `POST /api/workouts/:id/complete` - Mark complete
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## 🔧 Seeding Instructions

### Run Seed Script

```bash
cd octofit-tracker/backend

# Using compiled version (recommended)
npm run build && node dist/scripts/seed.js

# Or with npm script
npm run seed
```

### Reset Database (Clear & Re-seed)

```bash
# The seed script automatically clears all collections before populating
npm run seed
```

### Environment Variables

Set `MONGODB_URI` to override default connection:
```bash
export MONGODB_URI=mongodb://localhost:27017/octofit_db
npm run seed
```

## 📋 Seed Script Features

The seed script (`src/scripts/seed.ts`):
- ✅ Connects to MongoDB automatically
- ✅ Clears existing data before seeding
- ✅ Creates realistic sample data
- ✅ Establishes relationships (user→team, activity→user, etc.)
- ✅ Populates with varied data types
- ✅ Provides progress feedback
- ✅ Shows summary statistics
- ✅ Properly disconnects on completion

## 🧪 Testing the API

Start the backend server:
```bash
npm start
```

Test endpoints with curl:
```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get user by ID
curl http://localhost:8000/api/users/{userId}

# Get global leaderboard
curl http://localhost:8000/api/leaderboard/global

# Get team leaderboard with weekly period
curl http://localhost:8000/api/leaderboard/team/{teamId}?period=weekly
```

## 🔐 Data Integrity

- ✅ All user references are valid ObjectIds
- ✅ Team memberships properly configured
- ✅ Activities linked to existing users
- ✅ Leaderboard entries populated with realistic scoring
- ✅ Workout plans scheduled with future dates
- ✅ Timestamps generated on creation/update
- ✅ No orphaned references

## 📝 Notes

- Passwords in seeded users are hashed examples (`hashed_password_*`)
- Activities use dates from the last 3 days (relative to seed execution)
- Leaderboard entries include both global and team-specific rankings
- Workouts include mix of pending and completed tasks
- All sample data is realistic for a fitness tracking application

## Next Steps

1. **Create React Components** - Build UI to display seeded data
2. **Implement Authentication** - Add login/registration with hashed passwords
3. **Add Validation** - Implement request validation middleware
4. **Create More Seed Data** - Add historical data for analytics
5. **Set Up Cron Jobs** - Auto-generate leaderboard updates

---

✅ **Database initialization complete and verified!** All collections populated with realistic sample data. API endpoints tested and working correctly.
