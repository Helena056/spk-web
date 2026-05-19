import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Penilaian.css';

interface PenilaianData {
  id: number;
  mahasiswaNim: string;
  kode_kriteria: string;
  nilai: number;
  mahasiswa: { nama: string };
  kriteria: { nama: string };
}

interface MahasiswaData {
  nim: string;
  nama: string;
}

interface KriteriaData {
  kode_kriteria: string;
  nama: string;
}

const Penilaian: React.FC = () => {
  const [penilaianList, setPenilaianList] = useState<PenilaianData[]>([]);
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaData[]>([]);
  const [kriteriaList, setKriteriaList] = useState<KriteriaData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [formData, setFormData] = useState({
    id: 0,
    mahasiswaNim: "",
    kode_kriteria: "",
    nilai: "" as string | number,
  });

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [resPen, resMhs, resKrit] = await Promise.all([
        api.get('/penilaian'),
        api.get('/mahasiswa'),
        api.get('/kriteria')
      ]);
      setPenilaianList(resPen.data);
      setMahasiswaList(resMhs.data);
      setKriteriaList(resKrit.data);
    } catch (error) {
      console.error('Gagal load data', error);
    }
  };

  const openModal = (penilaian?: PenilaianData) => {
    if (penilaian) {
      setIsEdit(true);
      setFormData({
        id: penilaian.id,
        mahasiswaNim: penilaian.mahasiswaNim,
        kode_kriteria: penilaian.kode_kriteria,
        nilai: penilaian.nilai,
      });
    } else {
      setIsEdit(false);
      setFormData({ id: 0, mahasiswaNim: "", kode_kriteria: "", nilai: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const savePenilaian = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/penilaian/${formData.id}`, {
          mahasiswaNim: formData.mahasiswaNim,
          kode_kriteria: formData.kode_kriteria,
          nilai: Number(formData.nilai),
        });
      } else {
        await api.post('/penilaian', {
          mahasiswaNim: formData.mahasiswaNim,
          kode_kriteria: formData.kode_kriteria,
          nilai: Number(formData.nilai),
        });
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error('Gagal menyimpan penilaian', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const deletePenilaian = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus nilai ini?")) {
      try {
        await api.delete(`/penilaian/${id}`);
        loadData();
      } catch (error) {
        console.error("Gagal menghapus penilaian", error);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="inner-container">
      <nav className="glass-navbar">
        <button className="btn-back" onClick={() => navigate('/dosen')}>
          <span className="icon">🔙</span> Kembali ke Dashboard
        </button>
        <div className="nav-brand">Input Penilaian</div>
      </nav>

      <div className="content">
        <div className="header">
          <div className="header-title">
            <h1>Input Penilaian Mahasiswa</h1>
            <p>Berikan nilai riil untuk mahasiswa berdasarkan setiap kriteria</p>
          </div>
          <button className="btn-glow" onClick={() => openModal()}>
            <span className="icon">+</span> Tambah Nilai
          </button>
        </div>

        <div className="glass-card">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mahasiswa</th>
                  <th>Kriteria</th>
                  <th>Skor Nilai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {penilaianList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-state">Belum ada data penilaian.</td>
                  </tr>
                ) : (
                  penilaianList.map((p) => (
                    <tr key={p.id}>
                      <td className="text-secondary">#{p.id}</td>
                      <td className="fw-medium">
                        {p.mahasiswa?.nama} <span className="text-sm text-secondary">({p.mahasiswaNim})</span>
                      </td>
                      <td>
                        {p.kriteria?.nama} <span className="badge badge-outline">{p.kode_kriteria}</span>
                      </td>
                      <td><span className="score-badge">{p.nilai}</span></td>
                      <td className="actions">
                        <button className="btn-action btn-edit" onClick={() => openModal(p)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => deletePenilaian(p.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="glass-card modal-content">
            <div className="modal-header">
              <h2>{isEdit ? 'Edit Nilai' : 'Input Nilai Baru'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={savePenilaian} className="modal-form">
              <div className="form-group">
                <label>Pilih Mahasiswa</label>
                <select 
                  value={formData.mahasiswaNim} 
                  onChange={(e) => setFormData({...formData, mahasiswaNim: e.target.value})}
                  className="glass-input" 
                  required 
                  disabled={isEdit}
                >
                  <option value="" disabled className="dark-option">-- Pilih Mahasiswa --</option>
                  {mahasiswaList.map(m => (
                    <option key={m.nim} value={m.nim} className="dark-option">
                      {m.nim} - {m.nama}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Pilih Kriteria</label>
                <select 
                  value={formData.kode_kriteria} 
                  onChange={(e) => setFormData({...formData, kode_kriteria: e.target.value})}
                  className="glass-input" 
                  required 
                  disabled={isEdit}
                >
                  <option value="" disabled className="dark-option">-- Pilih Kriteria --</option>
                  {kriteriaList.map(k => (
                    <option key={k.kode_kriteria} value={k.kode_kriteria} className="dark-option">
                      {k.kode_kriteria} - {k.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Skor / Nilai</label>
                <input 
                  value={formData.nilai}
                  onChange={(e) => setFormData({...formData, nilai: e.target.value})}
                  type="number" 
                  step="0.01" 
                  required 
                  placeholder="Masukkan nilai (contoh: 80, 4.5, dll)"
                  className="glass-input"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-action btn-cancel" onClick={closeModal}>Batal</button>
                <button type="submit" className="btn-glow">Simpan Nilai</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Penilaian;
