# OctoFit Tracker API Configuration Guide

## Environment-Aware Configuration

The OctoFit Tracker Node.js API is configured to automatically detect and adapt to different deployment environments.

### 🎯 Supported Environments

#### GitHub Codespaces
- **Auto-Detection**: Reads `CODESPACE_NAME` environment variable
- **Base URL**: `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Example**: `https://fantastic-guide-v6w47jjxr57c7x5-8000.app.github.dev`
- **Port**: 8000 (always)

#### Local Development
- **Condition**: When `CODESPACE_NAME` is not set
- **Base URL**: `http://localhost:8000`
- **Port**: 8000 (or override with `PORT` env var)
- **Default Database**: `mongodb://localhost:27017/octofit_db`

---

## Configuration Files

### `.env` (Environment Variables)

Located: `backend/.env`

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/octofit_db

# Server Configuration
PORT=8000
NODE_ENV=development

# Codespace Configuration (auto-detected if in Codespaces)
# When running in GitHub Codespaces, CODESPACE_NAME is automatically set
```

### `.env.example` (Template)

Provides a template for initial setup. Copy to `.env` and customize as needed.

### Code Implementation

**File**: `backend/src/index.ts`

```typescript
// Environment-aware base URL
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const PORT = process.env.PORT || 8000;

// Health check returns the detected base URL
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'OctoFit Tracker API is running',
    baseUrl,  // Shows which environment URL is being used
  });
});
```

**File**: `backend/src/config/database.ts`

```typescript
export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  await mongoose.connect(mongoUri);
};
```

---

## Starting the Server

### Development (Local)
```bash
cd octofit-tracker/backend

# Option 1: Use ts-node (development with hot reload)
npm run dev

# Option 2: Build and run production
npm run build
npm start
```

### Production Build
```bash
npm run build     # Compiles TypeScript to dist/
npm start        # Runs the compiled JavaScript
```

---

## Testing API Endpoints

### Health Check
```bash
# Returns the detected base URL
curl http://localhost:8000/api/health | jq .

# Example response:
# {
#   "status": "OK",
#   "message": "OctoFit Tracker API is running",
#   "baseUrl": "http://localhost:8000"  # or Codespaces URL
# }
```

### Get All Users
```bash
curl http://localhost:8000/api/users | jq .

# Returns array of 5 sample users
```

### Get All Activities
```bash
curl http://localhost:8000/api/activities | jq .

