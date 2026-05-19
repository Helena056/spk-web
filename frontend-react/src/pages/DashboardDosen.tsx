import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DashboardDosen.css';

const DashboardDosen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="glass-navbar">
        <div className="nav-brand">
          <span className="icon">👨‍🏫</span>
          <span>Portal Dosen</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>

      <main className="content">
        <div className="glass-card welcome-card">
          <h2>Area Dosen</h2>
          <p>Silakan berikan penilaian objektif kepada mahasiswa berdasarkan kriteria yang telah ditentukan sistem.</p>
        </div>

        <div className="menu-grid">
          <Link to="/dosen/penilaian" className="glass-card menu-card">
            <div className="icon-wrapper emerald-glow">
              <span className="icon">📝</span>
            </div>
            <div className="menu-text">
              <h3>Inpuit penilaian</h3>
              <p>Kelola data nilai kinerja mahasiswa untuk bahan kalkulasi metode SAW.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardDosen;
