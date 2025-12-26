import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRoleDto } from './user-role.dto';


export class CreateUserDto {
  @ApiProperty({ example: 'Baraa' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'baraa@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ enum: UserRoleDto, example: UserRoleDto.REP })
  @IsEnum(UserRoleDto)
  role!: UserRoleDto;
}
