import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService],
    }).compile();
    service = module.get<RolesService>(RolesService);
  });

  describe('create()', () => {
    it('returns a role with id and createdAt', () => {
      const role = service.create({ name: 'admin' });
      expect(role.id).toBeDefined();
      expect(role.name).toBe('admin');
      expect(role.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll()', () => {
    it('returns empty array initially', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('returns roles after creation', () => {
      service.create({ name: 'admin' });
      service.create({ name: 'user' });
      expect(service.findAll()).toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('throws NotFoundException for unknown id', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
    });
  });
});
