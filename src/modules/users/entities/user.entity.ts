import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Challange } from '../../challanges/entities/challange.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullname: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 250 })
  bio: string;

  @Column()
  profile_pic: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  refresh_token: string;

  @OneToMany(() => Challange, (challange) => challange.user)
  challanges: Challange[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
