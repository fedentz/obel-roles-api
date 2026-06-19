import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AssignRoleDto } from './dto/assign-role.dto';

@ApiTags('users')
@ApiBearerAuth('Authorization')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/roles')
  @ApiOperation({ summary: 'Asignar un role a un usuario' })
  @ApiResponse({ status: 201, description: 'Role asignado' })
  @ApiResponse({ status: 404, description: 'Usuario o role no encontrado' })
  assignRole(@Param('id') id: string, @Body() dto: AssignRoleDto) {
    return this.usersService.assignRole(id, dto.roleId);
  }

  @Delete(':id/roles/:roleId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover un role de un usuario' })
  @ApiResponse({ status: 404, description: 'Usuario o role no encontrado' })
  removeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    return this.usersService.removeRole(id, roleId);
  }

  @Get(':id/roles')
  @ApiOperation({ summary: 'Obtener todos los roles de un usuario' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUserRoles(@Param('id') id: string) {
    return this.usersService.getUserRoles(id);
  }
}
