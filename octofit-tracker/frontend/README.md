# OctoFit Tracker Frontend Documentation

## Overview

The OctoFit Tracker frontend is a modern React 19 + Vite application that provides a user interface for managing fitness activities, teams, workouts, and competitive leaderboards. It communicates with the Express.js backend API via RESTful endpoints.

## Technology Stack

- **Framework**: React 19.2.8 with Vite 8.2.0
- **Routing**: react-router-dom 7.18.2
- **Styling**: Bootstrap 5.3.8 + Custom CSS
- **Build Tool**: Vite with Oxlint
- **HTTP Client**: Native Fetch API with custom `apiClient` wrapper

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # React entry point
│   ├── api.js                     # Environment-aware API client
│   ├── App.css                    # Application styles
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── Users.jsx              # User management
│   │   ├── Activities.jsx         # Activity logging
│   │   ├── Teams.jsx              # Team management
│   │   ├── Workouts.jsx           # Workout planning
│   │   └── Leaderboard.jsx        # Competitive rankings
│   └── assets/                    # Static assets
├── .env.example                   # Environment template
├── .env.local                     # Local environment config
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
└── index.html                     # HTML entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env.local` in the frontend directory:

```env
VITE_CODESPACE_NAME=your-codespace-name
VITE_ENV=development
```

**For Codespaces**: Replace `your-codespace-name` with your actual Codespace name (e.g., `fantastic-guide-v6w47jjxr57c7x5`)

**For Local Development**: Leave `VITE_CODESPACE_NAME` empty or omit it for localhost fallback

### 3. Start Development Server

```bash
npm run dev
```

Server runs on: `http://localhost:5173/`

### 4. Build for Production

```bash
npm run build
```

## Components Overview

### App.jsx (Main Component)

- **Purpose**: Application shell with routing and navigation
- **Features**:
  - React Router with 6 main routes
  - Persistent navigation bar with links to all sections
  - Bootstrap-based responsive layout
  - Footer with API endpoint display
  - Home page with feature overview

**Routes**:
- `/` → Home/Dashboard
- `/users` → User management
- `/activities` → Activity tracking
- `/teams` → Team management
- `/leaderboard` → Competitive rankings
- `/workouts` → Workout planning

### Users.jsx

**Purpose**: Manage user profiles and statistics

**Features**:
- List all users with profiles and statistics
- Create new user accounts
- View user details (username, email, fullName, stats)
- Delete user accounts
- Display aggregated stats (total activities, distance, duration)

**API Endpoints Used**:
- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `DELETE /users/:id` - Delete user

### Activities.jsx

**Purpose**: Log and track user activities

**Features**:
- Log new activities (run, walk, cycle, swim, workout)
- Display activity history with details
- Filter activities by user
- Track duration, distance, calories burned, location, and notes
- Delete activities
- Auto-populated user selection

**API Endpoints Used**:
- `GET /activities` - Fetch all activities
- `POST /activities` - Log new activity
- `DELETE /activities/:id` - Delete activity
- `GET /users` - Get users for dropdown

**Activity Types**: run, walk, cycle, swim, workout

### Teams.jsx

**Purpose**: Create and manage fitness teams

**Features**:
- Create new teams with owner assignment
- View team details and membership
- Add members to existing teams
- Display team statistics (total activities, distance)
- Delete teams
- Show team owner and member information

**API Endpoints Used**:
- `GET /teams` - Fetch all teams
- `POST /teams` - Create new team
- `POST /teams/:id/members` - Add member
- `DELETE /teams/:id` - Delete team
- `GET /users` - Get users for dropdown

### Leaderboard.jsx

**Purpose**: Display competitive rankings

**Features**:
- Global rankings by score, distance, activity count
- Team-specific leaderboards
- Period filtering (daily, weekly, monthly, yearly)
- Medal display for top 3 (🥇 🥈 🥉)
- Dynamic ranking updates

**API Endpoints Used**:
- `GET /leaderboard/global?period=:period` - Global rankings
- `GET /leaderboard/team/:teamId?period=:period` - Team rankings
- `GET /teams` - Get teams for team leaderboard dropdown

**Period Options**: daily, weekly, monthly, yearly

### Workouts.jsx

**Purpose**: Plan and track workout sessions

**Features**:
- Create workout plans with details (title, type, difficulty, duration)
- Schedule workouts for future dates
- Mark workouts as completed
- Separate view for scheduled vs. completed workouts
- Display workout descriptions and notes
- Delete workouts
- Track difficulty levels (beginner, intermediate, advanced)

**API Endpoints Used**:
- `GET /workouts` - Fetch all workouts
- `POST /workouts` - Create new workout
- `POST /workouts/:id/complete` - Mark as complete
- `DELETE /workouts/:id` - Delete workout
- `GET /users` - Get users for dropdown

