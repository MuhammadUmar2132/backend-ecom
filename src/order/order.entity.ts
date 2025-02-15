
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class  order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productname: string;
  @Column()
  productdescription: string;
  @Column()
  productimage:string
  @Column()
  product_price: number;
  @Column()
  city: string;  
  @Column()
  area: string;
  @Column()
  post: string;
  
 
}
