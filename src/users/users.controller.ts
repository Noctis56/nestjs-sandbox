import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { ApiUseTags, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number) {
        const user: UserDto = this.usersService.findOneById(id);
        if (user === undefined) {
            throw new HttpException(
                `Cannot find a product with id ${id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    async create(@Body() userDto: UserDto) {
        if (this.usersService.findAll().length > 5) {
            throw new HttpException(
                `Too much products added!`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        this.usersService.add(userDto);
        return userDto;
    }

    @Put()
    update(@Body() userToUpdate: UserDto) {
        const findUser: UserDto = this.usersService.findOneById(userToUpdate.id);
        if (findUser === undefined) {
            throw new HttpException(
                `Cannot find a product with id ${userToUpdate.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return this.usersService.update(userToUpdate);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', new ParseIntPipe()) id: number) {
        const findUser: UserDto = this.usersService.findOneById(id);
        if (findUser === undefined) {
            throw new HttpException(
                `Cannot find a product with id ${id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        this.usersService.delete(id);
    }
}
