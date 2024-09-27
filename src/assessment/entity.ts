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

export type Answer = {
    timeTook: number;
    selected_answer: number;
}

export type QuestionsWithAnswers = Question & Answer;

export type CategorySplit = {
    easy?: string;
    hard?: string;
    medium?: string;
}

@Entity('assessment')
export class Assesment extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column({type: 'json'})
  questionsWithAnswers: QuestionsWithAnswers;

 @Column('text')
 accuracy: string;

 @Column('json')
 categorySplit: any
}