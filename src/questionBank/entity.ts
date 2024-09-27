import { Exam } from '../constants/exam';
import { Proficiency } from '../constants/proficiency';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export type Question = {
    time: number;
    question: string;
    options: string[];
    difficulty: string;
    explanation: string;
    subtopics: string[];
    correct_answer: number;
}

@Entity('question_bank')
export class QuestionBank extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Exam, nullable: false })
  exam: string;

  @Column({ type: 'enum', enum: Proficiency })
  proficiency: string | null;

  @Column({type: 'json'})
  questions: Question[];
}