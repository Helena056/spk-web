import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DashboardAdmin.css';

const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="glass-navbar">
        <div className="nav-brand">
          <span className="icon">⚡</span>
          <span>SPK Admin Panel</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>

      <main className="content">
        <div className="glass-card welcome-card">
          <h2>Administrator</h2>
          <p>Kelola seluruh data master dan perhitungan Sistem Pendukung Keputusan (SAW) di sini.</p>
        </div>

        <div className="menu-grid">
          <Link to="/admin/mahasiswa" className="glass-card menu-card menu-card-1">
            <div className="icon-wrapper blue-glow">
              <span className="icon">🎓</span>
            </div>
            <div className="menu-text">
              <h3>Data Mahasiswa</h3>
              <p>Kelola daftar mahasiswa dan judul Tugas Akhir.</p>
            </div>
          </Link>

          <Link to="/admin/kriteria" className="glass-card menu-card menu-card-2">
            <div className="icon-wrapper purple-glow">
              <span className="icon">📊</span>
            </div>
            <div className="menu-text">
              <h3>Data Kriteria</h3>
              <p>Kelola indikator penilaian beserta bobotnya.</p>
            </div>
          </Link>
          
          <Link to="/admin/penilaian" className="glass-card menu-card menu-card-3">
            <div className="icon-wrapper emerald-glow">
              <span className="icon">📝</span>
            </div>
            <div className="menu-text">
              <h3>Tinjau Penilaian</h3>
              <p>Lihat rekapan nilai yang diinput oleh Dosen.</p>
            </div>
          </Link>

          <Link to="/admin/hasil" className="glass-card menu-card menu-card-4">
            <div className="icon-wrapper amber-glow">
              <span className="icon">🏆</span>
            </div>
            <div className="menu-text">
              <h3>Perhitungan SAW</h3>
              <p>Eksekusi algoritma dan lihat hasil kelayakan.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
