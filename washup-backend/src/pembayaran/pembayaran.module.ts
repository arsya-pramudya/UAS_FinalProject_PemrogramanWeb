import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PembayaranController } from './pembayaran.controller';
import { PembayaranService } from './pembayaran.service';
import { Pembayaran } from './entities/pembayaran.entity';
import { Pesanan } from '../pesanan/entities/pesanan.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pembayaran, Pesanan]), AuthModule],
  controllers: [PembayaranController],
  providers: [PembayaranService],
  exports: [PembayaranService],
})
export class PembayaranModule {}