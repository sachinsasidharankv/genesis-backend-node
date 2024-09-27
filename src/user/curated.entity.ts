import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('curatedtopics')
export class CuratedTopics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  topic: string;

  @Column({ type: 'text' })
  sub_topic: string;

  @Column({ type: 'text' })
  explanation: string;
}