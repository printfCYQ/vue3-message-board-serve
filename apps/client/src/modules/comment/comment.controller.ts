import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../jwt.auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addComment(@Body() body, @Request() req) {
    const { id } = req.user;

    return this.commentService.addComment(body, id);
  }

  @Get('/list')
  getComment(@Query() query) {
    console.log(query);
    const { pageNum, pageSize, messageId } = query;
    return this.commentService.getComment(pageNum, pageSize, messageId);
  }

  @Post('/del')
  delComment(@Request() req) {
    return this.commentService.delComment(req.query.id);
  }
}
