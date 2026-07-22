import { IsIn, IsNotEmpty } from 'class-validator';

export class BayarDto {
  @IsNotEmpty({ message: 'Metode pembayaran wajib diisi' })
  @IsIn(['cash', 'transfer', 'qris'], { message: 'Metode pembayaran tidak valid' })
  metodePembayaran!: string; // Tambahkan !
}