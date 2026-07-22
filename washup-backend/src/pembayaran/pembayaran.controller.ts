import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { BayarDto } from './dto/bayar.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pembayaran')
@UseGuards(JwtAuthGuard)
export class PembayaranController {
  constructor(private readonly pembayaranService: PembayaranService) {}

  // GET /pembayaran - khusus admin, lihat semua data pembayaran
  @Get()
  async findAll(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Hanya admin yang bisa mengakses data pembayaran');
    }
    return this.pembayaranService.findAll();
  }

  // POST /pembayaran/:pesananId/lunas - khusus admin, tandai pesanan sudah dibayar
  @Post(':pesananId/lunas')
  async tandaiLunas(
    @Request() req,
    @Param('pesananId', ParseIntPipe) pesananId: number,
    @Body() dto: BayarDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Hanya admin yang bisa menandai pembayaran');
    }
    return this.pembayaranService.tandaiLunas(pesananId, req.user.sub, dto);
  }
}