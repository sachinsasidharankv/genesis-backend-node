import { Request, Response } from 'express';
import { UserService } from './service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async explainTopic(req: Request, res: Response): Promise<any> {
    const { topic, sub_topic } = req.body as any;
  try {
    const response = await this.userService.explainTopic(topic, sub_topic); 
    console.log('explainTopic', response);
    return res.status(200).json(response);
  } catch (error) {
     return res.status(500).json({ error: error.message });
    }
  }
}