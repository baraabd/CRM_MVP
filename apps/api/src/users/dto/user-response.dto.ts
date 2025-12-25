import { ApiProperty } from '@nestjs/swagger';
import { UserRoleDto } from './user-role.dto';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRoleDto })
  role: UserRoleDto;

  @ApiProperty()
  createdAt: Date;
}
