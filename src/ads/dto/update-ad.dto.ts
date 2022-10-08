import { IsNotEmpty, Length } from 'class-validator';

export class UpdateAdDto {
  @Length(5, 20)
  readonly title: string;

  @Length(50, 250)
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly year: number;

  @IsNotEmpty()
  readonly drive: string;

  @IsNotEmpty()
  readonly transmission: string;

  @IsNotEmpty()
  readonly modification: string;

  @IsNotEmpty()
  readonly mileage: number;

  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  readonly date: Date;

  attachment?: string[];
}
