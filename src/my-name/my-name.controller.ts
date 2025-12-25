import { Body, Controller, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('my-name')
export class MyNameController {
  @Post('custom')
  postMyName(@Body('name', new UppercasePipe()) name: string) {
    return { MyName: `${name}` };
  }
}
