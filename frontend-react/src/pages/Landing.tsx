import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, ChartBar, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/landing_hero.png';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar glass-card">
        <div className="nav-brand">
          <GraduationCap className="brand-icon" size={28} />
          <span className="brand-text">SPK Beasiswa SAW</span>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="btn-masuk">Masuk</Link>
          <Link to="/register" className="btn-glow">Daftar Sekarang</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge-glow">Sistem Pendukung Keputusan</div>
          <h1 className="hero-title">
            Tentukan Beasiswa Lebih <span className="text-gradient">Akurat & Transparan</span>
          </h1>
          <p className="hero-subtitle">
            Sistem Pendukung Keputusan menggunakan metode Simple Additive Weighting (SAW) untuk menentukan penerima beasiswa secara objektif dan efisien.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-glow btn-lg">
              Mulai Sekarang <ArrowRight size={20} />
            </Link>
            <a href="#fitur" className="btn-outline btn-lg">Pelajari Fitur</a>
          </div>
          
          <div className="stats-row">
            <div className="stat-item">
              <h3>99%</h3>
              <p>Akurasi Metode</p>
            </div>
            <div className="stat-item">
              <h3>3+</h3>
              <p>Level Akses</p>
            </div>
            <div className="stat-item">
              <h3>10x</h3>
              <p>Lebih Cepat</p>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="image-glow-backdrop"></div>
          <img src={heroImage} alt="SPK Beasiswa Dashboard" className="hero-image" />
        </div>
      </header>

      {/* Features Section */}
      <section id="fitur" className="features-section">
        <div className="section-header">
          <h2>Fitur Unggulan Sistem</h2>
          <p>Dirancang untuk memberikan kemudahan bagi Admin, Dosen, dan Mahasiswa.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper">
              <ChartBar className="feature-icon" />
            </div>
            <h3>Perhitungan Otomatis SAW</h3>
            <p>Sistem otomatis menormalisasi matriks keputusan dan menghitung nilai preferensi berdasarkan bobot kriteria secara real-time.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck className="feature-icon" />
            </div>
            <h3>Transparansi Hasil</h3>
            <p>Mahasiswa dapat melihat hasil perhitungan mereka sendiri secara langsung dari dashboard, meminimalisir subjektivitas.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper">
              <Users className="feature-icon" />
            </div>
            <h3>Multi-Role Access</h3>
            <p>Akses khusus untuk Admin (manajemen kriteria & data), Dosen (penilaian), dan Mahasiswa (melihat hasil) dengan keamanan tinggi.</p>
          </div>
          
          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper">
              <Award className="feature-icon" />
            </div>
            <h3>Manajemen Kriteria Dinamis</h3>
            <p>Admin dapat dengan mudah menambah, mengubah, atau menghapus kriteria penilaian beserta atribut (Benefit/Cost) dan bobotnya.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass-card">
        <div className="footer-content">
          <div className="footer-brand">
            <GraduationCap size={24} />
            <span>SPK Beasiswa SAW</span>
          </div>
          <p className="copyright">© {new Date().getFullYear()} SPK Beasiswa. Dibuat untuk kelayakan tugas akhir.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
