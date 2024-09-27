import { Request, Response, Router } from 'express';
import { UserService } from '../user/service';
import { AgentService } from '../agent/service';
import { QuestionBankService } from '../questionBank/service';

export class AgentController {
    private readonly userService: UserService;
    private readonly agentService: AgentService;
    private readonly qbService: QuestionBankService;

  constructor() {
    this.agentService = new AgentService();
    this.userService = new UserService();
    this.qbService = new QuestionBankService();
  }

  async ask(req: Request, res: Response): Promise<any> {
      const { context, query } = req.body as any;
    try {
      const { user } = context;
      const stringifiedContext = "This is user info" + JSON.stringify(user);
    //   const user = await this.userService.getUserById(userId);
    //   if (!user) throw new Error('User not found');
      const agentResponse = await this.agentService.askAgentTimed({ context: stringifiedContext, query }, 30 * 1000);
      if (agentResponse?.[0].questions) {
        this.qbService.addToBank(user.exam, user.proficiency, agentResponse)
      }
      return res.status(200).json(agentResponse);
    } catch (error) {
        if (error.message === 'Timeout exceeded') {
            const qb = await this.qbService.getLatestQuestionByTopics(query as string);
            return qb?.questions;
        }
      return res.status(500).json({ error: error.message });
    }
  }
}