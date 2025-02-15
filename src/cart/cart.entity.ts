
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class  cart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productname: string;
  @Column()
  productdescription: string;
  @Column()
  product_price: number;
  @Column()
  productimage: string; 
}
