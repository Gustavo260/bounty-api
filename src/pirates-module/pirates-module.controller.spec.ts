import { Test, TestingModule } from '@nestjs/testing';
import { PiratesController } from './pirates-module.controller';
import { PiratesService } from './pirates-module.service';

describe('PiratesController', () => {
  let controller: PiratesController;

  const piratesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiratesController],
      providers: [
        {
          provide: PiratesService,
          useValue: piratesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PiratesController>(PiratesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});