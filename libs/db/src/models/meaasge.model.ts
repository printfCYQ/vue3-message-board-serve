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
export class Message {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 用户ID
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  // 留言内容
  @Column('text')
  message: string;

  // 留言颜色
  @Column('int')
  color: number;

  // 留言分类
  @Column('int')
  type: number;

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
