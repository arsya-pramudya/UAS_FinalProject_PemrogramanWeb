import React from 'react';

export default function TentangKami() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h2 className="fw-bold text-dark mb-3">Tentang <span className="text-primary">WashUp Laundry</span></h2>
          <p className="lead text-muted">Hadir sejak tahun 2020 sebagai solusi modern penatu pakaian berkualitas tinggi, cepat, dan higienis.</p>
          <p className="text-muted">Kami memahami bahwa pakaian adalah aset berharga Anda. Dengan mesin berteknologi tinggi dan detergen pilihan ramah lingkungan, WashUp berkomitmen menjaga kecerahan warna serta kelembutan kain di setiap cucian.</p>
          
          <div className="row g-3 mt-2">
            <div className="col-sm-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-primary fs-4 me-2"></i>
                <span className="fw-semibold text-dark">Layanan Antar Jemput</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-primary fs-4 me-2"></i>
                <span className="fw-semibold text-dark">Detergen Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-4 bg-primary text-white rounded-4 shadow">
            <h4 className="fw-bold mb-3"><i className="bi bi-quote me-2"></i>Visi Kami</h4>
            <p className="mb-0 italic text-white text-opacity-75">"Menjadi partner kebersihan pakaian terpercaya keluarga Indonesia dengan layanan digital berbasis kenyamanan, kualitas premium, dan ramah lingkungan."</p>
          </div>
        </div>
      </div>
    </div>
  );
}