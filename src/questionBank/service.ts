import { Repository } from "typeorm";
import { Exam } from "../constants/exam";
import { Question, QuestionBank } from "./entity";
import { Proficiency } from "../constants/proficiency";

export class QuestionBankService {
    private repo: Repository<QuestionBank>;

    async addToBank(exam: string, proficiency: string, questions: Question[]) {
        await this.repo.save({ exam, proficiency, questions })
    }
}