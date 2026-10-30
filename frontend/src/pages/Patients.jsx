import { useState, useEffect } from 'react';
import { Activity, Users, Plus, Edit2, Trash2, LogOut, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Patients.css';

function Patients({ onLogout }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    dateOfBirth: '',
    registeredDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4004/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4004/api/patients', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        address: '',
        dateOfBirth: '',
        registeredDate: new Date().toISOString().split('T')[0]
      });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patients">
      <nav className="navbar">
        <div className="navbar-brand">
          <Activity size={28} />
          <span>PatientCare</span>
        </div>
        <div className="navbar-nav">
          <Link to="/dashboard" className="nav-link">
            <Activity size={18} />
            Dashboard
          </Link>
          <Link to="/patients" className="nav-link active">
            <Users size={18} />
            Patients
          </Link>
        </div>
        <div className="user-info">
          <span className="user-email">{localStorage.getItem('email') || 'testuser@test.com'}</span>
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="page-header">
          <div>
            <h1>Patients</h1>
            <p>Manage your patient records</p>
          </div>
          <button className="btn" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Patient
          </button>
        </div>

        <div className="card">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="input search-input"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading">Loading patients...</div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Date of Birth</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="patient-name">{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.address}</td>
                      <td>{patient.dateOfBirth}</td>
                      <td>{patient.registeredDate}</td>
                      <td>
                        <div className="actions">
                          <button className="icon-btn">
                            <Edit2 size={16} />
                          </button>
                          <button className="icon-btn danger">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Patient</h2>
              <button className="icon-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Address</label>
                <input
                  type="text"
                  className="input"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="input"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;
