import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class Comment {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 留言Id
  @Column('int')
  message: number;

  // 用户ID
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  // 评论内容
  @Column('text')
  comment: string;

  // 软删除
  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean;

  // 创建时间
  @CreateDateColumn()
  createTime: Date;

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  // 更新次数
  @VersionColumn()
  version: number;
}
