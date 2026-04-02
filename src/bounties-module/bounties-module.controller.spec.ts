import { Test, TestingModule } from '@nestjs/testing';
import { BountiesController } from './bounties-module.controller';
import { BountiesService } from './bounties-module.service';

describe('BountiesController', () => {
  let controller: BountiesController;

  const bountiesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findActive: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BountiesController],
      providers: [
        {
          provide: BountiesService,
          useValue: bountiesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BountiesController>(BountiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});