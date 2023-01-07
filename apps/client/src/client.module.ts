import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { JwtStrategy } from './jwt.strategy';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [DbModule, UserModule, MessageModule, CommentModule],
  controllers: [ClientController],
  providers: [ClientService, JwtStrategy],
})
export class ClientModule {}
