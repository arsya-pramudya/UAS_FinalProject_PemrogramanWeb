import React, { useState } from 'react';
import api from '../api/axiosInstance';

export default function Register({ setIsLoggedIn, setCurrentTab, setUserRole, setUserData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'pelanggan', // registrasi publik selalu jadi pelanggan
      });
      const { accessToken, user } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(user));

      setUserData(user);
      setUserRole(user.role);
      setIsLoggedIn(true);
      setCurrentTab('home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow p-4 rounded-4 bg-white border-top border-primary border-4">
            <div className="text-center mb-4">
              <i className="bi bi-droplet-half text-primary" style={{ fontSize: '3rem' }}></i>
              <h4 className="fw-bold mt-2">Daftar Akun Pelanggan</h4>
              <p className="text-muted small">Buat akun baru untuk mulai memesan laundry</p>
              <button type="button" className="btn btn-link btn-sm text-decoration-none p-0" onClick={() => setCurrentTab('pilih-role')}>
                <i className="bi bi-arrow-left me-1"></i> Ganti jenis akun
              </button>
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Alamat Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Konfirmasi Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 text-white fw-bold py-2 rounded-pill mt-3 shadow-sm" disabled={loading}>
                {loading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>
            <p className="text-center text-muted small mt-3 mb-0">
              Sudah punya akun?{' '}
              <button type="button" className="btn btn-link p-0 text-primary fw-medium" onClick={() => setCurrentTab('login')}>
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}