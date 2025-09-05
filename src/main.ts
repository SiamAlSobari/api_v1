import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< Updated upstream
=======
  app.setGlobalPrefix(prefix)
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.enableCors({
    Credential: true,
  })
>>>>>>> Stashed changes
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
