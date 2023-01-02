import { Test, TestingModule } from '@nestjs/testing';
import { AutomationSchedulerService } from './automation-scheduler.service';

describe('AutomationSchedulerService', () => {
  let service: AutomationSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomationSchedulerService],
    }).compile();

    service = module.get<AutomationSchedulerService>(AutomationSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
