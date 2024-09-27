import { Exam } from '../constants/exam';
import { Proficiency } from '../constants/proficiency';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity('user')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'varchar', length: 255})
  phone: string;

  @Column({type: 'varchar', length: 255})
  expectedRank: string;

  @Column({type: 'varchar', length: 255})
  summary: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  institution: string | null;

  @Column({ type: 'enum', enum: Exam, nullable: false })
  exam: string;

  @Column({ type: 'enum', enum: Proficiency, nullable: false })
  proficiency: string;
}