import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesananController } from './pesanan.controller';
import { PesananService } from './pesanan.service';
import { Pesanan } from './entities/pesanan.entity';
import { AuthModule } from '../auth/auth.module';
import { PembayaranModule } from '../pembayaran/pembayaran.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pesanan]), AuthModule, PembayaranModule],
  controllers: [PesananController],
  providers: [PesananService],
})
export class PesananModule {}