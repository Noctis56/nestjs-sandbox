import { Controller, Get, Post, Param, Body, Put, Delete, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { ApiUseTags, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return `This action returns a #${id} user`;
    }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async create(@Body() userDto: UserDto) {
        this.usersService.create(userDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
