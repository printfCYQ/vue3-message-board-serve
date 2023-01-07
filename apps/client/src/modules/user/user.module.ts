import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'cyqcyqcyq', // 密钥
      signOptions: { expiresIn: '24h' }, // token 过期时效
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
