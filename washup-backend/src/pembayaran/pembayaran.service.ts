import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pembayaran } from './entities/pembayaran.entity';
import { Pesanan } from '../pesanan/entities/pesanan.entity';
import { BayarDto } from './dto/bayar.dto';

@Injectable()
export class PembayaranService {
  constructor(
    @InjectRepository(Pembayaran)
    private pembayaranRepository: Repository<Pembayaran>,
    @InjectRepository(Pesanan)
    private pesananRepository: Repository<Pesanan>,
  ) {}

  // Dipanggil otomatis dari PesananService saat pesanan baru dibuat
  async createForPesanan(pesananId: number): Promise<Pembayaran> {
    const pembayaran = this.pembayaranRepository.create({
      pesananId,
      status: 'belum_bayar',
    });
    return this.pembayaranRepository.save(pembayaran);
  }

  async findAll(): Promise<Pembayaran[]> {
    return this.pembayaranRepository.find({ order: { createdAt: 'DESC' } });
  }

  // Admin (merangkap kasir) menandai pesanan sudah lunas
  async tandaiLunas(pesananId: number, adminId: number, dto: BayarDto): Promise<Pembayaran> {
    const pesanan = await this.pesananRepository.findOneBy({ id: pesananId });
    if (!pesanan) {
      throw new NotFoundException(`Pesanan dengan ID ${pesananId} tidak ditemukan`);
    }

    let pembayaran = await this.pembayaranRepository.findOneBy({ pesananId });
    if (!pembayaran) {
      // fallback untuk pesanan lama yang belum punya record pembayaran
      pembayaran = this.pembayaranRepository.create({ pesananId });
    }

    if (pembayaran.status === 'lunas') {
      throw new ConflictException('Pesanan ini sudah lunas');
    }

    pembayaran.metodePembayaran = dto.metodePembayaran;
    pembayaran.status = 'lunas';
    pembayaran.dibayarOleh = adminId;
    pembayaran.tanggalBayar = new Date();

    return this.pembayaranRepository.save(pembayaran);
  }
}