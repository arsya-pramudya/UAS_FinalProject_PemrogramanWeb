import React, { useState, useEffect } from 'react'; // SAKLAR: Sudah ditambahkan useEffect di sini
// Panggil / Import gambar lokal dari folder assets
import expressImg from '../assets/express1.jpeg'; 
import express2Img from '../assets/express2.jpeg';
import karpetImg from '../assets/karpet1.jpeg';
import karpet2Img from '../assets/karpet2.jpeg';
import bajuImg from '../assets/baju.jpeg';
import baju2Img from '../assets/baju2.jpeg';
import bayiImg from '../assets/bayi.jpeg';
import bayi2Img from '../assets/bayi2.jpeg';
import jasImg from '../assets/jas.jpeg';
import jas2Img from '../assets/jas2.jpeg';
import sepatuImg from '../assets/sepatu.jpeg';
import tasImg from '../assets/tas.jpeg';
import heroImg from '../assets/hero.png';
<<<<<<< HEAD
import { hargaLayanan, formatRupiah } from '../data/hargaLayanan';


export default function Layanan({ jenisLayanan, onOrderClick }) {
=======


export default function Layanan({ jenisLayanan }) {
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
  // State untuk menyimpan kata kunci pencarian/filter sesuai instruksi soal UTS
  const [search, setSearch] = useState('');
  
  // State untuk menyimpan id dari kartu yang sedang aktif menampilkan deskripsi
  const [activeId, setActiveId] = useState(null);


  useEffect(() => {
    // 1. Bukti Log Console Browser saat komponen pertama kali dimuat
    console.log("KOMPONEN LAYANAN BERHASIL DIMUAT (BUKTI USEEFFECT JALAN)");

    // 2. Bukti Simulasi Menyimpan Nama Aplikasi ke LocalStorage browser
    localStorage.setItem('nama_aplikasi', 'WashUp Laundry - Platform UTS');
  }, []); 
const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi jeda waktu penarikan data dari server sejauh 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // SAKLAR: Tampilan Loading Indicator Tiruan
  if (loading) {
    return (
      <div className="text-center my-5 py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <h5 className="mt-2">Menghubungkan ke API WashUp Server...</h5>
      </div>
    );
  }

  // ... baris return kode JSX asli kartu laundry kamu diletakkan di bawah sini

  // Kumpulan data jenis layanan dengan gambar padanan yang spesifik
  const daftarCardLayanan = [
    {
      id: 'layanan-express',
      title: 'Laundry Express',
      img1: expressImg, 
      img2: express2Img, 
      desc: 'Layanan cuci kilat super cepat bergaransi selesai dalam hitungan jam di hari yang sama.'
    },
    {
      id: 'layanan-kiloan',
      title: 'Laundry Kiloan',
      img1: bajuImg, 
      img2: baju2Img, 
      desc: 'Cuci harian ekonomis dihitung per kilogram, sudah termasuk cuci, kering, setrika rapi, dan pewangi higienis.'
    },
    {
      id: 'layanan-premium',
      title: 'Laundry Satuan Premium',
      img1: jasImg, 
      img2: jas2Img, 
      desc: 'Perawatan eksklusif pakaian berharga Anda seperti Jas dan Kebaya menggunakan Dry Cleaning.'
    },
    {
      id: 'layanan-shoesbag',
      title: 'Laundry Shoes & Bag Care',
      img1: tasImg, 
      img2: sepatuImg, 
      desc: 'Jasa cuci dan deep clean perawatan tas serta sepatu kesayangan secara detail.'
    },
    {
      id: 'layanan-bayi',
      title: 'Laundry Baby Care',
      img1: bayiImg, 
      img2: bayi2Img, 
      desc: 'Pencucian khusus perlengkapan bayi menggunakan detergen hypoallergenic yang aman.'
    },
    {
      id: 'layanan-karpet',
      title: 'Laundry Karpet',
      img1: karpetImg, 
      img2: karpet2Img, 
      desc: 'Pembersihan karpet menggunakan mesin khusus ekstraktor penarik debu antiseptik.'
    }
  ];

  const toggleDeskripsi = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const dataBerdasarkanNavigasi = !jenisLayanan || 
    jenisLayanan.toLowerCase() === 'layanan' || 
    jenisLayanan.toLowerCase() === 'all' || 
    jenisLayanan.trim() === ''
      ? daftarCardLayanan 
      : daftarCardLayanan.filter(l => l.id.toLowerCase() === jenisLayanan.toLowerCase());

  const kartuDitampilkan = dataBerdasarkanNavigasi.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-white" style={{ minHeight: '100vh' }}>
      
      {/* SEKSI FORM PENCARIAN */}
      <div className="container pt-5 pb-3">
        <div className="bg-light p-4 rounded-4 border border-primary border-opacity-10 shadow-sm">
          <form onSubmit={(e) => e.preventDefault()} className="row g-3 align-items-center">
            <div className="col-md-8">
              <h5 className="fw-bold text-primary mb-1">
                <i className="bi bi-search me-2"></i>Cari Layanan Laundry
              </h5>
              <p className="text-muted small mb-0">Temukan paket perawatan pakaian, tas, atau sepatu Anda secara instan</p>
            </div>
            <div className="col-md-4">
              <input 
                type="text" 
                className="form-control rounded-pill border-primary px-3" 
                placeholder="Ketik nama layanan..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {/* SEKSI GRID KARTU UTAMA */}
      <div className="container pb-5">
        {kartuDitampilkan.length === 0 ? (
          <div className="text-center my-5 py-5 text-muted">
            <i className="bi bi-exclamation-circle text-primary" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3 fw-bold">Layanan tidak ditemukan</h5>
            <p className="small">Coba ketik kata kunci paket pencucian yang lain.</p>
          </div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-md-2 justify-content-center">
            {kartuDitampilkan.map((lay) => (
              <div className="col" key={lay.id}>
                <div 
                  className="d-flex flex-column align-items-center justify-content-center text-center p-5 rounded-4 transition-hover shadow-sm position-relative" 
                  style={{ 
                    backgroundColor: '#0d6efd', 
                    minHeight: '480px',
                    border: '3px solid #0056b3' 
                  }}
                >
                  {/* Komponen Gambar */}
                  <div className="d-flex justify-content-center gap-2 mb-4">
                    <img 
                      src={lay.img1} 
                      alt={`${lay.title} Sisi Kiri`} 
                      className="shadow border border-white border-2"
                      style={{ width: '165px', height: '185px', objectFit: 'cover', borderRadius: '55px 15px 15px 55px' }} 
                    />
                    <img 
                      src={lay.img2} 
                      alt={`${lay.title} Sisi Kanan`} 
                      className="shadow border border-white border-2"
                      style={{ width: '165px', height: '185px', objectFit: 'cover', borderRadius: '15px 55px 55px 15px' }} 
                    />
                  </div>

                  {/* Judul */}
<<<<<<< HEAD
                  <h2 className="text-white mb-1 px-2" style={{ fontWeight: '800', fontSize: '1.85rem', letterSpacing: '-0.5px' }}>
                    {lay.title}
                  </h2>

                  {/* Badge Harga */}
                  {(() => {
                    const jenisValue = lay.id.replace('layanan-', '');
                    const hargaInfo = hargaLayanan[jenisValue];
                    if (!hargaInfo) return null;
                    return (
                      <span
                        className="badge bg-white text-primary fw-bold mb-3 px-3 py-2 rounded-pill"
                        style={{ fontSize: '0.95rem' }}
                      >
                        {formatRupiah(hargaInfo.harga)} / {hargaInfo.unit}
                      </span>
                    );
                  })()}

=======
                  <h2 className="text-white mb-2 px-2" style={{ fontWeight: '800', fontSize: '1.85rem', letterSpacing: '-0.5px' }}>
                    {lay.title}
                  </h2>

>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
                  {/* Conditional Rendering Deskripsi */}
                  {activeId === lay.id && (
                    <div 
                      className="p-3 my-2 bg-white rounded-3 shadow-sm text-dark"
                      style={{ maxWidth: '85%', animation: 'fadeIn 0.3s ease-in-out' }}
                    >
                      <p className="mb-0 small fw-medium text-start text-primary">
                        <i className="bi bi-info-circle-fill me-2"></i> {lay.desc}
                      </p>
                    </div>
                  )}

                  {/* Navigasi Tombol */}
                  <div className="d-flex gap-3 justify-content-center mt-3">
                    <button 
                      type="button"
                      className="btn btn-light text-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm border-0"
                      onClick={() => toggleDeskripsi(lay.id)} 
                      style={{ fontSize: '0.9rem', fontWeight: '700' }}
                    >
                      Selengkapnya <i className="bi bi-search" style={{ fontSize: '0.8rem' }}></i>
                    </button>
                    <button 
                      type="button"
                      className="btn btn-outline-light text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm"
<<<<<<< HEAD
                      onClick={() => {
                        // id kartu formatnya 'layanan-express', 'layanan-karpet', dst.
                        // dilepas prefix-nya jadi 'express', 'karpet', dst sesuai value di form Pesan.
                        const jenisValue = lay.id.replace('layanan-', '');
                        if (onOrderClick) onOrderClick(jenisValue);
                      }}
=======
                      onClick={() => window.open('https://wa.me/6282141711914', '_blank')}
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
                      style={{ fontSize: '0.9rem', fontWeight: '700', borderWidth: '2px' }}
                    >
                      Order <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '0.9rem' }}></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
