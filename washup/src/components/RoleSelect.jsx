import React from 'react';

export default function RoleSelect({ setCurrentTab, setIntendedRole }) {
  const handleSelectRole = (role) => {
    setIntendedRole(role);
    setCurrentTab('login');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="text-center mb-4">
            <i className="bi bi-droplet-half text-primary" style={{ fontSize: '3rem' }}></i>
            <h4 className="fw-bold mt-2">Selamat Datang di WashUp</h4>
            <p className="text-muted small">Silakan pilih jenis akun untuk melanjutkan</p>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-primary w-100 h-100 py-4 rounded-4 shadow-sm"
                onClick={() => handleSelectRole('pelanggan')}
              >
                <i className="bi bi-person-fill" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mt-3 mb-1">Pelanggan</h5>
                <p className="text-muted small mb-0">Pesan layanan laundry & pantau status cucian</p>
              </button>
            </div>
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-dark w-100 h-100 py-4 rounded-4 shadow-sm"
                onClick={() => handleSelectRole('admin')}
              >
                <i className="bi bi-person-badge-fill" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-bold mt-3 mb-1">Admin</h5>
                <p className="text-muted small mb-0">Kelola pesanan & data layanan</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}