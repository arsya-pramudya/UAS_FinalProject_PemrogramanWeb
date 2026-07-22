import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { hargaLayanan, formatRupiah } from '../data/hargaLayanan';

const jenisLayananOptions = [
  { value: 'express', label: 'Laundry Express' },
  { value: 'karpet', label: 'Laundry Karpet' },
  { value: 'kiloan', label: 'Laundry Kiloan' },
  { value: 'bayi', label: 'Laundry Perlengkapan Bayi' },
  { value: 'premium', label: 'Laundry Satuan Premium' },
  { value: 'shoesbag', label: 'Shoes Bag Care' },
];

// Contoh placeholder & step disesuaikan per satuan, biar terasa pas
// (item = bilangan bulat, kg/m² = boleh desimal)
const unitConfig = {
  kg: { placeholder: 'Contoh: 3.5', step: '0.1', min: '0.1' },
  item: { placeholder: 'Contoh: 2', step: '1', min: '1' },
  'm²': { placeholder: 'Contoh: 5', step: '0.5', min: '0.5' },
};

export default function PesanLayanan({ setCurrentTab, presetJenis, onClearPreset }) {
  const [jenisLayanan, setJenisLayanan] = useState(presetJenis || 'kiloan');
  const [jumlah, setJumlah] = useState('');
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Kalau presetJenis berubah (user klik "Order" dari kartu layanan lain), sinkronkan pilihan
  useEffect(() => {
    if (presetJenis) {
      setJenisLayanan(presetJenis);
    }
  }, [presetJenis]);

  const isLocked = Boolean(presetJenis);
  const labelJenisTerkunci = jenisLayananOptions.find((opt) => opt.value === presetJenis)?.label;

  // Info harga untuk jenis layanan yang sedang dipilih
  const hargaInfo = hargaLayanan[jenisLayanan];
  const jumlahNumerik = parseFloat(jumlah) || 0;
  const estimasiTotal = hargaInfo ? jumlahNumerik * hargaInfo.harga : 0;

  // Konfigurasi input jumlah (placeholder, step, min) mengikuti satuan layanan yang dipilih
  const unitInfo = unitConfig[hargaInfo?.unit] || unitConfig.kg;

  // Reset jumlah setiap kali jenis layanan berganti, biar nggak salah satuan
  useEffect(() => {
    setJumlah('');
  }, [jenisLayanan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/pesanan', {
        jenisLayanan,
        jumlah: parseFloat(jumlah),
        catatan: catatan || undefined,
      });
      setSuccess(true);
      setJumlah('');
      setCatatan('');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat pesanan, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow p-4 rounded-4">
            <h4 className="fw-bold mb-1">
              <i className="bi bi-basket-fill text-primary me-2"></i>Pesan Layanan Laundry
            </h4>
            <p className="text-muted small mb-4">Isi detail pesanan Anda di bawah ini</p>

            {isLocked && (
              <div className="alert alert-primary d-flex justify-content-between align-items-center py-2 small">
                <span>
                  <i className="bi bi-lock-fill me-1"></i>
                  Anda memesan khusus <strong>{labelJenisTerkunci}</strong>
                </span>
                {onClearPreset && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={onClearPreset}
                  >
                    Ganti Jenis
                  </button>
                )}
              </div>
            )}

            {success && (
              <div className="alert alert-success d-flex justify-content-between align-items-center py-2">
                <span>✅ Pesanan berhasil dibuat!</span>
                <button className="btn btn-sm btn-outline-success" onClick={() => setCurrentTab('pesanan-saya')}>
                  Lihat Pesanan
                </button>
              </div>
            )}
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">Jenis Layanan</label>
                <select
                  className="form-select"
                  value={jenisLayanan}
                  onChange={(e) => setJenisLayanan(e.target.value)}
                  disabled={loading || isLocked}
                >
                  {(isLocked
                    ? jenisLayananOptions.filter((opt) => opt.value === presetJenis)
                    : jenisLayananOptions
                  ).map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {hargaInfo && (
                  <div className="form-text">
                    Harga: <strong>{formatRupiah(hargaInfo.harga)}</strong> / {hargaInfo.unit}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Jumlah ({hargaInfo?.unit || 'kg'})
                </label>
                <input
                  type="number"
                  step={unitInfo.step}
                  min={unitInfo.min}
                  className="form-control"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  placeholder={unitInfo.placeholder}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Catatan (opsional)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: tolong pisahkan pakaian putih"
                  disabled={loading}
                />
              </div>

              {/* Estimasi Total Harga */}
              <div className="d-flex justify-content-between align-items-center bg-light rounded-3 px-3 py-3 mb-3">
                <span className="fw-medium text-muted">Estimasi Total</span>
                <span className="fw-bold text-primary fs-5">{formatRupiah(estimasiTotal)}</span>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-pill" disabled={loading}>
                {loading ? 'Memproses...' : 'Buat Pesanan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}