import { Message } from '@libs/db/models/meaasge.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private commentService: CommentService,
  ) {}
  async addMessage(messageDto, id) {
    const newMessage = this.messageRepository.create({
      ...messageDto,
      user: id,
    });
    const res = await this.messageRepository.save(newMessage);
    if (res) {
      return {
        message: '留言成功',
        code: 200,
      };
    } else {
      return {
        message: '留言失败',
        code: 2000,
      };
    }
  }

  async getMessage(pageNum = 1, pageSzie = 10, type) {
    const skip = (Number(pageNum) - 1) * Number(pageSzie);
    const take = Number(pageSzie);

    const res = await this.messageRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['user'],
      skip,
      take,
      where: {
        type,
        isDelete: false,
      },
    });
    const list = [];
    for (const item of res) {
      const commentCount = await this.commentService.getAllComentById(item.id);
      list.push({
        ...item,
        commentCount,
      });
    }
    if (res) {
      return {
        message: '查询成功',
        code: 200,
        data: {
          list,
        },
      };
    } else {
      return { message: '查询失败', code: 2000 };
    }
  }

  async delMessage(id) {
    const user = await this.messageRepository
      .createQueryBuilder('message')
      .addSelect('message.isDelete')
      .where('message.id = :id', { id })
      .getOne();
    if (user.isDelete) {
      return;
    }
    user.isDelete = true;
    const res = await this.messageRepository.save(user);
    if (res) {
      return {
        message: '删除成功',
        code: 200,
      };
    } else {
      return {
        message: '删除失败',
        code: 2000,
      };
    }
  }
}
