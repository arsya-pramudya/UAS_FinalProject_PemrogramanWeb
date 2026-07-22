import React from 'react';
import mapImg from '../assets/map.png';

export default function HubungiKami() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Hubungi <span className="text-primary">WashUp</span></h2>
        <p className="text-muted">Kami siap melayani kebutuhan pencucian Anda sepenuh hati.</p>
      </div>

      <div className="row g-4">
        {/* Kolom Informasi & Sosmed */}
        <div className="col-lg-5">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white">
            <h5 className="fw-bold text-dark mb-4">Informasi Kontak</h5>
            
            {/* Kontak WhatsApp */}
            <div className="d-flex align-items-start mb-4">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3">
                <i className="bi bi-whatsapp fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">WhatsApp Customer Service</h6>
                <a 
                  href="https://wa.me/6282141711914?text=Halo%20WashUp,%20saya%20ingin%20tanya%20mengenai%20layanan%20laundry" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-decoration-none text-primary fw-medium"
                >
                  +62 821-4171-1914
                </a>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="d-flex align-items-start mb-4">
              <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3">
                <i className="bi bi-clock fs-4"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Jam Operasional</h6>
                <p className="text-muted small mb-0">Senin - Sabtu: 07.00 - 20.00 WIB<br/>Minggu: 09.00 - 17.00 WIB</p>
              </div>
            </div>

            {/* Tombol Media Sosial Interaktif */}
            <h5 className="fw-bold text-dark mb-3 mt-2">Ikuti Media Sosial</h5>
            <div className="d-flex gap-2">
              {/* Tombol Instagram */}
              <a 
                href="https://www.instagram.com/rfxl._?igsh=MWx4enI0OHBzOG51OQ==" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-primary rounded-circle shadow-sm"
              >
                <i className="bi bi-instagram"></i>
              </a>

              {/* Tombol Facebook */}
              <a 
                href="https://www.facebook.com/share/1EZ8G9kXfN/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-primary rounded-circle shadow-sm"
              >
                <i className="bi bi-facebook"></i>
              </a>

              {/* Tombol TikTok */}
              <a 
                href="https://www.tiktok.com/@bankooooooooooooooooo?_r=1&_t=ZS-96asyMYZ8Zp" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-primary rounded-circle shadow-sm"
              >
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Kolom Menampilkan Gambar Map */}
        <div className="col-lg-7">
          <div className="card h-100 border-0 shadow-sm overflow-hidden p-2 bg-white">
            <img 
              src={mapImg} 
              alt="Lokasi Universitas Amikom Yogyakarta" 
              className="w-100"
              style={{ 
                height: '320px', 
                objectFit: 'cover', 
                borderRadius: '12px' 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}