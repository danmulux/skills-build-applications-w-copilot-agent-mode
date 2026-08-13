import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL } from './api';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏢 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light text-center py-4 mt-5">
          <div className="container">
            <p className="text-muted mb-2">
              🐙 OctoFit Tracker - Multi-tier Fitness Application
            </p>
            <p className="text-muted small mb-0">
              API Base URL: <code>{API_BASE_URL}</code>
            </p>
            <p className="text-muted small">
              Built with React 19, Vite, Bootstrap & Express.js
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body text-center py-5">
              <h1 className="mb-4">🐙 Welcome to OctoFit Tracker</h1>
              <p className="lead mb-4">
                Your multi-tier fitness tracking application
              </p>
              <p className="text-muted mb-4">
                Track activities, manage teams, view leaderboards, and plan your workouts!
              </p>
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">👥 Users</h5>
                      <p className="card-text">Manage user profiles and statistics</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🏃 Activities</h5>
                      <p className="card-text">Log runs, cycles, swims and more</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🏢 Teams</h5>
                      <p className="card-text">Create and manage fitness teams</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">🏆 Leaderboard</h5>
                      <p className="card-text">View competitive rankings</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">💪 Workouts</h5>
                      <p className="card-text">Plan and track workout sessions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h6 className="text-muted">Tech Stack</h6>
                <p className="small text-muted">
                  React 19 • Vite • Bootstrap • React Router • Express.js • MongoDB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
