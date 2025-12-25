import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'شركة الواجهة للمقاولات' })
  @IsString()
  @MinLength(2)
  businessName: string;

  @ApiProperty({ example: 'Construction' })
  @IsString()
  sector: string;

  @ApiProperty({ example: 'Riyadh' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Al Olaya' })
  @IsString()
  area: string;

  @ApiProperty({ example: 'شارع الملك فهد - مبنى 12' })
  @IsString()
  addressLine: string;

  @ApiProperty({ example: 'Ahmad' })
  @IsString()
  primaryName: string;

  @ApiProperty({ example: '+9665XXXXXXX' })
  @IsString()
  primaryPhone: string;

  @ApiProperty({ example: 'ahmad@company.com', required: false })
  @IsOptional()
  @IsEmail()
  primaryEmail?: string;

  @ApiProperty({ example: 'PUT_USER_ID_HERE' })
  @IsString()
  ownerUserId: string;
}
