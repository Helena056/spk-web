import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './HasilSAW.css';

interface HasilSAWData {
  id: number;
  mahasiswaNim: string;
  nilaiAkhir: number;
  status: string;
  mahasiswa: { nama: string; judul_ta: string };
}

const HasilSAW: React.FC = () => {
  const [hasilList, setHasilList] = useState<HasilSAWData[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const getHasilSAW = async () => {
    try {
      const res = await api.get('/hasil-saw');
      setHasilList(res.data.sort((a: any, b: any) => b.nilaiAkhir - a.nilaiAkhir));
    } catch (error) {
      console.error('Gagal mengambil data hasil SAW', error);
    }
  };

  const hitungSAW = async () => {
    setIsCalculating(true);
    try {
      await api.get('/saw');
      await getHasilSAW();
      alert('Perhitungan SAW berhasil dilakukan!');
    } catch (error) {
      console.error('Gagal melakukan perhitungan SAW', error);
      alert('Terjadi kesalahan saat menghitung SAW.');
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    getHasilSAW();
  }, []);

  return (
    <div className="inner-container">
      <nav className="glass-navbar">
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <span className="icon">🔙</span> Kembali ke Dashboard
        </button>
        <div className="nav-brand">Perhitungan SAW</div>
      </nav>

      <div className="content">
        <div className="header">
          <div className="header-title">
            <h1>Hasil Perhitungan SAW</h1>
            <p>Kelayakan mahasiswa berdasarkan kalkulasi Simple Additive Weighting</p>
          </div>
          <button className="btn-glow btn-amber" onClick={hitungSAW} disabled={isCalculating}>
            <span className="icon">⚡</span> {isCalculating ? 'Menghitung...' : 'Jalankan Perhitungan SAW'}
          </button>
        </div>

        <div className="glass-card">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>Nilai Akhir</th>
                  <th>Status Kelayakan</th>
                </tr>
              </thead>
              <tbody>
                {hasilList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-state">Belum ada hasil perhitungan SAW. Klik tombol Jalankan Perhitungan SAW.</td>
                  </tr>
                ) : (
                  hasilList.map((h, index) => (
                    <tr key={h.id}>
                      <td>
                        <div className={`rank-circle ${index < 3 ? 'rank-top' : ''}`}>
                          {index + 1}
                        </div>
                      </td>
                      <td><span className="badge badge-outline">{h.mahasiswaNim}</span></td>
                      <td className="fw-medium">{h.mahasiswa?.nama}</td>
                      <td>
                        <span className="score-text">{h.nilaiAkhir.toFixed(2)}</span>
                      </td>
                      <td>
                        <span className={`badge ${h.status === 'LAYAK' ? 'badge-success' : 'badge-danger'}`}>
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilSAW;
