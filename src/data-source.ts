import { DataSource } from 'typeorm';
import { User } from './user/entity';
import { Assesment } from './assessment/entity';
import { QuestionBank } from './questionBank/entity';

export const appDataSource = new DataSource({
    port: 3344,
    database: "template-gen",
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "5kqbOtx1G04YBjrkcW/3",
    entities: [User, Assesment, QuestionBank],
    // synchronize: true
  });