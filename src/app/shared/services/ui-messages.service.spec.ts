import { TestBed } from '@angular/core/testing';

import { UiMessagesService } from './ui-messages.service';

describe('UiMessagesService', () => {
  let service: UiMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
