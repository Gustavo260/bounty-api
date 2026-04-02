import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PiratesService } from './pirates-module.service';

describe('PiratesService', () => {
  let service: PiratesService;

  const pirateModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PiratesService,
        {
          provide: getModelToken('Pirate'),
          useValue: pirateModelMock,
        },
      ],
    }).compile();

    service = module.get<PiratesService>(PiratesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});