import { IsNotEmpty, IsNumber, IsString, IsIn, IsOptional, Min } from 'class-validator';

export class CreatePesananDto {
  @IsString()
  @IsNotEmpty({ message: 'Jenis layanan wajib dipilih' })
  @IsIn(['express', 'karpet', 'kiloan', 'bayi', 'premium', 'shoesbag'], {
    message: 'Jenis layanan tidak valid',
  })
  jenisLayanan!: string;

  @IsNumber({}, { message: 'Jumlah harus berupa angka' })
  @Min(0.1, { message: 'Jumlah minimal 0.1' })
  jumlah!: number;

  @IsString()
  @IsOptional()
  catatan?: string;
}