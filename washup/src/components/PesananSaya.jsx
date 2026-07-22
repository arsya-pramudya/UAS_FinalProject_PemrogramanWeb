import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import { formatRupiah } from '../data/hargaLayanan';

const labelLayanan = {
  express: 'Laundry Express',
  karpet: 'Laundry Karpet',
  kiloan: 'Laundry Kiloan',
  bayi: 'Laundry Perlengkapan Bayi',
  premium: 'Laundry Satuan Premium',
  shoesbag: 'Shoes Bag Care',
};

const statusBadge = {
  menunggu: { className: 'bg-warning text-dark', label: '⏳ Menunggu' },
  diproses: { className: 'bg-info text-dark', label: '🔄 Diproses' },
  selesai: { className: 'bg-success', label: '✅ Selesai' },
};

export default function PesananSaya({ setCurrentTab }) {
  const [pesananList, setPesananList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPesanan = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/pesanan/saya');
      setPesananList(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil data pesanan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0"><i className="bi bi-clock-history text-primary me-2"></i>Pesanan Saya</h4>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={fetchPesanan}>
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setCurrentTab('pesan')}>
            <i className="bi bi-plus-lg"></i> Pesan Baru
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted text-center py-5">Memuat data...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : pesananList.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3">Belum ada pesanan. Yuk pesan layanan pertamamu!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Jenis Layanan</th>
                <th>Jumlah</th>
                <th>Total</th>
                <th>Catatan</th>
                <th>Status</th>
                <th>Pembayaran</th>
                <th>Tanggal Pesan</th>
              </tr>
            </thead>
            <tbody>
              {pesananList.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{labelLayanan[p.jenisLayanan] || p.jenisLayanan}</td>
                  <td>{p.jumlah}</td>
                  <td className="fw-medium">{formatRupiah(p.harga)}</td>
                  <td className="text-muted small">{p.catatan || '-'}</td>
                  <td>
                    <span className={`badge ${statusBadge[p.status]?.className}`}>
                      {statusBadge[p.status]?.label || p.status}
                    </span>
                  </td>
                  <td>
                    {p.pembayaran?.status === 'lunas' ? (
                      <span className="badge bg-success">Lunas</span>
                    ) : (
                      <span className="badge bg-secondary">Belum Bayar</span>
                    )}
                  </td>
                  <td className="text-muted small">{new Date(p.createdAt).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}