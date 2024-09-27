import { Request, Response } from 'express';
import timerPromises from 'timers/promises';
import { UserService } from '../user/service';
import { AgentService } from '../agent/service';
import { QuestionBankService } from '../questionBank/service';

export class AgentController {
    private readonly agentService: AgentService;
    private readonly qbService: QuestionBankService;

  constructor() {
    this.agentService = new AgentService();
    this.qbService = new QuestionBankService();
  }

  async ask(req: Request, res: Response): Promise<Response> {
    const { context, takeTest, query } = req.body as any;
    try {
      if (takeTest) {
        const qb = await this.qbService.getLatestQuestionByTopics(query as string);
        await timerPromises.setTimeout(10 * 1000)
        return res.status(200).json(qb?.questions);
      }
      const { user } = context;
      const { response } = await this.agentService.askAgent({ context: user, chain:'AGENT', query });
      if (response?.[0]?.question) {
        this.qbService.addToBank(user.exam, user.proficiency, response);
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}