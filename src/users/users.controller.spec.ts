import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { HttpException } from '@nestjs/common';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return one user', async () => {
    expect(controller).toBeDefined();
    const user: UserDto = new UserDto();
    jest.spyOn(service, 'findOneById').mockImplementation(() => user);

    expect(await controller.findOne(1)).toBe(user);
  });

  it('should throw an error', async () => {
    expect(controller).toBeDefined();
    const user: UserDto = new UserDto();
    jest.spyOn(service, 'findOneById').mockImplementation(() => undefined);

    await expect(controller.findOne(1)).rejects.toThrowError(HttpException);
  });
});
