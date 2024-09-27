import { Request, Response, Router } from 'express';
import timerPromises from 'timers/promises';
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
    const { context, takeTest, query } = req.body as any;
    try {
      if (takeTest) {
        const qb = await this.qbService.getLatestQuestionByTopics(query as string);
        await timerPromises.setTimeout(10 * 1000)
        return res.status(200).json(qb?.questions);
      }
      const { user } = context;
      const stringifiedContext = "This is student info: " + JSON.stringify(user);
      const { response } = await this.agentService.askAgent({ context: stringifiedContext, query });
      if (response?.[0]?.question) {
        this.qbService.addToBank(user.exam, user.proficiency, response);
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async submit(req: Request, res: Response): Promise<any> {
    const { context, query } = req.body as any;
  try {
    const { user, question_answers  } = context;
    const stringifiedContext = `This is Student info ${JSON.stringify(user)} \n This is exam response with answers ${JSON.stringify(question_answers)}`;
  //   const user = await this.userService.getUserById(userId);
  //   if (!user) throw new Error('User not found');
    const {response } = await this.agentService.askAgent({ context: stringifiedContext, query });
    const responseJson = JSON.parse(response);  
    console.log('responseJson', responseJson.updated_summary);
    if (!!responseJson.updated_summary) {
      this.userService.updateUserSummary(user.id, responseJson.updated_summary);
    }
    return res.status(200).json(response);
  } catch (error) {
      if (error.message === 'Timeout exceeded') {
          const qb = await this.qbService.getLatestQuestionByTopics(query as string);
          return qb?.questions;
      }
    return res.status(500).json({ error: error.message });
  }
}
}