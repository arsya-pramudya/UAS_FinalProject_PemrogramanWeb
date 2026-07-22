import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-4 mt-auto border-top border-primary border-3">
      <div className="container text-center text-md-start">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <h5 className="text-white fw-bold mb-1"><i className="bi bi-droplet-half text-primary me-2"></i>WashUp Laundry</h5>
            <p className="small mb-0">Solusi pakaian bersih, rapi, dan wangi terpercaya.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="small mb-0">&copy; 2026 WashUp. UTS Pemrograman Web - Universitas Amikom Yogyakarta.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}