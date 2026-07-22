import React, { useState } from 'react';
<<<<<<< HEAD
import api from '../api/axiosInstance';

export default function Login({ setIsLoggedIn, setCurrentTab, setUserRole, setUserData, intendedRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabel = intendedRole === 'admin' ? 'Admin' : 'Pelanggan';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, user } = res.data;

      if (intendedRole && user.role !== intendedRole) {
        setError(`Akun ini terdaftar sebagai "${user.role}", bukan "${roleLabel}". Silakan pilih jenis akun yang sesuai.`);
        setLoading(false);
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(user));

      setUserData(user);
      setUserRole(user.role);
      setIsLoggedIn(true);

      if (user.role === 'admin') {
        setCurrentTab('admin-dashboard');
      } else {
        setCurrentTab('home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!');
    } finally {
      setLoading(false);
=======

export default function Login({ setIsLoggedIn, setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setCurrentTab('home');
    } else {
      alert('Mohon isi email dan password!');
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow p-4 rounded-4 bg-white border-top border-primary border-4">
            <div className="text-center mb-4">
              <i className="bi bi-droplet-half text-primary" style={{ fontSize: '3rem' }}></i>
<<<<<<< HEAD
              <h4 className="fw-bold mt-2">Masuk sebagai {roleLabel}</h4>
              <p className="text-muted small">Akses akun WashUp Anda</p>
              <button type="button" className="btn btn-link btn-sm text-decoration-none p-0" onClick={() => setCurrentTab('pilih-role')}>
                <i className="bi bi-arrow-left me-1"></i> Ganti jenis akun
              </button>
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleLoginSubmit}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
              <button type="submit" className="btn btn-primary w-100 text-white fw-bold py-2 rounded-pill mt-3 shadow-sm" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
            {intendedRole !== 'admin' && (
              <p className="text-center text-muted small mt-3 mb-0">
                Belum punya akun?{' '}
                <button type="button" className="btn btn-link p-0 text-primary fw-medium" onClick={() => setCurrentTab('register')}>
                  Daftar di sini
                </button>
              </p>
            )}
=======
              <h4 className="fw-bold mt-2">Masuk ke WashUp</h4>
              <p className="text-muted small">Akses status laundry Anda secara real-time</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Alamat Email</label>
                <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Password</label>
                <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <button type="submit" className="btn btn-primary w-100 text-white fw-bold py-2 rounded-pill mt-3 shadow-sm">Masuk</button>
            </form>
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
          </div>
        </div>
      </div>
    </div>
  );
}