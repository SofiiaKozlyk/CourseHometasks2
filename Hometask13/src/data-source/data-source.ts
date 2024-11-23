import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "lesson13",
  password: "password",
  database: "lesson13",
  synchronize: false,
  logging: true,
  entities: [User], 
  migrations: ["../migrations/*.ts"],
});