// Sumber data harga satuan tiap jenis layanan (dalam Rupiah).
// unit: 'kg' untuk yang dihitung per kilogram, 'item' untuk satuan/pcs, 'm²' untuk karpet.
// Ubah angka di sini kalau harga aslinya berbeda, otomatis kepakai di semua halaman.
export const hargaLayanan = {
  express: { harga: 10000, unit: 'kg', label: 'Laundry Express' },
  kiloan: { harga: 6000, unit: 'kg', label: 'Laundry Kiloan' },
  bayi: { harga: 8000, unit: 'kg', label: 'Laundry Perlengkapan Bayi' },
  premium: { harga: 35000, unit: 'item', label: 'Laundry Satuan Premium' },
  shoesbag: { harga: 40000, unit: 'item', label: 'Shoes Bag Care' },
  karpet: { harga: 25000, unit: 'm²', label: 'Laundry Karpet' },
};

// Helper format ke Rupiah, contoh: 15000 -> "Rp15.000"
export function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka || 0);
}