# Returns array of 6 logged activities
# Types: run, cycle, swim, walk, workout
```

### Get User-Specific Activities
```bash
# First, get a user ID
USER_ID=$(curl -s http://localhost:8000/api/users | jq -r '.[0]._id')

# Then fetch their activities
curl http://localhost:8000/api/activities/user/$USER_ID | jq .
```

### Get Global Leaderboard
```bash
curl http://localhost:8000/api/leaderboard/global | jq .

# Optional: Filter by period
curl http://localhost:8000/api/leaderboard/global?period=weekly | jq .
```

### Get Teams
```bash
curl http://localhost:8000/api/teams | jq .

# Returns 3 sample teams
```

### Get Workouts
```bash
curl http://localhost:8000/api/workouts | jq .

# Returns 5 sample workouts (mix of scheduled and completed)
```

---

## API Endpoints Summary

| Resource | Method | Endpoint | Status |
|----------|--------|----------|--------|
| **Health** | GET | `/api/health` | ✅ |
| **Users** | GET | `/api/users` | ✅ |
| | GET | `/api/users/:id` | ✅ |
| | POST | `/api/users` | ✅ |
| | PUT | `/api/users/:id` | ✅ |
| | DELETE | `/api/users/:id` | ✅ |
| **Activities** | GET | `/api/activities` | ✅ |
| | GET | `/api/activities/:id` | ✅ |
| | GET | `/api/activities/user/:userId` | ✅ |
| | POST | `/api/activities` | ✅ |
| | PUT | `/api/activities/:id` | ✅ |
| | DELETE | `/api/activities/:id` | ✅ |
| **Teams** | GET | `/api/teams` | ✅ |
| | GET | `/api/teams/:id` | ✅ |
| | POST | `/api/teams` | ✅ |
| | POST | `/api/teams/:id/members` | ✅ |
| | PUT | `/api/teams/:id` | ✅ |
| | DELETE | `/api/teams/:id` | ✅ |
| **Leaderboard** | GET | `/api/leaderboard/global` | ✅ |
| | GET | `/api/leaderboard/team/:teamId` | ✅ |
| | GET | `/api/leaderboard/:id` | ✅ |
| | POST | `/api/leaderboard` | ✅ |
| | PUT | `/api/leaderboard/:id` | ✅ |
| **Workouts** | GET | `/api/workouts` | ✅ |
| | GET | `/api/workouts/:id` | ✅ |
| | GET | `/api/workouts/user/:userId` | ✅ |
| | POST | `/api/workouts` | ✅ |
| | POST | `/api/workouts/:id/complete` | ✅ |
| | PUT | `/api/workouts/:id` | ✅ |
| | DELETE | `/api/workouts/:id` | ✅ |

---

## Environment Variable Reference

| Variable | Default | Purpose | Example |
|----------|---------|---------|---------|
| `CODESPACE_NAME` | (auto-detect) | GitHub Codespaces name | `fantastic-guide-v6w47jjxr57c7x5` |
| `PORT` | `8000` | Server port | `8000` |
| `NODE_ENV` | `development` | Node environment | `development`, `production` |
| `MONGODB_URI` | `mongodb://localhost:27017/octofit_db` | MongoDB connection | Custom connection string |

---

## Codespaces Deployment Checklist

### Pre-Deployment
- ✅ Ensure MongoDB is running: `ps aux \| grep mongod`
- ✅ Install dependencies: `npm install`
- ✅ Build backend: `npm run build`
- ✅ Seed database: `npm run seed`

### Runtime
- ✅ `CODESPACE_NAME` is automatically set in Codespaces environment
- ✅ API detects Codespaces and uses proper HTTPS URL
- ✅ Database connection uses MongoDB instance
- ✅ Server listens on port 8000

### Verification
```bash
# Health check (auto-detects environment)
curl http://localhost:8000/api/health

# Should return Codespaces URL if in Codespaces:
# "baseUrl": "https://{CODESPACE_NAME}-8000.app.github.dev"
```

---

## Frontend Integration

### Connecting React Frontend to API

#### Local Development
```typescript
// frontend/src/config.ts
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
```

#### Environment Variables (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

#### API Call Example
```typescript
// Get users
const users = await apiClient.get('/users');

// Get activities
const activities = await apiClient.get('/activities');

// Get user activities
const userActivities = await apiClient.get(`/activities/user/${userId}`);
```

---

## Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution**: Ensure MongoDB is running
```bash
ps aux | grep mongod  # Check if running
# If not running, start with: mongod --dbpath /data/db
```

### Issue: Port 8000 already in use
**Solution**: Use a different port via environment variable
```bash
PORT=8001 npm start
```

### Issue: CORS errors when calling from frontend
**Solution**: CORS is enabled in backend (`app.use(cors())`)
- Verify frontend is making requests to correct API URL
- Check that API base URL matches deployment environment

### Issue: API returning wrong baseUrl
**Solution**: Check CODESPACE_NAME environment variable
```bash
echo $CODESPACE_NAME  # Should be set in Codespaces
env | grep CODESPACE   # List all Codespace-related vars
```

---

## Performance Notes

- All endpoints include MongoDB query optimization via Mongoose population
- CORS enabled for frontend-to-API communication
- Error handling middleware catches and formats errors
- Timestamps automatically generated for all entities

---

## Next Steps

1. ✅ **Configure API** - Backend environment-aware configuration complete
2. ✅ **Seed Database** - Database populated with sample data
3. 🔲 **Build React Frontend** - Create UI components
4. 🔲 **Connect Frontend to API** - Integrate React with Express endpoints
5. 🔲 **Add Authentication** - Implement user login/registration
6. 🔲 **Deploy to Codespaces** - Forward ports and test public access

---

**Status**: ✨ **API fully configured for both Codespaces and localhost development!** ✨
