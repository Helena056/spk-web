import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Harap isi username dan password');
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await api.post('/login', {
        username,
        password,
      });

      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'DOSEN') {
        navigate('/dosen');
      } else {
        navigate('/mahasiswa');
      }
      
    } catch (error) {
      alert('Login gagal. Username atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-container">
        <div className="auth-header">
          <div className="logo-wrapper">
            <span className="icon">✨</span>
          </div>
          <h1>Sistem Kelayakan TA</h1>
          <p>Login ke akun Anda (SPK Metode SAW)</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username / NIM</label>
            <input 
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username Anda" 
              required 
              className="glass-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password" 
              required 
              className="glass-input"
            />
          </div>

          <button type="submit" className="btn-glow btn-block" disabled={isLoading}>
            {isLoading ? 'Mengecek...' : 'MASUK SEKARANG'}
          </button>
          
          <div className="auth-footer">
            <p>Belum memiliki akun? <Link to="/register" className="link-glow">Daftar Akun Baru</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
