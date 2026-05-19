import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Mahasiswa.css';

interface MahasiswaData {
  nim: string;
  nama: string;
  judul_ta: string;
}

const Mahasiswa: React.FC = () => {
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<MahasiswaData>({ nim: '', nama: '', judul_ta: '' });
  const navigate = useNavigate();

  const getMahasiswa = async () => {
    try {
      const res = await api.get('/mahasiswa');
      setMahasiswaList(res.data);
    } catch (error) {
      console.error('Gagal mengambil data mahasiswa', error);
    }
  };

  const openModal = (mahasiswa?: MahasiswaData) => {
    if (mahasiswa) {
      setIsEdit(true);
      setFormData({ ...mahasiswa });
    } else {
      setIsEdit(false);
      setFormData({ nim: '', nama: '', judul_ta: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveMahasiswa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/mahasiswa/${formData.nim}`, {
          nama: formData.nama,
          judul_ta: formData.judul_ta,
        });
      } else {
        await api.post('/mahasiswa', formData);
      }
      closeModal();
      getMahasiswa();
    } catch (error) {
      console.error('Gagal menyimpan mahasiswa', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const deleteMahasiswa = async (nim: string) => {
    if (window.confirm(`Yakin ingin menghapus mahasiswa dengan NIM ${nim}?`)) {
      try {
        await api.delete(`/mahasiswa/${nim}`);
        getMahasiswa();
      } catch (error) {
        console.error('Gagal menghapus mahasiswa', error);
      }
    }
  };

  useEffect(() => {
    getMahasiswa();
  }, []);

  return (
    <div className="inner-container">
      <nav className="glass-navbar">
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <span className="icon">🔙</span> Kembali ke Dashboard
        </button>
        <div className="nav-brand">Manajemen Mahasiswa</div>
      </nav>

      <div className="content">
        <div className="header">
          <div className="header-title">
            <h1>Daftar Mahasiswa</h1>
            <p>Kelola data mahasiswa dan judul Tugas Akhir (TA)</p>
          </div>
          <button className="btn-glow" onClick={() => openModal()}>
            <span className="icon">+</span> Tambah Data
          </button>
        </div>

        <div className="glass-card">
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Lengkap</th>
                  <th>Judul Tugas Akhir</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswaList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-state">Belum ada data mahasiswa.</td>
                  </tr>
                ) : (
                  mahasiswaList.map((m) => (
                    <tr key={m.nim}>
                      <td><span className="badge badge-outline">{m.nim}</span></td>
                      <td className="fw-medium">{m.nama}</td>
                      <td className="text-secondary">{m.judul_ta}</td>
                      <td className="actions">
                        <button className="btn-action btn-edit" onClick={() => openModal(m)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => deleteMahasiswa(m.nim)}>Hapus</button>
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
              <h2>{isEdit ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={saveMahasiswa} className="modal-form">
              <div className="form-group">
                <label>NIM</label>
                <input 
                  value={formData.nim}
                  onChange={(e) => setFormData({...formData, nim: e.target.value})}
                  type="text" 
                  required 
                  disabled={isEdit}
                  placeholder="Masukkan NIM Mahasiswa"
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input 
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  type="text" 
                  required 
                  placeholder="Masukkan Nama Lengkap"
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <label>Judul Tugas Akhir</label>
                <textarea 
                  value={formData.judul_ta}
                  onChange={(e) => setFormData({...formData, judul_ta: e.target.value})}
                  required 
                  rows={3}
                  placeholder="Masukkan Judul Tugas Akhir"
                  className="glass-input"
                ></textarea>
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

export default Mahasiswa;
