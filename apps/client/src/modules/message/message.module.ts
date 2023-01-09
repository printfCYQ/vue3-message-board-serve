import { Module } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, CommentService],
})
export class MessageModule {}
