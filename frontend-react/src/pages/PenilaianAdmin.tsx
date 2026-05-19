import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './PenilaianAdmin.css';

interface PenilaianData {
  id: number;
  mahasiswaNim: string;
  kode_kriteria: string;
  nilai: number;
  mahasiswa: { nama: string; judul_ta: string };
  kriteria: { nama: string; bobot: number; jenis: string };
}

const PenilaianAdmin: React.FC = () => {
  const [penilaianList, setPenilaianList] = useState<PenilaianData[]>([]);
  const navigate = useNavigate();

  const getPenilaian = async () => {
    try {
      const res = await api.get('/penilaian');
      setPenilaianList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data penilaian', error);
    }
  };

  const groupedPenilaian = useMemo(() => {
    const groups: Record<string, any> = {};
    
    penilaianList.forEach(p => {
      if (!groups[p.mahasiswaNim]) {
        groups[p.mahasiswaNim] = {
          nim: p.mahasiswaNim,
          nama: p.mahasiswa?.nama,
          nilai: []
        };
      }
      groups[p.mahasiswaNim].nilai.push({
        kriteria: p.kriteria?.nama,
        kode: p.kode_kriteria,
        skor: p.nilai
      });
    });
    
    return Object.values(groups);
  }, [penilaianList]);

  useEffect(() => {
    getPenilaian();
  }, []);

  return (
    <div className="inner-container">
      <nav className="glass-navbar">
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <span className="icon">🔙</span> Kembali ke Dashboard
        </button>
        <div className="nav-brand">Tinjau Penilaian</div>
      </nav>

      <div className="content">
        <div className="header">
          <div className="header-title">
            <h1>Data Penilaian Mahasiswa</h1>
            <p>Tinjauan seluruh data penilaian yang diinput oleh Dosen</p>
          </div>
        </div>

        <div className="glass-card">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>Rincian Nilai per Kriteria</th>
                </tr>
              </thead>
              <tbody>
                {groupedPenilaian.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="empty-state">Belum ada data penilaian dari Dosen.</td>
                  </tr>
                ) : (
                  groupedPenilaian.map((m) => (
                    <tr key={m.nim}>
                      <td><span className="badge badge-outline">{m.nim}</span></td>
                      <td className="fw-medium">{m.nama}</td>
                      <td>
                        <div className="nilai-badges">
                          {m.nilai.map((n: any, idx: number) => (
                            <span key={`${n.kode}-${idx}`} className="badge-nilai">
                              <strong>{n.kode} ({n.kriteria}):</strong> {n.skor}
                            </span>
                          ))}
                        </div>
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

export default PenilaianAdmin;
