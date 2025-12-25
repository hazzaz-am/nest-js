import { Test, TestingModule } from '@nestjs/testing';
import { MyNameController } from './my-name.controller';

describe('MyNameController', () => {
  let controller: MyNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyNameController],
    }).compile();

    controller = module.get<MyNameController>(MyNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
