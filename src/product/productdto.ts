import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    productname: string;

    @IsString()
    @IsNotEmpty()
    productdescription: string;

    @IsNumber()
    @IsNotEmpty()
    product_price: number;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    storename: string;
}
