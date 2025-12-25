import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      example: {
        page: 1,
        limit: 20,
        total: 1,
        items: [
          {
            id: 'cmxxxx',
            name: 'Baraa',
            email: 'baraa@example.com',
            role: 'REP',
            createdAt: '2025-12-25T02:30:51.188Z',
          },
        ],
      },
    },
  })
  findAll(@Query() query: UsersQueryDto) {
    return this.users.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'cmjktst9w0000bsvzg550nyi8' })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 'cmjktst9w0000bsvzg550nyi8' })
  @ApiOkResponse({ type: UserResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: 'cmjktst9w0000bsvzg550nyi8' })
  @ApiOkResponse({
    schema: { example: { id: 'cmjktst9w0000bsvzg550nyi8', deleted: true } },
  })
  async remove(@Param('id') id: string) {
    await this.users.remove(id);
    return { id, deleted: true };
  }
}