**Workout Types**: cardio, strength, flexibility, balance, endurance
**Difficulty Levels**: beginner, intermediate, advanced

## API Client (api.js)

The `api.js` module provides environment-aware API communication:

### Features

1. **Automatic Environment Detection**:
   - Reads `VITE_CODESPACE_NAME` from `.env.local`
   - Constructs Codespaces URL: `https://{codespace-name}-8000.app.github.dev/api`
   - Falls back to localhost: `http://localhost:8000/api`

2. **HTTP Methods**:
   - `apiClient.get(endpoint)` - GET requests
   - `apiClient.post(endpoint, data)` - POST requests
   - `apiClient.put(endpoint, data)` - PUT requests
   - `apiClient.delete(endpoint)` - DELETE requests

3. **Error Handling**: All methods include try-catch with console logging

### Usage Example

```javascript
import { apiClient, API_BASE_URL } from './api';

// Fetch users
const users = await apiClient.get('/users');

// Create user
const newUser = await apiClient.post('/users', {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'secure123',
  fullName: 'John Doe'
});

// Delete user
await apiClient.delete('/users/userId');
```

## Styling

### Bootstrap Integration

- Bootstrap 5.3.8 CSS imported in `main.jsx`
- All components use Bootstrap classes for responsive design
- Custom CSS in `App.css` and `index.css` for OctoFit-specific styling

### Key CSS Classes Used

- `.container`, `.row`, `.col-*` - Grid layout
- `.card`, `.card-header`, `.card-body` - Card components
- `.btn`, `.btn-primary`, `.btn-danger` - Buttons
- `.form-control`, `.form-select` - Form elements
- `.table`, `.table-hover`, `.table-striped` - Tables
- `.navbar`, `.navbar-expand-lg` - Navigation
- `.badge`, `.badge-*` - Badges and labels
- `.alert`, `.alert-*` - Alert messages

## Running the Application

### Development

Terminal 1 - Start Backend:
```bash
cd backend
npm run build
npm start
```

Terminal 2 - Start Frontend:
```bash
cd frontend
npm run dev
```

### Verification

- Backend: `http://localhost:8000/api/health`
- Frontend: `http://localhost:5173/`
- API Base URL displayed in footer

## Environment Variables

### Required Variables

- `VITE_CODESPACE_NAME` - Codespace name for Codespaces deployment (optional for localhost)
- `VITE_ENV` - Environment type (default: 'development')

### Configuration

| Variable | Purpose | Default |
|----------|---------|---------|
| VITE_CODESPACE_NAME | Codespace identifier | undefined |
| VITE_ENV | Environment type | development |

## Common Tasks

### Adding a New Component

1. Create component file in `src/components/ComponentName.jsx`
2. Import API client and use `apiClient.get/post/put/delete`
3. Add route to `App.jsx`
4. Add navigation link in navbar

### Connecting to API Endpoint

```javascript
import { apiClient } from '../api';

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await apiClient.get('/endpoint');
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Debugging

1. **Check API Connection**: Open browser DevTools Console
2. **Verify Environment**: Footer displays current API Base URL
3. **Check .env.local**: Ensure VITE_CODESPACE_NAME matches backend URL
4. **Backend Logs**: Check Express server terminal for requests
5. **Network Tab**: Monitor API calls in DevTools

## Build & Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` folder with optimized assets

### Deployment Considerations

1. Set `VITE_CODESPACE_NAME` for Codespaces environment
2. Backend must be accessible from deployment environment
3. CORS must be enabled on backend (already configured)
4. Environment variables must be set before build

## Performance Tips

1. **Component Lazy Loading**: Use React.lazy() for routes
2. **State Management**: Keep state as local as possible
3. **API Caching**: Implement caching in components if needed
4. **Image Optimization**: Use optimized image formats
5. **Bundle Size**: Monitor with `npm run build` analysis

## Troubleshooting

### Issue: "Cannot reach backend"

**Solution**: 
- Verify backend is running on port 8000
- Check `.env.local` has correct `VITE_CODESPACE_NAME`
- Verify CORS is enabled on backend
- Check browser console for detailed error

### Issue: "Loading indefinitely"

**Solution**:
- Check API endpoint returns data
- Verify error handling in component
- Check network tab in DevTools
- Verify data structure matches expectations

### Issue: "Module not found"

**Solution**:
- Run `npm install`
- Check import paths are correct
- Verify component files exist

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Express API Documentation](../backend/README.md)

## Support

For issues or questions:
1. Check the backend logs for API errors
2. Review the API_CONFIG.md for endpoint details
3. Verify database seeding with `npm run seed` in backend
4. Check SEEDING.md for sample data structure

