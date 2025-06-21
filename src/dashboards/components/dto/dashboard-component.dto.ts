import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DashboardComponentDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNumber({ allowNaN: false }, { message: 'Width must be a number' })
  @IsNotEmpty({ message: 'Width is required' })
  width: number;

  @IsNumber({ allowNaN: false }, { message: 'Height must be a number' })
  @IsNotEmpty({ message: 'Height is required' })
  height: number;

  @IsNumber({ allowNaN: false }, { message: 'X must be a number' })
  @IsNotEmpty({ message: 'X is required' })
  x: number;

  @IsNumber({ allowNaN: false }, { message: 'Y must be a number' })
  @IsNotEmpty({ message: 'Y is required' })
  y: number;

  @IsNumber({ allowNaN: false }, { message: 'Widget type ID must be a number' })
  @IsNotEmpty({ message: 'Widget type ID is required' })
  widgetTypeId: number;
}
