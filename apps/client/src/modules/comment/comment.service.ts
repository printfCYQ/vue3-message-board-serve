import { Comment } from '@libs/db/models/comment.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async addComment(commentDto) {
    const newComment = this.commentRepository.create(commentDto);
    const res = await this.commentRepository.save(newComment);
    if (res) {
      return {
        message: '评论成功',
        code: 200,
      };
    } else {
      return {
        message: '评论失败',
        code: 2000,
      };
    }
  }

  async getComment(pageNum, pageSzie, messageId) {
    const skip = (Number(pageNum) - 1) * Number(pageSzie);
    const take = Number(pageSzie);
    return this.commentRepository.find({
      order: {
        id: 'ASC',
      },
      relations: ['user'],
      skip,
      take,
      where: {
        isDelete: false,
        message: messageId,
      },
    });

    // const res = await this.commentRepository
    //   .createQueryBuilder('comment')
    //   .leftJoinAndSelect(User, 'user', 'user.id = comment.user')
    //   .getRawMany();
    // return res;
  }

  async delComment(id) {
    const commnet = await this.commentRepository
      .createQueryBuilder('user')
      .addSelect('user.isDelete')
      .where('user.id = :id', { id })
      .getOne();

    if (commnet.isDelete) {
      return;
    }
    commnet.isDelete = true;
    const res = await this.commentRepository.save(commnet);
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
