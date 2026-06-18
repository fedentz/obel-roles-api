import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@ApiBearerAuth('Authorization')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo role' })
  @ApiResponse({ status: 201, description: 'Role creado' })
  @ApiResponse({ status: 400, description: 'Validación fallida' })
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un role por ID' })
  @ApiResponse({ status: 404, description: 'Role no encontrado' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un role por ID' })
  @ApiResponse({ status: 404, description: 'Role no encontrado' })
  @ApiResponse({ status: 400, description: 'Validación fallida' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un role por ID' })
  @ApiResponse({ status: 404, description: 'Role no encontrado' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
