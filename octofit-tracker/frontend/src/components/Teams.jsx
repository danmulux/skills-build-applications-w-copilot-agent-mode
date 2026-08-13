import { useState, useEffect } from 'react';
import { apiClient } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    ownerId: '',
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teamsData, usersData] = await Promise.all([
        apiClient.get('/teams'),
        apiClient.get('/users'),
      ]);
      setTeams(Array.isArray(teamsData) ? teamsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      setError(err.message);
      setTeams([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/teams', {
        name: newTeam.name,
        description: newTeam.description,
        ownerId: newTeam.ownerId,
      });
      setNewTeam({ name: '', description: '', ownerId: '' });
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedTeam || !newMemberId) return;
    try {
      await apiClient.post(`/teams/${selectedTeam._id}/members`, {
        userId: newMemberId,
      });
      setNewMemberId('');
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiClient.delete(`/teams/${id}`);
        setSelectedTeam(null);
        await fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏢 Teams</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Create New Team</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreateTeam}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Team Name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-select"
                  value={newTeam.ownerId}
                  onChange={(e) => setNewTeam({ ...newTeam, ownerId: e.target.value })}
                  required
                >
                  <option value="">Select Owner</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                  rows="2"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Team
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <h5>{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <strong>Owner:</strong> {team.owner?.username}<br />
                  <strong>Members:</strong> {team.members?.length || 0}
                </p>
                {team.stats && (
                  <p className="card-text">
                    <small>
                      Activities: {team.stats.totalActivities} | Distance: {team.stats.totalDistance} km
                    </small>
                  </p>
                )}
                <div className="mb-2">
                  {team.members?.map((member) => (
                    <span key={member._id} className="badge bg-secondary me-1">
                      {member.username}
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => setSelectedTeam(team)}
                  data-bs-toggle="modal"
                  data-bs-target="#addMemberModal"
                >
                  Add Member
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteTeam(team._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <div className="modal fade" id="addMemberModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Member to {selectedTeam.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddMember}>
                  <select
                    className="form-select mb-3"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                    required
                  >
                    <option value="">Select User</option>
                    {users
                      .filter((u) => !selectedTeam.members?.some((m) => m._id === u._id))
                      .map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))}
                  </select>
                  <button type="submit" className="btn btn-primary">
                    Add Member
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
