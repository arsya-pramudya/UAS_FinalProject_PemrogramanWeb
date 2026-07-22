import { IsNotEmpty, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty({ message: 'Status wajib diisi' })
  @IsIn(['menunggu', 'diproses', 'selesai'], { message: 'Status tidak valid' })
  status: string;
}