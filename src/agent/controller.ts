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

  async ask(req: Request, res: Response): Promise<Response> {
    const { context, optimise, query } = req.body as any;
    try {
      if (optimise) {
        const qb = await this.qbService.getLatestQuestionByTopics(query as string);
        return res.status(200).json(qb?.questions);
      }
      const { user } = context;
      const stringifiedContext = "This is user info" + JSON.stringify(user);
      const { response } = await this.agentService.askAgent({ context: stringifiedContext, query });
      if (response?.[0].question) {
        this.qbService.addToBank(user.exam, user.proficiency, response)
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}