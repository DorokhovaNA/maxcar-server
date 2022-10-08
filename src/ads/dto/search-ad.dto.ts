import { IsOptional } from 'class-validator';

export class SearchAdDto {
  @IsOptional()
  title: string;

  @IsOptional()
  readonly priceTo: string | number;

  @IsOptional()
  priceFrom: string | number;

  @IsOptional()
  readonly yearFrom: string | number;

  @IsOptional()
  readonly yearTo: string | number;

  @IsOptional()
  readonly drive: string;

  @IsOptional()
  readonly transmission: string;

  @IsOptional()
  readonly mileageFrom: string | number;

  @IsOptional()
  readonly mileageTo: string | number;

  @IsOptional()
  readonly body: string;

  @IsOptional()
  readonly status: string;

  @IsOptional()
  price: number | object;

  @IsOptional()
  mileage: number | object;

  @IsOptional()
  year: number | object;
}
