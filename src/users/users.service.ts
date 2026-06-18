import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>([
    ['1', { id: '1', name: 'Alice Johnson', email: 'alice@obel.com', roleIds: [] }],
    ['2', { id: '2', name: 'Bob Smith', email: 'bob@obel.com', roleIds: [] }],
    ['3', { id: '3', name: 'Carol White', email: 'carol@obel.com', roleIds: [] }],
    ['4', { id: '4', name: 'David Brown', email: 'david@obel.com', roleIds: [] }],
    ['5', { id: '5', name: 'Eva Martinez', email: 'eva@obel.com', roleIds: [] }],
  ]);

  constructor(private readonly rolesService: RolesService) {}

  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  assignRole(userId: string, roleId: string): User {
    const user = this.findOne(userId);
    this.rolesService.findOne(roleId);
    if (!user.roleIds.includes(roleId)) {
      user.roleIds.push(roleId);
    }
    return user;
  }

  removeRole(userId: string, roleId: string): User {
    const user = this.findOne(userId);
    const index = user.roleIds.indexOf(roleId);
    if (index === -1) throw new NotFoundException(`Role ${roleId} not assigned to user ${userId}`);
    user.roleIds.splice(index, 1);
    return user;
  }

  getUserRoles(userId: string): Role[] {
    const user = this.findOne(userId);
    return user.roleIds.map((id) => this.rolesService.findOne(id));
  }
}
