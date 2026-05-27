import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MAHASISWA');
  const [nim, setNim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Harap isi semua kolom dengan benar.');
      return;
    }
    
    setIsLoading(true);
    try {
      const payload: any = { username, password, role };
      if (role === 'MAHASISWA') {
        if (!nim) {
          alert('Harap isi NIM jika Anda mendaftar sebagai Mahasiswa.');
          setIsLoading(false);
          return;
        }
        payload.mahasiswaNim = nim;
      }

      await api.post('/register', payload);

      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      alert('Registrasi gagal. Username mungkin sudah digunakan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper register-wrapper">
      <div className="glass-card auth-container register-container">
        <div className="auth-header">
          <div className="logo-wrapper register-logo">
            <span className="icon">🚀</span>
          </div>
          <h1>Buat Akun Baru</h1>
          <p>Bergabunglah dengan Sistem SPK SAW</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Pilih username" 
              required 
              className="glass-input register-input"
            />
          </div>

          {role === 'MAHASISWA' && (
            <div className="form-group">
              <label htmlFor="nim">NIM Mahasiswa</label>
              <input 
                id="nim"
                type="text" 
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Masukkan NIM Anda" 
                required 
                className="glass-input register-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat password yang kuat" 
              required 
              className="glass-input register-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Pilih Peran (Role)</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="glass-input register-input" 
              required
            >
              <option value="MAHASISWA" className="dark-option">MAHASISWA</option>
              <option value="DOSEN" className="dark-option">DOSEN</option>
              <option value="ADMIN" className="dark-option">ADMIN</option>
            </select>
          </div>

          <button type="submit" className="btn-glow register-btn-glow btn-block" disabled={isLoading}>
            {isLoading ? 'Mendaftarkan...' : 'DAFTAR SEKARANG'}
          </button>
          
          <div className="auth-footer">
            <p>Sudah memiliki akun? <Link to="/login" className="link-glow register-link">Login di sini</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
