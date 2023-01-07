import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  app.setGlobalPrefix('api/client');
  await app.listen(3001);
  console.log('client open on http://localhost:3001');
}
bootstrap();
