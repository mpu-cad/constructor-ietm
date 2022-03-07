import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ViewerModule } from './viewer/viewer.module';
import { MongooseModule } from '@nestjs/mongoose';

const modules = [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', './.env'] }),
  MongooseModule.forRoot(process.env.DATABASE_URL),
  UserModule,
  AuthModule,
  ViewerModule,
];

if (process.env.NODE_ENV !== 'development') {
  modules.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '', 'build/constructor'),
    }),
  );
}

@Module({
  imports: modules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
