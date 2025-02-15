
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class store {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  storename: string;
  @Column()
  Email: string;
  @Column()
  contact: number;
  @Column()
  date: Date;  
  @Column()
  address: string;
  @Column()
  image: string; 
}
