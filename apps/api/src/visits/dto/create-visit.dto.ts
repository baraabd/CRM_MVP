import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({ example: 'LEAD_ID' })
  @IsString()
  leadId!: string;

  @ApiProperty({ example: 'USER_ID' })
  @IsString()
  repUserId!: string;

  @ApiProperty({ example: '2025-12-25T10:00:00.000Z', required: false })
  @IsOptional()
  @IsString()
  checkInAt?: string;

  @ApiProperty({ example: 24.7136, required: false })
  @IsOptional()
  @IsNumber()
  checkInLat?: number;

  @ApiProperty({ example: 46.6753, required: false })
  @IsOptional()
  @IsNumber()
  checkInLng?: number;

  @ApiProperty({ example: '2025-12-25T10:20:00.000Z', required: false })
  @IsOptional()
  @IsString()
  checkOutAt?: string;

  @ApiProperty({ example: 24.7136, required: false })
  @IsOptional()
  @IsNumber()
  checkOutLat?: number;

  @ApiProperty({ example: 46.6753, required: false })
  @IsOptional()
  @IsNumber()
  checkOutLng?: number;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @ApiProperty({ example: 'SUCCESS', required: false })
  @IsOptional()
  @IsString()
  outcomeResult?: string;

  @ApiProperty({ example: 'NOT_INTERESTED', required: false })
  @IsOptional()
  @IsString()
  refusalReason?: string;

  @ApiProperty({
    description: 'Full dynamic form payload',
    example: { hasGBP: false, hasWebsite: false, notes: 'Customer needs photos' }
  })
  
@IsOptional()
@IsObject()
  formData!: Record<string, any>;
}
