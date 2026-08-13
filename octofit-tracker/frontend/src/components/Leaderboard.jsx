import { useState, useEffect } from 'react';
import { apiClient } from '../api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('weekly');
  const [leaderboardType, setLeaderboardType] = useState('global');
  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [period, leaderboardType, selectedTeamId]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const teamsData = await apiClient.get('/teams');
      setTeams(Array.isArray(teamsData) ? teamsData : []);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      let data;
      if (leaderboardType === 'global') {
        data = await apiClient.get(`/leaderboard/global?period=${period}`);
      } else if (selectedTeamId) {
        data = await apiClient.get(`/leaderboard/team/${selectedTeamId}?period=${period}`);
      } else {
        data = [];
      }
      setLeaderboard(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏆 Leaderboard</h2>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={leaderboardType}
                onChange={(e) => {
                  setLeaderboardType(e.target.value);
                  setSelectedTeamId('');
                }}
              >
                <option value="global">Global Rankings</option>
                <option value="team">Team Rankings</option>
              </select>
            </div>

            {leaderboardType === 'team' && (
              <div className="col-md-4 mb-3">
                <label className="form-label">Team</label>
                <select
                  className="form-select"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={leaderboardType === 'team' ? 'col-md-4 mb-3' : 'col-md-8 mb-3'}>
              <label className="form-label">Period</label>
              <select
                className="form-select"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}

      {!loading && leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score</th>
                <th>Distance (km)</th>
                <th>Activities</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id}>
                  <td>
                    {entry.rank || index + 1}
                    {entry.rank === 1 && ' 🥇'}
                    {entry.rank === 2 && ' 🥈'}
                    {entry.rank === 3 && ' 🥉'}
                  </td>
                  <td>{entry.userId?.username || 'Unknown'}</td>
                  <td>
                    <strong>{entry.score || 0}</strong>
                  </td>
                  <td>{entry.totalDistance || 0}</td>
                  <td>{entry.totalActivities || 0}</td>
                  <td>{entry.totalDuration || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && leaderboard.length === 0 && (
        <div className="alert alert-info">
          {leaderboardType === 'team' && !selectedTeamId
            ? 'Please select a team to view its leaderboard'
            : 'No leaderboard data available'}
        </div>
      )}
    </div>
  );
}
