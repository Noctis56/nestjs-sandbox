import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = [];
  
    create(cat: UserDto) {
        this.users.push(cat);
    }
  
    findAll(): UserDto[] {
        return this.users;
    }
}
