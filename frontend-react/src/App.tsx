import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDosen from './pages/DashboardDosen';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import Mahasiswa from './pages/Mahasiswa';
import Kriteria from './pages/Kriteria';
import PenilaianAdmin from './pages/PenilaianAdmin';
import HasilSAW from './pages/HasilSAW';
import Penilaian from './pages/Penilaian';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <Navigate to="/" replace />;
  }
  
  const user = JSON.parse(userStr);
  if (user.role !== allowedRole) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'DOSEN') return <Navigate to="/dosen" replace />;
    if (user.role === 'MAHASISWA') return <Navigate to="/mahasiswa" replace />;
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><DashboardAdmin /></ProtectedRoute>} />
            <Route path="/admin/mahasiswa" element={<ProtectedRoute allowedRole="ADMIN"><Mahasiswa /></ProtectedRoute>} />
            <Route path="/admin/kriteria" element={<ProtectedRoute allowedRole="ADMIN"><Kriteria /></ProtectedRoute>} />
            <Route path="/admin/penilaian" element={<ProtectedRoute allowedRole="ADMIN"><PenilaianAdmin /></ProtectedRoute>} />
            <Route path="/admin/hasil" element={<ProtectedRoute allowedRole="ADMIN"><HasilSAW /></ProtectedRoute>} />
            
            {/* Dosen Routes */}
            <Route path="/dosen" element={<ProtectedRoute allowedRole="DOSEN"><DashboardDosen /></ProtectedRoute>} />
            <Route path="/dosen/penilaian" element={<ProtectedRoute allowedRole="DOSEN"><Penilaian /></ProtectedRoute>} />
            
            {/* Mahasiswa Routes */}
            <Route path="/mahasiswa" element={<ProtectedRoute allowedRole="MAHASISWA"><DashboardMahasiswa /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
