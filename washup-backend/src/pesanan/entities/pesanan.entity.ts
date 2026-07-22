import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Pembayaran } from '../../pembayaran/entities/pembayaran.entity';

@Entity()
export class Pesanan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: number;

  @Column({
    type: 'enum',
    enum: ['express', 'karpet', 'kiloan', 'bayi', 'premium', 'shoesbag'],
  })
  jenisLayanan!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  jumlah!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  harga!: number;

  @Column({ type: 'text', nullable: true })
  catatan!: string;

  @Column({
    type: 'enum',
    enum: ['menunggu', 'diproses', 'selesai'],
    default: 'menunggu',
  })
  status!: string;

  // eager: true supaya info pembayaran otomatis ikut ke-load
  // setiap kali query Pesanan, tanpa perlu join manual di service
  @OneToOne(() => Pembayaran, (pembayaran) => pembayaran.pesanan, { eager: true })
  pembayaran!: Pembayaran;

  @CreateDateColumn()
  createdAt!: Date;
}