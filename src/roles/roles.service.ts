import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  private readonly roles = new Map<string, Role>();

  create(dto: CreateRoleDto): Role {
    const role: Role = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date(),
    };
    this.roles.set(role.id, role);
    return role;
  }

  findAll(): Role[] {
    return Array.from(this.roles.values());
  }

  findOne(id: string): Role {
    const role = this.roles.get(id);
    if (!role) throw new NotFoundException(`Role ${id} not found`);
    return role;
  }

  update(id: string, dto: UpdateRoleDto): Role {
    const role = this.findOne(id);
    Object.assign(role, dto);
    return role;
  }

  remove(id: string): void {
    this.findOne(id);
    this.roles.delete(id);
  }
}
