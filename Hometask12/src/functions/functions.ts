import { promises as fs, WriteFileOptions, writeFileSync } from 'fs';
import { User } from '../interfaces/User';

export async function writeFileExample(users: User[]) {
    const options: WriteFileOptions = {
        encoding: 'utf-8',
    };

    try {
        writeFileSync('./src/files/users.txt', JSON.stringify(users, null, 2), options);
        console.log('User added successfully.');
    } catch (error) {
        console.error('Error while adding user to the file: ', error);
    }
}

export async function readFileAsync(): Promise<string | null> {
    try {
        const users = await fs.readFile('./src/files/users.txt', 'utf-8');
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error while reading the file: ', error);
        return null;
    }
}