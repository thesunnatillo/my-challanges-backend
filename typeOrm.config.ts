import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/modules/users/entities/user.entity';
import { Challange } from './src/modules/challanges/entities/challange.entity';
import { Post } from './src/modules/posts/entities/post.entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations: ['src/database/migrations/**'],
  entities: [User, Challange, Post],
});
