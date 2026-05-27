import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './DashboardMahasiswa.css';

interface HasilSAW {
  id: number;
  mahasiswaNim: string;
  nilaiAkhir: number;
  status: string;
  mahasiswa: { nama: string; judul_ta: string };
}

const DashboardMahasiswa: React.FC = () => {
  const [myResult, setMyResult] = useState<HasilSAW | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const loadMyResult = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/");
        return;
      }
      
      const user = JSON.parse(userStr);
      const nim = user.mahasiswaNim || user.username; 
      setUserName(user.username);

      const res = await api.get("/hasil-saw");
      const found = res.data.find((h: any) => h.mahasiswaNim === nim);
      
      if (found) {
        setMyResult(found);
      }
    } catch (error) {
      console.error("Gagal memuat hasil SAW", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  useEffect(() => {
    loadMyResult();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="glass-navbar">
        <div className="nav-brand">
          <span className="icon">🎓</span>
          <span>Portal Mahasiswa</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>

      <main className="content">
        <div className="glass-card welcome-card">
          <h2>Halo, {userName}!</h2>
          <p>Anda dapat melihat hasil evaluasi akhir kelayakan Tugas Akhir Anda di bawah ini.</p>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Menarik data dari server...</p>
          </div>
        ) : myResult ? (
          <div className="glass-card result-card">
            <div className="result-header">
              <h3>Rapor Hasil Evaluasi SAW</h3>
            </div>
            <div className="result-body">
              <div className="info-group">
                <div className="info-item">
                  <span className="label">NIM</span>
                  <span className="value">{myResult.mahasiswaNim}</span>
                </div>
                <div className="info-item">
                  <span className="label">Nama Mahasiswa</span>
                  <span className="value highlight">{myResult.mahasiswa?.nama}</span>
                </div>
                <div className="info-item full-width">
                  <span className="label">Judul Tugas Akhir</span>
                  <span className="value">{myResult.mahasiswa?.judul_ta}</span>
                </div>
              </div>
              
              <div className="divider"></div>
              
              <div className="score-section">
                <div className="score-box">
                  <span className="score-label">Total Nilai SAW</span>
                  <span className="score-value">{myResult.nilaiAkhir.toFixed(2)}</span>
                </div>
                <div className="status-box">
                  <span className="score-label">Keputusan Sistem</span>
                  <span className={`status-badge ${myResult.status === 'LAYAK' ? 'badge-success' : 'badge-danger'}`}>
                    {myResult.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card empty-card">
            <div className="empty-icon">⏳</div>
            <h3>Hasil Belum Diproses</h3>
            <p>Data penilaian Anda belum lengkap atau Admin belum mengeksekusi perhitungan SAW.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardMahasiswa;
