<<<<<<< HEAD
import React, { useRef } from 'react';

export default function Header({ currentTab, setCurrentTab, isLoggedIn, setIsLoggedIn, userRole, userData, resetJenisPreset }) {
  const layananDropdownRef = useRef(null);

  // Tutup dropdown "Layanan" secara manual setelah salah satu itemnya diklik
  const closeLayananDropdown = () => {
    const bs = window.bootstrap;
    if (bs && layananDropdownRef.current) {
      const instance = bs.Dropdown.getInstance(layananDropdownRef.current);
      if (instance) instance.hide();
    }
  };

  const pilihLayanan = (tab) => {
    setCurrentTab(tab);
    closeLayananDropdown();
  };

  return (
    <header className="bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light container py-3">

        <a
          className="navbar-brand d-flex align-items-center fw-bold text-primary fs-3"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentTab('home'); // Disesuaikan agar bisa diklik kembali ke home walau belum login
          }}
        >
          <i className="bi bi-droplet-half me-2"></i>WashUp
        </a>

        {/* Kondisi isLoggedIn dihapus agar hamburger menu tetap muncul di HP saat belum login */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 text-center mt-3 mt-lg-0">

            {/* --- MENU UMUM (Selalu Tampil) --- */}
            <li className="nav-item">
              <button
                className={`nav-link btn w-100 ${currentTab === 'home' ? 'text-primary fw-bold' : ''}`}
                onClick={() => setCurrentTab('home')}
              >
                Home
              </button>
            </li>

            <li className="nav-item dropdown">
              <button
                ref={layananDropdownRef}
                className={`nav-link btn w-100 dropdown-toggle ${currentTab.startsWith('layanan') ? 'text-primary fw-bold' : ''}`}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
=======
import React from 'react';

export default function Header({ currentTab, setCurrentTab, isLoggedIn, setIsLoggedIn }) {
  return (
    <header className="bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light container py-3">
        <a className="navbar-brand d-flex align-items-center fw-bold text-primary fs-3" href="#" onClick={(e) => { e.preventDefault(); setCurrentTab('home'); }}>
          <i className="bi bi-droplet-half me-2"></i>WashUp
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 text-center mt-3 mt-lg-0">
            <li className="nav-item">
              <button className={`nav-link btn w-100 ${currentTab === 'home' ? 'text-primary fw-bold' : ''}`} onClick={() => setCurrentTab('home')}>Home</button>
            </li>

            {/* ====== MENU DROPDOWN LAYANAN SESUAI GAMBAR ====== */}
            <li className="nav-item dropdown">
              <button 
                className={`nav-link btn w-100 dropdown-toggle ${currentTab.startsWith('layanan') ? 'text-primary fw-bold' : ''}`} 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
                aria-expanded="false"
              >
                Layanan
              </button>
              <ul className="dropdown-menu border-0 shadow text-center text-lg-start" aria-labelledby="navbarDropdown">
<<<<<<< HEAD
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-express')}>Laundry Express</button></li>
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-karpet')}>Laundry Karpet</button></li>
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-kiloan')}>Laundry Kiloan</button></li>
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-bayi')}>Laundry Perlengkapan Bayi</button></li>
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-premium')}>Laundry Satuan Premium</button></li>
                <li><button className="dropdown-item py-2" onClick={() => pilihLayanan('layanan-shoesbag')}>Shoes Bag Care</button></li>
=======
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-express')}>Laundry Express</button></li>
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-karpet')}>Laundry Karpet</button></li>
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-kiloan')}>Laundry Kiloan</button></li>
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-bayi')}>Laundry Perlengkapan Bayi</button></li>
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-premium')}>Laundry Satuan Premium</button></li>
                <li><button className="dropdown-item py-2" onClick={() => setCurrentTab('layanan-shoesbag')}>Shoes Bag Care</button></li>
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
              </ul>
            </li>

            <li className="nav-item">
<<<<<<< HEAD
              <button
                className={`nav-link btn w-100 ${currentTab === 'tentang' ? 'text-primary fw-bold' : ''}`}
                onClick={() => setCurrentTab('tentang')}
              >
                Tentang Kami
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link btn w-100 ${currentTab === 'kontak' ? 'text-primary fw-bold' : ''}`}
                onClick={() => setCurrentTab('kontak')}
              >
                Hubungi Kami
              </button>
            </li>

            {/* --- MENU KHUSUS PELANGGAN --- */}
            {isLoggedIn && userRole === 'pelanggan' && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn w-100 ${currentTab === 'pesan' ? 'text-primary fw-bold' : ''}`}
                    onClick={() => {
                      if (resetJenisPreset) resetJenisPreset();
                      setCurrentTab('pesan');
                    }}
                  >
                    <i className="bi bi-basket me-1"></i>Pesan
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn w-100 ${currentTab === 'pesanan-saya' ? 'text-primary fw-bold' : ''}`}
                    onClick={() => setCurrentTab('pesanan-saya')}
                  >
                    <i className="bi bi-clock-history me-1"></i>Pesanan Saya
                  </button>
                </li>
              </>
            )}

            {/* --- MENU KHUSUS ADMIN --- */}
            {isLoggedIn && userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn w-100 ${currentTab === 'admin-dashboard' ? 'text-primary fw-bold' : ''}`}
                    onClick={() => setCurrentTab('admin-dashboard')}
                  >
                    <i className="bi bi-speedometer2 me-1"></i>Dashboard Admin
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn w-100 ${currentTab === 'dashboard-kasir' ? 'text-primary fw-bold' : ''}`}
                    onClick={() => setCurrentTab('dashboard-kasir')}
                  >
                    <i className="bi bi-cash-coin me-1"></i>Dashboard Kasir
                  </button>
                </li>
              </>
            )}

            {/* --- TOMBOL LOGIN / LOGOUT --- */}
=======
              <button className={`nav-link btn w-100 ${currentTab === 'tentang' ? 'text-primary fw-bold' : ''}`} onClick={() => setCurrentTab('tentang')}>Tentang Kami</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn w-100 ${currentTab === 'kontak' ? 'text-primary fw-bold' : ''}`} onClick={() => setCurrentTab('kontak')}>Hubungi Kami</button>
            </li>
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
            <li className="nav-item ms-lg-3">
              {isLoggedIn ? (
                <button className="btn btn-outline-danger w-100 px-4 rounded-pill shadow-sm" onClick={() => setIsLoggedIn(false)}>
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              ) : (
<<<<<<< HEAD
                <button
                  className="btn btn-primary w-100 px-4 rounded-pill shadow-sm text-white"
                  onClick={() => setCurrentTab('pilih-role')}
                >
=======
                <button className="btn btn-primary w-100 px-4 rounded-pill shadow-sm text-white" onClick={() => setCurrentTab('login')}>
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}