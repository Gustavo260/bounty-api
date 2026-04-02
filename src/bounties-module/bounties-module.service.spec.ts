import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { BountiesService } from './bounties-module.service';

describe('BountiesService', () => {
  let service: BountiesService;

  const bountyModelMock = {
    find: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BountiesService,
        {
          provide: getModelToken('Bounty'),
          useValue: bountyModelMock,
        },
      ],
    }).compile();

    service = module.get<BountiesService>(BountiesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of bounties', async () => {
    const mockBounties = [
      {
        _id: '1',
        cantidadBellys: 3000000000,
        estado: 'Wanted',
        pirata: {
          _id: 'p1',
          nombre: 'Monkey D. Luffy',
          tripulacion: 'Sombrero de Paja',
          tieneFrutaDelDiablo: true,
        },
      },
    ];

    const execMock = jest.fn().mockResolvedValue(mockBounties);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });

    bountyModelMock.find.mockReturnValue({
      populate: populateMock,
    });

    const result = await service.findAll();

    expect(result).toEqual(mockBounties);
    expect(bountyModelMock.find).toHaveBeenCalled();
    expect(populateMock).toHaveBeenCalledWith('pirata');
  });

  it('findOne should throw NotFoundException if bounty does not exist', async () => {
    const validButNonExistingId = '507f1f77bcf86cd799439011';

    const execMock = jest.fn().mockResolvedValue(null);
    const populateMock = jest.fn().mockReturnValue({ exec: execMock });

    bountyModelMock.findById.mockReturnValue({
      populate: populateMock,
    });

    await expect(service.findOne(validButNonExistingId)).rejects.toThrow(NotFoundException);
    expect(bountyModelMock.findById).toHaveBeenCalledWith(validButNonExistingId);
    expect(populateMock).toHaveBeenCalledWith('pirata');
  });
});