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

const metodeOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'qris', label: 'QRIS' },
];

export default function DashboardKasir() {
  const [pesananList, setPesananList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bayarId, setBayarId] = useState(null);
  const [metodeTerpilih, setMetodeTerpilih] = useState({});
  const [filterTampil, setFilterTampil] = useState('belum_bayar'); // 'belum_bayar' | 'lunas' | 'semua'

  const fetchPesanan = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/pesanan');
      // Kasir cuma urus pesanan yang statusnya sudah "selesai"
      // (baru dianggap siap ditagih setelah proses laundry-nya kelar)
      const selesaiSaja = res.data.filter((p) => p.status === 'selesai');
      setPesananList(selesaiSaja);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil data pesanan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  const handleTandaiLunas = async (pesananId) => {
    const metode = metodeTerpilih[pesananId] || 'cash';
    try {
      setBayarId(pesananId);
      const res = await api.post(`/pembayaran/${pesananId}/lunas`, {
        metodePembayaran: metode,
      });
      setPesananList((prev) =>
        prev.map((p) => (p.id === pesananId ? { ...p, pembayaran: res.data } : p))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menandai pembayaran');
    } finally {
      setBayarId(null);
    }
  };

  const belumBayarList = pesananList.filter((p) => p.pembayaran?.status !== 'lunas');
  const lunasList = pesananList.filter((p) => p.pembayaran?.status === 'lunas');

  const totalPendapatan = lunasList.reduce((sum, p) => sum + parseFloat(p.harga || 0), 0);
  const totalPiutang = belumBayarList.reduce((sum, p) => sum + parseFloat(p.harga || 0), 0);

  const dataDitampilkan =
    filterTampil === 'belum_bayar' ? belumBayarList :
    filterTampil === 'lunas' ? lunasList :
    pesananList;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0"><i className="bi bi-cash-coin text-primary me-2"></i>Dashboard Kasir</h4>
        <button className="btn btn-outline-secondary btn-sm" onClick={fetchPesanan}>
          <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>
      <p className="text-muted small mb-4">
        Hanya pesanan dengan status <strong>"selesai"</strong> yang muncul di sini dan siap ditagih.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Perlu Ditagih</span>
            <h3 className="fw-bold text-warning mb-0">{belumBayarList.length}</h3>
            <span className="text-muted small">{formatRupiah(totalPiutang)}</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Sudah Lunas</span>
            <h3 className="fw-bold text-success mb-0">{lunasList.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center">
            <span className="text-muted small">Total Pendapatan</span>
            <h3 className="fw-bold text-primary mb-0">{formatRupiah(totalPendapatan)}</h3>
          </div>
        </div>
      </div>

      <div className="btn-group mb-3" role="group">
        <button
          className={`btn btn-sm ${filterTampil === 'belum_bayar' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilterTampil('belum_bayar')}
        >
          Belum Bayar ({belumBayarList.length})
        </button>
        <button
          className={`btn btn-sm ${filterTampil === 'lunas' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilterTampil('lunas')}
        >
          Lunas ({lunasList.length})
        </button>
        <button
          className={`btn btn-sm ${filterTampil === 'semua' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilterTampil('semua')}
        >
          Semua ({pesananList.length})
        </button>
      </div>

      {loading ? (
        <p className="text-muted text-center py-5">Memuat data...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : dataDitampilkan.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-receipt" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3">Tidak ada pesanan di kategori ini.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white rounded shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Pelanggan</th>
                <th>Jenis Layanan</th>
                <th>Jumlah</th>
                <th>Total Tagihan</th>
                <th>Tanggal Selesai</th>
                <th>Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {dataDitampilkan.map((p, idx) => {
                const sudahLunas = p.pembayaran?.status === 'lunas';
                return (
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="fw-medium">{p.user?.name}</div>
                      <div className="text-muted small">{p.user?.email}</div>
                    </td>
                    <td>{labelLayanan[p.jenisLayanan] || p.jenisLayanan}</td>
                    <td>{p.jumlah}</td>
                    <td className="fw-bold text-primary">{formatRupiah(p.harga)}</td>
                    <td className="text-muted small">{new Date(p.createdAt).toLocaleString('id-ID')}</td>
                    <td>
                      {sudahLunas ? (
                        <div>
                          <span className="badge bg-success mb-1">
                            <i className="bi bi-check-circle me-1"></i>Lunas
                          </span>
                          <div className="text-muted small text-capitalize">
                            via {p.pembayaran.metodePembayaran}
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex gap-1">
                          <select
                            className="form-select form-select-sm"
                            style={{ width: '100px' }}
                            value={metodeTerpilih[p.id] || 'cash'}
                            onChange={(e) =>
                              setMetodeTerpilih((prev) => ({ ...prev, [p.id]: e.target.value }))
                            }
                          >
                            {metodeOptions.map((m) => (
                              <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                          </select>
                          <button
                            className="btn btn-success btn-sm"
                            disabled={bayarId === p.id}
                            onClick={() => handleTandaiLunas(p.id)}
                          >
                            {bayarId === p.id ? '...' : 'Tandai Lunas'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}