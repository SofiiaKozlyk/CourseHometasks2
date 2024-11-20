import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import { writeFileExample, readFileAsync } from "./functions/functions";
import { User } from "./interfaces/User";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  console.log(`Author: Софія Козлик`);

  res.status(200).json({ author: 'Софія Козлик' });
});

app.get('/users', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await readFileAsync();

    if (!users) {
      res.status(500).json({ error: 'Failed to load users.' });
      return;
    }
    const usersData = JSON.parse(users);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users.' });
  }
});

app.post('/users', async (req: Request, res: Response): Promise<void> => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    res.status(400).json({ error: 'UserName and email are required.' });
    return;
  }

  try {
    const users = await readFileAsync();
    let usersData = [];

    if (users) {
      usersData = JSON.parse(users);
    }

    const newUser: User = { id: Date.now().toString(), userName, email };
    usersData.push(newUser);
    writeFileExample(usersData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

app.patch('/users/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userName, email } = req.body;

  if (!userName && !email) {
    res.status(400).json({ error: 'UserName or email is required.' });
    return;
  }

  try {
    const users = await readFileAsync();
    if (!users) {
      res.status(500).json({ error: 'Failed to load users.' });
      return;
    }
    const usersData = JSON.parse(users);
    const userIndex = usersData.findIndex((user: User) => user.id === id);

    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    if (userName) usersData[userIndex].userName = userName;
    if (email) usersData[userIndex].email = email;

    writeFileExample(usersData);

    res.status(200).json(usersData[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

app.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const users = await readFileAsync();
    if (!users) {
      res.status(500).json({ error: 'Failed to load users.' });
      return;
    }
    const usersData: User[] = JSON.parse(users);
    const filteredUsers: User[] = usersData.filter((user: User) => user.id !== id);

    if (filteredUsers.length === usersData.length) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    writeFileExample(filteredUsers);
    res.status(204).send();
    console.log('User deleted successfully.');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});