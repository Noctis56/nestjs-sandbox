import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastifyRateLimit from 'fastify-rate-limit';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.register(fastifyRateLimit, {
    max: 10,
    timeWindow: '1 minute'
  })

  const options = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap()
