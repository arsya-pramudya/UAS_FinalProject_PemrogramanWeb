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

const statusOptions = ['menunggu', 'diproses', 'selesai'];

const statusBadge = {
  menunggu: 'bg-warning text-dark',
  diproses: 'bg-info text-dark',
  selesai: 'bg-success',
};

export default function AdminDashboard() {
  const [pesananList, setPesananList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchPesanan = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/pesanan');
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await api.put(`/pesanan/${id}/status`, { status: newStatus });
      setPesananList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah status');
    } finally {
      setUpdatingId(null);
    }
  };

  const totalMenunggu = pesananList.filter((p) => p.status === 'menunggu').length;
  const totalDiproses = pesananList.filter((p) => p.status === 'diproses').length;
  const totalSelesai = pesananList.filter((p) => p.status === 'selesai').length;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0"><i className="bi bi-speedometer2 text-primary me-2"></i>Dashboard Admin - Kelola Pesanan</h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={fetchPesanan}>
          <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>
      <p className="text-muted small mb-4">
        Kelola progres pengerjaan pesanan di sini. Pesanan yang sudah <strong>"selesai"</strong> otomatis
        muncul di <strong>Dashboard Kasir</strong> untuk ditagih.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Menunggu</span>
            <h3 className="fw-bold text-warning mb-0">{totalMenunggu}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Diproses</span>
            <h3 className="fw-bold text-info mb-0">{totalDiproses}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Selesai</span>
            <h3 className="fw-bold text-success mb-0">{totalSelesai}</h3>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-muted text-center py-5">Memuat data...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : pesananList.length === 0 ? (
        <p className="text-muted text-center py-5">Belum ada pesanan masuk.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Pelanggan</th>
                <th>Jenis Layanan</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Catatan</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Ubah Status</th>
              </tr>
            </thead>
            <tbody>
              {pesananList.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="fw-medium">{p.user?.name}</div>
                    <div className="text-muted small">{p.user?.email}</div>
                  </td>
                  <td>{labelLayanan[p.jenisLayanan] || p.jenisLayanan}</td>
                  <td>{p.jumlah}</td>
                  <td className="fw-medium">{formatRupiah(p.harga)}</td>
                  <td className="text-muted small">{p.catatan || '-'}</td>
                  <td className="text-muted small">{new Date(p.createdAt).toLocaleString('id-ID')}</td>
                  <td>
                    <span className={`badge ${statusBadge[p.status]}`}>{p.status}</span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={p.status}
                      disabled={updatingId === p.id}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}