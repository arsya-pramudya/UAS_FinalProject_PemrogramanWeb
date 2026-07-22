import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { PesananService } from './pesanan.service';
import { CreatePesananDto } from './entities/dto/create-pesanan.dto';
import { UpdateStatusDto } from './entities/dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pesanan')
@UseGuards(JwtAuthGuard) // Semua endpoint di sini wajib login
export class PesananController {
  constructor(private readonly pesananService: PesananService) {}

  // POST /pesanan - Pelanggan membuat pesanan baru
  @Post()
  async create(@Request() req, @Body() dto: CreatePesananDto) {
    return this.pesananService.create(req.user.sub, dto);
  }

  // GET /pesanan - Khusus admin, lihat semua pesanan
  @Get()
  async findAll(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Hanya admin yang bisa mengakses semua pesanan');
    }
    return this.pesananService.findAll();
  }

  // GET /pesanan/saya - Pelanggan lihat pesanan miliknya sendiri
  @Get('saya')
  async findMine(@Request() req) {
    return this.pesananService.findByUser(req.user.sub);
  }

  // PUT /pesanan/:id/status - Khusus admin, update status pesanan
  @Put(':id/status')
  async updateStatus(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Hanya admin yang bisa mengubah status pesanan');
    }
    return this.pesananService.updateStatus(id, dto);
  }
}