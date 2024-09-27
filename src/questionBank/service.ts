import { Repository } from "typeorm";
import { Exam } from "../constants/exam";
import { appDataSource } from "../data-source";
import { Question, QuestionBank } from "./entity";
import { Proficiency } from "../constants/proficiency";

export class QuestionBankService {
    private readonly repo: Repository<QuestionBank>;

    constructor() {
        this.repo = appDataSource.getRepository(QuestionBank);
    }

    async addToBank(exam: string, proficiency: string, questions: Question[]) {
        await this.repo.save({ exam, proficiency, questions })
    }

    async getLatestQuestionByTopics(query: string) {
        const topics = query.split(' ');
        return this.repo.createQueryBuilder('question_bank').where('question.topic ILIKE ANY(:topics)', { topics: topics.map(topic => `%${topic}%`) }).getOne();
    }
}