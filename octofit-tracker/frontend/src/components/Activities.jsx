import { useState, useEffect } from 'react';
import { apiClient } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    userId: '',
    type: 'run',
    duration: '',
    distance: '',
    caloriesBurned: '',
    pace: '',
    location: '',
    notes: '',
    activityDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [activitiesData, usersData] = await Promise.all([
        apiClient.get('/activities'),
        apiClient.get('/users'),
      ]);
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      setError(err.message);
      setActivities([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const activityData = {
        ...newActivity,
        duration: parseInt(newActivity.duration),
        distance: parseFloat(newActivity.distance),
        caloriesBurned: newActivity.caloriesBurned ? parseInt(newActivity.caloriesBurned) : undefined,
        pace: newActivity.pace ? parseFloat(newActivity.pace) : undefined,
        activityDate: new Date(newActivity.activityDate).toISOString(),
      };
      await apiClient.post('/activities', activityData);
      setNewActivity({
        userId: '',
        type: 'run',
        duration: '',
        distance: '',
        caloriesBurned: '',
        pace: '',
        location: '',
        notes: '',
        activityDate: new Date().toISOString().split('T')[0],
      });
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiClient.delete(`/activities/${id}`);
        await fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏃 Activities</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Log New Activity</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreateActivity}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newActivity.userId}
                  onChange={(e) => setNewActivity({ ...newActivity, userId: e.target.value })}
                  required
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                >
                  <option value="run">Run</option>
                  <option value="walk">Walk</option>
                  <option value="cycle">Cycle</option>
                  <option value="swim">Swim</option>
                  <option value="workout">Workout</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Duration (min)"
                  value={newActivity.duration}
                  onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Distance (km)"
                  step="0.1"
                  value={newActivity.distance}
                  onChange={(e) => setNewActivity({ ...newActivity, distance: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Calories"
                  value={newActivity.caloriesBurned}
                  onChange={(e) => setNewActivity({ ...newActivity, caloriesBurned: e.target.value })}
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={newActivity.activityDate}
                  onChange={(e) => setNewActivity({ ...newActivity, activityDate: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  placeholder="Notes"
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                  rows="2"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Log Activity
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Calories</th>
              <th>Location</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.userId?.username || 'Unknown'}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.distance}</td>
                <td>{activity.caloriesBurned || '-'}</td>
                <td>{activity.location || '-'}</td>
                <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteActivity(activity._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
