import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Kriteria.css';

interface KriteriaData {
  kode_kriteria: string;
  nama: string;
  bobot: number;
  jenis: "BENEFIT" | "COST";
}

const Kriteria: React.FC = () => {
  const [kriteriaList, setKriteriaList] = useState<KriteriaData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<KriteriaData>({
    kode_kriteria: "",
    nama: "",
    bobot: 0,
    jenis: "BENEFIT",
  });
  const navigate = useNavigate();

  const getKriteria = async () => {
    try {
      const res = await api.get('/kriteria');
      setKriteriaList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data kriteria', error);
    }
  };

  const openModal = (kriteria?: KriteriaData) => {
    if (kriteria) {
      setIsEdit(true);
      setFormData({ ...kriteria });
    } else {
      setIsEdit(false);
      setFormData({
        kode_kriteria: "",
        nama: "",
        bobot: 0,
        jenis: "BENEFIT",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveKriteria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/kriteria/${formData.kode_kriteria}`, {
          nama: formData.nama,
          bobot: Number(formData.bobot),
          jenis: formData.jenis,
        });
      } else {
        await api.post('/kriteria', {
          ...formData,
          bobot: Number(formData.bobot),
        });
      }
      closeModal();
      getKriteria();
    } catch (error) {
      console.error('Gagal menyimpan kriteria', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const deleteKriteria = async (kode: string) => {
    if (window.confirm(`Yakin ingin menghapus kriteria ${kode}?`)) {
      try {
        await api.delete(`/kriteria/${kode}`);
        getKriteria();
      } catch (error) {
        console.error('Gagal menghapus kriteria', error);
      }
    }
  };

  useEffect(() => {
    getKriteria();
  }, []);

  return (
    <div className="inner-container">
      <nav className="glass-navbar">
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <span className="icon">🔙</span> Kembali ke Dashboard
        </button>
        <div className="nav-brand">Manajemen Kriteria</div>
      </nav>

      <div className="content">
        <div className="header">
          <div className="header-title">
            <h1>Data Kriteria</h1>
            <p>Kelola data kriteria untuk perhitungan SAW</p>
          </div>
          <button className="btn-glow" onClick={() => openModal()}>
            <span className="icon">+</span> Tambah Kriteria
          </button>
        </div>

        <div className="glass-card">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Kriteria</th>
                  <th>Bobot</th>
                  <th>Jenis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kriteriaList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-state">Belum ada data kriteria.</td>
                  </tr>
                ) : (
                  kriteriaList.map((k) => (
                    <tr key={k.kode_kriteria}>
                      <td><span className="badge badge-outline">{k.kode_kriteria}</span></td>
                      <td className="fw-medium">{k.nama}</td>
                      <td>{k.bobot}</td>
                      <td>
                        <span className={`badge ${k.jenis === 'BENEFIT' ? 'badge-success' : 'badge-warning'}`}>
                          {k.jenis}
                        </span>
                      </td>
                      <td className="actions">
                        <button className="btn-action btn-edit" onClick={() => openModal(k)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => deleteKriteria(k.kode_kriteria)}>Hapus</button>
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
              <h2>{isEdit ? 'Edit Kriteria' : 'Tambah Kriteria'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={saveKriteria} className="modal-form">
              <div className="form-group">
                <label>Kode Kriteria</label>
                <input 
                  value={formData.kode_kriteria}
                  onChange={(e) => setFormData({...formData, kode_kriteria: e.target.value})}
                  type="text" 
                  required 
                  disabled={isEdit}
                  placeholder="Cth: C1"
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <label>Nama Kriteria</label>
                <input 
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  type="text" 
                  required 
                  placeholder="Cth: Harga"
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <label>Bobot</label>
                <input 
                  value={formData.bobot}
                  onChange={(e) => setFormData({...formData, bobot: parseFloat(e.target.value) || 0})}
                  type="number" 
                  step="0.01" 
                  required 
                  placeholder="Cth: 0.25"
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <label>Jenis</label>
                <select 
                  value={formData.jenis} 
                  onChange={(e) => setFormData({...formData, jenis: e.target.value as 'BENEFIT' | 'COST'})} 
                  className="glass-input" 
                  required
                >
                  <option value="BENEFIT" className="dark-option">BENEFIT</option>
                  <option value="COST" className="dark-option">COST</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-action btn-cancel" onClick={closeModal}>Batal</button>
                <button type="submit" className="btn-glow">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kriteria;
