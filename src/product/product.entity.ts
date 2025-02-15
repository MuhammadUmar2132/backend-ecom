
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class  product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productname: string;
  @Column()
  productdescription: string;
  @Column()
  product_price: number;
  @Column()
  date: Date;  
  @Column()
  storename: string;
  @Column()
  productimage: string; 
}
