import { Get, Param, Post, Patch, Body, Delete, JsonController, HttpError } from 'routing-controllers';
import { ValidateArgs } from '../decorators/validator';
import { UserI } from '../interfaces/User';
import { AppDataSource } from '../data-source/data-source';
import { User } from '../entity/User';

@JsonController()
export class UserController {
  @Get('/')
  getAuthor() {
    return { author: 'Софія Козлик' };
  }

  @Get('/users')
  async getUsers() {
    const users = await AppDataSource.getRepository(User).find();
    return users;
  }

  @Post('/users')
  @ValidateArgs() 
  async createUser(@Body() body: { user: string; email: string }) {
    const { user, email } = body;
    return await AppDataSource.getRepository(User).save({ user, email });
  }

  @Patch('/users/:id')
  @ValidateArgs()
  async updateUser(@Param('id') id: number, @Body() body: { user?: string; email?: string }) {
    const user = await AppDataSource.getRepository(User).findOneBy({id});
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    if (body.user) {
      user.user = body.user;
    }
    if (body.email) {
      user.email = body.email;
    }

    return await AppDataSource.getRepository(User).save(user);
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: number) {
    const user = await AppDataSource.getRepository(User).findOneBy({id});
    if (!user) throw new HttpError(404, 'User not found');

    await AppDataSource.getRepository(User).remove(user);
    return { message: 'User deleted' };
  }

}