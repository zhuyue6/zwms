import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class PageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  currentPage?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize?: number;
}