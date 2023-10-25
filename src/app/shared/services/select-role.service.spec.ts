import { TestBed } from '@angular/core/testing';

import { SelectRoleService } from './select-role.service';

describe('SelectRoleService', () => {
  let service: SelectRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
