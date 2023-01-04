import { Test, TestingModule } from '@nestjs/testing';
import { ManualSchedulerService } from './manual-scheduler.service';

describe('ManualSchedulerService', () => {
  let service: ManualSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualSchedulerService],
    }).compile();

    service = module.get<ManualSchedulerService>(ManualSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
