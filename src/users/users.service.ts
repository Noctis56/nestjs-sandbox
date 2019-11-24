import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import * as usersJson from './../../static/data/users.json';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = usersJson;
  
    findAll(): UserDto[] {
        return this.users;
    }

    findOneById(id: number): UserDto {
        return this.users.find((user: UserDto) => user.id === id);
    }

    add(user: UserDto) {
        this.users.push(user);
    }

    update(userToUpdate) {
        const userIndex = this.users.findIndex(
            (user: UserDto) => user.id === userToUpdate.id,
        );
        this.users[userIndex] = userToUpdate;
        return userToUpdate;
    }

    delete(id: number) {
        const userIndex = this.users.findIndex(
            (user: UserDto) => user.id === id,
        );
        this.users.splice(userIndex, 1);
    }
}
