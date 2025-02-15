import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(process.cwd(),'products'),{
    prefix:'/products/',
  })
  app.useStaticAssets(join(process.cwd(),'uploads'),{
    prefix:'/uploads/',
  })
  app.useStaticAssets(join(process.cwd(),'stores'),{
    prefix:'/stores/',
  })
  app.useStaticAssets(join(process.cwd(),'stores'),{
    prefix:'/carts/',
  })
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed 
    credentials: true, // Allow cookies if needed
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();