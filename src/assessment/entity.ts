import { Question } from '../questionBank/entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export type Answer = {
    timeTook: number;
    selected_answer: number;
}

export type QuestionsWithAnswer = Question & Answer;

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

  @Column('text')
  accuracy: string; 
 
  @Column('json')
  categorySplit: any;

  @Column({type: 'json'})
  questionAnswers: QuestionsWithAnswer[];
}