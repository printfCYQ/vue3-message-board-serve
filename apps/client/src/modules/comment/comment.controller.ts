import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/add')
  addComment(@Body() body) {
    return this.commentService.addComment(body);
  }

  @Get('/list')
  getComment(@Query() query) {
    const { pageNum, pageSize, CommentId } = query;
    return this.commentService.getComment(pageNum, pageSize, CommentId);
  }

  @Post('/del')
  delComment(@Request() req) {
    return this.commentService.delComment(req.query.id);
  }
}
