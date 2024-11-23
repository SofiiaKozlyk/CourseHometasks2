import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppDataSource } from './data-source/data-source';

const app = createExpressServer({
  controllers: [UserController],
});

const port = 3000;

const initializeDatabase = async () => {
  await AppDataSource.initialize();  
}

initializeDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});