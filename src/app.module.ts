import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddlewareMiddleware } from './middleware/logger-middleware/logger-middleware.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { LibraryModule } from './library/library.module';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UserModule,
    ProductModule,
    LibraryModule,
    ProjectModule,
    EmployeeModule,
    StudentModule,
  ],
  controllers: [AppController, ExceptionController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareMiddleware).forRoutes('*');
  }
}
