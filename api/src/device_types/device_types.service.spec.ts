import { Test, TestingModule } from '@nestjs/testing';
import { DeviceTypesService } from './device_types.service';

describe('DeviceTypesService', () => {
  let service: DeviceTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceTypesService],
    }).compile();

    service = module.get<DeviceTypesService>(DeviceTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
