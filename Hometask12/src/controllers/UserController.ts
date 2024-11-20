import { Get, Param, Post, Patch, Body, Delete, JsonController } from 'routing-controllers';
import { ValidateArgs } from '../decorators/validator';
import { writeFileExample, readFileAsync } from '../functions/functions';
import { User } from '../interfaces/User';

@JsonController()
export class UserController {
  @Get('/')
  getAuthor() {
    return { author: 'Софія Козлик' };
  }

  @Get('/users')
  async getUsers() {
    const users = await readFileAsync();
    return users !== null ? JSON.parse(users) : [];
  }

  @Post('/users')
  @ValidateArgs() 
  async createUser(@Body() body: { userName: string; email: string }) {
    const { userName, email } = body;

    const users = await readFileAsync();
    let usersData = [];

    if (users) {
      usersData = JSON.parse(users);
    }

    const newUser = { id: Date.now().toString(), userName, email };
    usersData.push(newUser);
    writeFileExample(usersData);

    return newUser;
  }

  @Patch('/users/:id')
  @ValidateArgs()
  async updateUser(@Param('id') id: string, @Body() body: { userName?: string; email?: string }) {
    const users = await readFileAsync();
    let usersData = [];
    if (users) {
        usersData = JSON.parse(users);
    }
    const userIndex = usersData.findIndex((user: User) => user.id === id);

    if (body.userName) usersData[userIndex].userName = body.userName;
    if (body.email) usersData[userIndex].email = body.email;

    writeFileExample(usersData);
    return usersData[userIndex];
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string) {
    const users = await readFileAsync();
    let usersData: User[] = [];
    if (users) {
        usersData = JSON.parse(users);
    }
    const filteredUsers: User[] = usersData.filter((user: User) => user.id !== id);

    writeFileExample(filteredUsers);
    return { message: 'User deleted' };
  }

}