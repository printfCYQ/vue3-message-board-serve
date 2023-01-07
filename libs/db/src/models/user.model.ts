import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 昵称
  @Column('text')
  userName: string;

  // 邮箱
  @Column('text')
  email: string;

  // 加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;

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
