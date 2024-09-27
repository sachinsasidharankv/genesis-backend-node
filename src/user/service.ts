import { User } from './entity';
import { appDataSource } from '../data-source';
import { Repository } from 'typeorm';

export class UserService {

  private readonly repo: Repository<User>;

  constructor(){
    this.repo = appDataSource.getRepository(User);
  }
  
  async createUser(userData: Partial<User>): Promise<User | undefined> {
    try {
      const user = this.repo.create(userData);
      await this.repo.save(user);
      return user;
    } catch(error){
      console.log(error);
      return undefined;
    }
  }

  async getUserById(id: string) {
    try {
      return this.repo.findOne({ where: {id} });
    } catch(error){
      console.log(error);
      return undefined;
    }
  }
}