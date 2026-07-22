import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Pesanan } from '../../pesanan/entities/pesanan.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Pembayaran {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Pesanan)
  @JoinColumn({ name: 'pesananId' })
  pesanan!: Pesanan;

  @Column({ unique: true })
  pesananId!: number;

  @Column({
    type: 'enum',
    enum: ['cash', 'transfer', 'qris'],
    nullable: true,
  })
  metodePembayaran!: string;

  @Column({
    type: 'enum',
    enum: ['belum_bayar', 'lunas'],
    default: 'belum_bayar',
  })
  status!: string;

  // Admin yang mengonfirmasi pembayaran (merangkap fungsi kasir)
  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'dibayarOleh' })
  admin!: User;

  @Column({ nullable: true })
  dibayarOleh!: number;

  @Column({ type: 'datetime', nullable: true })
  tanggalBayar!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}