import { Request, Response } from 'express';
import { AgentService } from '../agent/service';
import { UserService } from '../user/service';

export class AssessmentController {
    private readonly userService: UserService;
    private readonly agentService: AgentService;

  constructor() {
    this.userService = new UserService();
    this.agentService = new AgentService();
  }

  async chat(req: Request, res: Response): Promise<Response> {
    const { context, query } = req.body as any;
    try {
      const { user, questionWithAnswer } = context;
      const enrichedContext =  user && questionWithAnswer ? {
        "student_summary": user.summary || '',
        "question_dict": JSON.stringify(questionWithAnswer)
      }: {};
      const { response } = await this.agentService.askChain({ context: enrichedContext, chain: 'GUIDANCE', query });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async submit(req: Request, res: Response): Promise<any> {
    const { context, query } = req.body as any;
  try {
    const { user, question_answers  } = context;
    const enrichedContext = {
        "student_summary": user.summary || '',
        "exam_results_dict": question_answers
    };
    const {response } = await this.agentService.askChain({ context: enrichedContext, chain: 'FEEDBACK', query }); 
    console.log('responseJson', response.updated_summary);
    if (!!response.updated_summary) {
      this.userService.updateUserSummary(user.id, response.updated_summary);
    }
    return res.status(200).json(response);
  } catch (error) {
     return res.status(500).json({ error: error.message });
    }
  }
}