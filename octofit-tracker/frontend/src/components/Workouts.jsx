import { useState, useEffect } from 'react';
import { apiClient } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    userId: '',
    title: '',
    description: '',
    type: 'cardio',
    difficulty: 'intermediate',
    duration: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [workoutsData, usersData] = await Promise.all([
        apiClient.get('/workouts'),
        apiClient.get('/users'),
      ]);
      setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      setError(err.message);
      setWorkouts([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    try {
      const workoutData = {
        ...newWorkout,
        duration: newWorkout.duration ? parseInt(newWorkout.duration) : undefined,
        scheduledDate: new Date(newWorkout.scheduledDate).toISOString(),
        exercises: [],
      };
      await apiClient.post('/workouts', workoutData);
      setNewWorkout({
        userId: '',
        title: '',
        description: '',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: '',
        scheduledDate: new Date().toISOString().split('T')[0],
        notes: '',
      });
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteWorkout = async (id) => {
    try {
      await apiClient.post(`/workouts/${id}/complete`, {});
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiClient.delete(`/workouts/${id}`);
        await fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const completedWorkouts = workouts.filter((w) => w.isCompleted);
  const scheduledWorkouts = workouts.filter((w) => !w.isCompleted);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💪 Workouts</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Create New Workout</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreateWorkout}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newWorkout.userId}
                  onChange={(e) => setNewWorkout({ ...newWorkout, userId: e.target.value })}
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Workout Title"
                  value={newWorkout.title}
                  onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newWorkout.type}
                  onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="balance">Balance</option>
                  <option value="endurance">Endurance</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newWorkout.difficulty}
                  onChange={(e) => setNewWorkout({ ...newWorkout, difficulty: e.target.value })}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Duration (minutes)"
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={newWorkout.scheduledDate}
                  onChange={(e) => setNewWorkout({ ...newWorkout, scheduledDate: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                  rows="2"
                />
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  placeholder="Notes"
                  value={newWorkout.notes}
                  onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                  rows="2"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Workout
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4>📋 Scheduled ({scheduledWorkouts.length})</h4>
          {scheduledWorkouts.map((workout) => (
            <div key={workout._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">
                  <strong>User:</strong> {workout.userId?.username}<br />
                  <strong>Type:</strong> {workout.type} | <strong>Difficulty:</strong> {workout.difficulty}<br />
                  <strong>Duration:</strong> {workout.duration} min | <strong>Date:</strong> {new Date(workout.scheduledDate).toLocaleDateString()}
                </p>
                {workout.description && <p className="card-text">{workout.description}</p>}
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleCompleteWorkout(workout._id)}
                >
                  Mark Complete
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteWorkout(workout._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <h4>✅ Completed ({completedWorkouts.length})</h4>
          {completedWorkouts.map((workout) => (
            <div key={workout._id} className="card mb-3 bg-light">
              <div className="card-body">
                <h5 className="card-title">{workout.title} ✓</h5>
                <p className="card-text">
                  <strong>User:</strong> {workout.userId?.username}<br />
                  <strong>Type:</strong> {workout.type} | <strong>Difficulty:</strong> {workout.difficulty}<br />
                  <strong>Completed:</strong> {new Date(workout.completionDate).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteWorkout(workout._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
