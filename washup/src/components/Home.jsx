import React from 'react';

export default function Home({ setCurrentTab }) {
  return (
    <div className="container py-5 animate-fade-in">
      {/* Hero Section */}
      <div className="row align-items-center g-5 py-4">
        <div className="col-10 col-sm-8 col-lg-6">
          <div className="bg-primary bg-opacity-10 p-4 rounded-4 text-center shadow-sm border border-primary border-opacity-25 transition-hover">
            <i className="bi bi-shield-check text-primary" style={{ fontSize: '6rem' }}></i>
            <h3 className="fw-bold text-primary mt-3">Bersih & Higienis</h3>
            <p className="text-muted small">Pakaian Anda diproses dengan standar kebersihan tertinggi menggunakan detergen ramah lingkungan.</p>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-start">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3">Layanan Laundry No. 1</span>
          <h1 className="display-4 fw-bold lh-1 text-dark mb-3">Pakaian Bersih Rapi Tanpa Repot di <span className="text-primary">WashUp</span></h1>
          <p className="lead text-muted mb-4">Kami menyediakan jasa cuci premium, ekspres, dan kiloan yang menjaga serat pakaian Anda tetap awet dan harum tahan lama.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 rounded-pill shadow" onClick={() => setCurrentTab('layanan')}>Lihat Layanan</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4 rounded-pill" onClick={() => setCurrentTab('kontak')}>Hubungi Kami</button>
          </div>
        </div>
      </div>
    </div>
  );
}