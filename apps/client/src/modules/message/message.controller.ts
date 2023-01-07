import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../jwt.auth.guard';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addMessage(@Body() body, @Request() req) {
    const { id } = req.user;
    return this.messageService.addMessage(body, id);
  }

  @Get('/list')
  getMessage(@Query() query) {
    const { pageNum, pageSize, type } = query;
    return this.messageService.getMessage(pageNum, pageSize, type);
  }

  @Post('/del')
  delMessage(@Request() req) {
    return this.messageService.delMessage(req.query.id);
  }
}
