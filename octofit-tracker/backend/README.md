# OctoFit Tracker Backend API

Express.js RESTful API for the OctoFit Tracker multi-tier application.

## Tech Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB with Mongoose
- **Port**: 8000

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection configuration
│   ├── middleware/
│   │   └── errorHandler.ts      # Error handling & 404 middleware
│   ├── models/                  # Mongoose schemas
│   │   ├── User.ts              # User profile & stats
│   │   ├── Team.ts              # Team management
│   │   ├── Activity.ts          # Activity logging
│   │   ├── Leaderboard.ts       # Competitive rankings
│   │   └── Workout.ts           # Personalized workouts
│   ├── routes/                  # API endpoints
│   │   ├── users.ts             # User CRUD operations
│   │   ├── teams.ts             # Team management
│   │   ├── activities.ts        # Activity tracking
│   │   ├── leaderboard.ts       # Rankings & scores
│   │   └── workouts.ts          # Workout management
│   ├── scripts/
│   │   └── seed.ts              # Database seeding
│   └── index.ts                 # Express app entry point
├── dist/                        # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env.example
```

## API Endpoints

### Health Check
- `GET /api/health` - API status check

### Users (`/api/users`)
- `GET /` - List all users
- `GET /:id` - Get user by ID
- `POST /` - Create user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Teams (`/api/teams`)
- `GET /` - List all teams
- `GET /:id` - Get team by ID
- `POST /` - Create team
- `POST /:id/members` - Add member to team
- `PUT /:id` - Update team
- `DELETE /:id` - Delete team

### Activities (`/api/activities`)
- `GET /` - List all activities
- `GET /user/:userId` - Get user's activities
- `GET /:id` - Get activity by ID
- `POST /` - Create activity
- `PUT /:id` - Update activity
- `DELETE /:id` - Delete activity

### Leaderboard (`/api/leaderboard`)
- `GET /global/:period?` - Global leaderboard (daily/weekly/monthly/yearly)
- `GET /team/:teamId/:period?` - Team leaderboard
- `GET /:id` - Get leaderboard entry
- `POST /` - Create leaderboard entry
- `PUT /:id` - Update leaderboard entry

### Workouts (`/api/workouts`)
- `GET /` - List all workouts
- `GET /user/:userId` - Get user's workouts
- `GET /:id` - Get workout by ID
- `POST /` - Create workout
- `POST /:id/complete` - Mark workout as complete
- `PUT /:id` - Update workout
- `DELETE /:id` - Delete workout

## Setup & Installation

### Prerequisites
- Node.js (LTS)
- MongoDB running on `localhost:27017`

### Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (copy `.env.example` to `.env`):
```bash
cp .env.example .env
```

3. Configure `.env` if needed (default settings connect to local MongoDB):
```env
MONGODB_URI=mongodb://localhost:27017/octofit_db
PORT=8000
```

## Development

### Start development server
```bash
npm run dev
```
The server will start with `ts-node` and watch for changes.

### Build for production
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` folder.

### Start production server
```bash
npm start
```
Runs the compiled JavaScript from `dist/index.js`.

## Database

- **Database Name**: `octofit_db`
- **Connection**: `mongodb://localhost:27017/octofit_db`

### Models

**User**
- Profile information (username, email, fullName)
- Activity statistics (totalActivities, totalDistance, totalDuration)
- Team association

**Team**
- Team info (name, description)
- Members list & owner
- Aggregated statistics

**Activity**
- Type: run, walk, cycle, swim, workout
- Duration, distance, calories, pace
- Location & notes
- Activity date & timestamps

**Leaderboard**
- Ranks users/teams by score
- Periods: daily, weekly, monthly, yearly
- Tracks distance, activities, duration

**Workout**
- Type: cardio, strength, flexibility, balance, endurance
- Difficulty: beginner, intermediate, advanced
- Exercises with sets/reps
- Scheduling & completion tracking

## Environment-Aware URLs

The API automatically detects GitHub Codespaces environment:

- **Local Development**: `http://localhost:8000`
- **GitHub Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev`

Set `CODESPACE_NAME` environment variable for Codespaces deployment.

## Error Handling

All endpoints include error handling middleware with:
- 400 Bad Request for missing/invalid fields
- 404 Not Found for missing resources
- 500 Internal Server Error for unexpected failures
- Consistent error response format: `{ error: { status, message } }`

## Testing

To test endpoints, use curl or an HTTP client:

```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Create a user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"pass123","fullName":"John Doe"}'
```

## Deployment

For Codespaces or production deployment:

1. Ensure MongoDB is running (see data tier setup)
2. Set `CODESPACE_NAME` env var if using Codespaces
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Start: `npm start`

## Contributing

- Follow TypeScript strict mode
- Use async/await for async operations
- Add proper error handling
- Keep models and routes organized
