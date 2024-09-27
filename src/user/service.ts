import { User } from './entity';
import { appDataSource } from '../data-source';

export class UserService {
  async createUser(userData: Partial<User>): Promise<User | undefined> {
    const userRepository = appDataSource.getRepository(User);
    try{
    const user = userRepository.create(userData);
    await userRepository.save(user);
    return user;
}
    catch(error){
      console.log(error);
      return undefined;
    }

  }
}