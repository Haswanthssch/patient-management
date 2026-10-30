import { Activity, Users, Heart, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,234', color: '#6366f1' },
    { icon: Heart, label: 'Active Cases', value: '892', color: '#10b981' },
    { icon: Calendar, label: 'Appointments', value: '156', color: '#f59e0b' },
    { icon: Activity, label: 'Health Records', value: '3,456', color: '#a855f7' },
  ];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <Activity size={28} />
          <span>PatientCare</span>
        </div>
        <div className="navbar-nav">
          <Link to="/dashboard" className="nav-link active">
            <Activity size={18} />
            Dashboard
          </Link>
          <Link to="/patients" className="nav-link">
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
          <h1>Dashboard</h1>
          <p>Welcome back to your patient management system</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="card quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-list">
              <Link to="/patients" className="action-item">
                <Users size={20} />
                <span>View All Patients</span>
              </Link>
              <Link to="/patients" className="action-item">
                <Activity size={20} />
                <span>Add New Patient</span>
              </Link>
            </div>
          </div>

          <div className="card recent-activity">
            <h2>System Status</h2>
            <div className="status-list">
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>API Gateway - Online</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Auth Service - Online</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Patient Service - Online</span>
              </div>
              <div className="status-item">
                <div className="status-dot online"></div>
                <span>Kafka - Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
