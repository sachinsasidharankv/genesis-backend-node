import { User } from './entity';
import { appDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { CuratedTopics } from './curated.entity';

export class UserService {

  private readonly repo: Repository<User>;

  constructor(){
    this.repo = appDataSource.getRepository(User);
  }
  
  async createUser(userData: Partial<User>): Promise<User | undefined> {
    const userRepository = appDataSource.getRepository(User);
    try{
        // Check if user already exists by phone number
        let user = await userRepository.findOneBy({ phone: userData.phone });
        
        if (user) {
          // Return existing user
          console.log('User already exists');
          return user;
        }
        // userData.summary = `I want to get rank - ${userData.expectedRank} in ${userData.exam} exam`;
        user = userRepository.create(userData);
        await userRepository.save(user);
        return user;
    }
    catch(error){
      console.log(error);
      throw error;
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

  async explainTopic(topic: string, sub_topic: string): Promise<string | undefined> {
    const curatedTopicsRepository = appDataSource.getRepository(CuratedTopics);
    const curatedTopic = await curatedTopicsRepository.findOneBy({ sub_topic });

    if (!curatedTopic) {
      throw new Error('Explanation not found');
    }

    return curatedTopic.explanation;
  }

  async updateUserSummary(userId: string, newSummary: string): Promise<User | undefined> {
    const userRepository = appDataSource.getRepository(User);
    try {
      // Find the user by ID
      let user = await userRepository.findOneBy({ id: userId });
      
      if (!user) {
        console.log('User not found');
        return undefined;
      }
  
      // Update the summary field
      user.summary = newSummary;
  
      // Save the updated user
      await userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}