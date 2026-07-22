import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesanan } from './entities/pesanan.entity';
import { CreatePesananDto } from './entities/dto/create-pesanan.dto';
import { UpdateStatusDto } from './entities/dto/update-status.dto';
import { hargaLayanan } from './harga-layanan.constant';
import { PembayaranService } from '../pembayaran/pembayaran.service';

@Injectable()
export class PesananService {
  constructor(
    @InjectRepository(Pesanan)
    private pesananRepository: Repository<Pesanan>,
    private pembayaranService: PembayaranService,
  ) {}

  // Pelanggan membuat pesanan baru
async create(userId: number, dto: CreatePesananDto): Promise<Pesanan> {
    const dataHarga = hargaLayanan[dto.jenisLayanan];
    if (!dataHarga) {
      throw new BadRequestException('Jenis layanan tidak valid');
    }

    const totalHarga = dataHarga.harga * dto.jumlah;

    const pesanan = this.pesananRepository.create({
      ...dto,
      userId,
      harga: totalHarga,
    });
    const savedPesanan = await this.pesananRepository.save(pesanan);

    await this.pembayaranService.createForPesanan(savedPesanan.id);

    const pesananLengkap = await this.pesananRepository.findOneBy({ id: savedPesanan.id });
    if (!pesananLengkap) {
      throw new NotFoundException('Pesanan gagal dibuat');
    }
    return pesananLengkap;
  }

  async findAll(): Promise<Pesanan[]> {
    return this.pesananRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findByUser(userId: number): Promise<Pesanan[]> {
    return this.pesananRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, dto: UpdateStatusDto): Promise<Pesanan> {
    const pesanan = await this.pesananRepository.findOneBy({ id });
    if (!pesanan) {
      throw new NotFoundException(`Pesanan dengan ID ${id} tidak ditemukan`);
    }
    pesanan.status = dto.status;
    return this.pesananRepository.save(pesanan);
  }
}