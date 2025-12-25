import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { UserController } from './user/user.controller';
import { MyNameController } from './my-name/my-name.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddlewareMiddleware } from './middleware/logger-middleware/logger-middleware.middleware';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ProductModule, EmployeeModule, EmployeeModule],
  controllers: [
    AppController,
    UserController,
    MyNameController,
    ExceptionController,
    DatabaseController,
  ],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareMiddleware).forRoutes('*');
  }
}
